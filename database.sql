CREATE TABLE tasklist
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "request" VARCHAR (200) NOT NULL,
    "status" VARCHAR (100) DEFAULT 'Not Complete',
    "priority" VARCHAR (100) NOT NULL,
    "due_date" DATE,
    "notes" VARCHAR (1000) NOT NULL
);