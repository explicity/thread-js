import authRoutes from './auth.routes';
import postRoutes from './post.routes';
import commentRoutes from './comment.routes';
import imageRoutes from './image.routes';
import passwordRoutes from './password.routes';
// register all routes
export default (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/posts', postRoutes);
    app.use('/api/comments', commentRoutes);
    app.use('/api/images', imageRoutes);
    app.use('/reset', passwordRoutes); 
};
