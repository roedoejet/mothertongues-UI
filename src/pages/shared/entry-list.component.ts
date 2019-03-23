import { Component, Input,  OnChanges, SimpleChange } from '@angular/core';
import { NavController, ViewController, ModalController } from 'ionic-angular';
import { WordModal } from './word-modal.component'
import { DictionaryData } from '../../app/models'

@Component({
  selector: 'entry-list',
  templateUrl: 'entry-list.component.html'
})


export class EntryList implements OnChanges {
  pageName: string;
  edit: boolean = false;

  @Input() parentEdit: boolean;
  @Input() entries: DictionaryData[];
  @Input() searchterm: string;

  constructor(public navCtrl: NavController, private viewCtrl: ViewController, public modalCtrl: ModalController) {
    this.pageName = viewCtrl.name
  }

  showModal(clicked_entry) {
    let wordModal = this.modalCtrl.create(WordModal, { entry: clicked_entry });
    wordModal.present();
  }

  highlight(text){
    if (!this.searchterm) {
      return text;
  }
  return text.replace(new RegExp(this.searchterm, 'gi'), '<span class="langMatched">$&</span>');
  }

  ngOnChanges(){
    this.edit = this.parentEdit;
  }

}
