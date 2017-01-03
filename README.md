# SouthwestHacks website

Very simplistic website for the SouthwestHacks Website. It's 100% static, making it possible to serve via GitHub Pages.

# Mobile friendly

The site is fairly mobile friendly. Please report any bugs if you find any rendering issues in mobile or desktop.

# Navigation bar
In order to add more links:
- Create an ```<a>``` element within div#entry-navigation-menu
- Create an ```<a>``` element within div#navigation-menu with the bootstrap class, a.col-sm-4

# FAQ
Each FAQ header is automatically converted to a link by JavaScript.
This allows you to easily link to FAQs, without having to manually code each link.

On runtime, each ```<h2>``` in div#faq-container has it's text replaced with a link to #faq-{number}, where number is 0...n - 1, where n is the number of FAQ posts

To add FAQs:
- Create an ```<h2>``` and write the FAQ question
- Create an ```<p>``` element with the FAQ content

# Sponsors
Sponsors are dynamically loaded into a flexbox. Sponsors are defined in ```static/res/sponsors.json```, which contains a JSON array of companies. Currently, the supported features are:
- "company": The name of the company
- "img": The location of the image - *sponsor images are located in ```static/img/sponsor_logos/```* and will be loaded from there. Thus, if the image file is ```static/img/sponsor_logos/a.JPG```, the value for this variable should be ```a.JPG```
- "desc": The description of the company
- "img_width": Width of the sponsor logo
- "img_height": Height of the sponsor logo
- "sponsor_type": Currently unused, but will be the level of contribution, if such a field is necessary

# Email contact links
Should be defaulted to NULL. They will be replaced by JavaScript after 1.0 seconds with the real address to mitigate spam email