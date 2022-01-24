
import express from 'express';
import ejs from 'ejs';
import fetch from 'node-fetch';


const app = express();
const mykey = "314f4a8c5dbb945de7997a1b24cc47ca";

function ktoc(k){
    return (k - 273.15).toFixed(2);
}


app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/:city",async (req,res)=>{
    let {city} = req.params; 
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${mykey}`;
        const d = await fetch(url);
        const djson = await d.json();
        let {temp} = djson.main;
        let newTemp = ktoc(temp);
    res.render("weather.ejs",{djson,newTemp});
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000.");
});