export const configAuth = {
    "facebookAuth": {
        clientID: '360133724678357',
        clientSecret: 'b7f2d0a449b50fcc4c1d6ea8e5bcc850',
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        profileURL: 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        profileFields: ['id', 'email', 'name']
    }
};
