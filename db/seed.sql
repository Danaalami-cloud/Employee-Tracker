use employee_trackerDB; 

INSERT INTO department
    (name) 
VALUES 
    ('HR'), ('Finance'),('Marketing')

INSERT INTO role 
    (title, salary, department_id)
VALUES 
    ('HR Executive', 25000, 1), ('HR Consultant', 35000, 1),('Accountant', 25000, 2), ('Marketing Executive', 25000, 3)

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Dennis', 'Dean', 1, NULL),
    ('John', 'Jaconbson', 2, 1)
    ('Ian', 'Isaacson', 2, 1), 
    ('Aaron', 'Aaaronson', 3, NULL),
    ('Isobol', 'Issy', 4, NULL)

   