// Imports
jsdom = require('jsdom');
({ JSDOM } = jsdom);

/**
 * A comic represented as a `Comic` class. Has properties such as `title`, `date`, `image`, `caption` etc.
 */
class Comic {
    // Properties
    url = null;
    date = null;
    number = null;
    title = null;
    image = null;
    transcript = null;
    caption = null;

    /**
     * Constructs a blank `Comic` instance where all properties are `null`.
     */
    constructor() {}
    
    /**
     * Constructs a `Comic` instance from a post as an object given by an API.
     * The API is specified in the `id`, which can be one of the following: `bloggerv3`
     * @param {String} id The API's ID
     * @param {Object} post The post
     */
    constructor(id, post) {
        // Based on API's ID, choose a constructor function
        switch (id) {
            case 'bloggerv3':
                this = fromBlogger(post);
            break;

            default:
                throw 'Not a valid API! A list of valid APIs is in the documentation for this constructor.';
        }
    }

    /**
     * Constructs a `Comic` instance from a post as an object given by the Blogger v3 API.
     * @param {Object} post The post
     * @returns {Comic} `Comic` instance
     */
    fromBlogger(post) {
        // Create a Comic instance to return
        comic = new Comic();

        // Fill basic variables of the Comic
        comic.url = post.url;
        comic.date = new Date(post.date).toISOString();
        comic.number = post.title.replace(/#(\d+): (.+)$/gm, '$1');
        comic.title = post.title.replace(/#(\d+): (.+)$/gm, '$2');

        // Create a JSDOM instance from the HTML content of the post
        jsdom = require('jsdom');
        ({ JSDOM } = jsdom);

        const dom = new JSDOM(post.content);

        comic.image;
        comic.transcript;
        comic.caption;
        

        return comic;
    }
}

module.exports = Comic;