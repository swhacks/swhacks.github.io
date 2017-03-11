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

    function max(a, b) {
        if(a > b) return a;
        return b;
    };

    globals.scrollTo = globals.scrollTo || function scrollTo(elem) {
        $('html, body').animate({
            scrollTop: max(0, $(elem).offset().top - 50) + 'px'
        }, 1000, 'swing');
    }

    //Initialize the website
    $(document).ready(function doInit() {
        linkFaqs();

        //Set the email addresses after a timeout. Kills spambots :)
        setTimeout(function setEmailAddresses() {
            $(".email-btn").attr("href", "mailto" + ":tea" + "m@swhacks.io");
        }, 1000);
    });

    var refresh = function refresh() {
        $("#notifications .notif-tgt").load("https://speednotif.devyashis.me");
    };

    setInterval(refresh, 1000);
})();