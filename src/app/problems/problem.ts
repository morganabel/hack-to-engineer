import { SubCollection } from "@app/core/firestore/sub-collection";
import { Solution } from "@app/problems/solution";
import { BaseFirestoreData } from "@app/datamodels/base-firestore-data";

export interface Problem extends BaseFirestoreData {
    description: string;
    tags?: { [key: string]: string };
    solutions?: SubCollection<Solution>;
    algorithms?: { [key: string]: string };
    datastructures?: { [key: string]: string };
    related?: { [key: string]: string };
    author?: { id: string, name?: string };
}