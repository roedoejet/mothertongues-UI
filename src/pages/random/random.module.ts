import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { EntryListModule } from '../shared/entry-list.module'
import { Random } from './random';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryListModule,
    RouterModule.forChild([
      {
        path: '',
        component: Random
      }
    ])
  ],
  declarations: [Random]
})
export class RandomPageModule {}
