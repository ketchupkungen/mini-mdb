const bcrypt = require('bcrypt');

module.exports = class Login {

  constructor(expressApp) {
    this.app = expressApp;
    this.get();
    this.post();
    this.delete();
  }

  /* LOGGED IN CHECK */
  get() {
    this.app.get('/rest/login', (req, res) => {

      /* SESSION DOES NOT EXIST - USER IS NOT LOGGED IN */
      if (!req.session.user) {
        res.json({ user: false, status: 'not logged in' });
        return;
      }

      /* SESSION EXISTS - USER IS LOGGED IN */
      res.json({ user: req.session.user, status: 'logged in' });
    });
  }

  /* LOG OUT */
  delete() {
    this.app.delete('/rest/login', (req, res) => {

      /* IF A USER SESSION EXISTS, THEN LOG OUT */
      if (req.session.user) {
        res.json({
          user: false,
          status: 'logging out'
        });

        /* LOG USER OUT BY DELETING THE SESSION */
        delete req.session.user;
      }

      /* IF A USER SESSION DOES NOT EXIST, THEN USER CAN NOT LOG OUT! */
      else if (!req.session.user) {
        res.json({
          user: false,
          status: 'you can\t log out if you\re not logged in!'
        });
      }

    });
  }

  /* LOG IN */
  post() {
    this.app.post('/rest/login', async (req, res) => {

      /* SESSION EXISTS - USER IS ALREADY LOGGED IN */
      if (req.session.user) {
        res.json({
          user: req.session.user,
          status: 'logged in already'
        });
        return;
      }

      /* AN ATTEMPT AT LOGGING IN */
      let email = req.body.email;
      let password = req.body.password;

      /* MAP EXISTING EMAILS - USED LATER SO EMAIL CAN NOT BE DUPLICATED */
      let userFromDb = await global.dbQuery('SELECT * FROM users WHERE email = ?',
        [email]
      );

      if (userFromDb.length) {
        userFromDb = userFromDb[0];

        if (await bcrypt.compare(password, userFromDb.password) ) {
          let user = Object.assign({}, userFromDb);
          delete user.password;

          if (user.role === 'banned') {
            res.json({ user: false, status: 'You are banished for misbehaviour. Sorry! '});
            user = false;
          } else {
            res.json({ user: user, status: 'logged in' });
          }

          req.session.user = user;

          return;
        }
      }

      res.json({ user:false, status: 'wrong credentials' });
    });
  }

}