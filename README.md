# Tiny Stripz
This is the code that runs on the Tiny Stripz server. It is for the [new Tiny Stripz website](https://writerartistcoder.github.io/ti-server/ti/index.html) and [Tiny Stripz API](https://api.tinystripz.com) (which is not currently available).

## Structure
- **`docs`** The client side for the API docs and Tiny Stripz website
    - `CNAME` CNAME domain name record
    - **`api`** The content of the API docs
        - `index.html` Homepage
        - `style.css` Stylesheet
    - **`ti`** The content of the Tiny Stripz website
        - **`css`** Stylesheets (`.css`) for the website
            - `contact.css` Stylesheet for `contact.html`
            - `index.css` Stylesheet for `index.html`
            - `normalize.css` Browser compatibility stylesheet
            - `pages.css` Stylesheet for pages other than `index.html`
            - `style.css` Stylesheet for all pages
        - **`pages`** Pages other than `index.html`
            - `about.html` About the webcomic
            - `contact.html` Social media and email
        - **`resources`** Resources for the website, e.g. images
        - **`scripts`** Scripts (`.js`) for the website
            - `index.js` Script for `index.html`
            - `pages.js` Script for pages other than `index.html`
        - `index.html` Homepage
- `api-server.js` The Tiny Stripz API server script
- `ti-server.js` The Tiny Stripz website server script
- `comic_protoype.js` The Tiny Stripz API script
- `auth.json` Authorization file, contains API requests and keys
- `package.json` The NPM `package.json` file
- `package-lock.json` The NPM `package-lock.json` file
- `README.md` The README
- `TODO` A todo list to quickly keep track of issues
