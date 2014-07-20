/*
 *  Basic Mocha unit tests  
 *  Run with "mocha test/testing.js --timeout 10000" from web root
 */

var assert = require('assert');  
var req;
var theres, theresponse;
var http = require('http'),
	fs = require('fs'),
    express = require('express');


require('../server.js');


describe('Server Checks', function() {
    before(function() {
       
req =   http.get('http://localhost:5001/', function (res) {

            var chunks = [];
            res.on("data", function (data) {
                chunks.push(data);  
                theres += chunks;
            }).on("end", function () {
            //Once All Tests Pass or Fail, the program stops, no need to end stream
           });


    });

    });

     


describe('Server returns valid response?', function () {

 
        it('Data being served', function (done) {
            setTimeout(function () {
                 

        var elementContained = String(theres).indexOf("html");
        if (elementContained > -1)
            elementContained = true;

            assert.equal(true, elementContained, "HTML not being returned");
            theresponse = theres;
            done();

            }, 2000);
             
           });
     
 

        it('BBC Data gather check', function (done) {
            setTimeout(function () {
                  
                var elementContained = String(theres).indexOf("bbc");
                if (elementContained > -1)
                    elementContained = true;
                 
                assert.equal(true, elementContained, "BBC data not being received");

                done();

            }, 2000);

        });




        it('SKY data gather check', function (done) {
            setTimeout(function () {

                var elementContained = String(theres).indexOf("sky");
                if (elementContained > -1)
                    elementContained = true;

                assert.equal(true, elementContained, "SKY data not being received");

                done();

            }, 2000);

        });


        
        it('CNN data gather check', function (done) {
            setTimeout(function () {

                var elementContained = String(theres).indexOf("cnn");
                if (elementContained > -1)
                    elementContained = true;

                assert.equal(true, elementContained, "CNN data not being received");

                done();

            }, 2000);

        });



    });

     
});
     