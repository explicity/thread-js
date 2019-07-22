import * as postService from 'src/services/postService';
import * as commentService from 'src/services/commentService';
import { ADD_POST, LOAD_MORE_POSTS, SET_ALL_POSTS, SET_EXPANDED_POST } from './actionTypes';

const setPostsAction = posts => ({
    type: SET_ALL_POSTS,
    posts
});

const addMorePostsAction = posts => ({
    type: LOAD_MORE_POSTS,
    posts
});

const addPostAction = post => ({
    type: ADD_POST,
    post
});

const setExpandedPostAction = post => ({
    type: SET_EXPANDED_POST,
    post
});

export const loadPosts = filter => async (dispatch) => {
    const posts = await postService.getAllPosts(filter);
    dispatch(setPostsAction(posts));
};

export const loadMorePosts = filter => async (dispatch, getRootState) => {
    const {
        posts: { posts }
    } = getRootState();
    const loadedPosts = await postService.getAllPosts(filter);
    const filteredPosts = loadedPosts.filter(
        post => !(posts && posts.some(loadedPost => post.id === loadedPost.id))
    );
    dispatch(addMorePostsAction(filteredPosts));
};

export const applyPost = postId => async (dispatch) => {
    const post = await postService.getPost(postId);
    dispatch(addPostAction(post));
};

export const addPost = post => async (dispatch) => {
    const { id } = await postService.addPost(post);
    const newPost = await postService.getPost(id);
    dispatch(addPostAction(newPost));
};

export const toggleExpandedPost = postId => async (dispatch) => {
    const post = postId ? await postService.getPost(postId) : undefined;
    dispatch(setExpandedPostAction(post));
};

export const likePost = postId => async (dispatch, getRootState) => {
    const response = await postService.likePost(postId);
    const { id } = response.reaction;
    const diffLikes = id ? 1 : -1; // if ID exists then the post was liked, otherwise - like was removed
    let diffDislikes = 0;

    if (response.previousReaction) {
        const { isLike } = response.previousReaction;
        isLike ? diffDislikes = 0 : diffDislikes = -1;
    }

    const mapLikes = post => ({
        ...post,
        likeCount: Number(post.likeCount) + diffLikes, // diff is taken from the current closure
        dislikeCount: Number(post.dislikeCount) + diffDislikes,
    });

    const {
        posts: { posts, expandedPost }
    } = getRootState();
    const updated = posts.map(post => (post.id !== postId ? post : mapLikes(post)));

    dispatch(setPostsAction(updated));

    if (expandedPost && expandedPost.id === postId) {
        dispatch(setExpandedPostAction(mapLikes(expandedPost)));
    }
};

export const dislikePost = postId => async (dispatch, getRootState) => {
    const response = await postService.dislikePost(postId);
    const { id } = response.reaction;
    const diffDislikes = id ? 1 : -1;
    let diffLikes = 0;

    if (response.previousReaction) {
        const { isLike } = response.previousReaction;
        isLike ? diffLikes = -1 : diffLikes = 0 ;
    }

    const mapDislikes = post => ({
        ...post,
        dislikeCount: Number(post.dislikeCount) + diffDislikes,
        likeCount: Number(post.likeCount) + diffLikes
    });
 
    const {
        posts: { posts, expandedPost }
    } = getRootState();
    const updated = posts.map(post => (post.id !== postId ? post : mapDislikes(post)));

    dispatch(setPostsAction(updated));

    if (expandedPost && expandedPost.id === postId) {
        dispatch(setExpandedPostAction(mapDislikes(expandedPost)));
    }
};

export const likeComment = commentId => async (dispatch, getRootState) => {
    const { id } = await commentService.likeComment(commentId);
    
    console.log(commentId);
}

export const addComment = request => async (dispatch, getRootState) => {
    const { id } = await commentService.addComment(request);
    const comment = await commentService.getComment(id);

    const mapComments = post => ({
        ...post,
        commentCount: Number(post.commentCount) + 1,
        comments: [...(post.comments || []), comment] // comment is taken from the current closure
    });

    const {
        posts: { posts, expandedPost }
    } = getRootState();
    const updated = posts.map(post => (post.id !== comment.postId ? post : mapComments(post)));

    dispatch(setPostsAction(updated));

    if (expandedPost && expandedPost.id === comment.postId) {
        dispatch(setExpandedPostAction(mapComments(expandedPost)));
    }
};
