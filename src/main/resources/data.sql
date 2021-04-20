DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS authorities;


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
insert into users(username, password, enabled, id_fakulteta, email)values('javainuse','javainuse',true, 1,
                                                                          'nekimail@gmail.com');
insert into authorities(username,authority)values('javainuse','ROLE_ADMIN');

