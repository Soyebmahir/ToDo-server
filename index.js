const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
// middle wares
const cors = require("cors");
app.use(cors());
require("dotenv").config();
app.use(express.json()); // express js build in body parser




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.emrb0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try{
    await client.connect();
    const taskCollection = client.db("todo").collection("task");

    // get all task from database 
    app.get('/tasks', async(req, res) => {
        const query = {};
        const result = await taskCollection.find({}).toArray();
        res.send(result);
    })

    

} 
finally{
    // client.close();
}
} 
run().catch(console.dir)




app.get("/", (req, res) => {
  res.send("To do is working fine");
});

app.listen(port, () =>
  console.log(`port is running at http://localhost:${port}`)
);
