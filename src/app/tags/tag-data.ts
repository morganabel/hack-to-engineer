import { BaseFirestoreData } from "@app/datamodels/base-firestore-data";
import { TagType } from "@app/tags/tag-type.enum";

export interface TagData extends BaseFirestoreData {
    description: string;
    tagType: TagType;
    order: number;
}