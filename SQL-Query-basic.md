
```sql
CREATE TABLE IF NOT EXISTS "Instructors" (
   id SERIAL PRIMARY KEY,
   name VARCHAR,
   "discordNitro" BOOLEAN,
   gender VARCHAR
);

CREATE TABLE IF NOT EXISTS "Students" (
   id SERIAL PRIMARY KEY,
   name VARCHAR,
   "bornYear" INTEGER,
   gender VARCHAR,
   "InstructorId" INTEGER,
   FOREIGN KEY ("InstructorId")
   		REFERENCES "Instructors"(id)
);

INSERT INTO "Instructors" (name, "discordNitro", gender)
VALUES ('Ayu', TRUE, 'female');

INSERT INTO "Instructors" (name, "discordNitro", gender)
VALUES ('Afifah',true,'female'),
	   ('Arrizal',false,'male'),
	   ('Idaz',false,'male'),
	   ('Josep',true,'male'),
	   ('Timothy',false,'male');
	  
INSERT INTO "Students" (name, "bornYear", gender, "InstructorId")
VALUES ('Acong', 1995, 'male', 1),
	   ('Cici', 1999, 'female', 2),
	   ('Charlie', 1998, 'male', 3),
	   ('Cacing', 1996, 'male', 4),
	   ('Joko', 1992, 'male', 5),
	   ('Bambang', 1990, 'male', 6),
	   ('Budi', 1993, 'male', 1),
	   ('Adel', 2000, 'female', 3),
	   ('Juned', 1997, 'male', 2);

SELECT * FROM "Instructors" AS i;
SELECT * FROM "Students" AS s 
	ORDER BY id ASC;

UPDATE "Students" 
	SET name = 'Daniel',
		"bornYear" = 1997
	WHERE name = 'Cacing';

UPDATE "Students" 
	SET name = 'Cacing'
	WHERE "id" = 4;

INSERT INTO "Students" (name, "bornYear", gender, "InstructorId")
VALUES ('Daniel', 1995, 'male', 6);

DELETE FROM "Students" WHERE id = 10;

-- LIKE

SELECT * FROM "Students" s 
	WHERE name LIKE '%c%';

SELECT * FROM "Students" s 
	WHERE name LIKE '___i';

-- ORDER 
SELECT * FROM "Students" AS s 
	ORDER BY name DESC;

-- WHERE (= < <= > >= != , LIKE, BETWEEN, AND, OR)

SELECT * FROM "Students" s 
	WHERE "InstructorId" < 5;

SELECT * FROM "Students" s 
	WHERE "bornYear" BETWEEN 1995 AND 2000;
-- >= 1995 <= 2000

SELECT  * FROM "Students" s 
	WHERE name LIKE 'C%' OR "bornYear" = 2000;
```
