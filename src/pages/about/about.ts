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
    let year = build.slice(0,4)
    let month = build.slice(4,6)
    let day = build.slice(6,8)
    let time = build.slice(8,10) + ":" + build.slice(10,12)
    return `${time} on ${year}/${month}/${day}`
  }

}
