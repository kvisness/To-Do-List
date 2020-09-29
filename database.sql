CREATE TABLE tasklist
(--******Good practice to use NOT NULL after every entry******--
    "id" SERIAL PRIMARY KEY NOT NULL,--keep this explicit to avoid bugs later on
    "request" VARCHAR (200) NOT NULL,
    "status" VARCHAR (100) NOT NULL DEFAULT 'Not Complete', 
    "priority" VARCHAR (100) NOT NULL,
    "due_date" DATE NOT NULL,
    "notes" VARCHAR (1000) NOT NULL--NO COMMA AT THE END OF THE LAST ENTRY
);
-- TO GET TIME STAMPS YOU CAN USE:
--created_at TIMESTAMPNOT NULL DEFAULT CURRENT_TIMESTAMP

--SAMPLE SQL ENTRIES:
    --INSERT INTO "tasks" (task_name) VALUES ('finish this app'); 
    --INSERT INTO "tasks" (task_name, completed) VALUES ('set up the project', true);