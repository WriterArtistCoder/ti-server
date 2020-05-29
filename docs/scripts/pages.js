window.onscroll = function() {scrollFunction()}

/**
 * Makes a top app bar appear when the title is scrolled past.
 */
function scrollFunction() {
  if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
    document.querySelector('#scrollHeader').classList.add('scrollHeaderShow')
  } else {
    document.querySelector('#scrollHeader').classList.remove('scrollHeaderShow')
  }
} 