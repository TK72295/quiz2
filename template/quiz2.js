(function(){
	// This is where you will write your function for the programming challenge
	// Do not commit console.log statements
	// Use ajax to reach the api endpoint
	// Whether or not you use jQuery, you still have to fix the jQuery errors. Removing jQuery is not fixing the problem.

	$mouseover = $('.mouseover');
	$click     = $('.click');
	$submit    = $('.submit');
	var dataStuff;
	var numChanges = 0;
	var lastword = "";

	$mouseover.mouseover(function() {
		$(this).html('Scrooge McDuck!');
		$(this).height($(this).height() + 50);
	});

	$click.click(function() {
		$(this).html('Peace Out!');
		jQuery(this).fadeOut(1500);
		return false;
	});

	$('#mainform').on('submit', function(e) {
		e.preventDefault();
		
		if ($(this).find('input.thing').val() !== '') {
			$(this).find('input').each(function() {
				jQuery(this).fadeOut('slow');
			});
			$(this).append('<h2>Congratulations! You\'ve entered some text!</h2>');
		}
	});

	$(document).on('ready', function() {
		$(".timeoutclass").hide();
		setTimeout(function(){
			$(".timeoutclass").fadeIn('slow');
		}, 1000);

		if(document.cookie){
			lastword = document.cookie;
			$('#output').html(lastword);
			document.cookie = "lastword=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
		}
	});

	$(document).on("click", "#keepbtn", function(){
		document.cookie="Last time you got: "+lastword;
	});

	$("#button").click(function(){

		var jqxhr = $.ajax({
			dataType: "json",
			url: "http://www.mattbowytz.com/simple_api.json?data=quizData",
			error: function(){
				console.log("ERROR");
			},
			success: function(data){
				dataStuff = data['data'];
				var index = Math.floor(Math.random() * dataStuff.length);

				$('#output').html(dataStuff[index]);
				lastword = dataStuff[index];
				$('#button').text("Change It");
			},
			type: 'GET'
		});
		numChanges+=1;
		if(numChanges == 1){
			var btn = document.createElement("BUTTON");
			btn.setAttribute('id', 'keepbtn');
			btn.setAttribute('type', 'button');
			var t = document.createTextNode("Keep It");
			btn.appendChild(t);
			var location = document.getElementById("section2");
			location.appendChild(btn);
		}
	});

	


})(jQuery);