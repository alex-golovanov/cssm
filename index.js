var express = require('express')
var https = require('https')
var fs = require('fs')
var pem = require('pem')

pem.createCertificate({days: 30, selfSigned: true}, function(err, keys){

  var app = new (express)()
	var port = process.env.PORT || 4444
	var env = process.env.NODE_ENV || 'production'

	app.use(express.static('static'))

	app.get('*', function(request, response){
	  response.sendFile(__dirname + '/static/index.html')
	})

  https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(port, function(error) {
		if (error) {
			console.error(error)
		} else {
			console.info("==> 🌎  Listening on port %s. Open up https://localhost:%s/ in your browser.", port, port)
		}
	})

})