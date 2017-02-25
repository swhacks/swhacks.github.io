var globals = globals || {};
;(function init() {

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
        });
    };

    var getSponsors = function getSponsors() {
        var createSponsor = function createSponsor(tgt, data, i) {
            if(!data[i].img) {
                console.log("Please fix: " + data[i] + " (" + data[i].company + ")");
                return;
            }


            var link = document.createElement('a');
            var img = document.createElement('img');
            link.className = 'sponsor';
            if(data[i].href)
                link.href = data[i].href;
            link.target = '_blank';

            img.src = 'static/img/sponsor_logos/' + data[i].img;
            img.alt = data[i].desc;
            img.className = data[i].class;

            link.appendChild(img);
            tgt.appendChild(link);
        };

        $.getJSON("static/res/sponsors.json", function downloadedSponsors(data) {
            var target = document.querySelectorAll("#sponsors-flex")[0];

            for(var i = 0; i < data.length; i++) {
                createSponsor(target, data, i);
            }
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
        });
    };

    var enableStickyNavbar = function enableStickyNavbar() {
    };

    var max = function max(a, b) {
        if(a > b) return a;
        return b;
    };

    var getLinks = function getLinks() {
        $.getJSON("static/res/links.json", function processLinks(data) {
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
        });
    };

    globals.scrollTo = globals.scrollTo || function scrollTo(elem) {
        $('html, body').animate({
            scrollTop: max(0, $(elem).offset().top) + 'px'
        }, 1000, 'swing');
    }

    //Initialize the website
    $(document).ready(function doInit() {
        linkFaqs();
        // getSponsors();
        getLinks();
        getSchedule();

        //Set the email addresses after a timeout. Kills spambots :)
        setTimeout(function setEmailAddresses() {
            $(".email-btn").attr("href", "mailto" + ":tea" + "m@swhacks.io");
        }, 1000);
    });
})();