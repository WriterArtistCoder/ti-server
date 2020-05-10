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
    const dom = new JSDOM(post.content.replace(/[\r\n]+/gm, ''))

    // Create an object to return
    var comic = {
        url:        post.url,
        date:       new Date(post.published).toISOString(),
        number:     post.title.replace(/#(\d+): (.+)$/gm, '$1'),
        title:      post.title.replace(/#(\d+): (.+)$/gm, '$2'),
        image:      null,
        transcript: null,
        caption:    null
    }

    try {
        // Get first link in document and get link location
        // which will be location of high-quality image
        dom.window.document.querySelector('a').href
        comic.image = new URL(dom.window.document.querySelector('a').href)
    } catch (err) { console.log(err) }

    try {
        // Get first link in document and get its child element's alt text
        dom.window.document.querySelector('a').childNodes[0].alt
        comic.transcript = dom.window.document.childNodes[0].alt
    } catch (err) { console.log(err) }

    try {
        dom.window.document.querySelectorAll('div')[1]
        comic.caption = dom.window.document.querySelectorAll('div')[1].innerHTML
    } catch (err) { console.log(err) }

    console.log('Success!')
    return comic
}

exports.fromBlogger = fromBlogger