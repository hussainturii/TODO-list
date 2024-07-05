import inquirer from "inquirer";

type Task = {
  id: number;
  description: string;
};

let tasks: Task[] = [];
let nextId = 1;

function addTask(description: string): void {
  tasks.push({ id: nextId++, description });
  console.log("Task added.");
}

function updateTask(id: number, description: string): void {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.description = description;
    console.log("Task updated.");
  } else {
    console.log("Task not found.");
  }
}

function deleteTask(id: number): void {
  tasks = tasks.filter((task) => task.id !== id);
  console.log("Task deleted.");
}

function displayTasks(): void {
  console.log("\nYour To-Do List:");
  tasks.forEach((task) => {
    console.log(`${task.id}. ${task.description}`);
  });
}

async function main() {
  let exit = false;

  while (!exit) {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "Add Task",
          "Update Task",
          "Delete Task",
          "View Tasks",
          "Exit",
        ],
      },
    ]);

    switch (answers.action) {
      case "Add Task":
        const addAnswer = await inquirer.prompt([
          {
            type: "input",
            name: "description",
            message: "Enter the task description:",
          },
        ]);
        addTask(addAnswer.description);
        break;

      case "Update Task":
        displayTasks();
        const updateAnswer = await inquirer.prompt([
          {
            type: "number",
            name: "id",
            message: "Enter the ID of the task to update:",
          },
          {
            type: "input",
            name: "description",
            message: "Enter the new task description:",
          },
        ]);
        updateTask(updateAnswer.id, updateAnswer.description);
        break;

      case "Delete Task":
        displayTasks();
        const deleteAnswer = await inquirer.prompt([
          {
            type: "number",
            name: "id",
            message: "Enter the ID of the task to delete:",
          },
        ]);
        deleteTask(deleteAnswer.id);
        break;

      case "View Tasks":
        displayTasks();
        break;

      case "Exit":
        exit = true;
        break;
    }
  }
}

main();
