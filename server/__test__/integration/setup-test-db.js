//Test database environment 
require("dotenv").config();
const db = require ('../../db/connect');

//create the "Users" table in the test database
const createDbEnv = async () => {
    await db.query(`
    CREATE TABLE Users(
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(40) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);
CREATE TABLE token(
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Languages(
    language_id INT GENERATED ALWAYS AS IDENTITY,
    language_name VARCHAR(30) NOT NULL UNIQUE,
    PRIMARY KEY (language_id)
);

CREATE TABLE Leaderboards(
    user_id INT NOT NULL,
    score_spanish INT NOT NULL DEFAULT 0,
    score_italian INT NOT NULL DEFAULT 0,
    rank INT NOT NULL DEFAULT 1,
    PRIMARY KEY(user_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Quiz_names(
	quiz_id INT GENERATED ALWAYS AS IDENTITY,
	quiz_name VARCHAR(30) NOT NULL UNIQUE,
	PRIMARY KEY (quiz_id)
);

CREATE TABLE Quizzes(
    quiz_instance INT GENERATED ALWAYS AS IDENTITY,
	quiz_id INT NOT NULL,
	user_id INT NOT NULL,
	beginner_score INT NOT NULL DEFAULT 0,
	intermediate_score INT NOT NULL DEFAULT 0,
	advanced_score INT NOT NULL DEFAULT 0,
	language_id INT NOT NULL,
	PRIMARY KEY (quiz_instance),
	FOREIGN KEY (quiz_id) REFERENCES Quiz_names(quiz_id),
	FOREIGN KEY (user_id) REFERENCES Users(user_id),
	FOREIGN KEY (language_id) REFERENCES Languages(language_id)
);

`);
};
 //populates the "Users" table in the test database with some initial data
const populateDbEnv = async () => {
    // Insert data into the "Users" table
    await db.query("INSERT INTO Users (username, email, password) VALUES ('Mike', 'mike@gmail.com', 'hello')");
    await db.query("INSERT INTO Users (username, email, password) VALUES ('Sofia', 'sofia@gmail.com', 'ciao')");

    // Insert data into the "Languages" table
    await db.query("INSERT INTO Languages (language_name) VALUES ('English')");
    await db.query("INSERT INTO Languages (language_name) VALUES ('Spanish')");
    await db.query("INSERT INTO Languages (language_name) VALUES ('Italian')");

    // Insert data into the "Quiz_names" table
    await db.query("INSERT INTO Quiz_names (quiz_name) VALUES ('Beginner Quiz')");
    await db.query("INSERT INTO Quiz_names (quiz_name) VALUES ('Intermediate Quiz')");
    await db.query("INSERT INTO Quiz_names (quiz_name) VALUES ('Advanced Quiz')");

    // Insert data into the "Quizzes" table
    await db.query("INSERT INTO Quizzes (quiz_id, user_id, beginner_score, intermediate_score, advanced_score, language_id) VALUES (1, 1, 10, 15, 20, 1)");
    await db.query("INSERT INTO Quizzes (quiz_id, user_id, beginner_score, intermediate_score, advanced_score, language_id) VALUES (2, 2, 5, 12, 18, 2)");

    // Insert data into the "Leaderboards" table
    await db.query("INSERT INTO Leaderboards (user_id, score_spanish, score_italian, rank) VALUES (1, 100, 120, 1)");
    await db.query("INSERT INTO Leaderboards (user_id, score_spanish, score_italian, rank) VALUES (2, 80, 110, 2)");

    // Insert data into the "token" table
    await db.query("INSERT INTO token (user_id, token) VALUES (1, 'tok123')");
    await db.query("INSERT INTO token (user_id, token) VALUES (2, 'tok456')");


}//cleaning up the test environment by dropping the "Users" table from the test database.
const destroyDbEnv = async () => {
    await db.query(`
        DROP TABLE IF EXISTS Quizzes;
        DROP TABLE IF EXISTS Quiz_names;
        DROP TABLE IF EXISTS Leaderboards;
        DROP TABLE IF EXISTS Languages;
        DROP TABLE IF EXISTS token;
        DROP TABLE IF EXISTS Users;`)
};

module.exports = { createDbEnv, populateDbEnv, destroyDbEnv };
