# Taskflow

Open source [Kanban](https://en.wikipedia.org/wiki/Kanban_(development)) built with [Node](https://nodejs.org/en/), [React](https://reactjs.org/), [Express](https://reactjs.org/), and [MongoDB](https://reactjs.org/).

<span style="font-size:2em">[Demo](https://www.taskflow.tech/)!</span>

## Heroku Deployment

tbd

## Development

Clone this repo and install npm dependencies:
```bash
git clone https://github.com/deltakapp/taskflow
cd taskflow/
npm install
```

Create an environemtal variable file named `.env` with the following syntax:
```
DB_URL=mongodb+srv://dbuser:dbpass@dbaddress/dbname?retryWrites=true&w=majority
AUTH_KEY=SECRET_KEY
```

To run locally:
```
heroku run local
```

For frontend development additionally run:
```bash
cd frontend/ 
npm install
npm start
```

## License

Taskflow is distributed under [MIT License](https://github.com/deltakapp/taskflow/blob/main/LICENSE).

--- 

Developed by [Delta Kapp](https://deltak.app) and [contributors](https://github.com/deltakapp/taskflow/graphs/contributors)

## Directories

/bin - only used for qgtunnel, do not modify, sourced from https://s3.amazonaws.com/quotaguard/qgtunnel-latest.tar.gz

/frontend - frontend code here. /src contains source code, /public contains static assets, /build contains client-ready code webpacked and babeled with create-react-app. .gitignore may be modified here to push /build folder, but long-term production should be built directly on server

/node_modules - if you don't know what this is, please don't touch anything in this project.

/server - node.js server code, mostly with express and mongoose

/vendor - only used for nss_wrapper for qgtunnel, sourced from https://s3.amazonaws.com/quotaguard/qgtunnel-latest.tar.gz

.qgtunnel - what it says on the tin. tunnel information for qgtunnel.

Procfile - startup commands for heroku hosting

# Testing

Client: /frontend npm start (serves client on localhost:3000)

Server: npm start

OR nodemon server/index.js (restarts server on file changes)

# Deployment

Local deployment: /frontend npm run build
heroku local home

Heroku deployment: /frontend npm run build
/frontend/.gitignore unignore /build
push to heroku main
heroku ps:scale web=1

Long-term Heroku deployment:
push to heroku main
heroku ps:scale web=1
heroku run /frontend npm run build
/server/index.js remove import cors and app.use(cors()) and any cors in package.json

# Glossary

Heroku: cloud-hosting app which hosts this at taskflow.herokuapp.com
Quotaguard: static IP solution for Heroku to connect with mongoDB
QGTunnel: quotaguard feature for SOCKS5 connection with mongoDB
