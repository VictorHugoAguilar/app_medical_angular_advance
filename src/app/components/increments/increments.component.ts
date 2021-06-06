import { Component  } from '@angular/core';

@Component({
  selector: 'app-increments',
  templateUrl: './increments.component.html',
  styles: [
  ]
})
export class IncrementsComponent  {

  progress: number = 0;

  constructor() { }

  getProgress(): string {
    return `${this.progress}%`;
  }

  changeValue(value: number) : number | void {
    if(this.progress >= 100 && value >= 0){
       this.progress = 100;
       return;
    }

    if(this.progress <= 0 && value < 0){
       this.progress = 0;
       return;
    }
    this.progress = this.progress + value;
  }

}
