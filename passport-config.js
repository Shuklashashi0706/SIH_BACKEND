// passport-config.js
import passport from "passport";
import { LawyerModel } from "../../models/lawyer/lawyer.js";
import bcrypt from "bcryptjs"
passport.serializeUser((user, done) => {
  // Serialize the user data and store it in the session
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  // Deserialize the user data from the session
  try {
    const user = await LawyerModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "emailAddress", // Change this field to match your request body
      passwordField: "password",     // Change this field to match your request body
    },
    async (email, password, done) => {
      try {
        const user = await LawyerModel.findOne({ emailAddress: email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (isPasswordValid) {
          return done(null, user, { message: "Login successful" });
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
