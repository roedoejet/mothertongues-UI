import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { MTDInfo } from '../../app/global'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class About {
  language: string = MTDInfo.config['L1']['name']
  constructor(public navCtrl: NavController) {
    console.log(this.language)
  }

}
