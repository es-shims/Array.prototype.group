'use strict';

var callBind = require('call-bind');
var test = require('tape');

var bound = require('../');
var runTests = require('./tests');

test('as a function', function (t) {
	t.test('bad array/this value', function (st) {
		st['throws'](callBind(bound, undefined, function () {}), TypeError, 'undefined is not an object');
		st['throws'](callBind(bound, null, function () {}), TypeError, 'null is not an object');
		st.end();
	});

	runTests(bound, t);

	t.end();
});
