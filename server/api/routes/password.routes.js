import { Router } from 'express';
import nodemailer from 'nodemailer';
import async from 'async';
import crypto from 'crypto';
import * as userService from '../services/user.service';

const router = Router();
/* eslint-disable */
router.post('/', (req, res, next) => {
    async.waterfall(
        [
            function(done) {
                crypto.randomBytes(20, (err, buf) => {
                    const token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done) {
                userService.getUserByEmail(req.body.email).then(user => {
                    if (!user) {
                        return res.redirect('/reset');
                    }

                    let smtpTransport = nodemailer.createTransport({
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
                        subject: 'Password Reset',
                        text:
                            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                            'http://' +
                            req.headers['x-forwarded-host'] +
                            '/reset/' +
                            token +
                            '\n\n' +
                            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                    };
                    smtpTransport.sendMail(mailOptions, function(err) {
                        console.log('HI:' + user.email);
                        res.json({
                            status: 'success',
                            message:
                                'An e-mail has been sent to ' +
                                user.email +
                                ' with further instructions.'
                        });
                        done(err, 'done');
                    });
                });
            }
        ],
        err => {
            if (err) return next(err);
            res.redirect('/reset');
        }
    );
});

export default router;
