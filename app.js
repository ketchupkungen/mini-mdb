const express = require('express'),
      scraperjs = require('scraperjs'),
      cors = require('cors')
  	  app = express(),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      Rest = require('./classes/rest.class'),
      Cookiesession = require('./classes/cookie-session.class'),
      Login = require('./classes/login.class'),
      Search = require('./classes/search.class'),
      UploadPicture = require('./classes/upload-picture.class'),
      devPassword = require('./dev-password'),
      os = require('os');


process.on('unhandledRejection', error=>console.log('unhandledRejection', error));

const cookieSession = new Cookiesession();

// Is on live server
// (we know the live server has less than 3 GB memory)
const isOnLiveServer = os.totalmem() < 3 * 1024**3;


// Added CORS to read further: https://enable-cors.org/server_expressjs.html
// app.use(cors());
!isOnLiveServer && app.use(cors({credentials: true, origin: 'https://mini-mdb.ketchupkungen.se'}));
//!isOnLiveServer && app.use(cors({credentials: true, origin: 'http://localhost:4200'}));


/* MIDDLEWARE */
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(new Cookiesession().middleware());

/* NOT MIDDLEWARE */
new Login(app);
new Search(app);
new UploadPicture(app);

/* Create URL for Genre */
app.get('/genre', async (req, res) => {
  let s = await Rest.query('DESCRIBE films genre');
  s = s[0].Type;
  s = s.split('set(')[1].split(')')[0];

  // make an Array instead of a string
  s = eval('Array('+s+')');
  res.json(s);
});

app.get('/countries', async (req, res) => {
  let s = await Rest.query('DESCRIBE persons nationality');
  s = s[0].Type;
  s = s.split('enum(')[1].split(')')[0];
  s = eval('Array('+s+')');
  res.json(s);
});

app.use(Rest.start({
  dbCredentials: {
    host: '127.0.0.1',
    user: 'root',
    password: devPassword.unique(), // edit to YOUR password in the file dev-password.js. Otherwise it will not work.
    database: 'mdb',
    multipleStatements: true
  },
  baseUrl: '/',
  baseUrlForVidTables: '/vid',
  idMap: {
    films_actors: 'filmId',
    films_directors: 'filmId',
    film_roles: 'filmId',
    person_as_actor: 'personId',
    person_as_director: 'personId'
  },
  runtimeErrors: false
}));

// webscraping IMDB News


let newsFromIMDB = [];

async function scrapeIMDB(){
  let imdb = scraperjs.StaticScraper.create('http://www.imdb.com/news/top?ref_=nv_tp_nw_1');

  let news = await imdb.scrape(($) => {

    return $('.news-article').map(function(obj){
      return {
        title: $(this).find("h2").text(),
        body: $(this).find(".news-article__body").text(),
        img: $(this).find("img").attr('src'),
        url: 'http://www.imdb.com' + $(this).find("a").attr('href'),
        date: $(this).find(".news-article__date").text()
        // text: $(this).closest("h2").find('.news-article__title').text()
      };
    }).get();
  });
  newsFromIMDB = news;
}

scrapeIMDB();
setInterval(scrapeIMDB, 60 * 1000);

// On server
app.get('/imdb-news', (req, res) => {

// Localhost
//app.get('http://localhost:3333/imdb-news', (req, res) => {

    res.json(newsFromIMDB);
})

global.dbQuery = Rest.query;

app.use(express.static(isOnLiveServer ? './dist' : './src'));

app.all('*', (req, res) => {
  res.json({path:req.path});
});

app.listen('3333', () => console.log('MDB ACTIVE ON PORT 3333!'));
