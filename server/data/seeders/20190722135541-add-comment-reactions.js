import commentReactionsSeed from '../seed-data/comment-reactions.seed';

const randomIndex = length => Math.floor(Math.random() * length);

export default {
    up: async (queryInterface, Sequelize) => {
        try {
            const options = {
                type: Sequelize.QueryTypes.SELECT
            };

            const users = await queryInterface.sequelize.query('SELECT id FROM "users";', options);
            const posts = await queryInterface.sequelize.query('SELECT id FROM "posts";', options);

            const commentReactionsMappedSeed = commentReactionsSeed.map(reaction => ({
                ...reaction,
                userId: users[randomIndex(users.length)].id,
                commentId: posts[randomIndex(posts.length)].id
            }));
            await queryInterface.bulkInsert('commentReactions', commentReactionsMappedSeed, {});
        } catch (err) {
            console.log(`Seeding error: ${err}`);
        }
    },
    down: async (queryInterface) => {
        try {
            await queryInterface.bulkDelete('commentReactions', null, {});
        } catch (err) {
            console.log(`Seeding error: ${err}`);
        }
    }
};
