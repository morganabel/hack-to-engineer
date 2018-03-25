import { Operation } from "@app/datastructures/operation";
import { SubCollection } from "@app/core/firestore/sub-collection";
import { BaseFirestoreData } from "@app/datamodels/base-firestore-data";

export interface DataStructure extends BaseFirestoreData {
    description: string;
    size: string;
    tags?: { [key: string]: string };
    operationsLinkId?: string; // Id of a data structure that holds the same operations this would have.
    operations?: SubCollection<Operation>;
    algorithms?: { [key: string]: string }
    problems?: { [key: string]: string };
    related?: { [key: string]: string };
    author?: { id: string, name?: string }
}
