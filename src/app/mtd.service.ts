import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config, DictionaryData } from './models'
import { HttpClient, HttpResponse } from "@angular/common/http";
// import { AlertController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class MTDService {
    _dictionary_data$ = new BehaviorSubject<DictionaryData[]>(window['dataDict'])
    _config$ = new BehaviorSubject<Config>(window['config'])
    remote_data$: any = this.http.get('http://localhost:5000/api/v1/languages?name=ucwalmicwts&only-data=true', { observe: 'response' })
    remote_config$: any = this.http.get('http://localhost:5000/api/v1/languages?name=ucwalmicwts&only-config=true', { observe: 'response' })
    constructor(private http: HttpClient) {
        // if in storage
        if (true) {
            this._config$.next({ "L1": { "name": "<YourUpdatedLanguageName>", "lettersInLanguage": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"] }, "L2": { "name": "English" }, 'build': '201903231723' })
            // check build is newer
            this.remote_config$.subscribe(x => {
                if (x.status === 200) { // and storage.config.build < x.build
                    this._config$.next(x.body)
                    this.remote_data$.subscribe(x => {
                        if (x.status === 200) {
                            setTimeout(() => {
                                this._dictionary_data$.next(x.body)
                            }, 3000)
                        } else {
                            // return error message
                        }
                    })
                } else {
                    // return error message
                }
            })
        } else {
            // try and update from remote
            this.remote_config$.subscribe(x => {
                if (x.status === 200) {
                    this._config$.next(x.body)
                    this.remote_data$.subscribe(x => {
                        if (x.status === 200) {
                            this._dictionary_data$.next(x.body)
                        } else {
                            // return error message
                        }
                    })
                } else {
                    // return error message
                }
            })
        }



    }

    private shuffle(array) {
        var tmp, current, top = array.length;
        if (top)
            while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
        return array;
    }

    getRandom$(no_random: number) {
        return this._dictionary_data$.asObservable().pipe(
            map((x) => this.shuffle(x).slice(0, no_random))
        )
    }

    getSlice$(start_index: number, no_slice: number) {
        return this._dictionary_data$.asObservable().pipe(
            map((x) => x.slice(start_index, start_index + no_slice))
        )
    }

    get allAudioEntries$() {
        return this._dictionary_data$.asObservable().pipe(
            map((arr) => arr.filter((x) => x.audio))
        )
    }

    get config$() {
        return this._config$.asObservable()
    }

    get dataDict$() {
        return this._dictionary_data$.asObservable()
    }

    get config_value() {
        return this._config$.getValue()
    }

    get dataDict_value() {
        return this._dictionary_data$.getValue()
    }


}