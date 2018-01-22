# mdb-full-project
School Project creating our own version of a fully working movie database

![](https://github.com/OlaJFrick/mdb-full-project/blob/master/src/assets/images/screenshots/screenshot-1.png)

[A few more screenshots](https://github.com/OlaJFrick/mdb-full-project/tree/master/src/assets/images/screenshots)

### Created Oct-Nov 2017
by Karzan Botani, Hampus Johansson, Dennis Majvall, David Böttiger, Björn Ohlsson & Ola Frick

mySQL, node.js, Angular 4

---------------

## Installation

Clone or download the source files & install dependencies:

```sh
$ npm install

$ npm install scraperjs

$ npm install phantomjs-prebuilt
```

### mySQL

in folder 'current-mysql-db-export' Import database.sql, dummydata.sql, views.sql (in that order):


### Create password file:

create a file: 'dev-password' in the root folder and paste the following:

```js

function unique() {
  return 'INSERT YOUR MYSQL PASSWORD';
}

module.exports = {
  unique: unique
}
```


### Start up server on port 3000

Run the app (http://localhost:3000)

```sh
$ node app
```

### Start up Angular on port 4200 (in seperate terminal)

Run the app:

```sh
$ ng serve
```

Go to http://localhost:4200

----------------
