CREATE TABLE Student (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    deptid INT NOT NULL,
    FOREIGN KEY (deptid) REFERENCES Department(id)
);

CREATE TABLE Department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
