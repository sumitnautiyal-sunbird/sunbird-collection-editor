var express = require('express'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    proxy = require('express-http-proxy'),
    urlHelper = require('url'),
    bodyParser = require('body-parser');

http.globalAgent.maxSockets = 100000;

var app = express();

// all environments
app.set('port', 3000);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '50mb'}))
app.use(express.static(path.join(__dirname, '.')));

app.use('/action', proxy('camino.stackroute.com', {
    https: true,
    proxyReqPathResolver: function(req) {
        return "/action" + urlHelper.parse(req.url).path;
    },
    proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
        // you can update headers 
        proxyReqOpts.headers['Content-Type'] = 'application/json';
        proxyReqOpts.headers['user-id'] = 'content-editor';
        proxyReqOpts.headers['Authorization']= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmMzU5MzdlOWZmY2U0OWVjOTFhMWM2ZjNiMGRkODNjZSJ9.-TFevs_hwibGVswDBJhhgcJ3I4jEi1_dWuiNHsqMOoc';
        proxyReqOpts.headers['x-authenticated-user-token'] = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ1S3RNazNCdDVOTC1QWWNSbV9iSk1Ndm4teWFGeDhoc2NyOUVXZDZwdzhVIn0.eyJqdGkiOiJiYWRjMzNhOS1iZGZlLTRmZjctYmE2NC01NDZkMGJiNzMzMWYiLCJleHAiOjE1NTcyNDYwMjcsIm5iZiI6MCwiaWF0IjoxNTU3MjI0NDI3LCJpc3MiOiJodHRwczovL2NhbWluby5zdGFja3JvdXRlLmNvbS9hdXRoL3JlYWxtcy9zdW5iaXJkIiwiYXVkIjoiYWRtaW4tY2xpIiwic3ViIjoiNmYzMjRkYjctMzJhNS00NDM3LWE0NTEtMzVjZjUzMjY5YWFmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWRtaW4tY2xpIiwiYXV0aF90aW1lIjowLCJzZXNzaW9uX3N0YXRlIjoiOTY0YzNkZDAtMTVlYi00YTg3LTgzNTktODhiYjliYTdhOWJiIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6W10sInJlc291cmNlX2FjY2VzcyI6e30sIm5hbWUiOiJBZGl0eWEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZGl0eWEiLCJnaXZlbl9uYW1lIjoiQWRpdHlhIiwiZW1haWwiOiJhZGl0eWFAbmlpdC5jb20ifQ.gQiSqCLushD5OI6SytoJkLJfELAaLkwDx2Gs67sYptUxyEllv3qYAShSCowXNmjHnUHI3wN7Vwxzd7VJZcfwDtE61RiZ1k_pl9Ib2LBwTG-h-imYRKrVFY9K4Yln45fJChXurYRhUNmp5-dYkJNYOeaf79W4eTgru1qzoAYOZTklHVcT30-LAqa4jDUD826fk1CMJrOikZo5SnZYchPe-td3z5BkgHnO2_0AJpQdzksLfXyex0BD4iJ5hr6A5I1zT_MyBz2HjNGtyzbgP1NBUXiR7kir83zvlQX0aah8-25GqS4MoqWpkNKA9152TqWwF_Cb1Aku3fIsUNooLNh0eg';
        return proxyReqOpts;
    }
}));

var routes = __dirname + '/server/routes', route_files = fs.readdirSync(routes);
route_files.forEach(function (file) {
    require(routes + '/' + file)(app, __dirname);
});

var server = http.createServer(app).listen(app.get('port'), 1500);
server.timeout = 0;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';