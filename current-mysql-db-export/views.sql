-- When exporting the database the views will get included
-- This file is only for saving "the actual VIEW-code
-- Why have this? cuz when mysql exports "already created VIEWS"
-- They become unreadable.
-- Proof/Example: select `p`.`id` AS `id`,`p`.`versionId` AS `versionId`,`p`.`changerId` AS `changerId`,`p`.`firstName` AS `firstName`,`p`.`lastName` AS `lastName`,`p`.`birth` AS `birth`,`p`.`death` AS `death`,`p`.`gender` AS `gender`,`p`.`nationality` AS `nationality`,`p`.`miniBio` AS `miniBio`,`p`.`imagePath` AS `imagePath`,`p`.`timeCreated` AS `timeCreated` from (`persons` `p` join `films_actors` `fa` on((`p`.`id` = `fa`.`actorId`))) group by `p`.`id`

-- How to import these manually?
-- Select All
-- Copy
-- Go to SQL-program, and open up a new 'Query'
-- Paste
-- Run/Execute

-- When writing the views, make sure you:
-- - Start with CREATE OR REPLACE VIEW <name> AS
-- - End with ; (semicolon)

# WORKING VIEWS:

CREATE OR REPLACE VIEW ratingcount AS
SELECT *,
COUNT(changerId) AS counter
FROM reviews
GROUP BY filmId;

CREATE OR REPLACE VIEW ratings AS
SELECT
f.id,
ROUND(AVG(r.rating), 2) AS avgRating,
rc.counter
FROM reviews AS r, films AS f, ratingcount AS rc
WHERE r.filmId = f.id && rc.filmId = f.id
GROUP BY id;


CREATE OR REPLACE VIEW current_actors AS
SELECT p.*
FROM persons as p
JOIN (
    SELECT id, MAX(versionId) AS versionId
    FROM persons
    GROUP BY id
  ) AS v
ON p.versionId = v.versionId AND p.id = v.id
JOIN films_actors as fa
ON p.id = fa.actorId
GROUP BY id;

CREATE OR REPLACE VIEW current_films AS
SELECT f.*
FROM films as f
JOIN (
    SELECT id, MAX(versionId) AS versionId
    FROM films
    GROUP BY id
  ) AS v
ON f.versionId = v.versionId AND f.id = v.id;

SELECT * FROM films as f;


CREATE OR REPLACE VIEW current_directors AS
SELECT p.*
FROM persons as p
JOIN (
    SELECT id, MAX(versionId) AS versionId
    FROM persons
    GROUP BY id
  ) AS v
ON p.versionId = v.versionId AND p.id = v.id
JOIN films_directors as fd
ON p.id = fd.directorId
GROUP BY id;


CREATE OR REPLACE VIEW all_actors_list AS
SELECT
a.id,
CONCAT(a.firstName, ' ', a.lastName) AS name,
a.nationality,
a.gender,
group_concat(`f`.`title` separator ', ') AS films,
a.imagePath
FROM current_actors AS a, current_films AS f, films_actors AS fa
WHERE f.id = fa.filmId && a.id = fa.actorId
GROUP BY a.id
ORDER BY name;

CREATE OR REPLACE VIEW all_directors_list AS
SELECT
d.id,
CONCAT(d.firstName, ' ', d.lastName) AS name,
d.nationality,
d.gender,
group_concat(`f`.`title` separator ', ') AS films,
d.imagePath
FROM current_directors AS d, current_films AS f, films_directors AS fd
WHERE d.id = fd.directorId && f.id = fd.filmId
GROUP BY d.id
ORDER BY name;


CREATE OR REPLACE VIEW film_roles AS
SELECT
f.id AS filmId,
a.id AS actorId,
f.title AS filmtitle,
CONCAT(a.firstName, ' ', a.lastName) AS name,
a.imagePath,
fa.isMainCharacter,
fa.character
FROM current_actors AS a, current_films AS f, films_actors AS fa
WHERE f.id = fa.filmId && a.id = fa.actorId
ORDER BY f.id, fa.isMainCharacter DESC, a.lastname;

CREATE OR REPLACE VIEW person_as_actor AS
SELECT
f.id AS filmId,
a.id AS personId,
f.title,
f.year,
fa.character,
f.imagePath
FROM current_actors AS a, current_films AS f, films_actors AS fa
WHERE f.id = fa.filmId && a.id = fa.actorId
ORDER BY f.year;

CREATE OR REPLACE VIEW person_as_director AS
SELECT
f.id AS filmId,
d.id AS personId,
CONCAT(d.firstName, ' ', d.lastName) AS directorName,
f.title,
f.year,
f.imagePath,
d.imagePath AS directorImage
FROM current_directors AS d, current_films AS f, films_directors AS fd
WHERE f.id = fd.filmId && d.id = fd.directorId
ORDER BY f.year;

CREATE OR REPLACE VIEW film_starring AS
SELECT
f.id,
f.title,
a.id AS actorId,
a.imagePath,
group_concat(DISTINCT a.firstName, ' ', a.lastName separator ', ') AS starring
FROM current_films AS f, current_actors AS a, films_actors AS fa
WHERE f.id = fa.filmId && a.id = fa.actorId
GROUP BY f.id
ORDER BY f.title;

CREATE OR REPLACE VIEW film_directed AS
SELECT
f.id,
f.title,
d.id AS actorId,
d.imagePath,
group_concat(DISTINCT d.firstName, ' ', d.lastName separator ', ') AS director
FROM current_films AS f, current_directors AS d, films_directors AS fa
WHERE f.id = fa.filmId && d.id = fa.directorId
GROUP BY f.id
ORDER BY f.title;

CREATE OR REPLACE VIEW all_films_list AS
SELECT f.*,
(SELECT starring
FROM film_starring
WHERE id = f.id)
AS starring,
(SELECT director
FROM film_directed
WHERE id = f.id)
AS directed,
(SELECT counter
FROM ratings
WHERE id = f.id)
AS ratingCount,
(SELECT avgRating
FROM ratings
WHERE id = f.id)
AS avgRating
FROM current_films AS f
ORDER BY title;


CREATE OR REPLACE VIEW top10_highest AS
SELECT f.id, f.title, f.year, f.imagePath, r.avgRating, r.counter,
(SELECT director
FROM film_directed
WHERE id = f.id)
AS directed,
(SELECT starring
FROM film_starring
WHERE id = f.id)
AS starring
FROM current_films AS f, ratings AS r
WHERE r.id = f.id
ORDER BY avgRating DESC;


CREATE OR REPLACE VIEW top10_lowest AS
SELECT f.id, f.title, f.year, f.imagePath, r.avgRating, r.counter,
(SELECT director
FROM film_directed
WHERE id = f.id)
AS directed,
(SELECT starring
FROM film_starring
WHERE id = f.id)
AS starring
FROM current_films AS f, ratings AS r
WHERE r.id = f.id
ORDER BY avgRating;


CREATE OR REPLACE VIEW all_reviews_list AS
SELECT
f.id,
f.title,
f.imagePath,
r.rating,
r.textbody,
concat(u.firstName, ' ', u.lastName) As username,
u.id AS userId,
r.id AS reviewId,
r.timeCreated
FROM current_films AS f, reviews AS r, users AS u
WHERE f.id = r.filmId && r.changerId = u.id
ORDER BY f.timeCreated DESC;


CREATE OR REPLACE VIEW admin_all_activity AS
SELECT
id,
versionId,
changerId,
imagePath,
concat('Film: ', title) AS field1,
concat('Released: ', year)  AS field2,
concat('Genre: ', genre)  AS field3,
concat('Plot: ', plot)  AS field4,
concat('YouTubeLink: ', youtubeUrl)  AS field5,
timeCreated
FROM films
UNION
SELECT
id,
versionId,
changerId,
imagePath,
concat('Person: ', firstName, ' ', lastName) AS field1,
concat('Birth: ', birth) AS field2,
concat('Death: ', death)  AS field3,
concat('Bio: ', miniBio)  AS field4,
concat('Nationality: ', nationality)  AS field5,
timeCreated FROM persons
UNION
SELECT
id,
null,
changerId,
null,
concat('Review: ', id) AS field1,
concat('Rating: ', rating)  AS field2,
concat('Text: ', textBody)  AS field3,
NULL  AS field4,
NULL  AS field5,
timeCreated
FROM reviews
UNION
SELECT
filmId,
directorId,
changerId,
null,
concat('Changed or Added Actor: ', directorId, ' -> Film: ', filmId) AS field1,
NULL  AS field2,
NULL AS field3,
NULL  AS field4,
NULL  AS field5,
timeCreated
FROM films_directors
UNION
SELECT
filmid,
null,
changerId,
null,
concat('Changed or Added Actor: ', actorId, ' -> Film: ', filmId) AS field1,
NULL  AS field2,
NULL AS field3,
NULL  AS field4,
NULL  AS field5,
timeCreated
FROM films_actors
ORDER BY timeCreated DESC;


/* GLÖM INTE ATT KÖRA: */

SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
