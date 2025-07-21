// server.js
// where your node app starts

// init project
const express = require('express');
var ejs = require('ejs');

const img_full_page = require('./imgs_full_page');
const img_med = require('./imgs_med');
const text_random = require('./text_random');
const img_med_better = require('./imgs_med_better');
const img_all = require('./all_images');
const csv_lookup = require('./csv_lookup');

const app = express();

app.set('view engine', 'ejs');


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {

  
    var text1 = text_random[Math.floor((Math.random() * text_random.length-1) + 1)];
    var text2 = text_random[Math.floor((Math.random() * text_random.length-1) + 1)];
    var medImg1 = img_med_better.imgs[Math.floor((Math.random() * img_med_better.imgs.length-1) + 1)];
    var fullImg1 = img_full_page.imgs[Math.floor((Math.random() * img_full_page.imgs.length-1) + 1)];
  
    var x = (Math.floor(Math.random() * 2) == 0);
    if(x){      
      var source = {'text':{url:csv_lookup[text1['source']],id:text1['source']}, 'small-image': {url:csv_lookup[medImg1.split('.')[0]],id:medImg1.split('.')[0]}, 'large-image': {url:csv_lookup[fullImg1.split('.')[0]],id:fullImg1.split('.')[0]}}
      response.render('full', {text: text1, text1, fullImg:fullImg1,medImg:medImg1, source:source});
    }else{
      var source = {'text1':{url:csv_lookup[text1['source']],id:text1['source']},'text2':{url:csv_lookup[text2['source']],id:text2['source']}, 'small-image': {url:csv_lookup[medImg1.split('.')[0]],id:medImg1.split('.')[0]}, 'large-image': {url:csv_lookup[fullImg1.split('.')[0]],id:fullImg1.split('.')[0]}}
      response.render('constructed', {text1: text1,text2: text2, medImg1:medImg1, fullImg1:fullImg1,source:source});
    }
 
  
    //   this turned out lame af
    //   var rando=[];
    //   var randostr = '';
    //   for (let x=0;x<10; x++){
    //     var r = img_all[Math.floor((Math.random() * text_random.length) + 1)];


    //     if (randostr.indexOf(r.split('.')[0])===-1){

    //       rando.push(r)
    //       randostr = randostr + r.split('.')[0]
    //     }else{
    //       x = x-1; 
    //     }
    //   }
    //   response.render('rando', {rando:JSON.stringify(rando)});

  
  
  
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
