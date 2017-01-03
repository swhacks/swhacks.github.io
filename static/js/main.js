(function init() {
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
	};

	var getSponsors = function getSponsors() {
		$.getJSON("static/res/sponsors.json", function downloadedSponsors(data) {
			var target = document.querySelectorAll("#sponsors-flex")[0];
			for(var i = 0; i < data.length; i++) {
				var elem = document.createElement("img");
				elem.src = "static/img/sponsor_logos/" + data[i].img;
				elem.style.width = data[i].img_width;
				elem.style.height = data[i].img_height;
				elem.alt = data[i].company + ": " + data[i].desc;
				target.appendChild(elem);
			}
		});
	}

	//Initialize the website
	$(document).ready(function doInit() {
		linkFaqs();
		getSponsors();

		//Set the email addresses after a timeout. Kills spambots :)
		setTimeout(function setEmailAddresses() {
			$(".email-btn").attr("href", "mailto:contact@swhacks.io");
		}, 1000);
	});
})();