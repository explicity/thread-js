import commentRepository from '../../data/repositories/comment.repository';

export const create = (userId, comment) => commentRepository.create({
    ...comment,
    userId
});

export const getCommentById = id => commentRepository.getCommentById(id);

export const setReaction = async (userId, { postId, isLike = true }) => {
    console.log('yep');
}