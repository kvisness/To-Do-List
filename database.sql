CREATE TABLE books
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "title" VARCHAR (250) NOT NULL,
    "author" VARCHAR (100) NOT NULL,
    "published" DATE,
    "status" VARCHAR (80) DEFAULT 'Want to Read'
);