const apiURL = 'https://localhost:2205/posts/latest'

window.onload = function () {
    // GET comic from Tiny Stripz API
    sendXHR('GET', apiURL).then(function (responseData) {
        const comic = JSON.parse(xmlHttp.responseText) // Parse response as JSON
        comic.date = new Date(comic.date) // Convert date to Date instance

        // Log response to console
        console.log('Received data from Tiny Stripz API:')
        console.log(comic)

        if (comic.url) setComic(comic) // If response was succesful, set comic
    })
}

/**
 * Sends an XMLHttpRequest, then makes a `Promise` to return data.
 * 
 * Examples:
 * - `sendXHR('GET', 'https://example.com').then(function (responseData) { // ... })`
 * - `sendXHR('POST', 'https://example.com', { 'payload': 'Hi Nadine Pesto!' }).then(function (responseData) { // ... })`
 * @param {String} method Request method (e.g. GET, POST)
 * @param {String} url URL of request
 * @param {Object} data JSON object to send (optional)
 */
const sendXHR = function (method, url, data) {
    const promise = new Promise(function (resolve, reject) {
        // Open XMLHttpRequest, set response type to json
        const xmlRequest = new XMLHttpRequest()
        xmlRequest.open(method, url)
        xmlRequest.responseType = 'json'

        // If sending data, set Content-Type header to application/json
        if (data) xmlRequest.setRequestHeader('Content-Type', 'application/json')

        // When request loads, resolve promise
        xmlRequest.onload = function () {
            resolve(xmlRequest.response)
        }

        // If there's data, send it as a stringified JSON object
        xmlRequest.send(JSON.stringify(data))
    })

    return promise
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

    // Convert Date instance to ISO YYYY-0M-0D
    console.log(comic.date.toISOString())
    date.textContent = comic.date.getFullYear() + '-' + comic.date.getMonth() + '-' + comic.date.getDate()

    caption.innerHTML = comic.caption

    image.src = comic.image
    image.alt = comic.transcript
}