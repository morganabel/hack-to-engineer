import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as algoliasearch from 'algoliasearch';

const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;
const ALGOLIA_INDEX_NAME = "data";

const FIRESTORE_MOST_RECENT_COLLECTION = "mostrecent";

let app: admin.app.App;

function initAdmin() {
    app = admin.initializeApp(functions.config().firebase);
}

function getDb(): FirebaseFirestore.Firestore {
    if (!app) {
        initAdmin();
    }

    return app.firestore();
}

function createClient() {
    return algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
}

function updateIndex(event: functions.Event<functions.firestore.DeltaDocumentSnapshot>, collection: string) {
    const client = createClient();

    const item: any = {};
    item.id = event.data.id;
    item.objectID = event.data.id;
    item.collection = collection;
    item.data = event.data.data();

    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(item);
}

function setMostRecent(event: functions.Event<functions.firestore.DeltaDocumentSnapshot>, collection: string) {
    const db = getDb();

    const data = {
        docId: event.data.id,
        docCollection: collection,
        lastUpdate: admin.firestore.FieldValue.serverTimestamp()
    };

    return db.collection(FIRESTORE_MOST_RECENT_COLLECTION).doc(`mr_${event.data.id}`).set(data, { merge: true });
}

export const syncDataStructures = functions.firestore.document("datastructures/{docId}").onWrite((event) => {
    return updateIndex(event, "datastructures");
});

export const syncAlgos = functions.firestore.document("algorithms/{docId}").onWrite((event) => {
    return updateIndex(event, "algorithms");
});

export const syncProblems = functions.firestore.document("problems/{docId}").onWrite((event) => {
    return updateIndex(event, "problems").then(() => {
        return setMostRecent(event, "problems");
    });
});

export const syncFundamentals = functions.firestore.document("fundamentals/{docId}").onWrite((event) => {
    return updateIndex(event, "fundamentals");
});

export const syncTags = functions.firestore.document("tags/{docId}").onWrite((event) => {
    return updateIndex(event, "tags");
});
