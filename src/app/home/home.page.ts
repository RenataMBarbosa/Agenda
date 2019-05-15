import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ContactService, Contact, ContactList} from '../contact.service';
import { Router}  from '@angular/router';

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  contacts: ContactList[];
  provider : ContactService;

  constructor(private router : Router,public navCtrl: NavController, private contactService: ContactService, private toast: ToastController) { }

  ionViewDidEnter() {
    this.contactService.getAll()
      .then((result) => {
        this.contacts = result;
      });
  }

  addContact() {
    this.router.navigateByUrl ('/EditContactPage');
  }

  editContact(item: ContactList) {
    this.router.navigateByUrl('/EditContactPage' /*{ key: item.key, contact: item.contact }*/);
  }

  removeContact(item: ContactList) {
    this.contactService.remove(item.key)
      .then(() => {
        // Removendo do array de items
        var index = this.contacts.indexOf(item);
        this.contacts.splice(index, 1);
        this.showToast('Item removido!');
      })
  }
  async showToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}