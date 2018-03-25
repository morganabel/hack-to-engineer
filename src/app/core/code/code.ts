export const CODE_BLOCK_ID_CLASS_PREFIX = "code-block-id-";

export interface CodeBlock {
    language: string;
    code: string;
    lastUpdate?: Date;
    author?: { id: string, name?: string };
}