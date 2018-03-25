import { Pipe, PipeTransform } from '@angular/core';
import { FirestoreCollection } from '@app/shared/firestore-collection.enum';

@Pipe({
  name: 'collectionName'
})
export class CollectionNamePipe implements PipeTransform {

  transform(value: any, abbreviate: boolean = false): any {
    switch (value) {
      case FirestoreCollection.Algorithms:
        return (!abbreviate) ? "Algorithm" : "Algo";
      case FirestoreCollection.DataStructureOperations:
        return (!abbreviate) ? "Operation" : "Op";
      case FirestoreCollection.DataStructures:
        return (!abbreviate) ? "Data Structure" : "DS";
      case FirestoreCollection.Fundamentals:
        return (!abbreviate) ? "CS Fundamental" : "CS";
      case FirestoreCollection.Problems:
        return (!abbreviate) ? "Problem" : "P";
      case FirestoreCollection.ProblemSolutions:
        return (!abbreviate) ? "Solution" : "S";
      case FirestoreCollection.Users:
        return (!abbreviate) ? "User" : "User";
      case FirestoreCollection.Tags:
        return (!abbreviate) ? "Tag" : "Tag";
      default:
        return "Any";
    }
  }

}
