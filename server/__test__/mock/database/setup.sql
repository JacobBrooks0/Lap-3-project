DROP TABLE IF EXISTS Quizzes;

DROP TABLE IF EXISTS Quiz_names;

DROP TABLE IF EXISTS Leaderboards;

DROP TABLE IF EXISTS Languages;

DROP TABLE IF EXISTS token;

DROP TABLE IF EXISTS Users;

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
