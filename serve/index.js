const express = require('express')
const cors = require('cors')
const axios = require('axios')
const request = require('request');

const app = express()

const baseUrl = 'https://sandbox.antavaya.com'


app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const getToken = (cb) => {
    const options = {
        'method': 'POST',
        'url': 'https://sandbox.antavaya.com/token',
        'headers': {
        },
        formData: {
            'grant_type': 'client_credentials',
            'scope': '',
            'client_id': 'test',
            'client_secret': '12345678'
        }
    };
    request(options, function (error, response) { 
        if (error) throw new Error(error);
        cb(JSON.parse(response.body))
    });
}

const getList = (token, cb) => {
    const options = {
        'method': 'POST',
        'url': 'https://sandbox.antavaya.com/tour/series/availability',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({})     
    };
    request(options, function (error, response) { 
        if (error) throw new Error(error);
        cb(JSON.parse(response.body))
    });
}

app.get('/', (req, res) => {
    getToken(hasil => {
        const token = hasil.token_type + ' ' + hasil.access_token
        getList(token, data => {
            res.json(data)
        })
        
    })    
})

// app.get('/', (req, res) => {
//     getToken(hasil => {
//         const token = hasil.token_type + ' ' + hasil.access_token
//         getList(token, data => {
//             res.json({
//                 data
//             })
//         })
        
//     })    
// })

app.listen(5555, () => console.log('OOOOK') )