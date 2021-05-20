DROP DATABSE IF EXISTS employee_trackerDB;
CREATE DATABSE employee_trackerDB;
USE employee_trackerDB;

CREATE TABLE department (
    id INT AUTO_INCEREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)

);

CREATE TABLE role (
    id INT AUTO_INCEREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(),
    department_id INT NOT NULL,
    PRIMARY KEY (id)

);

CREATE TABLE employee (
    id INT AUTO_INCEREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NULL
    PRIMARY KEY (id)
);