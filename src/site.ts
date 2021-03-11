import sections from "./content/*.md";

window.addEventListener("popstate", (ev) => {
    load(document.URL);
    const state = ev.state;
    if (!(state?.sheetleeten)) {
        // Only scroll to top for new page views.
        window.scrollTo(0, 0);
        history.replaceState({sheetleeten: true}, "");
    }
});

load(document.URL);

function load(urlString: string) {
    const url = new URL(urlString);
    const hash = url.hash;
    if (!hash) {
        build("index");
    } else {
        const page = hash.slice(1);
        build(page);
    }
    
    const anchors = document.getElementsByTagName("a");
    for (const anchor of anchors) {
        if (anchor.href == urlString) {
            anchor.classList.add("target");
        }
    }
}

function build(pageName: string) {
    const content = document.getElementById("content");
    if (!content) {
        return;
    }

    while (content.firstChild) {
        content.removeChild(content.lastChild!);
    }

    const page = sections[pageName] || sections["404"];
    if (!page) {
        addSection(content, "<pre><code>\n ¯\\(°_o)/¯\n\n</code></pre>");
        return;
    }

    const beforeSections = page.meta.before || [];
    const afterSections = page.meta.after || [];

    for (const sectionName of beforeSections) {
        const section = sections[sectionName];
        addSection(content, section.html)
    }
    
    page.html.trim() && addSection(content, page.html);

    for (const sectionName of afterSections) {
        const section = sections[sectionName];
        addSection(content, section.html)
    }

    if (page.meta.title) {
        document.title = page.meta.title;
    }
}

function addSection(content: HTMLElement, html: string) {
    const sectionElement = document.createElement("section");
    sectionElement.innerHTML = html;
    content.appendChild(sectionElement);
}
