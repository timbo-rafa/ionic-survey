import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
//var sampleSubmission = require('json!./sample-submission.json')
//import { Question, Questions } from '../../../model/question'
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
  //rating: any
  statistics: any
  programCodes: Observable<any>
  ids: any[]
  loading: boolean

  constructor(public navCtrl: NavController,
      private afDatabase: AngularFireDatabase,
      private formBuilder: FormBuilder) {
    this.loading = true
    //this.questions = this.afDatabase.list('questions').valueChanges()
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
        this.loading = false
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

      if (!stats[programCode]) {
        stats[programCode] = {}
        stats[programCode].show = true
      }
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

        // average(statistics[programCode][id].ratings
        if (answer.type == 'radio') {
          if (!questionStats.ratings) questionStats.ratings = {}
          if (!questionStats.ratings[answer.rating]) questionStats.ratings[answer.rating] = 0
          questionStats.ratings[answer.rating] += 1
        }

      })
    })

    console.log('crunch.stats before', stats)
    this.statistics = stats
    this.crunchAverages(results)
    console.log('crunch.stats', stats)

    this.programCodes = Observable.of( Object.keys(stats))
    return stats
  }

  crunchAverages(results: Submission[]) {

    Object.keys(this.statistics).forEach(programCode => {
      this.ids.forEach(id => {
        console.log('crunchAverages', this.statistics[programCode][id])
        this.calculateAverage(this.statistics[programCode][id].ratings)
      })
    })

  }

  calculateAverage(ratings) {
    if (!ratings) return
    var r1 = ratings[1] ? ratings[1] : 0
    var r2 = ratings[2] ? ratings[2] : 0
    var r3 = ratings[3] ? ratings[3] : 0
    var r4 = ratings[4] ? ratings[4] : 0
    var r5 = ratings[5] ? ratings[5] : 0
    var total = r1 + r2 + r3 + r4 + r5

    ratings.average = (1 * r1 + 2 * r2 + 3 * r3 + 4 * r4 + 5 * r5 ) / total
    ratings.average = Math.round(ratings.average * 1000) / 1000
    ratings.roundedAverage = this.roundAverage(ratings.average)
  }

  roundAverage(average: number) {
    if (average < 0) {
      console.log('roundAverage warning: average < 0')
      return 0
    }
    if (average < 0.25) return 0.00
    if (average < 0.75) return 0.50
    if (average < 1.25) return 1.00
    if (average < 1.75) return 1.50
    if (average < 2.25) return 2.00
    if (average < 2.75) return 2.50
    if (average < 3.25) return 3.00
    if (average < 3.75) return 3.50
    if (average < 4.25) return 4.00
    if (average < 4.75) return 4.50
    if (average > 5.00) console.log('roundAverage warning: average > 5')
    return 5
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
    console.log('starChange:', event)
  }

  toResult() {
    this.navCtrl.push(ResultPage);
  }

  collapse(programCode) {
    this.statistics[programCode].show = !this.statistics[programCode].show
  }
}
