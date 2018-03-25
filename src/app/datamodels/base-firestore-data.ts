export interface BaseFirestoreData {
    name: string;
    lastUpdate?: Date;
    isComplete?: boolean;
    //visibility: number;
    // Should visibility be number for bit mask?
    // Or string?
    // Or just public/private
}