const request = require('request');

const forecast=(latitute,longitute,callback)=>{
  const url='http://api.weatherstack.com/current?access_key=1346e3f592bcaa1a24262aabeecd9468&query='+encodeURIComponent(latitute)+','+encodeURIComponent(longitute)

  request({url,json:true},(error,{body})=>{
    if(error)
    {
      callback('Unable to connect to weather service!',undefined)
    }
    else if(body.error)
    {
      callback('Unable to find location, Try another search.',undefined)
    }
    else
    {
      callback(undefined,body.current.weather_descriptions[0] +'. It is currently '+ body.current.temperature +' degress out. It feels like '+ body.current.feelslike+' degress out.')
      //const data =JSON.parse(response.body)
      //console.log(data.current)
    }
  })
}


module.exports=forecast