import { DocumentReference } from "@firebase/firestore-types";

export interface FirestoreDoc<T> {
    id: string;
    collection:string;
    ref: DocumentReference;
    data: T
}
