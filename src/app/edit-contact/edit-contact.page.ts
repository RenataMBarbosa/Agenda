import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController } from '@ionic/angular';
import { ContactService, Contact} from '../contact.service';


@Component({
  selector: 'page-edit-contact',
  templateUrl: 'edit-contact.page.html',
})
export class EditContactPage {
  model: Contact;
  key: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactProvider: ContactService, private toast: ToastController) {
    if (this.navParams.data.contact && this.navParams.data.key) {
      this.model = this.navParams.data.contact;
      this.key =  this.navParams.data.key;
    } else {
      this.model = new Contact();
    }
  }

  save() {
    this.saveContact()
      .then(() => {
        this.showToast('Item adicionado!')
        this.navCtrl.pop();
      })
      .catch(() => {
        this.showToast('Erro ao adicionar')
      });
  }

  private saveContact() {
    if (this.key) {
      return this.contactProvider.update(this.key, this.model);
    } else {
      return this.contactProvider.insert(this.model);
    }
  }
  async showToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}