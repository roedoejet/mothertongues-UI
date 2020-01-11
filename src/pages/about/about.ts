import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { MTDInfo } from '../../app/global'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class About {
  language: string = MTDInfo.config['L1']['name']
  build: string;
  constructor(public navCtrl: NavController) {
    this.build = this.buildToString(MTDInfo.config['build'])
  }

  buildToString(build: string){
    let year = build.slice(0,5)
    let month = build.slice(5,7)
    let day = build.slice(7,9)
    let time = build.slice(9,11) + ":" + build.slice(11,13)
    return `at ${time} on ${year}/${month}/${day}`
  }

}
