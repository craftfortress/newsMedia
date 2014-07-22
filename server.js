var http = require('http'),
	fs = require('fs'),
    express = require('express');

var dateFormat = require('dateformat');


function clean(str) {
  return str.replace(/[^a-zA-Z ]/g, "") ;
}
 

function shortenSource(source) {
    var shortened = "";
 

    function cleanUp(url) { 
        if (url.search(/^https?\:\/\//) != -1)
            url = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i, "");
        else
            url = url.match(/^([^\/?#]+)(?:[\/?#]|$)/i, "");
        return url[1];
    }

    source = cleanUp(source);

    if (source.indexOf("bbc") > -1)
        shortened = "BBC";
    else if (source.indexOf("sky") > -1)
            shortened = "SKY";
    else if (source.indexOf("cnn") > -1)
            shortened = "CNN";
    else if (source.indexOf("reuters") > -1)
        shortened = "Reuters";
    else if (source.indexOf("aljazeera") > -1)
        shortened = "Aljazeera";
    else if (source.indexOf("statesman") > -1)
        shortened = "New Statesman";
    else if (source.indexOf("economist") > -1)
        shortened = "Economist";
    else if (source.indexOf("nytimes") > -1)
        shortened = "New York Times";
    else if (source.indexOf("guardian") > -1)
        shortened = "The Guardian";
    else if (source.indexOf("scmp") > -1)
        shortened = "SC Morning Post";
    else if (source.indexOf("washington") > -1)
        shortened = "Washington Post";
    else if (source.indexOf("rt.") > -1)
        shortened = "Russia Today";
    else if (source.indexOf("spiegel") > -1)
        shortened = "Spiegel";

    return shortened;

}

 var feed = require('feed-read'),
    http = require("http"),
    urls = [
        "http://feeds.bbci.co.uk/news/world/rss.xml",
        "http://news.sky.com/feeds/rss/world.xml",
        "http://rss.cnn.com/rss/edition_world.rss",
        "http://mf.feeds.reuters.com/reuters/UKWorldNews",
        "http://www.aljazeera.com/Services/Rss/?PostingId=2007731105943979989",
        "http://www.newstatesman.com/feeds_allsite/site_feed.php",
        "http://www.economist.com/media/rss/economist.xml",
        "http://rss.nytimes.com/services/xml/rss/nyt/InternationalHome.xml",
        "http://feeds.theguardian.com/theguardian/world/rss",
        "http://www.scmp.com/rss/5/feed",
        "http://feeds.washingtonpost.com/rss/",
        "http://rt.com/rss/news/",
        "http://www.spiegel.de/international/world/index.rss"
    ];

 http.createServer(function (req, res) {
     //HTTP Header
     res.writeHead(200, {
         "Content-Type": "text/html",
         "Transfer-Encoding": "chunked"
     });

     var read = fs.createReadStream('public/index.html').pipe(res, { end: false });
    
     setTimeout(function () {
         res.end();
     }, 8000);

         console.log("Get Articles");
         setTimeout(function () {

             res.write("<div class='container' style='padding:10px;'>");
             //RSS URLS loop
             var count = 0;
             var numberArticles = 10;
             var limit = urls.length * numberArticles;
             var articleLink;
             var articleTitle;
             var titlelist="";
             var urlLimit = urls.length;

             for (var j = 0; j < urlLimit; j++) {
     
                 if(urls[j] !== undefined)
                 feed(urls[j], function (err, articles) {
             
                     //Articles loop
                     for (var i = 0; i < 10; i++) {
                          if(articles !== undefined)
                         if(    titlelist.indexOf( articles[i].title < 0)  ){
                             articleLink  = articles[i].link;
                             articleTitle =  clean(articles[i].title);
                             titlelist+=articleTitle;
                                 
                             count++;
                             res.write("<div class='row'>");
                             res.write("<div class='col-md-1'></div>");
                             res.write("<div class='col-md-2'>" + shortenSource(articleLink)  + "</div>"); 
                             res.write("<div class='col-md-7'><a href='" + articleLink + "'>" + articleTitle + "</a></div>");

                             try{
                                     res.write("<div class='col-md-1' style='font-size:x-small;'>" + dateFormat(articles[i].published, "yyyy-mm-dd") + "</div>");
                             }catch(exception){}

                             res.write("</div>");
                         }

                         if ( count == limit) {
                           res.end("</body>\n</html>"); read.end();
                         }  
                     }  
                 }); // Feed-read
             }   

             res.write("</div>");
 
         }, 2000);


 }).listen(5001);

 