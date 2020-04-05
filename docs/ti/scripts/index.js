window.onload = function() {
    // GET comic from Tiny Stripz API
    const xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', 'http://localhost:2205/posts/latest', false)
    xmlHttp.send(null)

    const comic = JSON.parse(xmlHttp.responseText) // Parse response as JSON

    console.log('Received data from Tiny Stripz API:')
    console.log(comic)
    if (comic.url) setComic(comic) // If response was succesful
}

/**
 * Sets the comic on the page.
 * @param {Object} comic A Comic instance
 */
function setComic(comic) {
    // Get elements to set
    const title = document.querySelector('#comic-title')
    const date = document.querySelector('#comic-date')
    const caption = document.querySelector('#comic-caption')
    const image = document.querySelector('#comic-image')

    // Set elements
    title.textContent = '#' + comic.number + ': ' + comic.title

    // Convert ISO string to Date instance
    comic.date = new Date(comic.date)
    date.textContent = comic.date.getFullYear() + '-' + comic.date.getMonth() + '-' + comic.date.getDate()
    
    caption.innerHTML = comic.caption
    image.src = comic.image
    image.alt = comic.transcript
}