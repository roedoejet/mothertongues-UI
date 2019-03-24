import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DictionaryData } from '../../app/models';
import { MTDService } from '../../app/mtd.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { FormControl } from "@angular/forms"

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class Search {
  entries$: Observable<DictionaryData[]>;
  results$: Observable<DictionaryData[]>;
  matchThreshold: number = 0;
  partMatchThreshold: number = 1;
  maybeMatchThreshold: number = 2;
  matches$: Observable<DictionaryData[]>;
  matches: DictionaryData[];
  partMatches$: Observable<DictionaryData[]>;
  maybeMatches$: Observable<DictionaryData[]>;
  searchQuery: string = '';
  _searchQuery$: BehaviorSubject<string>;
  searchControl: FormControl;
  constructor(public navCtrl: NavController, private mtdService: MTDService) {
    this.entries$ = this.mtdService.dataDict$;
    this.searchControl = new FormControl();
  }

  ionViewDidLoad() {
    this.results$ = this.searchControl.valueChanges.pipe(
      debounceTime(100),
      switchMap((term) => this.entries$.pipe(
        map((entries) => this.getResults(term, entries)))),
    )
    this.matches$ = this.results$.pipe(
      map(results => results.filter(r => r['distance'] <= this.matchThreshold))
    )
    this.partMatches$ = this.results$.pipe(
      map(results => results.filter(r => (r['distance'] <= this.partMatchThreshold && r['distance'] > this.matchThreshold)))
    )
    this.maybeMatches$ = this.results$.pipe(
      map(results => results.filter(r => (this.maybeMatchThreshold && r['distance'] > this.partMatchThreshold)))
    )
  }

  getL2(searchQuery, entries): DictionaryData[] {
    var results = []
    var re = new RegExp(searchQuery, 'i')
    for (let entry of entries) {
      if (re.test(entry.definition)) {
        results.push(entry)
      }
    }
    let sorted_answers = results.sort(function (a, b) {
      return a["definition"].length - b["definition"].length;
    });
    return (sorted_answers.slice(0, 9))
  };

  // Get l2_results (eng) and target (l1) results
  getResults(searchQuery, entries): DictionaryData[] {
    if (searchQuery.length > 1) {
      let l2_results = this.getL2(searchQuery, entries).map(x => {
        x['distance'] = 0;
        x['type'] = 'L2';
        return x
      })
      let l1_results = window["searchL1"](searchQuery, entries).map(x => {
        // levlib returns an array with the weight and entry
        x[1]['type'] = 'L1';
        return x[1]
      })
      let results = l2_results.concat(l1_results);
      this.matches = results
      return results
    }
  };

}
