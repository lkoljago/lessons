const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_secret } = require('./configuration');
const User = require('./models/user');

//JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('jwt'),
  secretOrKey: JWT_secret
}, async (payload, done) => {
  try {
    
    //find user specifide by token
    console.log('payload ', payload);
    
    const user = await User.findById(payload.sub);
    console.log('user ', user);
    
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch(error) {
    done(error, false);
  }

}));

//LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    //find the user given email
    const user = await User.findOne({ email });
    // console.log({user});
    
    //if not handle it
    if (!user) {
      return done(null, false);
    }
    //check if the pasword is correct
    const isMatch = await user.isValidPassword(password);

    //if not handle it
    if (!isMatch) {
      return done(null, false);
    }
    //otherwise, return the user
    done(null, user);

  } catch(error) {
    done(error, false);
  }
  
}))