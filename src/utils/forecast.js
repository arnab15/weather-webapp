const request=require('request')
 
const forecast=(lat,long,callback)=>{
const url='https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=da9c90ae100685eb2d417d60da8a9fe8'
request({url,json:true},(error,{body})=>{
    if(error){
         callback("unable to connect weather service!",undefined)

    }
    else if(body.message){
         callback('Unable to find location',undefined)

    }
    else{
        callback(undefined,(body.weather[0].description +" through out the day." +" it is currently "+(Math.round(body.main.temp)-273)+" degree C out" +". There is "+body.clouds.all+"% probability of rain"))
    }
})
}

module.exports=forecast;