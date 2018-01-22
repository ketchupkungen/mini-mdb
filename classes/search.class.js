module.exports = class Search {

  constructor(app){
    app.get('/search/:searchWord', (req, res) => {
      this.search(res, req.params.searchWord);
    });
  }

  async searchFilms(searchWord){
    let q = 'SELECT id, title, year, genre, imagePath FROM current_films WHERE ';
    q += 'title LIKE ?';
    q += ' OR year LIKE ?';
    q += ' OR genre LIKE ?';


    return await global.dbQuery(q, [searchWord, searchWord, searchWord]);
  }

  async searchActors(searchWord){
    let q = 'SELECT id, firstName, lastName, birth, imagePath FROM current_actors WHERE ';
    q += 'firstName LIKE ?';
    q += ' OR lastName LIKE ?';

    return await global.dbQuery(q, [searchWord, searchWord]);
  }

  async searchDirectors(searchWord){
    let q = 'SELECT id, firstName, lastName, birth, imagePath FROM current_directors WHERE ';
    q += 'firstName LIKE ?';
    q += ' OR lastName LIKE ?';

    return await global.dbQuery(q, [searchWord, searchWord]);
  }

  async search(res, searchWord) {
    searchWord = '%' + searchWord + '%';

    let films = await this.searchFilms(searchWord);
    let actors = await this.searchActors(searchWord);
    let directors = await this.searchDirectors(searchWord);

    /* OUTPUT RESULTS */
    res.json({ films, actors, directors });
  }

}
