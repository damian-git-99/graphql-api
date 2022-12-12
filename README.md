# GraphQL API

Api using graphql with mongodb, jwt, express.


## 
[![MONGODB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/home)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)
[![APOLLO](https://img.shields.io/badge/Apollo%20GraphQL-311C87?&style=for-the-badge&logo=Apollo%20GraphQL&logoColor=white)](https://www.apollographql.com/docs/apollo-server/)
[![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/es/)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` port where the application will run

`URI` uri to connecto to mongo 

`JWT_SECRET_KEY`


## Run Locally

Clone the project

```bash
  git clone https://github.com/damian-git-99/graphql-api
```

Go to the project directory

```bash
  cd graphql-api
```

Install mongoDB or run docker compose
```bash
  docker compose -f "docker-compose.yml" up -d --build
```

Install project dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

test graphql endpoint
```
  http://localhost:9000/graphql
```



## Feedback

If you have any feedback, please reach out to us at damiangalvan66@gmail.com
