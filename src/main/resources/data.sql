//DROP TABLE IF EXISTS users;
/*DROP TABLE IF EXISTS authorities;
DROP TABLE IF EXISTS kolegiji cascade;
DROP TABLE IF EXISTS tag cascade;*/

create table IF NOT EXISTS users (
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

create table IF NOT EXISTS authorities (
         username varchar(50) not null,
         authority varchar(50) not null,
         foreign key (username) references users (username)
);

CREATE TABLE IF NOT EXISTS kolegiji(
     id INT NOT NULL AUTO_INCREMENT,
     naziv VARCHAR(255) NOT NULL,
    idFakulteta INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT idFaksa
    FOREIGN KEY (idFakulteta)
    REFERENCES fakulteti (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
create INDEX idFaksa_idx on kolegiji(id ASC);

CREATE TABLE IF NOT EXISTS teme (
     id_teme INT NOT NULL AUTO_INCREMENT,
     naslov VARCHAR(255) NOT NULL,
     datumKreiranja DATE NOT NULL,
     kolegij_id INT NULL,
     PRIMARY KEY (id_teme),
     CONSTRAINT fk_teme_kolegiji1
         FOREIGN KEY (kolegij_id)
             REFERENCES kolegiji (id)
             ON DELETE NO ACTION
             ON UPDATE NO ACTION
);
//create INDEX fk_teme_kolegiji1_idx on teme(kolegij_id ASC);

CREATE TABLE IF NOT EXISTS komentari (
    id INT NOT NULL AUTO_INCREMENT,
    id_teme INT NOT NULL,
    idUser INT NOT NULL,
    idParent INT NULL,
    Content VARCHAR(280) NOT NULL,
    datumKreiranja DATE NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_komentari_teme
    FOREIGN KEY (id_teme)
    REFERENCES teme (id_teme)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
//create INDEX fk_komentari_teme_idx on komentari(id_teme ASC);

CREATE TABLE IF NOT EXISTS tag
(
    id_tag INT NOT NULL,
    Naziv VARCHAR(45) NOT NULL,
    PRIMARY KEY (id_tag)
);

CREATE TABLE IF NOT EXISTS kolegiji_has_Tag
(
    kolegiji_id INT NOT NULL,
    Tag_idTag INT NOT NULL,
    PRIMARY KEY (kolegiji_id, Tag_idTag),
    CONSTRAINT fk_kolegiji_has_Tag_kolegiji1
    FOREIGN KEY (kolegiji_id)
    REFERENCES kolegiji (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT fk_kolegiji_has_Tag_Tag1
    FOREIGN KEY (Tag_idTag)
    REFERENCES Tag (id_tag  )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
create INDEX fk_kolegiji_has_Tag_Tag1_idx on kolegiji_has_Tag(Tag_idTag ASC);
create INDEX fk_kolegiji_has_Tag_kolegiji1_idx on kolegiji_has_Tag(kolegiji_id ASC);

CREATE TABLE IF NOT EXISTS Room (
    id_room VARCHAR(30) NOT NULL,
    id_kolegij INT NOT NULL,
    StartTime DATETIME NOT NULL,
    EndTime DATETIME NOT NULL,
    PRIMARY KEY (id_room),
    CONSTRAINT kolegiji_id
    FOREIGN KEY (id_kolegij)
    REFERENCES kolegiji (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Room_has_users (
    Room_idRoom VARCHAR(30) NOT NULL,
    users_id INT NOT NULL,
    PRIMARY KEY (Room_idRoom, users_id),
    CONSTRAINT fk_Room_has_users_Room1
    FOREIGN KEY (Room_idRoom)
    REFERENCES Room (id_room)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT fk_Room_has_users_users1
    FOREIGN KEY (users_id)
    REFERENCES users (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
create INDEX fk_Room_has_users_users1_idx on Room_has_users(users_id ASC);
create INDEX fk_Room_has_users_Room1_idx on Room_has_users(Room_idRoom ASC);
create INDEX kolegiji_id_idx on Room(id_kolegij ASC);

insert into fakulteti(naziv, id) values('TVZ', 1);
insert into users(username, password, enabled, id_fakulteta, email)
    values('bokyfloky', '$2a$10$eY8X2tTV/ysV3KDkT/96SuBU7x.Vnc2lUyT.j1uFCo4i2QTr7yxNy',true, 1,'nekimail@gmail.com');
insert into users(username, password, enabled, id_fakulteta, email)
    values('bbilandzi', '$2a$10$OginvID0.PRHdGr9AM75G.8wf.PQLShaOIg6ESiMV4GsA8Dt1ZsDy',true, 1,'nekimail2@gmail.com');
insert into authorities(username,authority)values('bokyfloky','ROLE_ADMIN');
insert into authorities(username,authority)values('bbilandzi','ROLE_ADMIN');



