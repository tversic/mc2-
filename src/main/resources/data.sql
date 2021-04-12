DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS authorities;
DROP TABLE IF EXISTS users;



create table users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username varchar(50) not null ,
       email varchar(120),
       password varchar(255) not null,
       enabled boolean
);

create table authorities (
         username varchar(50) not null,
         authority varchar(50) not null,
         foreign key (username) references users (username)
);

