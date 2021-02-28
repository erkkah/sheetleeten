import * as index from "./index.md";
import sections from "./sections/*.md";

function addSection(content: HTMLElement, html: string) {
    const sectionElement = document.createElement("section");
    sectionElement.innerHTML = html;
    content.appendChild(sectionElement);
}

function build() {
    const content = document.getElementById("content");
    if (!content) {
        return;
    }

    const sectionNames = index.meta.sections;
    index.html.trim() && addSection(content, index.html);

    for (const sectionName of sectionNames) {
        const section = sections[sectionName];
        addSection(content, section.html)
    }
}

build();
