# Food Explorer

Back-End of a fictional restaurant called Food Explorer, who sells foods, drinks and desserts.

## Techs
- [Express](https://expressjs.com/)
- [Knex](http://knexjs.org/)
- [SQLite](https://www.sqlite.org/index.html)

## Libraries
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Jsonwebtoken](https://jwt.io/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Multer](https://www.npmjs.com/package/multer)
- [Pm2](https://pm2.keymetrics.io/docs/usage/quick-start/)

## How to use
1. Clone the repository (if you don't know how to clone, read this [article](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)).
2. Open the terminal and navigate to the project's base local.
3. Install all dependencies (with ```npm install```).
4. Run ```npm start``` in terminal for initialize the server on production environment, or ```npm run dev``` to development environment.
<br>
The standart port is 3300 but is changeable in server.js file.

## Routes

### /user

The user's route supports the *post* method to **create** a user in database.

### /access

The access's route supports the *post* method to **create** a section.

### /dishes

The notes routes supports *get*, *post*, *put* and *delete* methods:

- ```get("/")``` (index) - get all dishes on database.
- ```get("/:id")``` (show) - get a specific dish. (Needs an id for identify the dish)
- ```post("/")``` create a dish. (Needs administrator permission)
- ```put("/")``` -update a dish. (Needs administrator permission and an id for identify the dish)
- ```delete("/:id")``` delete a dish. (Needs administrator permission and an id for identify the dish)

## Controllers, Services and Repositories

The application is separate on controllers, services and repositories. Also includes service and repository for ingredients management.

[![image](https://user-images.githubusercontent.com/86017907/179060688-590eac0e-1195-4bad-80d3-8c848b0af5e2.png)](/LICENSE)
