'use strict';

var inspect = require('object-inspect');
var forEach = require('foreach');
var v = require('es-value-fixtures');

module.exports = function (group, t) {
	t.test('callback function', function (st) {
		forEach(v.nonFunctions, function (nonFunction) {
			st['throws'](
				function () { group([], nonFunction); },
				TypeError,
				inspect(nonFunction) + ' is not a function'
			);
		});

		st.end();
	});

	t.test('grouping', function (st) {
		st.deepEqual(
			group([], function () { return 'a'; }),
			{ __proto__: null },
			'an empty array produces an empty object'
		);

		var arr = [0, -0, 1, 2, 3, 4, 5, NaN, Infinity, -Infinity];
		var parity = function (x) {
			if (x !== x) {
				return void undefined;
			}
			if (!isFinite(x)) {
				return '∞';
			}
			return x % 2 === 0 ? 'even' : 'odd';
		};
		var grouped = {
			__proto__: null,
			even: [0, -0, 2, 4],
			odd: [1, 3, 5],
			undefined: [NaN],
			'∞': [Infinity, -Infinity]
		};
		st.deepEqual(
			group(arr, parity),
			grouped,
			inspect(arr) + ' group by parity groups to ' + inspect(grouped)
		);

		var sentinel = {};
		st.deepEqual(
			group(arr, function (x, i, a) {
				st.equal(this, sentinel, 'receiver is as expected'); // eslint-disable-line no-invalid-this
				st.equal(x, arr[i], 'second argument ' + i + ' is ' + inspect(arr[i]));
				st.equal(a, arr, 'third argument is array');
				return 42;
			}, sentinel),
			{ __proto__: null, 42: arr },
			'thisArg and callback arguments are as expected'
		);

		st.end();
	});
};
