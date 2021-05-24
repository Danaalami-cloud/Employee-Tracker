const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "donthackmebish25!",
  database: "employee_trackerDB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  initialiseQuestions();
});

function initialiseQuestions() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "Hiya!Welcome to our databse, what would you like to do?",
        choices: [
          "view departments",
          "view roles",
          "view employees",
          "add employee",
          "add department",
          "add role",
          "update role of emplyees",
          "exit app",
        ],
      },
    ])
    .then((action) => {
      switch (action.action) {
        case "view departments":
          return viewDepartments();
        case "view employees":
          return viewEmployees();
        case "view roles":
          return viewRoles();
        case "exit app":
          return exitApp();
          case "add department":
          return addDepartment();
          case "add role":
          return addRole();
          case "add employee":
          return addEmployee();
          case "update employee role":
          return updateEmployee();
      }
    });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.log(res);
    initialiseQuestions();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.log(res);
    initialiseQuestions();
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.log(res);
    initialiseQuestions();
  });
}

function exitApp() {
  connection.end();
}

function addDepartment() {
    inquirer
    .prompt([
      {
          type: "input",
          name: "name",
          message: "which depearment do you want to add to this awesome company?",
      },
    ])
    .then((action) => {
        connection.query(
            "INSERT INTO department SET ?",
            (err, res) => {
                if (err) throw err;
                console.log(`${action.name}your department has been added.`);
                initialiseQuestions();

            }
        );
    });
}

function addRole() {
inquirer
.prompt([
{
   type: "input",
   name: "title",
   message: "What is the title of the role you want to add?",
},
{
    type: "input",
    name: "salary",
    message: "How many zeroes are you adding to this role?", 
},
])
.then((action) => {
    connection.query(
        "INSERT INTO role SET ?",
        (err, res) => {
            if (err) throw err;
            console.log(`${action.title}your role has been added.`);
            initialiseQuestions();

        }
    );
});
}
function addEmployee() {
    inquirer.
    prompt([
        {
            type: "input",
            name: "first name",
            message: "What is your first name?",
        },
        {
            type: "input",
            name: "last name",
            message: "what is your last name?", 
        },
        {
            type: "input",
            name: "roleId",
            message: "what is the id number for the employee",
        },
        {
            type: "input",
            name: "managerID",
            message: "what is the id number for the manager",
        },

        connection.query(
            "INSERT INTO employee SET ?",
            (err, res) => {
                if (err) throw err;
                console.log(`${action.title} yay your employee has been added.`);
                initialiseQuestions();
    
            }
        ),
    ]);
}

function updateEmployee() {
    inquirer.
    prompt([
        {
        type: "input",
        name: "employeeUpdate",
        message: "which employee do you want to boost?",
        },
        {
            type: "input",
            name: "roleUpdate",
            message: "which position do you want to boost them to?",
        },
        then((action) => {
            connection.query(
                "INSERT INTO updateEmployee SET ?",
                (err, res) => {
                    if (err) throw err;
                    console.log(`${action.title}your employee has been boosted.`);
                    initialiseQuestions();
         
                }
                );
            }),
        ]);
    };
/*
function manageAll() {
    const query = 'SELECT * FROM'
    inquirer.prompt({
        type:"input",
        name: "All",
        message: "what do you want to manage?",
        choices: "role","departments", "employees";
    })
}

function viewRoles(){
    inquirer.prompt({
        type:"input",
        name: "roles",
        message: "what role do you want to see?",
}

function viewEmployeess() {
    inquirer.prompt({
        type:"input",
        name: "employees",
        message: "what employees do you want to see?",
}

function deleteAll () {
    inquirer.prompt({
        type:"input";
        name: "delete";
        message: "whoud you like to delete all of your campnay's data?";
}

function updateEmployees() {

}

function exitApp() {

}
*/
