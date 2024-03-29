var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var express = require('express')
var https = require('https')
var fs = require('fs')
// var pem = require('pem')

var keys = {
	csr: '-----BEGIN CERTIFICATE REQUEST-----\nMIICWTCCAUECAQAwFDESMBAGA1UEAxMJbG9jYWxob3N0MIIBIjANBgkqhkiG9w0B\nAQEFAAOCAQ8AMIIBCgKCAQEAnA4dGCz2PJMJcQ10AVZIzYGGjyJVfhtWvqYbEWd5\nsrFP6+xQnRK+yfKsQqNeCy8zIkekwbkAtDvQ0RjZa9ETHG3aznOHutIHOn9zJvXV\nfG/QTdThsQoenRxCvO8p/k6Plp+w8+s3M0FpS9e6OMpDsLcx57ytP3AAyTsSX35k\nFr17woNZSNgeEspOfHhysMApjxtyPFhioZR7bfrvW/dcLczHcALx7Oz2LR5qAcEn\nelyw3DRzJg0dVHBBI8kbjNw3gd1sAcaGK0cgayQWAgp65yMhJf9sXcG3FMGuWlVN\n5+akvAyiUUdI7JhfrwYrNBsrf48nEk8wsbpCigdcX5aV/QIDAQABoAAwDQYJKoZI\nhvcNAQELBQADggEBACPTuBdZkazhGYf4drJaSMF5kBB0t1+2I2faz5JrdaaEFTug\nxNdCoHoLzrkZycJG4Me4kKafruTNr/QnrCN6Vdif6wzngIC/Kb20x/Mc9E3y70/e\nm8qSaWSdZYTSf4ouEM3ehzDo5eyT+MPPz5VqQLrPlXZbdpFMHhyao7NwT1a3otas\nCvXVwRcKE4br2h7dS1nje+ymfLLJLcbaVCiUI3R0M8wmYSmcHr+P0lPZLisioYSH\ng23kEUtSqGqlhEOiBo4/c4mRDiMF1ZMWvp4GJ2afeuzJ+eZ1pcruCSt82WHHtxJK\nKUvZx0NQlciZIit2MHIjtFDI9jHper/vEGLfBco=\n-----END CERTIFICATE REQUEST-----',
	clientKey: '-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAnA4dGCz2PJMJcQ10AVZIzYGGjyJVfhtWvqYbEWd5srFP6+xQ\nnRK+yfKsQqNeCy8zIkekwbkAtDvQ0RjZa9ETHG3aznOHutIHOn9zJvXVfG/QTdTh\nsQoenRxCvO8p/k6Plp+w8+s3M0FpS9e6OMpDsLcx57ytP3AAyTsSX35kFr17woNZ\nSNgeEspOfHhysMApjxtyPFhioZR7bfrvW/dcLczHcALx7Oz2LR5qAcEnelyw3DRz\nJg0dVHBBI8kbjNw3gd1sAcaGK0cgayQWAgp65yMhJf9sXcG3FMGuWlVN5+akvAyi\nUUdI7JhfrwYrNBsrf48nEk8wsbpCigdcX5aV/QIDAQABAoIBAHuoJ1/PyPKo5JNj\nwKeKkrfdSh3DbBE4Yp1BjDNXVjTFkfn1UM+WWf42QE+xmkSsiw0/zgr/qNIoj8gQ\ns8BedJFTb02meEgOQ1IUSc/2fstS4rG53Xjm9ukxyqRhs1njMJ5/Pb2ahiwkSeai\nM9rqU4cFMxNZC8M34jeSinWG9pKZKEpgk3RnD8HV/BmlJagS2IkEuaON7GzTiFLm\nc4MUdwEVPtswqD84Tik58k9kivnkqZHe7khUbXhuSu9Ekcm3TZs8E2/iWvAIp51h\nhpV2cGenPOX8tvfUB3Vecrz6frzDm+nBI675nW9F2TpMNPkEFNtmgfqFmJw556Ct\nDxxHllUCgYEAzOzwgRlWmXDLJ2AQQ/XmqFR9Hjwh7Cu81wy6aPC7j6fo8Bcv3D/X\nnQvPEMA1T4GrdfStgTd6jq0uOfQZdDEpIs3S1rDNnjuAnxnaW43JkgfTOaCIzPYs\nWBWXh8UJrs4xO5nSeP5nI2yqzI1hnid19RtYnA3zw7Imvn2r7zeAye8CgYEAwvMM\nZ54rGyT30p/Cpj9UpMbxlg0o+vb6lR7e9L786AwbhEBNVkjHGTSD5U9LspfK5rk+\n0vApSAM7ITY+t0ZHpy3nL2+isp2vOq5Moc5bZGh4fLmYkruamZkbczeIbL9+sszU\nxtgcoD4qX8npxDNr5XvzygmANb490KvgTihQOtMCgYEAowNUag3i8ppkMMVdCwLA\nYmUbRoLlJT7BsHwCiVn+ic8zIFIBk34BoX70T8nmXoGzCFkD8EdWqcqffCBuYxx8\nMaBzOK9aUaXZsjZZmfzXPOAWqb/HMuwc6FD8wlb+VdzWEyhQ4kjVeLuHvsI0xh9z\n2O/Q9AqxP5om8d98dwW64GcCgYBZYplgdSwskQG0KB5WnZkQyEsC0tvkXhO9Bd+S\ndnN9bfe75sPO+SWYz/Rd0sLRizm0GmHM0+MJqrmU28tbuzSlWa2zmUsO/K/YhwyJ\n8BUFb8U24t4rASu8m2/znxXFTvQnxTUWSwatDnPdYbX2iOFC4leAXmTTv3uWTwhU\nrbVDkwKBgQCl96/QnOchH5x8uulAyoP1/Sw3QfrvRQ1uTRWUMJXPXDSwKaP3htjw\n2/FPJmCog63qAcI+a6Gm26VLj3dW3XH4yAUV6eiUCPzHQLNASZXgQHKquiR9OPDB\nXBEeE0y/J6C8Pq9EVjXk1mcamBTwUvmWgkcoqIxUspUAJHfajUsxaw==\n-----END RSA PRIVATE KEY-----',
	certificate: '-----BEGIN CERTIFICATE-----\nMIICpDCCAYwCCQDcvWx4cgIslTANBgkqhkiG9w0BAQsFADAUMRIwEAYDVQQDEwls\nb2NhbGhvc3QwHhcNMTcwODI5MDY0MTUwWhcNMTgwODI5MDY0MTUwWjAUMRIwEAYD\nVQQDEwlsb2NhbGhvc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCc\nDh0YLPY8kwlxDXQBVkjNgYaPIlV+G1a+phsRZ3mysU/r7FCdEr7J8qxCo14LLzMi\nR6TBuQC0O9DRGNlr0RMcbdrOc4e60gc6f3Mm9dV8b9BN1OGxCh6dHEK87yn+To+W\nn7Dz6zczQWlL17o4ykOwtzHnvK0/cADJOxJffmQWvXvCg1lI2B4Syk58eHKwwCmP\nG3I8WGKhlHtt+u9b91wtzMdwAvHs7PYtHmoBwSd6XLDcNHMmDR1UcEEjyRuM3DeB\n3WwBxoYrRyBrJBYCCnrnIyEl/2xdwbcUwa5aVU3n5qS8DKJRR0jsmF+vBis0Gyt/\njycSTzCxukKKB1xflpX9AgMBAAEwDQYJKoZIhvcNAQELBQADggEBAB+RjajdaP6C\nyM866uFRNSNuUTBbKbqhZKZdo/tOizZbascaZlvIKBvkQkXrmRE+7trIAmRZD0jS\n0WVrFtYyyqhrvyzS6EDa81ZERJGpdxy+1/Lcw2KPncyVfuQ3567qeveCxkbpOSeK\nnAglNWpkL7y4TNtGG11bvDRhE9AlhuGbNuEOhmUnEDLDOazUWD0Vq/kopye8DJtV\n+/0tre4L5n2ac2wYzk9JGMvk5j54Va/6yJRRV9I3rjfvnsngrI3SfULt8ClWrNcP\nedkfsZ0XOv4m20fUQbLiGpgTbgXTSL/I5iwhaTB+XX48wppWbXxomh6Jn9JfaUqt\nDE1DERce9Ik=\n-----END CERTIFICATE-----',
	serviceKey: '-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAnA4dGCz2PJMJcQ10AVZIzYGGjyJVfhtWvqYbEWd5srFP6+xQ\nnRK+yfKsQqNeCy8zIkekwbkAtDvQ0RjZa9ETHG3aznOHutIHOn9zJvXVfG/QTdTh\nsQoenRxCvO8p/k6Plp+w8+s3M0FpS9e6OMpDsLcx57ytP3AAyTsSX35kFr17woNZ\nSNgeEspOfHhysMApjxtyPFhioZR7bfrvW/dcLczHcALx7Oz2LR5qAcEnelyw3DRz\nJg0dVHBBI8kbjNw3gd1sAcaGK0cgayQWAgp65yMhJf9sXcG3FMGuWlVN5+akvAyi\nUUdI7JhfrwYrNBsrf48nEk8wsbpCigdcX5aV/QIDAQABAoIBAHuoJ1/PyPKo5JNj\nwKeKkrfdSh3DbBE4Yp1BjDNXVjTFkfn1UM+WWf42QE+xmkSsiw0/zgr/qNIoj8gQ\ns8BedJFTb02meEgOQ1IUSc/2fstS4rG53Xjm9ukxyqRhs1njMJ5/Pb2ahiwkSeai\nM9rqU4cFMxNZC8M34jeSinWG9pKZKEpgk3RnD8HV/BmlJagS2IkEuaON7GzTiFLm\nc4MUdwEVPtswqD84Tik58k9kivnkqZHe7khUbXhuSu9Ekcm3TZs8E2/iWvAIp51h\nhpV2cGenPOX8tvfUB3Vecrz6frzDm+nBI675nW9F2TpMNPkEFNtmgfqFmJw556Ct\nDxxHllUCgYEAzOzwgRlWmXDLJ2AQQ/XmqFR9Hjwh7Cu81wy6aPC7j6fo8Bcv3D/X\nnQvPEMA1T4GrdfStgTd6jq0uOfQZdDEpIs3S1rDNnjuAnxnaW43JkgfTOaCIzPYs\nWBWXh8UJrs4xO5nSeP5nI2yqzI1hnid19RtYnA3zw7Imvn2r7zeAye8CgYEAwvMM\nZ54rGyT30p/Cpj9UpMbxlg0o+vb6lR7e9L786AwbhEBNVkjHGTSD5U9LspfK5rk+\n0vApSAM7ITY+t0ZHpy3nL2+isp2vOq5Moc5bZGh4fLmYkruamZkbczeIbL9+sszU\nxtgcoD4qX8npxDNr5XvzygmANb490KvgTihQOtMCgYEAowNUag3i8ppkMMVdCwLA\nYmUbRoLlJT7BsHwCiVn+ic8zIFIBk34BoX70T8nmXoGzCFkD8EdWqcqffCBuYxx8\nMaBzOK9aUaXZsjZZmfzXPOAWqb/HMuwc6FD8wlb+VdzWEyhQ4kjVeLuHvsI0xh9z\n2O/Q9AqxP5om8d98dwW64GcCgYBZYplgdSwskQG0KB5WnZkQyEsC0tvkXhO9Bd+S\ndnN9bfe75sPO+SWYz/Rd0sLRizm0GmHM0+MJqrmU28tbuzSlWa2zmUsO/K/YhwyJ\n8BUFb8U24t4rASu8m2/znxXFTvQnxTUWSwatDnPdYbX2iOFC4leAXmTTv3uWTwhU\nrbVDkwKBgQCl96/QnOchH5x8uulAyoP1/Sw3QfrvRQ1uTRWUMJXPXDSwKaP3htjw\n2/FPJmCog63qAcI+a6Gm26VLj3dW3XH4yAUV6eiUCPzHQLNASZXgQHKquiR9OPDB\nXBEeE0y/J6C8Pq9EVjXk1mcamBTwUvmWgkcoqIxUspUAJHfajUsxaw==\n-----END RSA PRIVATE KEY-----' 
}

// pem.createCertificate({days: 365, selfSigned: true}, function(err, keys){

  var app = new (express)()
	var port = process.env.PORT || 3000
	var env = process.env.NODE_ENV || 'production'

	var compiler = webpack(config)

	app.use(webpackDevMiddleware(compiler, {hot: true, noInfo: true, publicPath: config.output.publicPath}))
	app.use(webpackHotMiddleware(compiler))

	app.use(express.static('static'))

	app.get('*', function(request, response){
	  response.sendFile(__dirname + '/static/index.html')
	})

	// console.log(keys)

  https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(port, function(error) {
		if (error) {
			console.error(error)
		} else {
			console.info("Listening on port %s. Open up https://localhost:%s/ in your browser.", port, port)
		}
	})

// })