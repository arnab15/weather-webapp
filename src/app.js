const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geoCode=require('./utils/geocode')
const forecast=require('./utils/forecast')



//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))
const app=express()
//defines path for expess
const publicDirPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')




//set up handelbar engine and views location
app.set('view engine','hbs')//setting up handelbar
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//providing path to static dir to serve
app.use(express.static(publicDirPath))
//setting up rout for hbs template
app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather app",
        name:'Arnab'

    })//just only put name of hbs file,2nd arg is object
})
//setting up about route
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"Weather app",
        massege:"I'm Arnab Currently doing my B.Tech CSE from UEM,Jaipur",
        name:"Arnab",
        more:"I'm a Web and AI/ML enthusiast"
    })
})
app.get('/weather',(req,res)=>{
    //setting up query
    if(!req.query.address){
        return res.send({
            error:"You must provide a address"
        })
    }
    //setting up geoCode
    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,foreCastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:foreCastData,
                location,
                address:req.query.address
            })
        })
    })
})
//rendering help page
app.get('/help',(req,res)=>{
    res.render('help',{
        massege:"This is help section here you will get all help regurding this app"
        ,title:"help",
        name:'Arnab'
    })
})


app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:404,
        name:"Arnab",
        errorMassege:"HELP ARTICAL NOT FOUND"
    })
})


//wild card character * match anything that hav'nt present there
app.get('*',(req,res)=>{
    res.render('error',{
        title:404,
        errorMassege:"PAGE NOT FOUND",
        name:"arnab"
    })

})

//starting server
app.listen(3000,()=>{
    console.log("server is up in 3000")
})