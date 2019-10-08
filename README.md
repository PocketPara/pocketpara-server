# PocketPara

---
**<p align="center">This is the server repository.<br />Check out the [meta], [client] and [api docs] repositories.</p>**

[meta]:https://github.com/PocketPara/pocketpara-meta
[client]:https://github.com/PocketPara/pocketpara-client
[api docs]:https://github.com/PocketPara/pocketpara-apidocs

---

# Table of Contents
*todo*

## Getting Started
The whole project uses [TypeORM](https://typeorm.io). Therefore the command-line utilities are very helpful. Install them with 
```bash
npm install -g typeorm
```

then install the dependencies with
```bash
npm install
```
Now you can start the server for development with the command
```bash
npm start
```
***Note**: Since an admin user is required to create more users, you need to create an admin first. You can do so by running the migration command `npm run migration:run`, which will create a user called `admin` with password `admin`. A normal user with the name and password `devtest` will also be created.*

## Updating Models
Whenever models are updated, the database needs to be migrated of course. There's a good explaination on db-migration on typeorm [here](https://typeorm.io/#/migrations).

Migrations can be created with the command
```bash
typeorm migration:create -n <MigrationName>
```

## Testing
Every feature should of course be tested before every commit. If an error persists, a new issue should be opened describing the problem in detail.  
Tests are done using *jest* and *supertest*.

## IDE Recommendations
vscode, file icons etc. *todo*

## Libraries

* **helmet**  
Helps securing the application by setting various HTTP-headers

* **cors**  
Enables cross-origin requests

* **body-parser**  
Parses the JSON-bodies (also the urlencoded ones) into javascript objects

* **bcryptjs**  
Password-Hashing library

* **typeorm**  
The ORM system used to manipulate the database

* **reflect-metadata**  
Allows some annotation featues used with TypeORM

* **class-validator**  
A validation package that synergizes well with TypeORM

* **sqlite3**  
Development database

* **ts-node-dev**  
Automatically restarts the server on file change events

* **jest**  
Testing library by facebook

* **supertest**  
Library for testing Node HTTP-Servers