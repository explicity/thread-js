import callWebApi from 'src/helpers/webApiHelper';

export const addComment = async (request) => {
    const response = await callWebApi({
        endpoint: '/api/comments',
        type: 'POST',
        request
    });
    return response.json();
};

export const getComment = async (id) => {
    const response = await callWebApi({
        endpoint: `/api/comments/${id}`,
        type: 'GET'
    });
    return response.json();
};


export const likeComment = async (postId) => {
    const response = await callWebApi({
        endpoint: '/api/comments/react',
        type: 'PUT',
        request: {
            postId,
            isLike: true
        }
    });
    return response.json();
};
