# Taskflow

> Open source [Kanban Board](https://en.wikipedia.org/wiki/Kanban_(development)) built with [Node](https://nodejs.org/en/), [React](https://reactjs.org/), [Express](https://reactjs.org/), and [MongoDB](https://reactjs.org/).

## [Demo](https://www.taskflow.tech)

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

Developed by [Delta Kapp](https://deltak.app) and [contributors](https://github.com/deltakapp/taskflow/graphs/contributors).
