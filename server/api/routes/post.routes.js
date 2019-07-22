import { Router } from 'express';
import nodemailer from 'nodemailer';

import * as postService from '../services/post.service';
import * as userService from '../services/user.service';

const router = Router();

router
    .get('/', (req, res, next) => postService
        .getPosts(req.query)
        .then(posts => res.send(posts))
        .catch(next))
    .get('/:id', (req, res, next) => postService
        .getPostById(req.params.id)
        .then(post => res.send(post))
        .catch(next))
    .post('/', (req, res, next) => postService
        .create(req.user.id, req.body) // user added to the request in the jwt strategy, see passport config
        .then((post) => {
            req.io.emit('new_post', post); // notify all users that a new post was created
            return res.send(post);
        })
        .catch(next))
    .put('/react', (req, res, next) => postService
        .setReaction(req.user.id, req.body) // user added to the request in the jwt strategy, see passport config
        .then((response) => {
            if (response.reaction.post && response.reaction.post.userId !== req.user.id) {
                // notify a user if someone (not himself) liked his post
                req.io.to(response.reaction.post.userId).emit('like', 'Your post was liked!');

                userService.getUserById(response.reaction.post.userId).then((user) => {
                    if (!user) {
                        console.log('error');
                    }

                    const smtpTransport = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'noreply1223334444@gmail.com',
                            pass: '1223334444noreply'
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    });

                    const mailOptions = {
                        to: user.email,
                        from: 'passwordreset@demo.com',
                        subject: 'You are being popular!',
                        text: 'Your post was liked! Check it out quickly!'
                    };
                    smtpTransport.sendMail(mailOptions, (err) => {
                        res.json({
                            status: 'success',
                            message:
                                    `An e-mail has been sent to ${
                                        user.email
                                    } with further instructions.`
                        });
                        done(err, 'done');
                    });
                });
            }
            return res.send(response);
        })
        .catch(next));

export default router;
