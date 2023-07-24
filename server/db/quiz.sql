DROP TABLE IF EXISTS Leaderboards;
DROP TABLE IF EXISTS Quiz_names cascade;
DROP TABLE IF EXISTS Quizzes cascade;
DROP TABLE IF EXISTS Users cascade;
DROP TABLE IF EXISTS Languages cascade;
DROP TABLE IF EXISTS token;

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
    FOREIGN KEY (user_id) REFERENCES Users(id)
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


INSERT INTO Users (username, email, password)
VALUES ('Alex', 'alex', 'alex'), ('Roberta', 'roberta', 'roberta');

INSERT INTO Languages (language_name)
VALUES ('Spanish'), ('Italian');

INSERT INTO Quiz_names (quiz_name)
VALUES ('Nouns'), ('Basic Grammar'), ('Foods'), ('Information'), ('Bookings');

INSERT INTO Leaderboards (user_id, score_spanish, score_italian)
VALUES (1,0, 0), (2, 0, 0);

INSERT INTO Quizzes (quiz_id, user_id, beginner_score, intermediate_score, advanced_score, language_id)
VALUES (1, 1, 10, 20, 30, 1), (2, 1, 0, 7, 6, 2), (1, 2, 5, 10, 20, 1), (1, 1, 5, 10, 20, 2), (1, 2, 15, 5, 15, 2),(2, 1, 10, 10, 10, 1);

UPDATE Leaderboards SET score_spanish = (SELECT (SELECT COALESCE(SUM(beginner_score), 0) FROM Quizzes WHERE language_id = 1 AND  user_id = 1) + (SELECT COALESCE(SUM(intermediate_score), 0) FROM Quizzes WHERE language_id = 1 AND  user_id = 1) + (SELECT COALESCE(SUM(advanced_score), 0) FROM Quizzes WHERE language_id = 1 AND  user_id = 1)) WHERE user_id = 1;

-- Easy way of visualising each user
-- SELECT * FROM Quizzes ORDER BY user_id, quiz_id, language_id


--handle the addition of a score in the leaderboards table?
-- UPDATE Employee SET SALARY=CASE WHEN SALARY IS NULL OR SALARY='' THEN '300'  
-- ELSE SALARY+'300' END WHERE EMPLOYEE_ID=2?
