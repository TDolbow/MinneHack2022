CREATE DATABASE siterating;

USE siterating;

CREATE USER 'hackathon'@'localhost' IDENTIFIED BY 'pineapples';

FLUSH PRIVILEGES;

GRANT ALL PRIVILEGES ON siterating.* TO 'hackathon'@'localhost';

FLUSH PRIVILEGES;

CREATE TABLE Users(
	UUID smallint(8) unsigned NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (UUID)
);

CREATE TABLE Ratings(
	UUID smallint(8) unsigned NOT NULL,
	domain varchar(1000) NOT NULL,
	page varchar(1000),
	vote boolean NOT NULL, 
	FOREIGN KEY (UUID) REFERENCES Users(UUID)
);

CREATE TABLE Comments(
	UUID smallint(8) unsigned NOT NULL,
	domain varchar(1000) NOT NULL,
	page varchar(1000),
	comment varchar(1000) NOT NULL, 
	FOREIGN KEY (UUID) REFERENCES Users(UUID)
);