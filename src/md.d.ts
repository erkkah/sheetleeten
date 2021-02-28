declare module "*.md" {
    export const meta: Record<string, any>;
    export const html: string;
    const sections: Record<string, {
        meta: Record<string, any>;
        html: string;
    }>;
    export default sections;
}
