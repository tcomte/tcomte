$(document).ready(function(){
	init();
});

function init(){
	$("#waiter").hide();
	$("div.container-fluid > div.row:not(#waiter)").fadeIn();
	setTabSize();

	var hashtab = document.location.hash != ""?document.location.hash.split("#")[1]:"home";
	var hashlang = localStorage.getItem("lang") != null ? localStorage.getItem("lang") :"en";
	localStorage.setItem("lang",hashlang);

	$("img.lang").removeClass("active");
	$("img.lang[data-lang$="+hashlang+"]").addClass("active");

	i18n.init({ lng: hashlang}, function() {
      // save to use translation function as resources are fetched
    	$("body").i18n();
  	});

	$("ul.nav > li > a").click(function(e){
		document.location.hash = $(this).attr("href").split("#")[1];
		switchBackground($(this).attr("data-background"));
		var html = $("section"+$(this).attr("href")).html();
		$("section"+$(this).attr("href")+" article").hide();
		$("section"+$(this).attr("href")+" article").fadeAll();
		var header = $(this);
		$("div.header h3").removeClass("active");
		$("div.header h3#quote"+header.attr("href").split("#")[1]).addClass("active");
	});

	$("section article").hide();
	$('a[href$="'+hashtab+'"]').click();
}

function setLang(lang){
	$("img.lang").removeClass("active");
	$("img.lang[data-lang$="+lang+"]").addClass("active");
	localStorage.setItem("lang",lang);
	i18n.setLng(lang, function(t) { $(".container-fluid").i18n(); });
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

function insertParam(key, value)
{
    key = encodeURI(key); value = encodeURI(value);

    var kvp = document.location.search.substr(1).split('&');

    var i=kvp.length; var x; while(i--) 
    {
        x = kvp[i].split('=');

        if (x[0]==key)
        {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }

    if(i<0) {kvp[kvp.length] = [key,value].join('=');}

    //this will reload the page, it's likely better to store this until finished
    document.location.search = kvp.join('&'); 
}

$.fn.fadeAll = function (ops) {
	var o = $.extend({
		delay: 500,
		speed: 500,
    ease: 'swing' // Other requires easing plugin
}, ops);
	var $el = this;
	for (var i=0, d=0, l=$el.length; i<l; i++, d+=o.delay) {
		$el.eq(i).delay(d).fadeIn(o.speed, o.ease);
	}
	return $el;
};

$(window).resize(function(){
	setTabSize();
	
});

function setTabSize(){
	var height = $(window).height();
	var tabheight = height - 151;

	$(".tab-content").css("height",tabheight);
};

function switchBackground(url){
	$("body").css("background-image","url("+url+")");
}