# Tiny Stripz Server
This is the code that runs on the Tiny Stripz server. It is for the [new Tiny Stripz website](https://writerartistcoder.github.io/ti-server/ti/index.html) and [Tiny Stripz API](https://api.tinystripz.com) (which is not currently available).

## Installationi
1. To run, first run `npm install` to install dependences.
2. If you want to run the website and API (the website relies on the API), type `npm run ti`. Then open a seperate terminal and type `npm run api`.
3. If you want to run just the API, type `npm run api`.

## Structure
- **`docs`** The client side for the API docs and Tiny Stripz website
    - **`api`** The content of the API docs
        - `index.html` Homepage
        - `style.css` Stylesheet
    - **`ti`** The content of the Tiny Stripz website
        - **`css`** Stylesheets (`.css`) for the website
            - `normalize.css` Browser compatibility stylesheet
            - `pages.css` Stylesheet for pages other than `index.html`
            - `style.css` Stylesheet for all pages
        - **`pages`** Pages other than `index.html`
            - `about.html` About the webcomic
            - `contact.html` Social media and email
        - **`images`** Image resources for the website
        - **`scripts`** Scripts (`.js`) for the website
            - `index.js` Script for `index.html`
            - `pages.js` Script for pages other than `index.html`
        - `index.html` Homepage
    - `CNAME` CNAME domain name record
    - `index.html` Redirects user to `ti/index.html`
- `LICENSE` The LICENSE - [Mozilla Public License 2.0](https://spdx.org/licenses/MPL-2.0.html)
- `TODO` A todo list to quickly keep track of issues
- `.gitignore` gitignore file
- `api-server.js` The Tiny Stripz API server script
- `comic_protoype.js` The Tiny Stripz API script
- `auth.json` Authorization file, contains API requests and keys
- `package.json` The NPM `package.json` file
- `package-lock.json` The NPM `package-lock.json` file
- `NOTICE.md` NOTICE file
- `README.md` README file

## Made with
- [GitLens](https://gitlens.amod.io/)

*See more in [NOTICE](/NOTICE.md)*