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
          "Add employee",
          "add department",
          "add role",
          "update role of emplyees",
          "exit app",
        ],
      },
    ])
    .then((action) => {
      switch (action.action){

          case "view departments":
              return viewDepartments();
            }
            });
        }

function viewDepartments(){
   connection.query("SELECT * FROM department", (err, res) => {
       if(err) throw err;
       console.log(res)
   })
}
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
