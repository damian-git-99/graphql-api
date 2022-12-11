# GraphQL API

Api using Graphql

### Handling Errors
when using the shield library, errors should be thrown using return and not using throw, otherwise it always throws Not Authorized!. Read more.
* https://github.com/dimatill/graphql-shield/issues/24
* https://the-guild.dev/graphql/shield/docs/errors

```  
throw new GraphQLError(`Error: Invalid Password or email`); // not work
return new GraphQLError(`Error: Invalid Password or email`); // works
```

To Solve it: you can set allowExternalErrors option to true. This way, Shield won't hide custom errors thrown during query resolving.