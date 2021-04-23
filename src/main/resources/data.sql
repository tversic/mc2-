DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS authorities;
DROP TABLE IF EXISTS kolegiji;

CREATE TABLE employee (
      empId VARCHAR(10) NOT NULL,
      empName VARCHAR(100) NOT NULL
);

create table users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username varchar(255) not null ,
       email varchar(255),
       password varchar(255) not null,
       id_fakulteta int not null,
       enabled boolean
);

create table authorities (
         username varchar(50) not null,
         authority varchar(50) not null,
         foreign key (username) references users (username)
);
insert into users(username, password, enabled, id_fakulteta, email)
            values('javainuse','javainuse',true, 1,'nekimail@gmail.com');
insert into authorities(username,authority)values('javainuse','ROLE_ADMIN');

CREATE TABLE kolegiji (
      id int NOT NULL AUTO_INCREMENT,
      naziv varchar(255) DEFAULT NULL,
      PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS teme (
     idteme INT NOT NULL AUTO_INCREMENT,
     naslov VARCHAR(255) NOT NULL,
     datumKreiranja DATE NOT NULL,
     kolegijId INT NULL,
     PRIMARY KEY (idteme),
     CONSTRAINT fk_teme_kolegiji1
         FOREIGN KEY (kolegijId)
             REFERENCES kolegiji (id)
             ON DELETE NO ACTION
             ON UPDATE NO ACTION
);
create INDEX fk_teme_kolegiji1_idx on teme(kolegijId ASC);

CREATE TABLE IF NOT EXISTS komentari (
      id INT NOT NULL AUTO_INCREMENT,
      idTeme INT NOT NULL,
      PRIMARY KEY (id),

      CONSTRAINT fk_komentari_teme
          FOREIGN KEY (idTeme)
              REFERENCES teme (idteme)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION
);
create INDEX fk_komentari_teme_idx on komentari(idTeme ASC);

CREATE TABLE IF NOT EXISTS fakulteti (
      naziv VARCHAR(255) NULL,
      id INT NOT NULL,
      PRIMARY KEY (id),
      CONSTRAINT fk_fakulteti_users1
          FOREIGN KEY (id)
              REFERENCES users (id_fakulteta)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS kolegiji_has_fakulteti(
   kolegiji_id INT NOT NULL,
   fakulteti_id INT NOT NULL,
   PRIMARY KEY (kolegiji_id, fakulteti_id),
   CONSTRAINT fk_kolegiji_has_fakulteti_kolegiji1
       FOREIGN KEY (kolegiji_id)
           REFERENCES kolegiji (id)
           ON DELETE NO ACTION
           ON UPDATE NO ACTION,
   CONSTRAINT fk_kolegiji_has_fakulteti_fakulteti1
       FOREIGN KEY (fakulteti_id)
           REFERENCES fakulteti (id)
           ON DELETE NO ACTION
           ON UPDATE NO ACTION
);
create INDEX fk_kolegiji_has_fakulteti_fakulteti1_idx on kolegiji_has_fakulteti(fakulteti_id ASC);
create INDEX fk_kolegiji_has_fakulteti_kolegiji1_idx on kolegiji_has_fakulteti(kolegiji_id ASC);