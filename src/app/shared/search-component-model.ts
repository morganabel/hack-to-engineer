import { OnInit, Output, Input, EventEmitter } from "@angular/core";
import { FirestoreDoc } from "@app/core/firestore/firestore-doc";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { SearchService } from "@app/core/search.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { MatAutocompleteSelectedEvent } from "@angular/material";

export abstract class SearchComponentModel implements OnInit {
    @Output() onSelect = new EventEmitter<FirestoreDoc<any>>();
    @Input() displayNameFn?: (doc?: FirestoreDoc<any>) => string | undefined;
    @Input() collection?: string;
    @Input() placeholder?: string = "search";
    results$: Observable<FirestoreDoc<any>[]>;
    form: FormGroup;

    constructor(private formBuilder: FormBuilder, private searchService: SearchService) {
        this.form = this.formBuilder.group({
            query: ['', Validators.nullValidator]
        });
    }

    ngOnInit() {
        if (!this.displayNameFn) {
            this.displayNameFn = this.displayNameFnDefault;
        }

        this.results$ = this.form.controls.query.valueChanges
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap(v => {
            if (!v || this.form.controls.query.disabled) {
                return Observable.of(new Array<FirestoreDoc<any>>());
            }

            return Observable.fromPromise(this.searchService.search(v, this.collection))
                .map(algoliaResponse => {
                    return algoliaResponse.hits as Array<FirestoreDoc<any>>;
                });
        });
    }

    abstract optionSelected(event: MatAutocompleteSelectedEvent): void;

    reset() {
        this.form.controls.query.reset();
        this.form.controls.query.enable();
    }

    private displayNameFnDefault = (doc?: FirestoreDoc<any>): string | undefined => {
        return (doc && doc.data && doc.data.name) ? doc.data.name : undefined;
    };
}