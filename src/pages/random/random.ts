import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DictionaryData } from '../../app/models'
import { MTDService } from '../../app/mtd.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-random',
  templateUrl: 'random.html'
})
export class Random {

  entries$: Observable<DictionaryData[]>;

  constructor(public navCtrl: NavController, private mtdService: MTDService) {
  }

  getRandom() {
    this.entries$ = this.mtdService.getRandom$(10)
  }

}
