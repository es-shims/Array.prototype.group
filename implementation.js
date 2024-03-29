'use strict';

var AddValueToKeyedGroup = require('es-abstract/2024/AddValueToKeyedGroup');
var Call = require('es-abstract/2024/Call');
var CreateDataPropertyOrThrow = require('es-abstract/2024/CreateDataPropertyOrThrow');
var Get = require('es-abstract/2024/Get');
var IsCallable = require('es-abstract/2024/IsCallable');
var LengthOfArrayLike = require('es-abstract/2024/LengthOfArrayLike');
var OrdinaryObjectCreate = require('es-abstract/2024/OrdinaryObjectCreate');
var ToObject = require('es-object-atoms/ToObject');
var ToPropertyKey = require('es-abstract/2024/ToPropertyKey');
var ToString = require('es-abstract/2024/ToString');

var $TypeError = require('es-errors/type');

var forEach = require('es-abstract/helpers/forEach');

module.exports = function group(callbackfn) {
	var O = ToObject(this); // step 1
	var len = LengthOfArrayLike(O); // step 2

	if (!IsCallable(callbackfn)) {
		throw new $TypeError('callbackfn must be a function'); // step 3
	}

	var thisArg;
	if (arguments.length > 1) {
		thisArg = arguments[1];
	}

	var k = 0; // step 4
	var groups = []; // step 5
	while (k < len) { // step 6
		var Pk = ToString(k);
		var kValue = Get(O, Pk);
		var propertyKey = ToPropertyKey(Call(callbackfn, thisArg, [kValue, k, O]));
		AddValueToKeyedGroup(groups, propertyKey, kValue);
		k += 1;
	}

	var obj = OrdinaryObjectCreate(null); // step 7
	forEach(groups, function (g) { // step 8
		// var elements = CreateArrayFromList(g.Elements);
		CreateDataPropertyOrThrow(obj, g['[[Key]]'], g['[[Elements]]']);
	});

	return obj; // step 9
};
