
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

$.get("github/" + name, function(data) {
	if(data == "free") {
		$("#github").attr("class", "icon-ok");
	} else {
		$("#github").attr("class", "icon-remove");
	}
});

$.get("twitter/" + name, function(data) {
	if(data == "free") {
		$("#twitter").attr("class", "icon-ok");
	} else {
		$("#twitter").attr("class", "icon-remove");
	}
});
