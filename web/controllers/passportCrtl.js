//passport
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

passport.use(new Strategy(
  function(username, password, cb) {
    db.one(findUser,[username, password]).then(results => {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

passport.serializeUser((user, done)=>{
    done(null, user.user_id);
  });

 passport.deserializeUser((id, done)=>{
    log.debug("deserualize ", id);
    db.one("SELECT user_id, user_name, user_email, user_role FROM users " +
            "WHERE user_id = $1", [id])
    .then((user)=>{
      done(null, user);
    })
    .catch((err)=>{
      done(new Error(`User with the id ${id} does not exist`));
    })
});