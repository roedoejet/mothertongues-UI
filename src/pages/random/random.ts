import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Entry } from '../shared/entry.model'

@Component({
  selector: 'page-random',
  templateUrl: 'random.html'
})
export class Random {

  entries: Entry[];

  constructor(public navCtrl: NavController) {
    
  }

  getRandom() {
    this.entries = window['getRandom10']()
  }

}
