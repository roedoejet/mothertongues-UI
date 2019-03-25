import { Component } from '@angular/core';
import { DictionaryData } from '../../app/models'
import { MTDService } from '../../app/mtd.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-random',
  templateUrl: 'random.html',
  styleUrls: ['random.scss']
})
export class Random {

  entries$: Observable<DictionaryData[]>;

  constructor(private mtdService: MTDService) {
  }

  getRandom() {
    this.entries$ = this.mtdService.getRandom$(10)
  }

}
