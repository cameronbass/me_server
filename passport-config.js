const LocalStrategy = require("passport-local").Strategy;
const User = require("./model/user");

module.exports = (passport) => {
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          // check if user exists
          const userExists = await User.findOne({ "email": email });
          if (userExists) {
            return done(null, false)
          }
          // Create a new user with the user data provided
          const user = await User.create({ email, password });
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email });

          if (!user) return done(null, false);

          const isMatch = await User.matchPassword(password);

          if (!isMatch) return done(null, false);
          // if passwords match return user
          return done(null, user);
        } catch (error) {
          console.log(error)
          return done(error, false);
        }
      }
    )
  );
}
