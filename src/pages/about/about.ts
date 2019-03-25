import { Component } from '@angular/core';
import { MTDService } from '../../app/mtd.service'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class About {
  language: string;
  constructor(private mtdService: MTDService) {
    this.language = this.mtdService.config_value.L1.name
    console.log(this.language)
  }

}
