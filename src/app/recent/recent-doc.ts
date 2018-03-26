import { BaseFirestoreData } from "@app/datamodels/base-firestore-data";

export interface RecentDoc extends BaseFirestoreData {
    docId: string;
    docCollection: string;
}