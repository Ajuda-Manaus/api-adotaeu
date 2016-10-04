export default {
  isTest: false,
  server: {
    port: 4000,
    host: 'localhost'
  },
  bodyParser: {
    extended: true
  },
  neo4j: {
    server: 'http://localhost:7474',
    user: 'neo4j',
    pass: 'root',
    envDb: '_dev'
  },
  consign: {
    verbose: false
  }
};
