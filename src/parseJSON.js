// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
	var index = 0;
	var consumeJSON = function(){
		if (isString(json[index])){
			return consumeString();
		} else if (isNumeric(json[index])) {
			return consumeNumeric();
		} else if (isArray(json[index])){
			return consumeArray();
		} else if (isObject(json[index])){
			return consumeObject();
		} else if(isNull()){
			return consumeNull();
		}
		else if(isBoolean()){
			return consumeBoolean();
		}
		else{
			throw new Error('unhandled case or invalid string');
		}
	};
	var isString = function(character){
		return character === '"';
	};
	var isNumeric = function(character){
		return !isNaN(character) || character === "-";
	};
	var isArray = function(character){
		return character === '[';
	};
	var isObject = function(character){
		return character === '{';
	};
	var isNull = function(){
		return json.substring(index, index + 4) === "null";
	};
	var isBoolean = function(){
		return json.substring(index, index + 4) === "true" || json.substring(index, index + 5) === "false";
	};
	var consumeString = function(){
		var resultString = '';
		index++;
		while (json[index] !== '"'){
			if (json[index] === "\\"){
				throw new Error('invalid string');
			}
			resultString += json[index];
			index++;
		}
		index++;
		return resultString;
	};
	var consumeNumeric = function(){
		var resultNumber = '';
		while(isNumeric(json[index]) || json[index] === "." || json[index] === "-"){
			resultNumber += json[index];
			index++;
		}
		return Number(resultNumber);
	};
	var consumeArray = function(){
		var resultArray = [];
		index++;
		while(json[index] !== "]"){
			if(json[index] === ","){
				index++;
			}
			resultArray.push(consumeJSON());
		}
		index++;
		return resultArray;
	};
	var consumeObject = function(){
		var resultObject = {};
		index++;
		while(json[index] !== "}"){
			if (json[index] === ","){
				index++;
			}
			var key = consumeJSON();
			index++;
			var value = consumeJSON();
			resultObject[key] = value;
		}
		index++;
		return resultObject;
	};
	var consumeNull = function(){
		index +=4;
		return null;
	};
	var consumeBoolean = function(){
		if (json.substring(index, index + 4) === "true"){
			index += 4;
			return true;
		}
		else {
			index +=5;
			return false;
		}
	};
	var result = consumeJSON();
	if (index < json.length){
		throw new Error('didnt parse everything');
	}
	return result;
};
