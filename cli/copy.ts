import { existsSync } from "fs";
import { basename, join } from "path";
import { promises as fs } from "fs";
const { mkdir, readFile, writeFile } = fs;
import ncp from "ncp";
import { promisify } from "util";

const copy = promisify(ncp);

export async function copyFiles(target: string) {
    if (existsSync(target)) {
        throw new Error(`Target "${target}" already exists`);
    }

    await mkdir(target, {recursive: true});
    await createPackage(target);
    await copy(join(__dirname, "..", "src"), join(target, "src"), {
        clobber: false,
        filter: (path) => !path.endsWith(".md"),
        stopOnErr: true,
    });
}

interface IAppSettings {
    theme: string;
    code: {
        highlight: boolean;
        theme: string;
    }
    mdi: boolean;
    keywords: string;
    logo: string | false;
    title: string;
    tagline: string;
    copy: string;
    email: {
        to?: string;
        domain?: string;
        tld?: string;
    }
}

interface IPackageTemplate {
    name: string;
    version: string;
    browser: string;
    scripts: Record<string, string>;
    devDependencies: Record<string, string>;
    posthtml: {
        plugins: {
            "posthtml-expressions": {
                locals: IAppSettings;
            }
        }
    },
    postcss: {
        plugins: {
            "postcss-simple-vars": {
                variables: {
                    headline: string;
                }
            }
        }
    }
}

async function createPackage(target: string) {
    const now = new Date();
    const year = now.getFullYear();
    
    const packageTemplate: IPackageTemplate = {
        name: basename(target),
        version: "1.0.0",
        browser: "src/index.html",
        scripts: {
            "serve": "parcel serve -d site --no-cache src/index.html",
            "build": "parcel build -d site --no-cache src/index.html"        
        },
        posthtml: {
            plugins: {
                "posthtml-expressions": {
                    locals: {
                        theme: "angel",
                        title: "My Site",
                        keywords: "",
                        logo: false,
                        tagline: "Sites like these...",
                        copy: `&copy; ${year}`,
                        email: {
                            to: "",
                            domain: "example",
                            tld: "com"
                        },
                        mdi: true,
                        code: {
                            highlight: true,
                            theme: "rainbow"
                        }
                    },
                }
            }
        },
        postcss: {
            plugins: {
                "postcss-simple-vars": {
                    variables: {
                        headline: "My Site"
                    }
                }
            }
        },
        devDependencies: await extractDevDependencies(),
    };
    
    const packageData = JSON.stringify(packageTemplate, null, 2);
    await writeFile(join(target, "package.json"), packageData);
}

async function extractDevDependencies(): Promise<IPackageTemplate["devDependencies"]> {
    const packageJSON = await readFile(join(__dirname, "..", "package.json"));
    const packageData = JSON.parse(packageJSON.toString());

    const depList = [
        "markdown-it-highlightjs",
        "parcel-bundler",
        "parcel-plugin-markdown-it",
        "parcel-plugin-static-files-copy",
        "postcss-simple-vars",
        "posthtml-expressions",
        "typescript",
    ];

    const versions = packageData.devDependencies;
    const deps = depList.reduce<Record<string, string>>((map, dep) => {
        map[dep] = versions[dep];
        return map;
    }, {});

    return deps;
}
