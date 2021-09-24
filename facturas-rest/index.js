const express = require("express");
const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

const port = 8081;
const connectionString = "mongodb+srv://admin:admin@clustercurso.vif9h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {

        // Todo el codigo de acceso a bases de datos
        console.log("Conectado a base de datos");

        const facturas = client.db("myFirstDatabase").collection('facturas');
        // Gestión de facturas

        // Crear factura
        app.post("/facturas", function (request, response) {

            let factura = request.body;

            // inserta la factura en base de datos
            facturas.insertOne(factura).then(result => {
                console.log(result);
            }).catch(err => {
                console.error(err);
            });
            
            response.send("ok");

        });

        // Recuperar facturas
        app.get("/facturas/:facturaId", (request, response) => {

            let facturaId = request.params.facturaId;
            let query = {_id: Number.parseInt(facturaId)};

            // recuperar la factura de la base de datos
            facturas.findOne(query).then(factura => {
                response.json(factura);
            }).catch(err => {
                console.error(err);
            });
        });

        //Recuperar factura por ID: 
        app.get("/facturas/:facturaId", (request, response) => {

            let facturaId = request.params.facturaId;

            let o_id = new mongo.ObjectId(facturaId);
            let query = { _id: o_id };

            // recuperar la factura de la base de datos
            facturas.findOne(query).then(factura => {
                response.json(factura);
            }).catch(err => {
                console.error(err);
            });
        });


        // Actualizar factura
        app.put("/facturas/:facturaId", function (request, response) {

            let facturaId = request.params.facturaId;

            // ...
            response.json();

        });

        // Borrar factura por id
        app.delete("/facturas/:facturaId", (request, response) => {

            let facturaId = request.params.facturaId;
            // ...
            response.json();

        });

        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        });

    }).catch(error => console.error(err));