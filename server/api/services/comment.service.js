import commentRepository from '../../data/repositories/comment.repository';
import commentReactionRepository from '../../data/repositories/comment-reaction.repository';

export const create = (userId, comment) => commentRepository.create({
    ...comment,
    userId
});

export const getCommentById = id => commentRepository.getCommentById(id);

export const setReaction = async (userId, { commentId, isLike }) => {
    const updateOrDelete = react => (react.isLike === isLike
        ? commentReactionRepository.deleteById(react.id)
        : commentReactionRepository.updateById(react.id, { isLike }));

    const reaction = await commentReactionRepository.getCommentReaction(userId, commentId);
    console.log('reaction: ', reaction);

    const result = reaction
        ? await updateOrDelete(reaction)
        : await commentReactionRepository.create({ userId, commentId, isLike });

    // the result is an integer when an entity is deleted
    return Number.isInteger(result)
        ? { reaction: {} }
        : {
            reaction: await commentReactionRepository.getCommentReaction(userId, commentId),
            previousReaction: reaction
        };
};
