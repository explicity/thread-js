import userRepository from '../../data/repositories/user.repository';

export const getUserById = async (userId) => {
    const { id, username, email, imageId, image } = await userRepository.getUserById(userId);
    return { id, username, email, imageId, image };
};

export const getUserByEmail = async (userEmail) => {
    const { id, username, email, imageId, image } = await userRepository.getByEmail(userEmail);
    return { id, username, email, imageId, image };
};
