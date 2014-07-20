var http = require('http'),
	fs = require('fs'),
    express = require('express') ;

function shortenSource(source) {
    var shortened = "";
 

    if (source.indexOf("BBC") > -1)
        shortened = "BBC";
    else if (source.indexOf("Sky") > -1)
            shortened = "SKY";
    else if (source.indexOf("CNN") > -1)
            shortened = "CNN";
    else if (source.indexOf("Reuters") > -1)
        shortened = "Reuters";
    else {
        shortened = "Aljazeera";
        }


    return shortened;

}

 var feed = require('feed-read'),
    http = require("http"),
    urls = [
        "http://feeds.bbci.co.uk/news/world/rss.xml",
        "http://news.sky.com/feeds/rss/world.xml",
        "http://rss.cnn.com/rss/edition_world.rss",
        "http://mf.feeds.reuters.com/reuters/UKWorldNews",
        "http://www.aljazeera.com/Services/Rss/?PostingId=2007731105943979989"
    ];

 http.createServer(function (req, res) {
     //HTTP Header
     res.writeHead(200, {
         "Content-Type": "text/html",
         "Transfer-Encoding": "chunked"
     });

     var read = fs.createReadStream('public/index.html').pipe(res, { end: false });
    
   
         console.log("Get Articles");
         setTimeout(function () {

             res.write("<div class='container' style='padding:10px;'>");
             //RSS URLS loop
             var count = 0;
             var numberArticles = 10;
             var limit = urls.length * numberArticles;

             for (var j = 0; j < urls.length; j++) {
     
 
                 feed(urls[j], function (err, articles) {
             
                     //Articles loop
                     for (var i = 0; i < numberArticles; i++) {
                         count++;
                         res.write("<div class='row'>");
                         res.write("<div class='col-md-1'></div>");
                         res.write("<div class='col-md-2'>" + shortenSource(articles[i].feed.name) + "</div>"); 
                         res.write("<div class='col-md-7'><a href='" + articles[i].link + "'>" + articles[i].title + "</a></div>");
                          //res.write("<div class='col-md-3'>" + articles[i].published + "</div>");
                          res.write("</div>");

                          
                         if ( count == limit) {
                           res.end("</body>\n</html>"); read.end();
                         }  
                     }  
                 }); // Feed-read
             }   

             res.write("</div>");
 
         }, 2000);


 }).listen(5001);

 