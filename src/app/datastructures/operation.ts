import { BaseFirestoreData } from "@app/datamodels/base-firestore-data";

export interface Operation extends BaseFirestoreData {
    averageSpeed: string;
    worstCaseSpeed: string;
    description: string;
    order: number;
}
