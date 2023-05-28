const cookieSession = require('cookie-session')
const passport = require("passport")
const { Strategy } = require("passport-google-oauth20")


//passport start
// app.use(
//     cookieSession({name:"session",keys:["lama"],  maxAge: 24 * 60 * 60 * 1000})
// )
// app.use(passport.initialize());
// // app.use(passport.session());

// passport.serializeUser(function (user, cb) {
//     cb(null, user);
// })
// passport.deserializeUser(function (user, cb) {
//     cb(null, user);
// })

// passport.use(new Strategy({
//     clientID: "233419149658-e84jj0d08c23u3qibev3skjvirhd10sv.apps.googleusercontent.com",
//     clientSecret: "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",
//     callbackURL: "http://localhost:7000/auth/google/callback"
// },
//     function (accessToken, refreshToken, profile, done) {
//         // console.log(profile)
//         done(null, {})
//     }
// ));

// app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))
// app.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/auth/fail' }),
//     function (req, res) {
//         res.send("user is logged in")
//     });

// app.get('auth/fail', (req, res) => {
//     res.send("user logged in failed")
// })
// passport end