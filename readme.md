# Javascript quiz

This is a backend API for Javascript quiz app desgined to store questions and associated multiple choice answer records in a database.This API is public on Github and is also deployed on Render. On the link below use /questions and /answers paths to see what is available, see -->  https://javascript-quiz.onrender.com .


## Dependencies used

  - "express": "^4.18.2",
  - "pg": "^8.8.0",
  - "sequelize": "^6.25.3",
  - "validator": "^13.7.0"

## DevDependencies used

    "chai": "^4.3.6",
    "dotenv": "^16.0.3",
    "eslint": "^8.25.0",
    "eslint-config-standard": "^17.0.0",
    "eslint-plugin-import": "^2.26.0",
    "eslint-plugin-n": "^15.3.0",
    "eslint-plugin-promise": "^6.1.1",
    "eslint-plugin-react": "^7.31.10",
    "mocha": "^10.1.0",
    "mysql2": "^2.3.3",
    "nodemon": "^2.0.20",
    "supertest": "^6.3.0"

## Running the app

This API requires a MySQL database. Run

```
$ npm i -S mysql2
``` 

in your terminal.

Run 

```
$ npm i
```

to install dependencies.

Create .env:

```
DB_PASSWORD=password
DB_NAME=javascript_quiz_dev
DB_USER=root
DB_HOST=localhost
DB_PORT=3307
PORT=3000
```

and .env.test files in the root directory:

```
DB_PASSWORD=password
DB_NAME=javascript_quiz_test
DB_USER=root
DB_HOST=localhost
DB_PORT=3307
PORT=3000
```


Set up docker container with 
```
docker run -d -p 3307:3306 --name javascript_quiz_mysql -e MYSQL_ROOT_PASSWORD=password mysql
```

Download the following dependencies: 

```
$ npx eslint --init
$ npx prettier --write .
$ npm i -S express
$ npm i -D nodemon
$ npm i -D dotenv
$ npm i -S mysql2
$ npm i -D mocha chai supertest
```

## Using the app

To start the app on your localhost use 
```
$ npm start 
```
