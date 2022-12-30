 HTTP request
			// written to it (which may contain `Authorization` headers or other
			// sensitive data).
			//
			// See: https://hackerone.com/reports/541502
			socket.destroy();
			socket = new net.Socket();
			socket.readable = true;

			// save a reference to the concat'd Buffer for the `onsocket` callback
			buffers = buffered;

			// need to wait for the "socket" event to re-play the "data" events
			req.once('socket', onsocket);

			fn(null, socket);
		}
	}

	function onsocket(socket) {
		debug('replaying proxy buffer for failed request');
		assert(socket.listenerCount('data') > 0);

		// replay the "buffers" Buffer onto the `socket`, since at this point
		// the HTTP module machinery has been hooked up for the user
		socket.push(buffers);

		// nullify the cached Buffer instance
		buffers = null;
	}

	socket.on('error', onerror);
	socket.on('close', onclose);
	socket.on('end', onend);

	read();

	var hostname = opts.host + ':' + opts.port;
	var msg = 'CONNECT ' + hostname + ' HTTP/1.1\r\n';

	var headers = Object.assign({}, proxy.headers);
	if (proxy.auth) {
		headers['Proxy-Authorization'] =
			'Basic ' + Buffer.from(proxy.auth).toString('base64');
	}

	// the Host header should only include the port
	// number when it is a non-standard port
	var host = opts.host;
	if (!isDefaultPort(opts.port, opts.secureEndpoint)) {
		host += ':' + opts.port;
	}
	headers['Host'] = host;

	headers['Connection'] = 'close';
	Object.keys(headers).forEach(function(name) {
		msg += name + ': ' + headers[name] + '\r\n';
	});

	socket.write(msg + '\r\n');
};

/**
 * Resumes a socket.
 *
 * @param {(net.Socket|tls.Socket)} socket The socket to resume
 * @api public
 */

function resume(socket) {
	socket.resume();
}

function isDefaultPort(port, secure) {
	return Boolean((!secure && port === 80) || (secure && port === 443));
}
{
  "name": "https-proxy-agent",
  "version": "4.0.0",
  "description": "An HTTP(s) proxy `http.Agent` implementation for HTTPS",
  "main": "./index.js",
  "types": "./index.d.ts",
  "scripts": {
    "test": "mocha --reporter spec"
  },
  "repository": {
    "type": "git",
    "url": "git://github.com/TooTallNate/node-https-proxy-agent.git"
  },
  "keywords": [
    "https",
    "proxy",
    "endpoint",
    "agent"
  ],
  "author": "Nathan Rajlich <nathan@tootallnate.net> (http://n8.io/)",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/TooTallNate/node-https-proxy-agent/issues"
  },
  "dependencies": {
    "agent-base": "5",
    "debug": "4"
  },
  "devDependencies": {
    "mocha": "6",
    "proxy": "1"
  },
  "engines": {
    "node": ">= 6.0.0"
  }
}
https-proxy-agent
================
### An HTTP(s) proxy `http.Agent` implementation for HTTPS
[![Build Status](https://github.com/TooTallNate/node-https-proxy-agent/workflows/Node%20CI/badge.svg)](https://github.com/TooTallNate/node-https-proxy-agent/actions?workflow=Node+CI)

This module provides an `http.Agent` implementation that connects to a specified
HTTP or HTTPS proxy server, and can be used with the built-in `https` module.

Specifically, this `Agent` implementation connects to an intermediary "proxy"
server and issues the [CONNECT HTTP method][CONNECT], which tells the proxy to
open a direct TCP connection to the destination server.

Since this agent implements the CONNECT HTTP method, it also works with other
protocols that use this method when connecting over proxies (i.e. WebSockets).
See the "Examples" section below for more.


Installation
------------

Install with `npm`:

``` bash
$ npm install https-proxy-agent
```


Examples
--------

#### `https` module example

``` js
var url = require('url');
var https = require('https');
var HttpsProxyAgent = require('https-proxy-agent');

// HTTP/HTTPS proxy to connect to
var proxy = process.env.http_proxy || 'http://168.63.76.32:3128';
console.log('using proxy server %j', proxy);

// HTTPS endpoint for the proxy to connect to
var endpoint = process.argv[2] || 'https://graph.facebook.com/tootallnate';
console.log('attempting to GET %j', endpoint);
var options = url.parse(endpoint);

// create an instance of the `HttpsProxyAgent` class with the proxy server information
var agent = new HttpsProxyAgent(proxy);
options.agent = agent;

https.get(options, function (res) {
  console.log('"response" event!', res.headers);
  res.pipe(process.stdout);
});
```

#### `ws` WebSocket connection example

``` js
var url = require('url');
var WebSocket = require('ws');
var HttpsProxyAgent = require('https-proxy-agent');

// HTTP/HTTPS proxy to connect to
var proxy = proces