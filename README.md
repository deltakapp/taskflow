<p align="center">
  <img height="200" src="https://raw.githubusercontent.com/deltakapp/taskflow/main/frontend/public/logo.png">
</p>

> Open source [Kanban Board](https://en.wikipedia.org/wiki/Kanban_(development)) built with [Node](https://nodejs.org/en/), [React](https://reactjs.org/), [Express](https://reactjs.org/), and [MongoDB](https://reactjs.org/).

## [Demo](https://www.taskflow.tech)

Demo username and password is `demo`.

Add demo gifs here.

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
DB_URL=<YOUR-MONGO-DB-URI>
AUTH_KEY=<YOUR-MONGO-KEY>
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

Developed by [Delta Kapp](https://deltak.app) and [contributors](https://github.com/deltakapp/taskflow/graphs/contributors).
