function loggedOut(err, req, res, next) {
    if (req.session && req.session.userId) {
      return res.redirect('/profile');
    }
    if (err) {
      console.log(new Error());
    }
    return next();
}

function requiresLogin(req, res, next) {
  console.log('requiring login');
    if (!req.session || !req.session.userId) {
      var err = new Error('you must be logged in to see this page');
      err.status = 401;
      console.log(err);
      next(err);
      return res.redirect('/login');
    }
    console.log('middleware require login', req.session.userId);
    return next();
}

function getIp(req, res, next) {
  console.log('Your ip', req.ip);
  if (req.session){
    console.log(req.session.secret);
  }
  return next();
}

module.exports = {
  loggedOut: loggedOut,
  requiresLogin: requiresLogin,
  getIp: getIp
};