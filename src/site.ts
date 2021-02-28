import sections from "./sections/*.md";

window.addEventListener("hashchange", (ev) => {
    load(ev.newURL);
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

    const sectionNames = page.meta.sections || [];
    page.html.trim() && addSection(content, page.html);

    for (const sectionName of sectionNames) {
        const section = sections[sectionName];
        addSection(content, section.html)
    }
}

function addSection(content: HTMLElement, html: string) {
    const sectionElement = document.createElement("section");
    sectionElement.innerHTML = html;
    content.appendChild(sectionElement);
}
