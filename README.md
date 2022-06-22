# Employee-tracker

A command-line application that manages a company's employee database, using Node.js, Inquirer, and MySQL.

## Table of Contents 

 1. [Installation](#Installation)
 2. [Usage](#Usage)
 3. [Contributing](#Contributing)
 4. [Liscense](#Liscense)
 5. [VideoLink](#VideoLink)
 6. [Repo](#Repo)


## Installation
You will need to clone the [Repo](#Repo)

Packages that need installation include: Inquirer, mysql2, dotenv, console.table

You will also need to create a '.env' file with the correct inputs in place you can input the data set provided in .env.EXAMPLE into your .env file and provide your mysql username and password

You will need to run mysql and enter in both databases before running an npm start make sure you are in the root folder in the terminal.


```bash
npm install inquirer@8.2.4
npm install mysql2
npm install dotenv
npm install console.table

touch .env
```
Edit .env file to include <br />
DB_NAME=employee_DB <br />
DB_PASSWORD=`<yourmysqlpassword>`<br />
DB_USER=`<yourmysqlusername>`

```bash
mysql -uroot -p
Enter Password:
source employees_db.sql
source ./Assets/seeds.sql
exit

npm start
```
## Usage

```bash
? What would you like to do? (Use arrow keys)
❯ View all departments 
  View all roles 
  View all employees 
  Add a new department 
  Add a new role 
  Add a new employee 
  Quit
```

## Contributing
Pull requests are welcome. 


## Liscense
None

## VideoLink 
Video of running app:
https://youtu.be/HU_sIxusZgE



## Repo

https://github.com/linklg1/Employee-tracker


