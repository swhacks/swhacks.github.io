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

    var notifs_enabled = true;
    globals.enableNotifications = globals.enableNotifications || function enableNotifications() {
        $("#notifications #toggleNotifications").html("Notifications Enabled. Click to Disable");
        notifs_enabled = true;
    };
    globals.disableNotifications = globals.disableNotifications || function disableNotifications() {
        $("#notifications #toggleNotifications").html("Notifications Disabled. Click to Enable");
        notifs_enabled = false;
    };
    globals.toggleNotifications = globals.toggleNotifications || function toggleNotifications() {
        notifs_enabled = !notifs_enabled;
        if(notifs_enabled)
            globals.enableNotifications();
        else
            globals.disableNotifications();
    };
    globals.notify = globals.notify || function notify() {
        if(notifs_enabled) {
            var audio = document.querySelectorAll("#notifications #notif-audio")[0];
            audio.play();
            console.log("Played Notification");
        }
    };

    //Initialize the website
    $(document).ready(function doInit() {
        linkFaqs();

        //Set the email addresses after a timeout. Kills spambots :)
        setTimeout(function setEmailAddresses() {
            $(".email-btn").attr("href", "mailto" + ":tea" + "m@swhacks.io");
        }, 1000);

        globals.prev = globals.prev || null;
    
//         var refresh = function refresh() {
//             jQuery.get("https://speednotif.devyashis.me", function down(success) {
//                 $("#notifications .notif-tgt").html(success);
//                 str = success;
//                 if(globals.prev && str != globals.prev) {
//                     globals.notify();
//                 }
//                 globals.prev = str;
//             });
// //            $("#notifications .notif-tgt").load("https://speednotif.devyashis.me");
//         };
// //        setInterval(refresh, 1000);
    });

    globals.hack = true;
    globals.hack2 = true;
})();