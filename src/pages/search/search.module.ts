import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { Search } from './search';
import { EntryListModule } from '../shared/entry-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryListModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: Search
      }
    ])
  ],
  declarations: [Search],
//   entryComponents: []
})
export class SearchPageModule {}
