'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shim() {
	var polyfill = getPolyfill();
	define(
		Array.prototype,
		{ groupBy: polyfill },
		{ groupBy: function () { return Array.prototype.groupBy !== polyfill; } }
	);
	return polyfill;
};
