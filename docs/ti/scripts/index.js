window.onload = function() {
    // GET comic from Tiny Stripz API
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', 'http://localhost:2205/posts/latest', false);
    xmlHttp.send(null);
    this.console.log(xmlHttp.responseText);

    const c = JSON.parse(xmlHttp.responseText);
    this.console.log(c.date);

    setComic(c);
}

/**
 * Sets the comic on the page.
 * @param {Object} comic A Comic instance
 */
function setComic(comic) {
    // Get elements to set
    let title = document.getElementById('comic-title');
    let date = document.getElementById('comic-date');
    let caption = document.getElementById('comic-caption');
    let image = document.getElementById('comic-image');

    // Set elements
    title.textContent = '#' + comic.number + ': ' + comic.title;
    date.textContent = comic.date.getFullYear() + '-' + comic.date.getMonth() + '-' + comic.date.getDate();
    caption.innerHTML = comic.caption;
    image.src = comic.image;
    image.alt = comic.transcript;
}