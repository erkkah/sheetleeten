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

    await mkdir(target, { recursive: true });
    await createPackage(target);
    await copy(join(__dirname, "..", "cli", "dot.gitignore"), join(target, ".gitignore"), {
        clobber: false,
        stopOnErr: true,
    });
    await copy(join(__dirname, "..", "src"), join(target, "src"), {
        clobber: false,
        filter: (path) => !path.endsWith(".md"),
        stopOnErr: true,
    });
    await copy(join(__dirname, "..", "cli", "template"), join(target, "src", "content"), {
        clobber: false,
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
    "sheetleeten-config-start": string;
    posthtml: {
        plugins: {
            "posthtml-expressions": {
                locals: IAppSettings;
            }
        }
    };
    postcss: {
        plugins: {
            "postcss-simple-vars": {
                variables: {
                    headline: string;
                }
            }
        }
    };
    "sheetleeten-config-end": string;
}

async function createPackage(target: string) {
    const now = new Date();
    const year = now.getFullYear();
    const packageJSON = await extractFromPackage();

    const packageTemplate: IPackageTemplate = {
        name: basename(target),
        version: "1.0.0",
        browser: "src/index.html",
        ...packageJSON,
        "sheetleeten-config-start": "🔍",
        posthtml: {
            plugins: {
                "posthtml-expressions": {
                    locals: {
                        theme: "coffee",
                        title: "Title",
                        keywords: "",
                        logo: false,
                        tagline: "Tagline",
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
                        headline: "Headline"
                    }
                }
            }
        },
        "sheetleeten-config-end": "🔍",
    };

    const packageData = JSON.stringify(packageTemplate, null, 2);
    await writeFile(join(target, "package.json"), packageData);
}

async function extractFromPackage(): Promise<Pick<IPackageTemplate, "scripts" | "devDependencies">> {
    const packageJSON = await readFile(join(__dirname, "..", "package.json"));
    const packageData = JSON.parse(packageJSON.toString());

    const depList = [
        "@babel/preset-env",
        "markdown-it-highlightjs",
        "parcel-bundler",
        "parcel-plugin-markdown-it",
        "postcss-simple-vars",
        "posthtml-expressions",
        "rimraf",
        "typescript",
    ];

    const versions = packageData.devDependencies;
    const deps = depList.reduce<Record<string, string>>((map, dep) => {
        map[dep] = versions[dep];
        return map;
    }, {});

    const {scripts} = packageData;
    const {serve, build} = scripts;

    return {
        devDependencies: deps,
        scripts: {
            serve,
            build,
        },
    };
}
