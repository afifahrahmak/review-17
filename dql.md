```sql
SELECT * FROM "Instructors" i ;
SELECT * FROM "Students" s ;
SELECT * FROM "StudentDetails" sd ;

-- nama batch
SELECT DISTINCT("startBatch") FROM "StudentDetails" sd ;
SELECT DISTINCT(name) FROM "Students" s ;

SELECT DISTINCT(name) FROM "Students" s
	ORDER BY name DESC;

SELECT * FROM "Students" s
	JOIN "Instructors" i 
	ON "InstructorId" = i.id ;


-- list student name & buddy name
SELECT s."name", i."name" AS "buddy name" FROM "Students" s
	JOIN "Instructors" i 
	ON "InstructorId" = i.id ;

-- list student name & buddy name dengan nama depan A
SELECT s."name", i."name" AS "buddy name" FROM "Students" s
	JOIN "Instructors" i 
	ON "InstructorId" = i.id 
	WHERE i."name" LIKE 'A%';

SELECT * FROM "Students" s
	WHERE gender = 'male';

SELECT * FROM "StudentDetails" sd ;

-- list nilai test
SELECT DISTINCT "testScore" FROM "StudentDetails" sd ;

-- list student dengan score < 100 (ngambil dulu dari student details)
SELECT * FROM "StudentDetails" sd
	WHERE "testScore" < 100;

-- list nama student saja dengan score < 100
SELECT s.name, sd."testScore" FROM "StudentDetails" sd
	JOIN "Students" s ON "StudentId" = s.id
	WHERE "testScore" < 100;
AGGREGATE FUNCTIONS, GROUP BY, HAVING
-- 1. rata-rata testScore batch oslo-fox
SELECT avg("testScore") FROM "StudentDetails" sd
	WHERE "startBatch" LIKE '%oslo-fox';

-- 2. nama instruktur dan total student buddy-nya, urutkan berdasarkan yang terbanyak
-- i.name
SELECT i.*, count(s.id) AS "total student"
	FROM "Instructors" i 
		JOIN "Students" s ON s."InstructorId" = i.id
	GROUP BY i.id
	ORDER BY "total student" DESC;

-- evaluasi batch 33-oslo-fox (total instruktur, total student, rata-rata score student)
SELECT 	sd."startBatch", 
		count(i.id) AS "instructors", 
		count(s.id) AS "total student", 
		AVG(sd."testScore") AS "score students"
	FROM "Instructors" i 
		JOIN "Students" s ON s."InstructorId" = i.id
		JOIN "StudentDetails" sd ON "StudentId" = s.id
	GROUP BY sd."startBatch";
	HAVING  sd."startBatch" LIKE '33%';
```
