module.exports = class Cookiesession {

  constructor(
    cookieName = 'mdb-cookie',
    removeInactiveSessionsAfterMs = 60*60*1000 /* ONE HOUR */
  ) {
    this.sessionMem = {};
    this.cookieName = cookieName;
    this.removeInactiveSessionsAfterMs = removeInactiveSessionsAfterMs;

    setInterval(
      () => { this.removeInactiveSessions(); },
      removeInactiveSessionsAfterMs/10 /* RUNS EVERY 6 MINUTES */
    );
  }

  /* MIDDLEWARE */
  middleware() {
    return (req, res, next) => {
      let cookieVal = this.getCookie(req) || this.setCookie(res);
      req.session = this.getSession(cookieVal);
      req.session.lastActivity = new Date();
      next();
    }
  }

  /* GET COOKIE */
  getCookie(req) {
    /* READ COOKIE FROM REQUEST OBJECT */
    return req.cookies[this.cookieName];
  }

  /* SET COOKIE */
  setCookie(res) {
    /* SET COOKIE ON RESPOND METHOD */
    let value = this.generateCookieValue();

    res.cookie(this.cookieName, value, {
      expires: 0,
      httpOnly: true,
      path: '/',
      secure: false, // NOT SECURE BECAUSE IT'S ONLY HTTP
    });

    return value;
  }

  /* RANDOMIZE/GENERATE COOKIE VALUE */
  generateCookieValue() {
    let newCookieValue;

    while (!newCookieValue || this.sessionMem[newCookieValue]) {
      newCookieValue = (Math.random() + '').split('.')[1];
    }

    return newCookieValue;
  }

  /* GET SESSION */
  getSession(cookieVal) {
    /* GET CURRENT SESSION FROM sessionMem */
    if (!this.sessionMem[cookieVal]) {
      /* IF NO SESSIONS - CREATE ONE */
      let session = {
        cookieVal: cookieVal,
        user: false
      };

      this.sessionMem[cookieVal] = session;
    }

    /* RETURN THE SESSION */
    return this.sessionMem[cookieVal];
  }

  /* REMOVE INACTIVE SESSIONS */
  removeInactiveSessions() {
    for (let i in this.sessionMem) {
      if(
        this.sessionMem[i].lastActivity.getTime() +
        this.removeInactiveSessionsAfterMs < new Date().getTime()
      ) {
        /* REMOVE IF INACTIVE FOR TOO LONG */
        delete this.sessionMem[i]; /* REMOVE FROM this.sessionMem */
      }
    }
  }

}