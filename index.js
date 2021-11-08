const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

// const apiKey = "75af65ed1d5e7215a577b8513819e6f9";


const generateScraperUrl= (apiKey)=>`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to Amazon Scraper API.");
});

//get product details
app.get("/products/:productId",async (req,res)=>{
    const {productId}=req.params;
    const {api_key}=req.query;
    try{
const response= await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`);
res.json(JSON.parse(response));
    }catch(error){
res.json(error)
    }
});
//get product reviews
app.get("/products/:productId/reviews",async (req,res)=>{
    const {productId}=req.params;
    const {api_key}=req.query;
    try{
const response= await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);
res.json(JSON.parse(response));
    }catch(error){
res.json(error)
    }
});

//get product offers
app.get("/products/:productId/offers",async (req,res)=>{
    const {productId}=req.params;
    const {api_key}=req.query;
    try{
const response= await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
res.json(JSON.parse(response));
    }catch(error){
res.json(error)
    }
});

//get search result
app.get("/search/:searchQuery",async (req,res)=>{
    const {searchQuery}=req.params;
    try{
const response= await request(`${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`);
res.json(JSON.parse(response));
    }catch(error){
res.json(error)
    }
})

app.listen(PORT, () =>
    console.log(`server running on port ${PORT}`)
);