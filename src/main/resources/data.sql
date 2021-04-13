DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS authorities;


CREATE TABLE employee (
      empId VARCHAR(10) NOT NULL,
      empName VARCHAR(100) NOT NULL
);

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
insert into users(username, password, enabled)values('javainuse','javainuse',true);
insert into authorities(username,authority)values('javainuse','ROLE_ADMIN');

