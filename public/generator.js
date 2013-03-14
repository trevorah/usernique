var vowels = ["a","e","i","o","u"];
var consanants = ["b","c","d","f","g","h","j","k","l","m","n","p","r","s","t","v","w","x","y","z"];
var modifiers = [
	function(s,i) { // th
		return (i && "dtsgjckpr".indexOf(s.substr(s.length-1),1) > -1?'u':false);
	},
	function(s) { // ea
		return (s.substr(s.length-1,1)=='e'?'u':false);
	},
	function(s,i) { // au / ou
		return (i && "oa".indexOf(s.substr(s.length-1,1)) > -1?'u':false);
	},
	function(s,i,l) { // aux
		return (s.substr(s.length-1,2)=='au' && l-i===1?'x':false);
	},
	function(s,i,l) { // ending y
		return (l-i===1?'y':false);
	}
];

var length = 3 + Math.floor(Math.random()*7);
var name = "";

for(var i = 0; i < length; i++) {
	var letter = "";
	var mod = modifiers[Math.floor(Math.random()*modifiers.length)](name,i,length);
	if (mod) {
		i += mod.length;
        name = name + mod;
	} else if(vowels.indexOf(name.substr(name.length-1,1)) < 0) {
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
		$("#io").attr("class", "icon-question-sign").attr("href", "http://www.io.io/cgi-bin/whois?query="+name+".io");
	}
});

$.get("com/" + name, function(data) {
	if(data == "free") {
		$("#com").attr("class", "icon-ok");
	} else if(data == "taken") {
		$("#com").attr("class", "icon-remove");
	} else {
		$("#com").attr("class", "icon-question-sign").attr("href", "http://whois.net/whois/"+name+".com");
	}
});
