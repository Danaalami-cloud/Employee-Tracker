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
      console.log('action', action)
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
          case "add manager id":
          return addManager();
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
    .then((answers) => {
      connection.query("INSERT INTO department SET ?",answers,(err, res) => {
        if (err) throw err;
        console.log(`${answers.name}your department has been added.`);
        initialiseQuestions();
      });
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
    .then((answers) => {
      connection.query("INSERT INTO role SET ?", (err, res) => {
        if (err) throw err;
        console.log(`${action.title}your role has been added.`);
        initialiseQuestions();
      });
    });
}
function addEmployee() {
  const questions = [
    {
      type: "input",
      name: "first_name",
      message: "What is your first name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "what is your last name?",
    },
    {
      type: "input",
      name: "role_id",
      message: "what is the id number for the employee",
    },
    {
      type: "input",
      name: "manager_id",
      message: "what is the id number for the manager",
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    connection.query("INSERT INTO employee SET ?", answers, (err, res) => {
      if (err) throw err;
      console.log(`${answers.name} yay your employee has been added.`);

      initialiseQuestions();
    });
  });
}

function updateEmployee() {
  inquirer.prompt([
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
      connection.query("INSERT INTO employee SET ?", (err, res) => {
        if (err) throw err;
        console.log(`${action.title}your employee has been boosted.`);
        initialiseQuestions();
      });
    }),
  ]);
}

function addManager() {
    inquirer.prompt([
          {
              type: "input",
              name: "id",
              message: "what is your id number",
          },
          {
              type: "input",
              name: "yourname",
              message: "what is your name?",
          },
    ])
    inquirer.prompt(questions).then((answers) => {
        connection.query("INSERT INTO manager SET ?", answers, (err, res) => {
          if (err) throw err;
          console.log(`${answers.title} yay your manager has been added.`);
    
          initialiseQuestions();
        });
      });
    }
