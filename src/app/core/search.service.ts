import { Injectable } from '@angular/core';
import * as algoliasearch from 'algoliasearch';
import { environment } from '@env/environment';

@Injectable()
export class SearchService {
  client: algoliasearch.AlgoliaClient;
  index: algoliasearch.AlgoliaIndex;
  defaultQueryParameters: algoliasearch.AlgoliaQueryParameters = {
    restrictSearchableAttributes: ["data.name", "collection"],
    hitsPerPage: 10
  }

  constructor() {
    this.client = algoliasearch(environment.algolia.appId, environment.algolia.searchKey);
    this.index = this.client.initIndex(environment.algolia.indexName);
  }

  search(query: string, collection?: string) {
    const queryParams: algoliasearch.AlgoliaQueryParameters = Object.assign({}, this.defaultQueryParameters, { query: query });
    if (collection) {
      queryParams.filters = `collection:${collection}`;
    }

    return this.index.search(queryParams);
  }

  queryByFacet(query: string, facetName: string, facetValue: any) {
    const queryParams: algoliasearch.AlgoliaQueryParameters = Object.assign({}, this.defaultQueryParameters, { query: query });

    queryParams.filters = `${facetName}:${facetValue}`;

    return this.index.search(queryParams);
  }
}
