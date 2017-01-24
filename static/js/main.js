var globals = globals || {};
;(function init() {
	var num_launched = 0;
	var on_exit = function null_on_exit() {};

	//Launched a function, incrementing number of launched functions
	var launch = function launch(func) {
		num_launched++;
		if(func)
			func();
	};
	var exit_launch = function exit_launch() {
		num_launched--;
		on_exit();
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

	var getStylesheets = function getStylesheets() {
		$.getJSON("static/res/stylesheets.json", function downloadedStylesheets(data) {
			head = document.querySelectorAll('head')[0];
			for(var i = 0; i < data.length; i++) {
				var elem = document.createElement('link');
				elem.rel = "stylesheet";
				elem.type = "text/css";
				elem.href = "static/css/" + data[i].url;
				head.appendChild(elem);
			}
			exit_launch();
		});
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

	var enableStickyNavbar = function enableStickyNavbar() {
		// var menu = document.querySelectorAll("#section-links")[0];
		// var hid = document.querySelectorAll(".link-container")[0];
		// var help = document.querySelectorAll(".link-container")[0];
		// var fixed = false;

		// var check = function cws() {

		// 	var scrollY = window.pageYOffset;
		// 	var h = help.getBoundingClientRect().top;

		// 	//If we are overflowing, disable fixation
		// 	if(menu.getBoundingClientRect().height > 72)
		// 		h = 1;
		// 	if(h < 0) {
		// 		menu.style.position = 'fixed';
		// 		menu.style.top = '0px';
		// 		menu.style.borderBottom = '1px solid white';
		// 		hid.style.display = "block";
		// 		fixed = true;
		// 	} else {
		// 		menu.style.position = 'static';
		// 		menu.style.top = '';
		// 		menu.style.borderBottom = '';
		// 		hid.style.display = "none";
		// 		fixed = false;
		// 	}

		// }

		// //Initial
		// check();

		// window.addEventListener('scroll', check);
		// window.addEventListener('resize', check);
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
			scrollTop: max(0, $(elem).offset().top) + 'px'
		}, 1000, 'swing');
	}

	//Initialize the website
	$(document).ready(function doInit() {
		launch(linkFaqs);
		//launch(getStylesheets);
		launch(getSponsors);
		launch(getLinks);
		launch(getSchedule());

		on_exit = function exit_func() {
			// if(num_launched > 0) return;
			// enableStickyNavbar();
			// setTimeout(function animate() {
			// 	if(window.location.hash.length > 2)
			// 		globals.scrollTo(window.location.hash);
			// 		// $('html, body').animate({
			// 		// 	scrollTop: max(0, $(window.location.hash).offset().top - 64) + 'px'
			// 		// }, 1000, 'swing');
			// }, 300);
		};

		setTimeout(function force_postinit() {
			num_launched = 0;
			on_exit();
		}, 10000);

		//Set the email addresses after a timeout. Kills spambots :)
		setTimeout(function setEmailAddresses() {
			$(".email-btn").attr("href", "mailto" + ":tea" + "m@swhacks.io");
		}, 1000);
	});
})();