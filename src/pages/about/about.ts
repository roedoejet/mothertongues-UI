import { Component } from '@angular/core';
import { MTDService } from '../../app/mtd.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class About {
  language$: Observable<string>;
  constructor(private mtdService: MTDService) {
    this.language$ = this.mtdService.name$
  }

}
