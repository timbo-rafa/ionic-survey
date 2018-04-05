import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
//var sampleSubmission = require('json!./sample-submission.json')
import { Question, Questions } from '../../../model/question'
import { Submission } from '../../../model/submission'


@Component({
  selector: 'page-result',
  templateUrl: 'result.html'
})
export class ResultPage implements OnInit {
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
    console.log('Submit:', this.survey.value)
    this.submissions.push(this.survey.value)
    //this.sampleSubmit()
  }

  onStarChange(event) {
    console.log('starChange:', event, this.rating)
  }

  sampleSubmit() {
    var submission: Submission = [
      {
        id: 1.1,
        answer: "3223"
      },
      {
        id: 1.2,
        answer: "Mobile Applications Development"
      },
      {
        id: 2.1,
        answer: "Strongly Disagree"
      },
      {
        id: 2.2,
        answer: "Strongly Disagree"
      },
      {
        id: 2.3,
        answer: "Strongly Disagree"
      },
      {
        id: 2.4,
        answer: "Strongly Disagree"
      },
      {
        id: 2.5,
        answer: "Strongly Disagree"
      },
      {
        id: 3.1,
        answer: "Strongly Disagree"
      },
      {
        id: 3.2,
        answer: "Strongly Disagree"
      },
      {
        id: 3.3,
        answer: "Strongly Disagree"
      },
      {
        id: 3.4,
        answer: "Strongly Disagree"
      },
      {
        id: 3.5,
        answer: "Strongly Disagree"
      },
      {
        id: 3.6,
        answer: "Strongly Disagree"
      },
      {
        id: 3.7,
        answer: "Strongly Disagree"
      },
      {
        id: 3.8,
        answer: "Strongly Disagree"
      },
      {
        id: 4.1,
        answer: "Strongly Disagree"
      },
      {
        id: 4.2,
        answer: "Strongly Disagree"
      },
      {
        id: 4.3,
        answer: "Strongly Disagree"
      },
      {
        id: 5.1,
        answer: "Strongly Disagree"
      },
      {
        id: 5.2,
        answer: "Strongly Disagree"
      },
      {
        id: 5.3,
        answer: "Hello World!"
      },
    ]

    this.submissions.push(submission)
  }

  toResult() {
    this.navCtrl.push(ResultPage);
  }
}
