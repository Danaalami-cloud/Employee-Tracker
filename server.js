const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'donthackmebish25!',
    database: 'employee_trackerDB',
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
  connection.end();
});

const questions = () => {
return inquirer.prompt([
    {
        name: 'action',
        type: 'list',
        message: 'Hiya!Welcome to our databse, what would you like to do?',
        choices: ['manage roles,department, and employees', 'view department', 'view roles', 'view employees', 'delete all of them', 'update role of emplyees' ,'exit app']
    }
])
.then((answer)) => {
switch (answer.action){
    case 'manage roles, department,and employees':
        manageAll();
    case 'view departments':
        viewDepartments();
    case 'view roles':
            viewRoles();
    case 'view employees':
            viewEmployeess();
            case 'delete all of them':
                deleteAll();
                case 'update role of employees':
                    updateEmployees();
                    case 'Exit app':
                        exitApp();

}
}
};

function manageAll() {
    const query = 'SELECT * FROM'
    inquirer.prompt({
        type:"input";
        name: "All";
        message: "what do you want to manage?";
        choices: "role","departments", "employees";
    })
}

function viewDepartments(){
    inquirer.prompt({
        type:"input",
        name: "departments",
        message: "what department do you want to view?",
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