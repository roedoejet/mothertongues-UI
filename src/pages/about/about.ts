import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MTDService } from '../../app/mtd.service'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class About {
  language: string;
  constructor(public navCtrl: NavController, private mtdService: MTDService) {
    this.language = this.mtdService.config_value.L1.name
    console.log(this.language)
  }

}
