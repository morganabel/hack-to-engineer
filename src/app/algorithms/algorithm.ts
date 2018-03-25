import { Operation } from "@app/datastructures/operation";
import { BaseFirestoreData } from "@app/datamodels/base-firestore-data";

export interface Algorithm extends BaseFirestoreData {
    size: string;
    averageSpeed: string;
    worstCaseSpeed: string;
    description: string;
    tags?: { [key: string]: string };
    datastructures?: { [key: string]: string }
    problems?: { [key: string]: string };
    related?: { [key: string]: string };
    author?: { id: string, name?: string };
}
