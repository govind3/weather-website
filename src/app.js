const express = require("express");
const path = require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast');

const app=express(); // Express function

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'));

// define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// with render we can render one of our handlebars templates
app.get('',(req,res)=>{
  res.render('index',{  // render allow us to render one of our views we are configures express to use the view engine HBS
    title:'Weather App',
    name:'Govind Kumar'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About Me',
    name:'Govind Kumar'
  });
})

app.get('/help',(req,res)=>{
  res.render('help',{
    text:'This is some helpful text',
    title:'Help',
    name:'Govind Kumar'
  });
})


app.get('/weather',(req,res)=>{
  const address=req.query.address;
  if(!address)
  {
    return res.send({
      error:'You must provide address for weather'
    })
  }
  geocode(address,(error,{latitute,longitute,location}={})=>{
    if(error)
    {
      return res.send({error})
    }
    //console.log('Data ',data);
    forecast(latitute,longitute,(error,forecastData)=>{
      if(error)
      {
        return res.send({error})
      }
      res.send({
        address:address,
        Location:location,
        forecast:forecastData
      })
      // console.log({Location : location})
      // console.log({Data :forecastData});
    })
  })  

})

app.get('/products',(req,res)=>{
  if(!req.query.search){
    return res.send({
      error:'You must provide a search term'
    })
  }

  console.log(req.query.search)
  res.send({
    product:[]
  })
})

app.get('/help/*',(req,res)=>{
  res.render('404',{
    title:'404',
    name:'Govind Kumar',
    errorMessage:'Help article not found'
  })
})


app.get('*',(req,res)=>{
  res.render('404',{
    title:'404',
    name:'Govind Kumar',
    errorMessage:'Page Not Found'
  })
})

// for server port 3000 // defing a route
app.listen(3000,()=>{
  console.log("Server started on port 3000");
});  