import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultPage } from './result';
import { Ionic2RatingModule } from 'ionic2-rating'

@NgModule({
  declarations: [
    ResultPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultPage),
    Ionic2RatingModule
  ],
})
export class ResultPageModule {}
