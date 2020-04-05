const jsdom = require('jsdom')
const { JSDOM } = jsdom

/**
    * Constructs an comic data object from a post returned given by the Blogger v3 API.
    * The properties are: `url` (String URL), `date` (ISO date String), `number` (number), `title` (String), `image` (String URL), `transcript` (String), and `caption` (String).
    * @param {Object} post The post
    * @returns {Object} A comic object (properties specified above)
*/
function fromBlogger(post) {
    // Delete newlines, then create a JSDOM instance from the HTML content of the post
    const dom = new JSDOM(post.content.replace(/[\R|\n|\v]/gm, ''))

    // Create an object to return
    let comic = {
        url: post.url,
        date: new Date(post.published).toISOString(),
        number: post.title.replace(/#(\d+): (.+)$/gm, '$1'),
        title: post.title.replace(/#(\d+): (.+)$/gm, '$2'),
        image: null,
        transcript: null,
        caption: null
    }

    try {
        dom.window.document.querySelector('img').src
        comic.image = dom.window.document.querySelector('img').src
    } catch (err) { console.log(err) }

    try {
        dom.window.document.querySelector('img').alt
        comic.transcript = dom.window.document.querySelector('img').alt
    } catch (err) { console.log(err) }

    try {
        dom.window.document.querySelectorAll('div')[1]
        comic.caption = dom.window.document.querySelectorAll('div')[1].textContent
    } catch (err) { console.log(err) }

    console.log("Success!")
    return comic
}

exports.fromBlogger = fromBlogger