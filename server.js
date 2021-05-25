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
          "view employees",
          "view roles",
          "view departments",
          "add employee",
          "add role",
          "add department",
          "update employee role",
          "exit app",
        ],
      },
    ])
    .then((action) => {
      console.log("action", action);
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
function viewEmployees() {
  connection.query("SELECT * FROM employee", (err, res) => {
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
function viewDepartments() {
  console.log("View dep called");
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.log(res);
    initialiseQuestions();
  });
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
      connection.query("INSERT INTO department SET ?", answers, (err, res) => {
        if (err) throw err;
        console.log(`${answers.name}your department has been added.`);
        initialiseQuestions();
      });
    });
}
function addRole() {
  connection.query("SELECT * FROM department", (err, res) => {
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
        {
          name: "department_id",
          type: "list",
          choices() {
            return res.map(({ id, name }) => {
              return { name: name, value: id };
            });
          },
          message: "Please choose a department for this role",
        },
      ])
      .then((answers) => {
        connection.query("INSERT INTO role SET ?", answers, (err, res) => {
          if (err) throw err;
          console.log(`${answers.title}your role has been added.`);
          initialiseQuestions();
        });
      });
  });
}
function addEmployee() {
  connection.query(
    "SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id",
    (err, res) => {
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
          type: "list",
          name: "role_id",
          choices() {
            return res.map(({ id, title }) => {
              return { name: title, value: id };
            });
          },
          message: "What is this employees role",
        },
        {
          type: "list",
          name: "manager_id",
          choices() {
            return res.map(({ id, first_name, last_name }) => {
              return { name: first_name + last_name, value: id };
            });
          },
          message: "Who is this employees manager",
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
  );
}
function updateEmployee() {
  connection.query(
    "SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id",
    (err, res) => {
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            choices() {
              return res.map(({ id, first_name, last_name }) => {
                return { name: first_name + last_name, value: id };
              });
            },
            message: "Which employee would you like to update",
          },
          {
            type: "list",
            name: "roleUpdate",
            choices() {
              return res.map(({ id, title }) => {
                return { name: title, value: id };
              });
            },
            message: "which position do you want to boost them to?",
          },
        ])
        .then((answers) => {
          connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [answers.roleUpdate, answers.employee],
            (err, res) => {
              if (err) throw err;
              console.log(` Employee has been boosted.`);
              initialiseQuestions();
            }
          );
        });
    }
  );
}
function exitApp() {
  connection.end();
}
