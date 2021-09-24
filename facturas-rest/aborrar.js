const mongoClient = require("mongodb").MongoClient;

const connectionString = "mongodb+srv://admin:<password>@cluster0.4wjcr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoClient.connect(connectionString, {useUnifiedTopology: true})
.then(client => {
