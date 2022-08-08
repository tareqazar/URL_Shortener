const { urlencoded } = require("express");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const env = require("dotenv").config();
const port = process.env.port;
var path = require('path');
let pg=require('pg');

const {Sequelize} = require('sequelize');
//const postgres_connect_url = process.env.postgres_connect;
const sequelize = new Sequelize(process.env.postgres_connect);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/');
const routes = require('./routes/externalRoutes');
// const router = require('express').Router();


// const testoz = url.build({code:"55555", redirectTo:"https://www.google.com"});
// testoz.save()

//app.use(express.static(__dirname+'/public/'));
//console.log(sequelize.model.user);
sequelize.authenticate().then(()=>{
    console.log('Connected to DB succesfully');
})

function nothing(){
    let result=url.findOne({where:{code:"55555"}}).then((res)=>{
        console.log(res.dataValues);
    })
}

//nothing();

// function normalizeUrl(link) {
//     // remove "www." if at first part of hostname
//     // remove trailing slash
//     return link.replace(/\/\/www\./i, "//").replace(/\/$/, "");
// };
// function validURL(str) {
//     var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
//     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
//     '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
//     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
//     '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
//     '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
//     console.log(!!pattern.test('Link Validity:', str));
//     return !!pattern.test(str);
// };

// let newKey = false;
// while(!newKey){
//     url.findOne({where: {code: "55555"}}).then((t)=>{
//         // if(resultant != null){
//         //     uniqueKey= Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
//         //     console.log('finished query');
//         // }
//         // else{
//         //     newKey = true;
//         // }
//         console.log(t.redirectTo);
//         newKey=true;
//     })};



//TROUBLESOME CODE
// function isUniqueKey (key) {

//     console.log('CHECKED IF KEY IS UNIQUE')
//     try{
//         return url.count({ where:{code: key} })
//         .then(count => {
//           if (count != 0) {
//               console.log('not unique key');
//             return false;
//           }
//           console.log('unique key');
//           return true;
          
//         }).catch(err=>{
//           console.log(err);
//           return;
//         })
//     }
//     catch(err){
//         console.error('CAUGHT UNIQUE KEY ERROR',err);
//         return;
//     }

//   };

//   function isUniqueURL (link) {
//     try{
//     return url.count({ where: { redirectTo: link } })
//       .then(count => {
//         if (count != 0) {
//             console.log('not unique URL')
//           return false;
//         }
//         console.log('unique URL')
//         return true;
        
//       });
//     }
//     catch(err){
//         console.error('CAUGHT UNIQUE URL ERROR',err);
//         return;
//     }
//   };

// nothing();
// const url_to_store = new url();
// url_to_store.save();

app.use(urlencoded({extended:true}));

http.listen(port,()=>{
    console.log("Connected to port", port);
});


    //TROUBLESOME CODE
    // let newKey = false;
    // while(!newKey){
    //     url.findOne({where:{code:uniqueKey}}).then((resultant)=>{
    //         if(resultant != null){
    //             uniqueKey= Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    //         }
    //         else{
    //             newKey = true;
    //         }
    //     })
    // }




    //Check if origURL exists in db, after normalization
    //TROUBLESOME CODE
    // if(url.findOne(origURL)){
    //     res.body.alreadyExists=true;
    // }
    // while(url.findOne(uniqueKey)){
    //     uniqueKey = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    // }
    //Check

//xhr.send('link='+inp+'cKey'+cKey)




// app.get('/',(req,res)=>{
//     res.render('index');
// })


// app.get('/favicon.ico', (req,res)=>{
//     res.render('index');
// })


// app.post('/shorten', async (req,res)=>{

//     let {link}= req.body;
//     console.log(req);
//     if(link == undefined || link==null || !validURL(link)){
//         res.set('Content-Type','text/plain');
//         res.set('Access-Control-Allow-Origin','*')
//         res.send(('Invalid URL'));
//         return;
//     }
//     console.log('Link is',link);
//     let uniqueKey = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
//     //TROUBLESOME CODE
//     while( await (!isUniqueKey(uniqueKey))){
//         uniqueKey = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
//     };

//     if(uniqueKey.indexOf(' ')){
//         for(let i=0;i<uniqueKey.length;i++){
//             if(uniqueKey[i]==' '){
//                 uniqueKey[i]='A';
//             }
//         }
//     };

//     //find url stored in DB based on link from req body
//     let result =  url.findOne({where:{redirectTo:link}}).then((ob)=>{
//         //let link = ob.dataValues.redirectTo;
//         if(ob == null){
//             let newLink = url.build({code:uniqueKey, redirectTo: link});
//             newLink.save();
//             console.log('Shorten NULL',uniqueKey)
//             res.set('Content-Type','application/x-www-form-urlencoded')
//             res.set('Access-Control-Allow-Origin', '*')
//             res.send(`code=${uniqueKey}`);
//         }
//         else {
//             let theLink =url.findOne({where:{redirectTo:link}}).then((ob)=>{
//                 console.log('Shorten FOUND', ob.dataValues.code);
//                 res.set('Content-Type','application/x-www-form-urlencoded')
//                 res.set('Access-Control-Allow-Origin', '*')
//                 res.send('code='+`${ob.dataValues.code}`);
//             });
//         }
//     })
// })

// app.post('/shortenCustom',async (req,res)=>{
//     let {link}= req.body;
//     let {cKey} = req.body;
//     console.log('link',link,'cKey',cKey)
//     let existingKey = new url();
//     if (!isUniqueKey(cKey)){
//         res.send('Key is not unique');
//     }

//     if (await(!isUniqueURL(link)))
//     {
//         url.destroy({where:{redirectTo: link}});
//         const new_entry = await url.build({redirectTo: link, code: cKey});
//         new_entry.save();
//         res.send(cKey);
//     }

//     //TROUBLESOME CODE
//     else {
//         //temp code
//         const new_entry = await url.build({redirectTo: link, code: cKey});
//         new_entry.save();
//         res.send(cKey);
//     }

// }
// )
// app.get('/:key',(req,res)=>{
//     if(req.params.key == null || req.params.key == undefined )
//     console.log('accessing', req.params.key);
//     let result =  url.findOne({where:{code:`${req.params.key}`}}).then((ob)=>{
//         //let link = ob.dataValues.redirectTo;
        
//         if(ob == null){
//             console.log('/:key', 'NOTHING');
//             res.render('empty');
//         }
//         else if(ob.dataValues.redirectTo.substr(0,8)=='https://' || ob.dataValues.redirectTo.substr(0,7)=='http://'){
//             let sto = ob.dataValues.redirectTo;
//             console.log('/:key FOUND 1');
//             res.redirect(sto);
            
//         }
//         else {
//             let sto = ob.dataValues.redirectTo;
//             console.log('/:key FOUND 2');
//             res.redirect('https://'+sto);
//         }
//     }
// ).catch(err=>{
// console.log(err);
// });
// })

// app.use('*',(req,res)=>{
//     res.redirect('/');
// })
app.use('/',routes);
