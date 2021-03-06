import arg from "arg";
import inquirer, { Question, QuestionCollection } from "inquirer";
import { Twisters } from "twisters";
import { copyFiles } from "./copy";
import { initGit, installDeps } from "./operations";

const cat = "🐈";
const plug = "🔌";
const lorry = "🚚";
const success = "✔️";
const failure = "✖️";
const shrug = "🤷";
const horns = "🤘";

export async function cli(args: string[]) {
    let options = parseArguments(args);
    options = await fillInMissing(options);

    const twisters = new Twisters();

    try {
        await progressRun(twisters, "copy", `${cat} Copying`, async () => {
            await copyFiles(options.target);
        });

        if (options.git) {
            await progressRun(twisters, "git", `${plug}  Creating git repo`, async () => {
                await initGit(options.target);
            });
        }

        if (options.install) {
            await progressRun(twisters, "npm", `${lorry}  Installing dependencies`, async () => {
                await installDeps(options.target);
            });
        }
    } catch (err) {
        twisters.log("summary", {
            text: `${shrug} Sheetleeten site creation failed`
        });
        return
    }
    twisters.log("summary", {
        text: `${horns} Sheetleeten site creation succeeded!`
    });
}

async function progressRun(tw: Twisters, id: string, operation: string, action: () => Promise<void>) {
    tw.put(id, {
        text: operation
    });
    try {
        await action();
    } catch (err) {
        tw.log(id, {
            text: `${operation}: ${err.message} ${failure}`
        });
        throw err;
    }
    tw.log(id, {
        text: `${operation} ${success}`,
    });
}

interface IOptions {
    cmd: "create";
    target: string;
    git?: boolean;
    install?: boolean;
}

function parseArguments(args: string[]): IOptions {
    const parsed = arg(
        {
            "--help": Boolean,
            "--git": Boolean,
            "--install": Boolean,
            "--noprompt": Boolean,
        },
        {
            argv: args.slice(2),
        }
    );

    const [cmd, target] = parsed["_"];
    if (!target || cmd != "create" || parsed["--help"]) {
        usage();
    }

    const noprompt = parsed["--noprompt"];

    return {
        cmd,
        target,
        git: parsed["--git"] ?? noprompt ? true : undefined,
        install: parsed["--install"] ?? noprompt ? true : undefined,
    };
}

function usage(): never {
    console.log(`
Usage: sheetleeten [options] create <target directory>

Options:
--help      -   This is it
--git       -   Initialize git repo
--install   -   Install npm requirements
--noprompt  -   Don't ask questions
`);
    process.exit(1);
}

async function fillInMissing(options: IOptions): Promise<Required<IOptions>> {
    const questions = [];

    if (options.git === undefined) {
        questions.push({
            type: "confirm",
            name: "git",
            message: "Initialize git repository?",
            default: false,
        });
    }

    if (options.install === undefined) {
        questions.push({
            type: "confirm",
            name: "install",
            message: "Install npm dependencies?",
            default: false,
        });
    }

    const answers = await inquirer.prompt(questions);

    return {
        ...options,
        git: options.git ?? answers.git,
        install: options.install ?? answers.install,
    };
}
