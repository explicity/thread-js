import { Router } from 'express'; 
import facebookMiddleware from '../middlewares/facebook.middleware';
import tokenHelper from '../../helpers/token.helper';

const generateToken = function (req, res, next) {
    req.token = tokenHelper.createToken(req.auth);
    return next();
};
const sendToken = function (req, res) {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
};

const router = Router();

router.route('/').post(facebookMiddleware,
    (req, res, next) => {
        console.log(tokenHelper);
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }
        req.auth = {
            id: req.user.id
        };
        console.log(req.user);
        next();
    },
    generateToken,
    sendToken
);

export default router;
