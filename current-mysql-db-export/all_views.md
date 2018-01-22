# ALL OUR VIEWS:
---------------
- current_actors
- current_directors
- current_films
- ratings
- film_starring
- film_directed
- all_films_list
- all_actors_list
- all_directors_list
- film_roles
- person_as_actor
- person_as_director
- top10_highest
- top10_lowest
- all_reviews_list
- admin_all_activity
- find_by_changerId

```
Obs. tänk på att ni också kan skapa mindre tabeller som kan används av flera properties i olika vyer.
Tex, en persons highest ranked movies, kan vara användbar i både 'all_actors_list', o 'all_directors_list'
```

-------------------

# VIEW film_directed: (se all_actors_list Page)

id, // of film
title, // of film
directed //

-----------------

# VIEW film_starring: (se all_actors_list Page)

id, // of film
title, // of film
starring // Only the mainCharacters in the film

-----------------

# VIEW all_films_list: (se assets/wireframes)
* ORDER By title alphabetical,

id, // of film
image, // of the movie
title, // of the movie
year, // of the movie
rating, // of the review
actors // *** USE film_starring
director // *** USE film_directed

-----------------


# VIEW all_actors_list: (se assets/wireframes)
* ORDER By lastname alphabetical

id, // of person
name // full name (first & last)
nationality,
gender,
appears // *** Only include films the actor is mainCharacter in these films, Limit 3 films + ORDER by Higest Ranking

-----------------

# VIEW all_directors_list: (se assets/wireframes)
* ORDER By lastname alphabetical

id, // of person
name // full name (first & last)
nationality,
gender,
directed // *** Limit 3 films + ORDER by Higest Ranking

-----------------

# VIEW top10_highest: (se assets/wireframes: top10_list)
* ORDER By higest Score,

id, // of film
image,
title,
ranking,
year
-----------------

# VIEW top10_lowest: (se assets/wireframes: top10_list)
* ORDER By lowest Score

id, // of film
image, // of film
title,
ranking,
year

-----------------

# VIEW film_roles: (se assets/wireframes: FILM detail)
* ORDER By Main Character (true) + Last Name

id // of film
actorId, // of actor
title,
image // of person
name // (first and last)
mainCharacter // (boolean
characterName //

-----------------

# VIEW person_as_actor: (se assets/wireframes: PERSON detail)
* ORDER By YEAR

id // of film
actorId, // of person
title,
image, // of film
year //
characterName // of 'this' actor

-----------------

# VIEW person_as_director: (se assets/wireframes: PERSON detail)
* ORDER By YEAR

id // of film
actorId, // of person
title,
image, // of film
year //

-----------------

# VIEW all_reviews_list: (se assets/wireframes: all_reviews_list + FILM detail)
* ORDER By lastest added (timestamp on reviews)

id, // of film
title,
image,
textbody,
rating,
created // date YYYY-MM-DD

-----------------

# VIEW admin_all_activity: (se assets/wireframes)
* ORDER By TimeCreated LATEST first.

createdDate //
category // Is it a film, person
changerId //
changedName // firstName and lastName of the changerId.

(If == movie)
title,
year,
genre,
youtubeUrl,
imagePath,
plot,

(If == actor)
firstName
lastName
birth
death
gender
nationality
miniBio
imagePath







## Other relation tables
---------------
filmsActors *
filmsDirectors
usersReviews

* filmsActors also have the properties
'character' they play in the film
'mainCharacter' // TINYINT (0) true / (1) false
