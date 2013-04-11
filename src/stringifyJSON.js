// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  var returnValue;
  switch(typeof obj){
  	case "string":
  		returnValue = '"' + obj + '"';
  		break;
  	case "number":
  		returnValue = obj.toString();
  		break;
  	case "undefined":
  		returnValue = obj;
  		break;
  	case "boolean":
  		returnValue = obj.toString();
  		break;
  	case "object":
  		switch(true){
  			case !Boolean(obj):
  				returnValue = 'null';
  				break;
  			case Array.isArray(obj):
  				returnValue = '[';
  				for (var i = 0; i < obj.length; i++){
  					if (i > 0){
  						returnValue += ',';
  					}
  					returnValue += stringifyJSON(obj[i]);
  				}
  				returnValue += ']';
  				break;
  			default:
  				returnValue = '{';
  				for (var item in obj){
  					if (typeof obj[item] != 'function' && typeof obj[item] != 'undefined' && typeof item != 'undefined'){
  						if (item !== Object.keys(obj)[0]){
  							returnValue += ',';
  						}
  						returnValue += '"' + item + '":' + stringifyJSON(obj[item]);
  					}
  				}
  				returnValue += '}';
  		}
  		break;
  }
  return returnValue;
};
