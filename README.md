# Tiny Stripz Server
This is the code that runs on the Tiny Stripz server. It is for the [new Tiny Stripz website](https://writerartistcoder.github.io/ti-server/ti/index.html) and [Tiny Stripz API](https://api.tinystripz.com) (which is not currently available).

## Installation
1. To run, first run `npm install` to install dependences.
2. If you want to run the API, type `npm run api`.

## Structure
- **`api`** The API
    - **`controllers`** Controllers for API
        - `style.css` Tiny Stripz API homepage stylesheet
        - `index.html` Tiny Stripz API homepage
        - `AuthController.js` API controller for authentication
        - `ComicController.js` API controller for creating/getting comics
        - `config.js` Gets JWT secrets
        - `FileController.js` API controller for getting comics
        - `keys.js` MongoDB API keys
    - **`models`** MongoDB database models
        - `Comic.js` Model for individual comics
        - `User.js` Model for database admins
    - **`public`** Public static resources
        - `comics` Comics folder
    - `api-oldserver.js` OUTDATED server script
    - `api-process.js` Processes a JSON object from the Blogger v3 API to a Tiny Stripz comic JSON object
    - `main.js` Server script
    - `routes.js` Router: routes paths to a controller
    - `auth.json` Authorization file, contains API requests and keys
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
- `package.json` The NPM `package.json` file
- `package-lock.json` The NPM `package-lock.json` file
- `NOTICE.md` NOTICE file
- `README.md` README file

*See more in [NOTICE](/NOTICE.md)*
