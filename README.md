![](src/favicon.png)
# Sheetleeten - a tiny Markdown-driven themed static site generator

*Oh, just what we needed - yet another static site generator!* :+1:

### But why:question:

**It's tiny:**
```
$ scc src --exclude-dir themes --exclude-dir content
───────────────────────────────────────────────────────────────────────────────
Language                 Files     Lines   Blanks  Comments     Code Complexity
───────────────────────────────────────────────────────────────────────────────
CSS                          2       388       66        32      290          0
HTML                         1        43        3         0       40          0
TypeScript                   1        73       13         1       59         16
TypeScript Typings           1         9        0         0        9          0
───────────────────────────────────────────────────────────────────────────────
Total                        5       513       82        33      398         16
───────────────────────────────────────────────────────────────────────────────
```

**It's easy to theme:**

[![](https://coloredco.de/github.com/erkkah/sheetleeten/blob/main/src/themes/coffee.css?columns=90)](src/themes/coffee.css)

**It's fast to get started (and to get done):**
```shell
$ npx sheetleeten create my-little-site
```

**It stands on the shoulders of these fine packages:**

* [Parcel](https://parceljs.org)
* [markdown-it](https://github.com/markdown-it/markdown-it)
* [parcel-plugin-markdown-it](https://github.com/carlosvin/parcel-plugin-markdown-it)
* [Typescript](https://typescriptlang.org)
* [PostHTML](https://posthtml.org)
* [PostCSS](https://postcss.org)


**It's sheetleeten! 🇸🇪**
