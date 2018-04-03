import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  questions: Observable<any[]>
  constructor(public navCtrl: NavController, private afDatabase: AngularFireDatabase) {
    this.questions = this.afDatabase.list('questions').valueChanges()
  }

  nop() {
    
  }
}
