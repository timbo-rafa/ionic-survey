import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
//var sampleSubmission = require('json!./sample-submission.json')
import { Question, Questions } from '../../../model/question'
import { Submission, QuestionAnswer } from '../../../model/submission'


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
  statistics: any
  programCodes: Observable<any>
  ids: any[]

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

    this.crunchData()
  }

  ngOnInit() {
  }

  crunchData() {
    this.submissions.valueChanges().subscribe(
      (results:Submission[]) => {
        console.log('crunchData.results', results)
        this.crunch(results)
      }
    )    
  }

  crunch(results: Submission[]) {
    var stats = {}
    this.ids = []

    results.forEach((submission) => {
      var programCode = submission[0].answer
      var answerArray = submission as QuestionAnswer[]

      if (!stats[programCode]) stats[programCode] = {}
      answerArray.forEach((answer: QuestionAnswer) => {
        //console.log('answer:', answer)

        // include id on list of ids
        if (this.ids.indexOf(answer.id) == -1) this.ids.push(answer.id)

        if (!stats[programCode][answer.id]) {
          stats[programCode][answer.id] = {}
        }
        var questionStats = stats[programCode][answer.id]
        questionStats.title = answer.title

        if (answer.type == 'text') {
          if (!questionStats.answers) questionStats.answers = []

          questionStats.answers.push(answer.answer)
        }

        if (answer.type == 'radio') {
          if (!questionStats.ratings) questionStats.ratings = {}
          if (!questionStats.ratings[answer.rating]) questionStats.ratings[answer.rating] = 0
          questionStats.ratings[answer.rating] += 1
        }
      })
    })

    console.log('crunch.stats', stats)
    this.statistics = stats

    this.programCodes = Observable.of( Object.keys(stats))
    return stats
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

  toResult() {
    this.navCtrl.push(ResultPage);
  }
}
