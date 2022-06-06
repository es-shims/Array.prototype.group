'use strict';

var define = require('define-properties');
var shimUnscopables = require('es-shim-unscopables');

var getPolyfill = require('./polyfill');

module.exports = function shim() {
	var polyfill = getPolyfill();

	define(
		Array.prototype,
		{ group: polyfill },
		{ group: function () { return Array.prototype.group !== polyfill; } }
	);

	shimUnscopables('group');

	return polyfill;
};
