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
        getLinks();

        //Set the email addresses after a timeout. Kills spambots :)
        setTimeout(function setEmailAddresses() {
            $(".email-btn").attr("href", "mailto" + ":tea" + "m@swhacks.io");
        }, 1000);
    });
})();