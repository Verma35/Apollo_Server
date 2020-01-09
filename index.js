const { ApolloServer, gql } = require('apollo-server');
const fetch = require("node-fetch");
const axios = require('axios');

const typeDefs = gql`

  type Book {
    title: String
    author: String
  }

  type Person {
    name: String
    height: String
    mass: String
  }
  type fata{
    page: Int,
    per_page: Int,
    total: Int,
    total_pages: Int,
    data:[kata]
     
    
  }
  type kata{
    id: Int,
    email:String,
    first_name: String,
    last_name: String,
    avatar:String
}

 type d{
  rotation_period:Int
  orbital_period:Int
 }
 type Mutation {
  setpost(name: String!, job: String!): Link!
}
type Link {   
  name: String,
  job: String,
  id: String,   
createdAt:String
}
  
type Query {
    books: [Book]
    getPerson(id: Int!): Person
    getData(id:Int):d
    getlist:fata
  }
`;

  const resolvers = {
    Query: {
     
      getData: async (_, { id }) =>{
        const response=await fetch(`https://swapi.co/api/planets/${id}/`);
        return response.json();
        
      } ,
       getlist: async () =>{
     const response=await fetch("https://reqres.in/api/users?page=2");
        return response.json();
       }
     },
     Mutation: {
    
      setpost: (parent, {name,job}) => {
        return axios.post('https://reqres.in/api/users',{name,job})
        .then(res=>res.data);
      
      }
    }
     
      
      
    };
  
  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });