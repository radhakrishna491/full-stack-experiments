const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Load data
let employees = JSON.parse(fs.readFileSync("data.json"));

function saveData() {
  fs.writeFileSync("data.json", JSON.stringify(employees, null, 2));
}

function menu() {
  console.log(`
Employee Management System
1. Add Employee
2. List Employees
3. Update Employee
4. Delete Employee
5. Exit
`);

  rl.question("Select option: ", choice => {
    if (choice == 1) addEmployee();
    else if (choice == 2) listEmployees();
    else if (choice == 3) updateEmployee();
    else if (choice == 4) deleteEmployee();
    else rl.close();
  });
}

function addEmployee() {
  rl.question("Name: ", name => {
    rl.question("Position: ", pos => {
      rl.question("Salary: ", sal => {

        if (!name || !pos || isNaN(sal)) {
          console.log("Invalid input!");
          return menu();
        }

        const emp = {
          id: Date.now(),
          name,
          pos,
          salary: Number(sal)
        };

        employees.push(emp);
        saveData();

        console.log("✅ Employee Added!");
        menu();
      });
    });
  });
}

function listEmployees() {
  console.log("\n📋 Employee List:");

  if (employees.length === 0) {
    console.log("No employees found.");
  } else {
    employees.forEach(e => {
      console.log(`${e.id} | ${e.name} | ${e.pos} | ₹${e.salary}`);
    });
  }

  menu();
}

function updateEmployee() {
  rl.question("Enter ID: ", id => {
    let emp = employees.find(e => e.id == id);

    if (!emp) {
      console.log("Employee not found!");
      return menu();
    }

    rl.question("New Name: ", name => {
      rl.question("New Position: ", pos => {
        rl.question("New Salary: ", sal => {

          emp.name = name || emp.name;
          emp.pos = pos || emp.pos;
          emp.salary = sal ? Number(sal) : emp.salary;

          saveData();
          console.log("✏️ Updated!");
          menu();
        });
      });
    });
  });
}

function deleteEmployee() {
  rl.question("Enter ID: ", id => {
    employees = employees.filter(e => e.id != id);
    saveData();
    console.log("🗑️ Deleted!");
    menu();
  });
}

menu();
