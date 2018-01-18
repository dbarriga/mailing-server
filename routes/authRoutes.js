const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get(
    '/auth/outlook',
    passport.authenticate('windowslive', {
      scope: [
        'openid',
        'profile',
        'offline_access',
        'https://outlook.office.com/Mail.Read'
      ]
    })
  );

  app.get(
    '/auth/outlook/callback',
    passport.authenticate('windowslive', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/surveys')
    }
  );

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
