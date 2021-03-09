---
title: "Sheetleeten - Material Design Icons"
sections: ["links"]
---

## Using Material Design Icons

Sheetleeten includes special Markdown anchor syntax to use Material Design Icons.

Creating an anchor where the href starts with "mdi" will draw the icon matching the value of the anchor title:

```markdown
Like this: [face](mdi)
```

Like this: [face](mdi)

The syntax allows for some tweaking of the icon using colon-separated attributes after the initial "mdi":

```markdown
32px, middle aligned: [face](mdi:32:mid)
```

32px, middle aligned: [face](mdi:32:mid)

### Attributes

| Attribute | Effect |
| :--- | --- |
| 18 | font-size: 18px |
| 24 | font-size: 24px |
| 32 | font-size: 32px |
| 48 | font-size: 48px |
| mid | vertical-align: middle |
| drop | drop shadow |
| black | force black color |
| white | force white color |

### Icon names

All valid icon names can be found at the [MDI site](https://material.io/resources/icons).

Some examples:

| Name | Icon |
| --- | :---: |
| favorite | [favorite](mdi:24) |
| verified | [verified](mdi:24) |
| message | [message](mdi:24) |
| mail | [mail](mdi:24) |
| bar_chart | [bar_chart](mdi:24) |
