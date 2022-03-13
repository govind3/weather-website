
const request = require('request');

const geocode=(address,callback)=>{
  const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZ292aW5kMyIsImEiOiJjbDBjOWgzdHoxNHQ0M2ttb3pzMjZqZnFtIn0.F5gjmeY79ShqAY_TqlfKUA'
  request({url,json:true},(error,{body})=>{
    if(error)
    {
      callback('Unable to connect to location service!',undefined)
    }
    else if(body.features.length===0)
    {
      callback('Unable to find location, Try another search.',undefined)
    }
    else
    {
      //console.log('Size of Array is : '+body.features.length);
      var arr=[];
      for(let i=0;i<body.features.length;i++)
      {
        arr.push({
          latitute:body.features[i].center[1],
          longitute:body.features[i].center[0],
          location:body.features[i].place_name
        })
      }
      //console.log(arr[0]);
      const data={
        
        latitute:body.features[0].center[1],
        longitute:body.features[0].center[0],
        location:body.features[0].place_name
      }
      callback(undefined,arr)
    }
  })
}

module.exports=geocode