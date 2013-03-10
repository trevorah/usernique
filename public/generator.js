
var vowels = ["a","e","i","o","u"];
var consanants = ["b","c","d","f","g","h","j","k","l","m","n","p","r","s","t","v","w","x","y","z"];

var length = 3 + Math.floor(Math.random()*7);
var name = "";

for(var i = 0; i < length; i++) {
	var letter = "";
	if(i % 2 == 0) {
		letter = vowels[Math.floor(Math.random()*vowels.length)];
	} else {
		letter = consanants[Math.floor(Math.random()*consanants.length)];
	}
	name = name + letter;
}

$("#username").text(name);
$("#twitter-url").text("twitter.com/"+name).attr("href","http://www.twitter.com/"+name);
$("#github-url").text("github.com/"+name).attr("href","http://www.github.com/"+name);
$("#io-url").text(name+".io").attr("href","http://www."+name+".io");
$("#com-url").text(name+".com").attr("href","http://www."+name+".com");

$.get("github/" + name, function(data) {
	if(data == "free") {
		$("#github").attr("class", "icon-ok");
	} else if(data == "taken") {
		$("#github").attr("class", "icon-remove");
	} else {
		$("#github").attr("class", "icon-question-sign");
	}
});

$.get("twitter/" + name, function(data) {
	if(data == "free") {
		$("#twitter").attr("class", "icon-ok");
	} else if(data == "taken") {
		$("#twitter").attr("class", "icon-remove");
	} else {
		$("#twitter").attr("class", "icon-question-sign");
	}
});

$.get("io/" + name, function(data) {
	if(data == "free") {
		$("#io").attr("class", "icon-ok");
	} else if(data == "taken") {
		$("#io").attr("class", "icon-remove");
	} else {
		$("#io").attr("class", "icon-question-sign");
	}
});

$.get("com/" + name, function(data) {
	if(data == "free") {
		$("#com").attr("class", "icon-ok");
	} else if(data == "taken") {
		$("#com").attr("class", "icon-remove");
	} else {
		$("#com").attr("class", "icon-question-sign");
	}
});
