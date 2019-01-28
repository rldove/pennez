const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
// const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const Schema = require('./schema');

const PORT = 8881;

const server = express();

var cors = require('cors');

const schemaFunction =
  Schema.schemaFunction ||
  function () {
    return Schema.schema;
  };
let schema;
const rootFunction =
  Schema.rootFunction ||
  function () {
    return schema.rootValue;
  };
const contextFunction =
  Schema.context ||
  function (headers, secrets) {
    return Object.assign(
      {
        headers: headers,
      },
      secrets
    );
  };

server.use('/graphql', cors(), bodyParser.json(), graphqlExpress(async (request) => {
  if (!schema) {
    schema = schemaFunction(process.env)
  }
  const context = await contextFunction(request.headers, process.env);
  const rootValue = await rootFunction(request.headers, process.env);

  return {
    schema: await schema,
    rootValue,
    context,
    tracing: true,
  };
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  query: ``,
}));

server.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}/graphql`);
  console.log(`View GraphiQL at http://localhost:${PORT}/graphiql`);
});
