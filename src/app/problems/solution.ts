import { BaseFirestoreData } from "@app/datamodels/base-firestore-data";

export interface Solution extends BaseFirestoreData {
    description: string;
    size: string;
    averageSpeed: string;
    worstCaseSpeed: string;
    order: number;
    tags?: { [key: string]: string };
    algorithms?: { [key: string]: string }
    datastructures?: { [key: string]: string };
}