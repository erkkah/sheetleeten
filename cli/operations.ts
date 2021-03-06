import execa from "execa";
import { projectInstall } from "pkg-install";

export async function initGit(target: string): Promise<boolean> {
    const result = await execa("git", ["init"], {
        cwd: target,
    });
    return !result.failed;
}

export async function installDeps(target: string): Promise<boolean> {
    const result = await projectInstall({
        cwd: target,
    });
    return !result.failed;
}
