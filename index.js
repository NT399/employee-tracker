// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const { resolve } = require('path');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'work_db'
});



//Prompts
function navigator() {
    inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'initial',
        choices: ['View All Employees', 'Add Employee', 'Update Employee', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
      },

    ])
    .then(function(data) {



      switch (data.initial) {
        case'View All Roles':
        connection.query(
          "SELECT role.title AS title, department.name AS department, role.salary AS salary FROM role JOIN department ON role.department_id = department.id;",
          function(err, results) {
            // console.log(results); // results contains rows returned by server
           console.table(results);
           navigator()
          })
          break;

        case'View All Employees':
        connection.query(
          "SELECT employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary AS salary, employee.manager_id as manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;",
          function(err, results) {
            // console.log(results); // results contains rows returned by server
           console.table(results);
           navigator()
          });
          break;

          case'View All Departments':
        connection.query(
          "SELECT * FROM department",
          function(err, results) {
            // console.log(results); // results contains rows returned by server
           console.table(results);
           navigator()
          });
          break;

          case'Add Department':

          inquirer
          .prompt([
            {
              type: 'input',
              name: 'departmentName',
              message: "What is the name of the department?",
            }])
            .then((data1) => {

              console.log ('Added to the data base');
            
              connection.query(
              
                "INSERT INTO department SET ?",{
                 name: data1.departmentName,
                }, function(error){
                  if (error) throw error;
                }

              
              )

              connection.query(
                "SELECT * FROM department",
                function(err, results) {
                  // console.log(results); // results contains rows returned by server
                 console.table(results);
                 navigator()}
              )
              
            })
          
            case'Add Role':


            inquirer
            .prompt([
              {
                type: 'input',
                name: 'roleName',
                message: "What is the name of the role?",
              },
              {
                type: 'input',
                name: 'Salary',
                message: "What is the salary of the role?",
              },
              {
                type: 'list',
                name: 'department',
                message: "Which department does it belong to?",
                choices: [ {
                  name: 'Sales',
                  value: 1,
               },
               {
                  name: 'Engineering',
                  value: 2,
               },
               {
                  name: 'Finance',
                  value: 3,
               },
               {
                name: 'Legal',
                value: 4,
             }             
              ]
                  
              }])
              .then((data1) => {

                console.log ('Added to the data base');
              
                connection.query(
                
                  "INSERT INTO role SET ?",{
                   title: data1.roleName,
                   salary: data1.Salary,
                   department_id:data1.department, 
                  }, function(error){
                    if (error) throw error;
                  })

                connection.query(
                  "SELECT * FROM role",
                  function(err, results) {
                    // console.log(results); // results contains rows returned by server
                   console.table(results);
                   navigator()}
                )
              })


              break;

              case'Add Employee':


              inquirer
              .prompt([
                {
                  type: 'input',
                  name: 'firstName',
                  message: "What is the employee's first name?",
                },
                {
                  type: 'input',
                  name: 'lastName',
                  message: "What is the employee's last name?",
                },
                {
                  type: 'list',
                  name: 'role',
                  message: "What is the employee's role?",
                  choices: [ {
                    name: 'Sales lead',
                    value: 1,
                 },
                 {
                    name: 'Salesperson',
                    value: 2,
                 },
                 {
                    name: 'Lead Engineer',
                    value: 3,
                 },
                 {
                  name: 'Software Engineer',
                  value: 4,
                },
                {
                  name: 'Account Manager',
                  value: 5,
                },                      
                ]   
                },
                {
                  type: 'list',
                  name: 'manager',
                  message: "What is the employee's manager?",
                  choices: [ {
                    name: 'John Doe',
                    value: 1,
                 },
                 {
                    name: 'Ashley Rodriguez',
                    value: 3,
                 },
                 {
                    name: 'Kunal Singh',
                    value: 5,
                 },
                 {
                  name: 'Sarah Lourd',
                  value: 7,
                },                    
                ]   
                }
              ])
                .then((data1) => {
  
                  console.log ('Added to the data base');
                
                  connection.query(
                  
                    "INSERT INTO employee SET ?",{
                     first_name: data1.firstName,
                     last_name: data1.lastName,
                     role_id: data1.role,
                     manager_id:data1.manager, 
                    }, function(error){
                      if (error) throw error;
                    })
  
                  connection.query(
                    "SELECT employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary AS salary, employee.manager_id as manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;",
                    function(err, results) {
                      // console.log(results); // results contains rows returned by server
                     console.table(results);
                     navigator()}
                  )
                })
  
  
                break;
              
                case'Update Employee':


                inquirer
                .prompt([
                  {
                    type: 'list',
                    name: 'name',
                    message: "Which employee do you want to update?",
                    choices: [{
                      name: 'John Doe',
                      value: 1,
                   },
                   {
                    name: 'Mike Chan',
                    value: 2,
                   },
                   {
                      name: 'Ashley Rodriguez',
                      value: 3,
                   },
                   {
                    name: 'Kevin Tupik',
                    value: 4,
                   },
                   {
                      name: 'Kunal Singh',
                      value: 5,
                   },
                   {
                    name: 'Malia Brown',
                    value: 6,
                   },
                   {
                    name: 'Sarah Lourd',
                    value: 7,
                  },       
                  {
                    name: 'Tom Allen',
                    value: 8,
                   },
                    ]
                  },
                  {
                    type: 'list',
                    name: 'role',
                    message: "What is the employee's new role?",
                    choices: [ {
                      name: 'Sales lead',
                      value: 1,
                   },
                   {
                      name: 'Salesperson',
                      value: 2,
                   },
                   {
                      name: 'Lead Engineer',
                      value: 3,
                   },
                   {
                    name: 'Software Engineer',
                    value: 4,
                  },
                  {
                    name: 'Account Manager',
                    value: 5,
                  },
                  {
                    name: 'Accountant',
                    value: 6,
                  },
                  {
                    name: 'Legal Team Lead',
                    value: 7,
                  },
                  {
                    name: 'Lawyer',
                    value: 8,
                  },                         
                  ]   
                  }
                ])
                  .then((data1) => {
    
                    console.log ('Added to the data base');
                  
                    connection.query(
                    
                      `UPDATE employee SET role_id = ${data1.role} WHERE id = ${data1.name};`, 
                      function(error){
                        if (error) throw error;
                      })
    
                    connection.query(
                      "SELECT employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary AS salary, employee.manager_id as manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;",
                      function(err, results) {
                        // console.log(results); // results contains rows returned by server
                       console.table(results);
                       navigator()}
                    )
                  })
    
    
                  break;


      }

    })
  
  
  }


  

// Function to initialize app
function init() {
    navigator()
}


// Function call to initialize app
init();
