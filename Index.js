const express = require("express");

const path = require("node:path")
const app = express();

app.use(express.static('public'))
app.use(express.json())

app.listen(3030,()=>{console.log("Listening on port 3030.....")})


const record = [{data:"received"}];
let users = [
{id:1,name:"john"},
{id:2,name:"clark"},
{id:3,name:"barny"},
{id:4,name:"gorge"},
{id:5,name:"joe"}];

app.get("/get",(req,res)=>{
    res.json(record);
})

app.get("/users",(req,res)=>{
    res.json(users);
})

app.get("/index",(req,res)=>{
    res.sendFile(path.resolve("./public","Index.html"));
})

app.post("/user/add/",(req,res)=>{
 let {id,name}=req.body;
    console.log(id,name)
    users.push({id,name});

         res.json(users);
    
    console.log(users)
})

app.put("/user/update/:id",(req,res)=>{
    const{name}=req.body;
    const {id} = req.params
        users.map(user=>{
            if(user.id == id)
              user.name  = name;
        })
        res.json(users);
})

app.delete("/user/delete/:id/",(req,res)=>{
    const{id}=req.params;
        users= users.map(user=>{
           if(user.id != id){
            return user;
           } 
            })
        res.json(users);
})