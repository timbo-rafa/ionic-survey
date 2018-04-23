import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
//var sampleSubmission = require('json!./sample-submission.json')
import { Question, Questions } from '../../../model/question'
import { Submission } from '../../../model/submission'

import { ResultPage } from '../result/result'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  questions: Observable<any[]>
  //submissions: Observable<any[]>
  submissions: AngularFireList<Submission>
  survey: FormGroup
  rating: any

  constructor(public navCtrl: NavController,
      private afDatabase: AngularFireDatabase,
      private formBuilder: FormBuilder) {
    this.questions = this.afDatabase.list('questions').valueChanges()
    this.submissions = this.afDatabase.list('submissions')
    var formArray : FormArray = new FormArray([])
    Array.from(Array(20).keys()).forEach(e => formArray.push(this.createItem()))
    this.survey = this.formBuilder.group({
      //rating: [''],
      //answer: [''],
      items: this.formBuilder.array(formArray.controls)
    })
  }

  ngOnInit() {
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      type: [''],
      rating: [''],
      answer: [''],
      title: ['']
    })
  }

  /*
  addItem(): void {
    this.items = this.survey.get('items') as FormArray;
    this.items.push(this.createItem())
  }
  */

  nop() {
    
  }

  doSubmit(event) {
    console.log('Submit:', this.survey.value.items)
    this.submissions.push(this.survey.value.items)
    //this.sampleSubmit()
  }

  onStarChange(event) {
    console.log('starChange:', event, this.rating)
    this.rating = 1
  }

  toResult() {
    this.navCtrl.push(ResultPage);
  }
}
