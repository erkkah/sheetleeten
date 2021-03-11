---
title: "Sheetleeten - Getting started"
before: ["links"]
---

## Getting started

* Make sure you have Node.js + npm working, then use the Sheetleeten cli to create your project:

```shell
$ npx sheetleeten create my-project
? Initialize git repository? Yes
? Install npm dependencies? Yes
🐈 Copying ✔️
🔌 Creating git repo ✔️
🚚 Installing dependencies ✔️
🤘 Sheetleeten site creation succeeded!
```

* Move down to the "my-project" directory.
* If you didn't install npm dependencies in the previous step, do it now by running `npm i`.

* Now edit `package.json` to start shaping your site. Set at least the **title** and **tagline**.
* Start the development server:

```shell
$ npm run serve
```

* Open the address printed by the development server in your browser and start working on the content in `src/content`.

The development server will automatically hot-reload any changes made to content, but you will need to restart the server for changes to `package.json` and when adding new Markdown files.

### Building for production

To create a production build, run:

```shell
$ npm run build
```

This will generate the site files to the `prod` directory, ready for deployment.
