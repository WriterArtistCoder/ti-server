# Tiny Stripz Server
This is the code that runs on the Tiny Stripz server. It is for the [new Tiny Stripz website](https://writerartistcoder.github.io/ti-server/ti/index.html) and [Tiny Stripz API](https://api.tinystripz.com) (which is not currently available).

## Installation
1. To run, first run `npm install` to install dependences.
2. If you want to run the website and API (the website relies on the API), type `npm run ti`. Then open a seperate terminal and type `npm run api`.
3. If you want to run just the API, type `npm run api`.

## Structure
- **`api`** The API
    - Will be added soon...
- **`docs`** The Tiny Stripz website
    - **`css`** Stylesheets (`.css`) for the website
        - `normalize.css` Browser compatibility stylesheet
        - `index.css` Stylesheet for `index.html`
        - `index-grid.css` Handles positioning elements in `index.html`
        - `pages.css` Stylesheet for pages other than `index.html`
        - `pages-grid.css` Handles positioning elements for pages other than `index.html`
        - `style.css` Stylesheet for all pages
    - **`pages`** Webpages (`.html`), except for `index.html`
        - `about.html` About the webcomic
        - `contact.html` Social media and email
    - **`images`** Image resources for the website
    - **`scripts`** Scripts (`.js`) for the website
        - `index.js` Script for `index.html`
    - `index.html` Homepage
    - `CNAME` CNAME domain name record
- `LICENSE` The LICENSE - [Mozilla Public License 2.0](https://spdx.org/licenses/MPL-2.0.html)
- `TODO` A todo list to quickly keep track of issues
- `.gitignore` gitignore file
- `api-server.js` The Tiny Stripz API server script
- `auth.json` Authorization file, contains API requests and keys
- `package.json` The NPM `package.json` file
- `package-lock.json` The NPM `package-lock.json` file
- `NOTICE.md` NOTICE file
- `README.md` README file

*See more in [NOTICE](/NOTICE.md)*