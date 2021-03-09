---
title: "Sheetleeten - Themes"
sections: ["links"]
---

## Page layout
Sheetleeten uses a simple fixed page layout with a centered content column, a header and a footer. It adapts nicely to desktop and mobile screen sizes.

## Themes
The site theme is specified using the `theme` configuration variable, which selects one of the theme files in the `src/themes` directory.

The theme files are small CSS files specifying the theme **fonts**, **colors**, and **decorations**.

### Fonts
A Sheetleeten theme uses three fonts: **headline**, **variable** and **fixed**.
Themes typically use Google Fonts, so each font needs to be imported as well as declared:

```css
@import url("https://fonts.googleapis.com/css?family=Open+Sans|Fira+Mono&display=swap&subset=Latin");
@import url("https://fonts.googleapis.com/css?family=Satisfy&display=swap&subset=Latin&text=$headline");

:root {
    --variable-font: "Open Sans", sans-serif;
    --fixed-font: "Fira Mono", monospace;
    --headline-font: "Satisfy";
}
```
Note the `text` - argument to the headline font import, which uses the PostCSS `$headline` variable to optimize the font download to only include the actual characters of the headline text.

### Colors
Each theme uses a four-color palette, ordered by increasing or decreasing lightness.

| Color number | Color use |
| :---: | --- |
| **0** | Page background - outside the content column, separator rules, code block text<sup>*</sup> |
| **1** | Content background |
| **2** | Section dividers, link decorations, code block background<sup>*</sup>, table borders |
| **3** | Header, content and footer text |

<sup>*</sup>Overridden by syntax highlighting

Theme colors can be set by value:
```css
:root {
    --color0: #EEE;
    --color1: #DFD6D1;
    --color2: #83746E;
    --color3: #1F232C;
}
```

Theme colors can alternatively be set algorithmically using HSL values:
```css
:root {
    --startH: 20deg;
    --stepH: 60deg;
    --startS: 10%;
    --scaleS: 1.2;
    --startL: 85%;
    --scaleL: 0.6;
}
```
This will pick 4 hues from the HSL circle, starting at "startH", moving "stepH" along the circle to get the three remaining hues. The first color will use the "startS" and "startL" saturation and lightness values. For each new color picked, the saturation will be multiplied by "scaleS". The lightness values are calculated the same way, starting with "startL" and multiplying by "scaleL".

Check the "calc" theme for an example.

### Decorations

The team can also set the style of section dividers, heading decorations and rule decorations. This is an example from the "coffee" theme:

```css
:root {
    /* Divider style: size + dotted, dashed, solid or none */
    --divider-style: 3px solid;

    /* Heading decoration style: size + dotted, dashed, solid or none */
    --heading-decoration: 0.2ch solid;

    /* Decorator content for horizontal rule */
    --rule-decoration: "\2615"; /* Unicode coffee cup */
}
```