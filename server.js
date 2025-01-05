const express = require('express');
const app = express();
app.listen(8080,() => {
    console.log("Server started");
})
app.use(express.static('./'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());



const uri = "mongodb+srv://maramrohanraj:mongodb123@cluster0.dsdrgyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const {MongoClient} = require("mongodb");
const client = new MongoClient(uri);


app.get('/',(req,res) => {
    res.sendFile('home.html',{root:'./'})
})


app.post('/contact',async (req,res) => {
    let data = req.body;
    await client.connect();
    const db = client.db("portfolio");
    const collection = db.collection("userDetails");
    await collection.insertOne(data);
    await client.close();
    res.send("Message Sent successfully");
})