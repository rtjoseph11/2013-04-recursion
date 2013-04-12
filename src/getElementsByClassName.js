// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
var returnArray = [];
var helper = function(selector){
	for (var i = 0; i < selector.length; i++){
		if ($(selector[i]).hasClass(className)){
			returnArray.push(selector[i]);
		}
		else if ($(selector[i]).children() !== []){
			helper($(selector[i]).children());
		}
	}
};
helper($(document));
return returnArray;
};
