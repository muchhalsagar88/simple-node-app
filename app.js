var http = require('http'),
	redis = require('redis');

var client = redis.createClient({
	host: process.env.REDIS_PORT_6379_TCP_ADDR,	
	port: 6379
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var serveRequest = function(){

	var prime_number = 100109,
		rand_num = getRandomInt(1, 100000000);
    while(rand_num > 1000000 || rand_num % prime_number != 0)
        rand_num = getRandomInt(1, 100000000)

    return ''+rand_num; 
}

var requestHandler = function(req, res) {
	var hrstart = process.hrtime();
	res.writeHead(200);
    res.write(serveRequest());
    res.end();
    hrend = process.hrtime(hrstart);
    client.lpush('latency', hrend[1]/1000000);
}

var server = http.createServer(requestHandler);
 
var port = 5000;
server.listen(port, function() {
    console.log('server listening on port ' + port);
});