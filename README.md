# VernierWheel.js

A small utility to generate *Vernier scales* for safe lock manipulation.

  https://www.lama.univ-savoie.fr/pagesmembres/hyvernat/Misc/Vernier/vernier.html

### Generate a Vernier scale

- choose *N* (number of ticks on the actual wheel)
- choose *D* to get the precision you want; a value of *D*=10 means you can
  (try to) read up to one tenth of a graduation
- uncheck the *show wheel* option,
- choose the value of *n* so that you get several scales for the price of one.
- download SVG file and print it


### practice reading the Vernier scale

- choose *N* (number of ticks on the actual wheel)
- choose *D* to get the precision you want; a value of *D*=10 means you can
  (try to) read up to one tenth of a graduation
- check the *show wheel* option,
- choose *n*=1,
- check the *show wheel offset* option (at the botom of the page)

Pressing 's' should show the offset, or regenerate a new one (and hide it).


### Technology

Simple HTML5, CSS, javascript with [jquery](https://jquery.com/), 
[SVG.js](http://svgjs.com) and [svg-pan-zoom (https://github.com/ariutta/svg-pan-zoom)].


### License

This is released under the GNU General Public License v3
(https://www.gnu.org/licenses/gpl-3.0.html)


