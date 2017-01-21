var globals = globals || {};
;(function init() {
	//Launched a function, incrementing number of launched functions
	var launch = function launch(func) {
		return func();
	};

	//Turn the FAQ questions to links so that users can send a link to an FAQ.
	//The page will automatically scroll to one of these FAQs if a link to one is clicked
	var linkFaqs = function linkFaqs() {
		links = document.querySelectorAll("#faq-container > h2");
		for(var i = 0; i < links.length; i++) {
			links[i].id = "faq-" + i;
			var text = links[i].innerHTML;
			var loc = window.location.origin + "#faq-" + i;
			links[i].innerHTML = "<a href='" + loc + "'>" + text + "</a>";
		}
		exit_launch();
	};

	var getSponsors = function getSponsors() {
		var createSponsor = function createSponsor(tgt, data, i) {
			var elem = document.createElement('a');
			elem.className = "sponsor";

			if(data[i].href)
				elem.href = data[i].href;

			elem.style.width = data[i].img_width;
			elem.style.height = data[i].img_height;
			elem.style.backgroundImage = "url('static/img/sponsor_logos/" + data[i].img + "')";
			elem.style.backgroundSize = "100%";
			elem.target = "_blank";

			tgt.appendChild(elem);
		};

		$.getJSON("static/res/sponsors.json", function downloadedSponsors(data) {
			var target = document.querySelectorAll("#sponsors-flex")[0];

			for(var i = 0; i < data.length; i++) {
				createSponsor(target, data, i);
			}

			exit_launch();
		});
	};

	var getSchedule = function getSchedule() {
		$.getJSON("static/res/schedule.json", function downloadedSchedule(data) {
			var schedule = document.getElementById("schedule");
			//For each day
			var tbl = document.createElement("table");
			tbl.className = "schedule-tbl";

			for(var i = 0; i < data.length; i++) {
				//Create elements
				var hdr = document.createElement("tr");
				var hdr_e = document.createElement("th");
				//Set the characteristics
				hdr_e.innerHTML = data[i].day;
				hdr_e.colSpan = "2";
				//Append the elements onto each other
				hdr.appendChild(hdr_e);
				tbl.appendChild(hdr);

				for(var j = 0; j < data[i].schedule.length; j++) {
					var row = document.createElement("tr");
					var tm = document.createElement("td");
					var ds = document.createElement("td");
					tm.innerHTML = data[i].schedule[j].time;
					ds.innerHTML = data[i].schedule[j].desc;
					row.appendChild(tm);
					row.appendChild(ds);
					tbl.appendChild(row);
				}
			}
			schedule.appendChild(tbl);
			exit_launch();
		});
	};

	var max = function max(a, b) {
		if(a > b) return a;
		else return b;
	}

	var getLinks = function getLinks() {
		$.getJSON("static/res/links.json", function processLinks(data) {
			console.log(data);
			for(var i = 0; i < data.length; i++) {
				//Add the link
				var selector = data[i].selector;
				var href = data[i].href;
				var text = data[i].text;
				var target = data[i].target;

				$(selector).each(function setLink(x, obj) {
					var o = $(obj);
					o.attr('href', href);
					if(target) o.attr('target', target);
					o.html(text);
				});
			}
			exit_launch();
		});
	};

	globals.scrollTo = globals.scrollTo || function scrollTo(elem) {
		$('html, body').animate({
			scrollTop: max(0, $(elem).offset().top - 64) + 'px'
		}, 1000, 'swing');
	}


	function throttle(ms, fn) {
		var allow = true;
		function enable() {
			allow = true;
		}
		return function() {
			if (allow) {
				allow = false;
				setTimeout(enable, ms);
				fn.call(this);
			}
		}
	}

	//Initialize the website
	$(document).ready(function doInit() {
		var $navbar = $("#section-links");

		function resize() {
			var scrollTop = $(this).scrollTop();
			var y_pos = $navbar.offset().top;
			if (scrollTop > y_pos) {
				$navbar.addClass("link-navbar-fixed");
			} else {
				$navbar.removeClass("link-navbar-fixed");
			}
		}
		
		$(document).scroll(throttle(50, resize));
		$(window).resize(throttle(50, resize));

		launch(linkFaqs);
		launch(getSponsors);
		//launch(getLinks);
		launch(getSchedule());

		//Set the email addresses after a timeout. Kills spambots :)
		setTimeout(function setEmailAddresses() {
			$(".email-btn").attr("href", "mailto" + ":contac" + "t@swhacks.io");
		}, 1000);
	});
})();