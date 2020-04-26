console.log("Client side js loaded");

// fetch('http://puzzle.mead.io/puzzle')
// .then((res)=>{
// res.json().then((data)=>{
//     console.log(data.puzzle)
// })
// })
// const weatherData=(location)=>{
//     fetch('http://localhost:3000/weather?address='+location)
//     .then((res)=>{
        
//         res.json().then((data)=>{
//             if(data.error){
//                 console.log(data.error)
//             }
//             else{
//             console.log(data.location)
//             console.log(data.forecast)


//             }
//         })
//     })
// }
// weatherData('Jaipur')


const search=document.querySelector('input')
const weatherForm=document.querySelector('form')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value
    messageOne.textContent='loading...'
    messageTwo.textContent=''

    fetch('http://localhost:3000/weather?address='+location)
    .then((res)=>{
        
        res.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error
                //console.log(data.error)
            }
            else{
            // console.log(data.location)
            // console.log(data.forecast)
            messageOne.textContent=`${data.location}`
            messageTwo.textContent=`${data.forecast}`




            }
        })
    })
})
