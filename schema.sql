DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

USE test;

CREATE TABLE IF NOT EXISTS items (
  id int NOT NULL AUTO_INCREMENT,
  content varchar(256) NOT NULL,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
