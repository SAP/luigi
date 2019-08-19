import $ from 'jquery';
import 'what-input';

// Foundation JS relies on a global varaible. In ES6, all imports are hoisted
// to the top of the file so if we used`import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

$(document).foundation();

$('#menuBtn, #closeMainNavigation').on('click', function() {
  $('#mainNavigation').toggleClass('is-active');
});

if (document.getElementById('num')) {
  let number = 10;
  let counter = setInterval(function() {
    if (number > 0) {
      document.getElementById('num').innerHTML = String(--number).padStart(
        2,
        '0'
      );
    } else {
      clearInterval(counter);
    }
  }, 200);
}

// IE 11 doesn't support padStart function. Here is a workaround
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
    padString = String(typeof padString !== 'undefined' ? padString : ' ');
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(this);
    }
  };
}

if (!String.prototype.repeat) {
  String.prototype.repeat = function(count) {
    'use strict';
    if (this == null) {
      throw new TypeError("can't convert " + this + ' to object');
    }
    var str = '' + this;
    count = +count;
    if (count != count) {
      count = 0;
    }
    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }
    if (count == Infinity) {
      throw new RangeError('repeat count must be less than infinity');
    }
    count = Math.floor(count);
    if (str.length == 0 || count == 0) {
      return '';
    }
    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    if (str.length * count >= 1 << 28) {
      throw new RangeError(
        'repeat count must not overflow maximum string size'
      );
    }
    var maxCount = str.length * count;
    count = Math.floor(Math.log(count) / Math.log(2));
    while (count) {
      str += str;
      count--;
    }
    str += str.substring(0, maxCount - str.length);
    return str;
  };
}

// end of IE11 workaround for padStart function

let listCounter = 0;

if (document.getElementById('social-list')) {
  let listItems = document
    .getElementById('social-list')
    .getElementsByTagName('a');

  setActiveLinkOnHover(listItems);
  setActiveLinkOnKeyboardClick(listItems);
}

function setActiveLinkOnHover(listItems) {
  for (let i = 0; i < listItems.length; i++) {
    listItems[i].index = i;
    listItems[i].addEventListener('mouseover', function(event) {
      removeActiveState(listItems);
      event.target.classList.add('is-active');
      listCounter = event.target.index;
    });

    listItems[i].addEventListener('mouseout', function(event) {
      removeActiveState(listItems);
      listItems[0].classList.add('is-active');
      listCounter = 0;
    });
  }
}

function setActiveLinkOnKeyboardClick(listItems) {
  document.addEventListener('keydown', function(e) {
    switch (e.which) {
      case 38: // up
        if (listCounter > 0) {
          removeActiveState(listItems);
          listCounter--;
          listItems[listCounter].classList.add('is-active');
        }
        break;

      case 40: // down
        if (listCounter < listItems.length - 1) {
          removeActiveState(listItems);
          listCounter++;
          listItems[listCounter].classList.add('is-active');
        }
        break;

      default:
        return; // exit this handler for other keys
    }
    e.preventDefault();
  });
}

function removeActiveState(arr) {
  [].forEach.call(arr, function(el) {
    el.classList.remove('is-active');
  });
}
