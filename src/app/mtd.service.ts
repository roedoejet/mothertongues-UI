import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config, DictionaryData } from './models'
import { HttpClient } from "@angular/common/http";

@Injectable()
export class MTDService {
    _dictionary_data$ = new BehaviorSubject<DictionaryData[]>(window['dataDict'])
    _config$ = new BehaviorSubject<Config>(window['config'])
    remote_data$ = this.http.get('https://www.google.ca', { observe: 'response' })
    remote_config$ = this.http.get('https://www.google.ca', { observe: 'response' })
    constructor(private http: HttpClient) {

        if (true) {
            this._config$.next({ "L1": { "name": "<YourUpdatedLanguageName>", "lettersInLanguage": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"] }, "L2": { "name": "English" } })
        }

        this.remote_config$.subscribe(x => {
            if (x.status === 200) {
                console.log('yay')
            } else {
                console.log('nay')
            }
        })

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