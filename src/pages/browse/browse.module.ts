import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { Browse } from './browse';
import { EntryListModule } from '../shared/entry-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryListModule,
    RouterModule.forChild([
      {
        path: '',
        component: Browse
      }
    ])
  ],
  declarations: [Browse]
})
export class BrowsePageModule {}
