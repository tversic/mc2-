DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS authorities;
DROP TABLE IF EXISTS kolegiji;

create table users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username varchar(255) not null ,
       email varchar(255),
       password varchar(255) not null,
       id_fakulteta int,
       enabled boolean
);

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

create table authorities (
         username varchar(50) not null,
         authority varchar(50) not null,
         foreign key (username) references users (username)
);

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

insert into fakulteti(naziv, id) values('TVZ', 1);
insert into users(username, password, enabled, id_fakulteta, email)
    values('bokyfloky', '$2a$10$eY8X2tTV/ysV3KDkT/96SuBU7x.Vnc2lUyT.j1uFCo4i2QTr7yxNy',true, 1,'nekimail@gmail.com');
insert into users(username, password, enabled, id_fakulteta, email)
    values('bbilandzi', '$2a$10$OginvID0.PRHdGr9AM75G.8wf.PQLShaOIg6ESiMV4GsA8Dt1ZsDy',true, 1,'nekimail2@gmail.com');
insert into authorities(username,authority)values('bokyfloky','ROLE_ADMIN');
insert into authorities(username,authority)values('bbilandzi','ROLE_ADMIN');

