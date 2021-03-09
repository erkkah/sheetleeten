## What?

**Sheetleeten** is a tiny static site generator with Markdown content and simple themes. 

It's limited and opinionated, which makes it fast to get started ***and*** fast to get done.

## Why?

I really like [Cuttlebelle][Cuttlebelle], and I have used it for a couple of sites. It's powerful and flexible.

But the flexibility of generators like Cuttlebelle comes with the cost of a thousand choices. Often, I don't have the time nor the patience for more than a few choices.

## How?

> *If you're impatient, jump directly to the [Getting Started](#getting-started) section.  
> If you have a couple of minutes &mdash; read on.*

### [article](mdi) Content

The site content is built from the Markdown files in `src/content`.

The only required file is `index.md`, the entry point.
For a custom 404 - add a `404.md` file as well.

You can link to content files by using anchor links, like this:

```markdown
Check the [Next](#next) section, which lives in the `next.md` content file!
```

Content files can be included as a subsections by listing them in the frontmatter like this:

```markdown
---
sections: ["one", "another"]
---

This page has two sections in addition to this one.
```

### [tune](mdi) Configuration

Configuration is done by editing variables in `package.json`:

Required:
* **theme** - theme name
* **title** - html head title
* **headline** - page header headline
* **tagline** - page header tagline
* **copy** - page footer copyright notice

Optional, set to empty string or false if unused:
* **logo** - optional page header logo image
* **email** - page footer email, split into parts for obfuscation:
  * **to**
  * **domain**
  * **tld**
* **mdi** - enable MDI support (see below)
* **syntax** - optional syntax highlighting
  * **highlight** - enable syntax highlighting
  * **theme** - highlight.js theme name
* **keywords** - html head keywords


Since Sheetleeten uses [PostHTML][PostHTML] and [PostCSS][PostCSS] plugins to inject the site configuration, the variables live in these `package.json` sections:

```json
  "posthtml": {
    "plugins": {
      "posthtml-expressions": {
        "locals": {
          "theme": "themes/angel.css",
          "mdi": true,
          "keywords": "awesome markdown skitliten onepager webapp",
          "title": "Sheetleeten",
          "logo": null,
          "tagline": "This machine kills bitrot",
          "copy": "&copy;2021 Sheetleeten",
          "email": {
            "to": "hello",
            "domain": "example",
            "tld": "com"
          },
          "syntax": {
            "highlight": false
          }
        }
      }
    }
  },
  "postcss": {
    "plugins": {
      "postcss-simple-vars": {
        "silent": false,
        "variables": {
          "headline": "Sheetleeten"
        }
      }
    }
  }

```
Note that `headline` lives in the `postcss` section.

### [face](mdi) Material Design Icons

By setting the configuration parameter `mdi` to true, you can use [Material Design Icons][MDI] directly in Markdown like this:

```markdown
[face](mdi)
```

This looks like a link, but will produce the MDI "face" icon. The icon size and style can be tweaked as well.

[PostHTML]:https://posthtml.org
[PostCSS]:https://postcss.org
[Cuttlebelle]:https://cuttlebelle.com
[MDI]:https://material.io/resources/icons
