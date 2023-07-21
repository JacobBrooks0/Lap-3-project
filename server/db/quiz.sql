DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Languages;
DROP TABLE IF EXISTS Leaderboards;
DROP TABLE IF EXISTS Basicgram_quiz;


CREATE TABLE Users(
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(40) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    score_spanish INT DEFAULT 0,
    score_italian INT DEFAULT 0 ,
    PRIMARY KEY (user_id)
);

CREATE TABLE Languages(
    language_id INT GENERATED ALWAYS AS IDENTITY,
    language_name VARCHAR(30) NOT NULL UNIQUE,
    PRIMARY KEY (language_id)
);

CREATE TABLE Leaderboards(
    leaderboard_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    score_spanish INT NOT NULL,
    score_italian INT NOT NULL ,
    PRIMARY KEY(leaderboard_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
    -- FOREIGN KEY (score_spanish) REFERENCES Users(score_spanish),
    -- FOREIGN KEY (score_italian) REFERENCES Users(score_italian)
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


INSERT INTO Users (username, email, password, score_spanish, score_italian)
VALUES ('Alex', 'alex', 'alex', 20, 50);

INSERT INTO Languages (language_name)
VALUES ('Spanish'), ('Italian');

INSERT INTO Leaderboards (user_id, score_spanish, score_italian)
VALUES (1, 20, 50);

INSERT INTO Basicgram_quizzes (user_id, language_id)
VALUES (1, 1), (1, 2);
