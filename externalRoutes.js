module.exports = (function(){
    'use strict';


let express = require('express');
var app = require('express').Router();
//app.set('views', "../public/")


const {url} = require('../models/db_model');

async function isUniqueKey (key) {
    console.log('CHECKED IF KEY IS UNIQUE')
    let uniqueness;
        url.count({ where:{code: key} })
        .then(count => {
          if (count != 0) {
              console.log('not unique key');
              uniqueness = false
          }

          else {
          console.log('unique key');
          uniqueness= true;
            }
        }).catch(err=>{
          console.log(err);
        })
    return uniqueness;
    // catch(err){
    //     console.error('CAUGHT UNIQUE KEY ERROR',err);
    //     return;
    // }
  };

  async function isUniqueURL (link) {
    //try{
    url.count({ where: { redirectTo: link } })
      .then(count => {
        if (count != 0) {
            console.log('not unique URL');
          return false;
        }
        console.log('unique URL');
        return true;
        
      });
    //}
    // catch(err){
    //     console.error('CAUGHT UNIQUE URL ERROR',err);
    //     return;
    // }
  };

  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    console.log(!!pattern.test('Link Validity:', str));
    return !!pattern.test(str);
};


app.get('/',(req,res)=>{
    res.render('index');
})


app.get('/favicon.ico', (req,res)=>{
    res.render('index');
})

app.get('/:key',(req,res)=>{
        console.log('accessing', req.params.key);
        let result =  url.findOne({where:{code:`${req.params.key}`}}).then((ob)=>{
            //let link = ob.dataValues.redirectTo;
            
            if(ob == null){
                console.log('/:key', 'NOTHING');
                res.render('empty');
            }
            else if(ob.dataValues.redirectTo.substr(0,8)=='https://' || ob.dataValues.redirectTo.substr(0,7)=='http://'){
                let sto = ob.dataValues.redirectTo;
                console.log('/:key FOUND 1');
                res.redirect(sto);
                
            }
            else {
                let sto = ob.dataValues.redirectTo;
                console.log('/:key FOUND 2');
                res.redirect('https://'+sto);
            }
        }
).catch(err=>{
    console.log(err);
})
})



// app.post('/shorten', (req,res)=>{
//     try {
//         let {link}= req.body;
//         if(validURL(link)){
//         }

//         else {
//             res.send('Invalid Link, please try again');
//             return;
//         }
//     }
//     catch(err){
//         console.log(err);
//         res.send(err);
//         return;
//     }
//     finally{
//         console.log(link);
//     let uniqueKey = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
//     //TROUBLESOME CODE
//     while(!isUniqueKey(uniqueKey)){
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

//     try{
//         let result =  url.findOne({where:{redirectTo:link}}).then((ob)=>{
//             //let link = ob.dataValues.redirectTo;
//             if(ob == null){
//                 let newLink = url.build({code:uniqueKey, redirectTo: link});
//                 newLink.save();
//                 console.log('Shorten NULL',uniqueKey)
//                 res.send(uniqueKey);
//             }
//             else {
//                 let theLink =url.findOne({where:{redirectTo:link}}).then((ob)=>{
//                     console.log('Shorten FOUND', ob.dataValues.code);
//                     res.send(JSON.stringify(ob.dataValues.code));
//                 });
//             }
//         })
//         }
//         catch(Err){
//             console.log(Err);
//         }
//     }
    
// })

app.post('/shorten', async (req,res)=>{

    let {link}= req.body;
    console.log(link);
    if(link == undefined || link==null || !validURL(link)){
        res.set('Content-Type','text/plain');
        res.send(('Invalid URL'));
        return;
    }
    console.log('Link is',link);
    let uniqueKey = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    //TROUBLESOME CODE
    while( await (!isUniqueKey(uniqueKey).then())){
        uniqueKey = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    };

    if(uniqueKey.indexOf(' ')){
        for(let i=0;i<uniqueKey.length;i++){
            if(uniqueKey[i]==' '){
                uniqueKey[i]='A';
            }
        }
    };

    //find url stored in DB based on link from req body
    let result =  url.findOne({where:{redirectTo:link}}).then((ob)=>{
        //let link = ob.dataValues.redirectTo;
        if(ob == null){
            let newLink = url.build({code:uniqueKey, redirectTo: link});
            newLink.save();
            //console.log('Shorten NULL',uniqueKey);
            res.set('Content-Type','application/x-www-form-urlencoded');
            res.send(`code=${uniqueKey}`);
        }
        else {
            let theLink =url.findOne({where:{redirectTo:link}}).then((ob)=>{
                //console.log('Shorten FOUND', ob.dataValues.code);
                res.set('Content-Type','application/x-www-form-urlencoded')
                res.send('code='+`${ob.dataValues.code}`);
            });
        }
    })
})

app.post('/shortenCustom',  async (req,res)=>{
    let {link}= req.body;
    let {cKey} = req.body;
    //console.log('link',link,'cKey',cKey)
    
    if ( await(!isUniqueKey(cKey))){
        console.log('IF STATEMENT');
        res.send('Key is not unique');
        return;
    }

    else if ( await (!isUniqueURL(link)))
    {
        console.log('SECOND IF STATEMENT')
        url.destroy({where:{redirectTo: link}});
        const new_entry = url.build({redirectTo: link, code: cKey});
        console.log('FIRST SAVE');
        new_entry.save().then(()=>{
            res.send(cKey);
        });   
        return;
    }
    //TROUBLESOME CODE
    else if ( await(isUniqueKey(cKey) && isUniqueURL(link))) {
        //temp code
        console.log('ELSE STATEMENT')
        const new_entry = url.build({redirectTo: link, code: cKey});
        console.log('SECOND SAVE');
        new_entry.save().then(()=>{
            res.send(cKey);
        });
        
    }

}
)

// app.post('/shortenCustom', async (req,res)=>{
//     let {link}= req.body;
//     let {cKey} = req.body;
//     let shorten_url = new Promise((setNewKey,checkUniqueURL)=>{
//         url.count({ where: { redirectTo: link } }).then(count=>{
//             if(count != 0) {
//                 res.send('Key is not unique')
//             }
//             else {
//                 let x = new url();
//                 x.build({})
//             }
//         })
//     })
//     app.post('/shortenCustom', async (req,res)=>{
//         let {link} = req.body;
//         let {cKey} = req.body;
//         isUniqueKey(cKey)
//     })
//     function setNewKey(key){

//     }
//     function checkUniqueURL(link){
//         return new Promise()
//     }
// })


app.use('*',(req,res)=>{
    res.redirect('/');
})

return app;

})()

