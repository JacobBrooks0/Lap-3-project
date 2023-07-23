DROP TABLE IF EXISTS Leaderboards;
DROP TABLE IF EXISTS Basicgram_quizzes;
DROP TABLE IF EXISTS Nouns_quizzes;
DROP TABLE IF EXISTS Foods_quizzes;
DROP TABLE IF EXISTS Bookings_quizzes;
DROP TABLE IF EXISTS Info_quizzes;
DROP TABLE IF EXISTS Users cascade;
DROP TABLE IF EXISTS Languages cascade;


CREATE TABLE Users(
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(40) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    -- score_spanish INT DEFAULT 0,
    -- score_italian INT DEFAULT 0 ,
    PRIMARY KEY (user_id)
);

CREATE TABLE Languages(
    language_id INT GENERATED ALWAYS AS IDENTITY,
    language_name VARCHAR(30) NOT NULL UNIQUE,
    PRIMARY KEY (language_id)
);

CREATE TABLE Leaderboards(
    -- leaderboard_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    score_spanish INT NOT NULL DEFAULT 0,
    score_italian INT NOT NULL DEFAULT 0,
    PRIMARY KEY(user_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Basicgram_quizzes(
    quiz_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    has_completed BOOLEAN DEFAULT FALSE,
    score INT NOT NULL DEFAULT 0,
    language_id INT NOT NULL,
    PRIMARY KEY(quiz_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (language_id) REFERENCES Languages(language_id)   
);

CREATE TABLE Nouns_quizzes(
    quiz_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    has_completed BOOLEAN DEFAULT FALSE,
    score INT NOT NULL DEFAULT 0,
    language_id INT NOT NULL,
    PRIMARY KEY(quiz_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (language_id) REFERENCES Languages(language_id)   
);

CREATE TABLE Foods_quizzes(
    quiz_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    has_completed_beginner BOOLEAN DEFAULT FALSE,
    has_completed_intermediate BOOLEAN DEFAULT FALSE,
    has_completed_advanced BOOLEAN DEFAULT FALSE,
    beginner_score INT NOT NULL DEFAULT 0,
    intermediate_score INT NOT NULL DEFAULT 0,
    advanced_score INT NOT NULL DEFAULT 0,
    language_id INT NOT NULL,
    PRIMARY KEY(quiz_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (language_id) REFERENCES Languages(language_id)   
);

CREATE TABLE Bookings_quizzes(
    quiz_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    has_completed_beginner BOOLEAN DEFAULT FALSE,
    has_completed_intermediate BOOLEAN DEFAULT FALSE,
    has_completed_advanced BOOLEAN DEFAULT FALSE,
    beginner_score INT NOT NULL DEFAULT 0,
    intermediate_score INT NOT NULL DEFAULT 0,
    advanced_score INT NOT NULL DEFAULT 0,
    language_id INT NOT NULL,
    PRIMARY KEY(quiz_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (language_id) REFERENCES Languages(language_id)   
);

CREATE TABLE Info_quizzes(
    quiz_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    has_completed_beginner BOOLEAN DEFAULT FALSE,
    has_completed_intermediate BOOLEAN DEFAULT FALSE,
    has_completed_advanced BOOLEAN DEFAULT FALSE,
    beginner_score INT NOT NULL DEFAULT 0,
    intermediate_score INT NOT NULL DEFAULT 0,
    advanced_score INT NOT NULL DEFAULT 0,
    language_id INT NOT NULL,
    PRIMARY KEY(quiz_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (language_id) REFERENCES Languages(language_id)   
);


INSERT INTO Users (username, email, password)
VALUES ('Alex', 'alex', 'alex'), ('Roberta', 'roberta', 'roberta');

INSERT INTO Languages (language_name)
VALUES ('Spanish'), ('Italian');

INSERT INTO Leaderboards (user_id, score_spanish, score_italian)
VALUES (1,0, 0), (2, 0, 0);

INSERT INTO Basicgram_quizzes (user_id, score, language_id)
VALUES (1, 20, 1), (1, 10, 2), (2, 60, 1), (2, 30, 2);

INSERT INTO Nouns_quizzes (user_id,score, language_id)
VALUES (1, 20, 1), (1, 10, 2), (2, 20, 1);

INSERT INTO Foods_quizzes (user_id, beginner_score, language_id)
VALUES (1, 20, 1), (1, 10, 2), (2, 100, 1), (2, 30, 2);

INSERT INTO Bookings_quizzes (user_id, intermediate_score, language_id)
VALUES (1, 20, 1), (1, 10, 2), (2, 5, 1), (2, 30, 2);

INSERT INTO Info_quizzes (user_id, advanced_score, language_id)
VALUES (1, 20, 1), (1, 10, 2), (2, 20, 1), (2, 30, 2);

-- queries to update the leaderboards table spanish
-- user 1
UPDATE Leaderboards SET score_spanish = (SELECT (SELECT COALESCE(SUM(score), 0) FROM basicgram_quizzes WHERE language_id = 1 AND  user_id =1) + (SELECT COALESCE(SUM(score), 0) FROM nouns_quizzes WHERE language_id = 1 AND  user_id =1) + (SELECT COALESCE(SUM(beginner_score), 0) FROM foods_quizzes WHERE language_id = 1 AND  user_id =1) + (SELECT COALESCE(SUM(intermediate_score), 0) FROM foods_quizzes WHERE language_id = 1 AND  user_id =1) + (SELECT COALESCE(SUM(advanced_score), 0) FROM foods_quizzes WHERE language_id = 1 AND  user_id =1) + (SELECT COALESCE(SUM(beginner_score), 0) FROM bookings_quizzes WHERE language_id = 1 AND  user_id =1) + (SELECT COALESCE(SUM(intermediate_score), 0) FROM bookings_quizzes WHERE language_id = 1 AND  user_id =1) + (SELECT COALESCE(SUM(advanced_score), 0) FROM bookings_quizzes WHERE language_id = 1 AND  user_id =1) + (SELECT COALESCE(SUM(beginner_score), 0) FROM info_quizzes WHERE language_id = 1 AND  user_id =1) + (SELECT COALESCE(SUM(intermediate_score), 0) FROM info_quizzes WHERE language_id = 1 AND  user_id =1) + (SELECT COALESCE(SUM(advanced_score), 0) FROM info_quizzes WHERE language_id = 1 AND  user_id =1) WHERE user_id = 1) WHERE user_id = 1;
--user 2
UPDATE Leaderboards SET score_spanish = (SELECT (SELECT COALESCE(SUM(score), 0) FROM basicgram_quizzes WHERE language_id = 1 AND  user_id =2) + (SELECT COALESCE(SUM(score), 0) FROM nouns_quizzes WHERE language_id = 1 AND  user_id =2) + (SELECT COALESCE(SUM(beginner_score), 0) FROM foods_quizzes WHERE language_id = 1 AND  user_id =2) + (SELECT COALESCE(SUM(intermediate_score), 0) FROM foods_quizzes WHERE language_id = 1 AND  user_id =2) + (SELECT COALESCE(SUM(advanced_score), 0) FROM foods_quizzes WHERE language_id = 1 AND  user_id =2) + (SELECT COALESCE(SUM(beginner_score), 0) FROM bookings_quizzes WHERE language_id = 1 AND  user_id =2) + (SELECT COALESCE(SUM(intermediate_score), 0) FROM bookings_quizzes WHERE language_id = 1 AND  user_id =2) + (SELECT COALESCE(SUM(advanced_score), 0) FROM bookings_quizzes WHERE language_id = 1 AND  user_id =2) + (SELECT COALESCE(SUM(beginner_score), 0) FROM info_quizzes WHERE language_id = 1 AND  user_id =2) + (SELECT COALESCE(SUM(intermediate_score), 0) FROM info_quizzes WHERE language_id = 1 AND  user_id =2) + (SELECT COALESCE(SUM(advanced_score), 0) FROM info_quizzes WHERE language_id = 1 AND  user_id =2) WHERE user_id = 2) WHERE user_id = 2;

--queries to update the leaderboards table italian
-- user 1
UPDATE Leaderboards SET score_italian = (SELECT (SELECT COALESCE(SUM(score), 0) FROM basicgram_quizzes WHERE language_id = 2 AND  user_id =1) + (SELECT COALESCE(SUM(score), 0) FROM nouns_quizzes WHERE language_id = 2 AND  user_id =1) + (SELECT COALESCE(SUM(beginner_score), 0) FROM foods_quizzes WHERE language_id = 2 AND  user_id =1) + (SELECT COALESCE(SUM(intermediate_score), 0) FROM foods_quizzes WHERE language_id = 2 AND  user_id =1) + (SELECT COALESCE(SUM(advanced_score), 0) FROM foods_quizzes WHERE language_id = 2 AND  user_id =1) + (SELECT COALESCE(SUM(beginner_score), 0) FROM bookings_quizzes WHERE language_id = 2 AND  user_id =1) + (SELECT COALESCE(SUM(intermediate_score), 0) FROM bookings_quizzes WHERE language_id = 2 AND  user_id =1) + (SELECT COALESCE(SUM(advanced_score), 0) FROM bookings_quizzes WHERE language_id = 2 AND  user_id =1) + (SELECT COALESCE(SUM(beginner_score), 0) FROM info_quizzes WHERE language_id = 2 AND  user_id =1) + (SELECT COALESCE(SUM(intermediate_score), 0) FROM info_quizzes WHERE language_id = 2 AND  user_id =1) + (SELECT COALESCE(SUM(advanced_score), 0) FROM info_quizzes WHERE language_id = 2 AND  user_id =1) WHERE user_id = 1) WHERE user_id = 1;
--user 2
UPDATE Leaderboards SET score_italian = (SELECT (SELECT COALESCE(SUM(score), 0) FROM basicgram_quizzes WHERE language_id = 2 AND  user_id =2) + (SELECT COALESCE(SUM(score), 0) FROM nouns_quizzes WHERE language_id = 2 AND  user_id =2) + (SELECT COALESCE(SUM(beginner_score), 0) FROM foods_quizzes WHERE language_id = 2 AND  user_id =2) + (SELECT COALESCE(SUM(intermediate_score), 0) FROM foods_quizzes WHERE language_id = 2 AND  user_id =2) + (SELECT COALESCE(SUM(advanced_score), 0) FROM foods_quizzes WHERE language_id = 2 AND  user_id =2) + (SELECT COALESCE(SUM(beginner_score), 0) FROM bookings_quizzes WHERE language_id = 2 AND  user_id =2) + (SELECT COALESCE(SUM(intermediate_score), 0) FROM bookings_quizzes WHERE language_id = 2 AND  user_id =2) + (SELECT COALESCE(SUM(advanced_score), 0) FROM bookings_quizzes WHERE language_id = 2 AND  user_id =2) + (SELECT COALESCE(SUM(beginner_score), 0) FROM info_quizzes WHERE language_id = 2 AND  user_id =2) + (SELECT COALESCE(SUM(intermediate_score), 0) FROM info_quizzes WHERE language_id = 2 AND  user_id =2) + (SELECT COALESCE(SUM(advanced_score), 0) FROM info_quizzes WHERE language_id = 2 AND  user_id =2) WHERE user_id = 2) WHERE user_id = 2;

--old way of updating leaderboards table
-- UPDATE Leaderboards SET (score_spanish, score_italian) = (SELECT score_spanish, score_italian FROM Users WHERE Users.user_id = Leaderboards.user_id);
