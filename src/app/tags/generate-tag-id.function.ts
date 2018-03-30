import { KEY_VALUE_SEPERATOR } from "@app/shared/keyvalueseperator";

export function GenerateTagId(collection: string, id: string) {
    return `${collection}${KEY_VALUE_SEPERATOR}${id}`;
}