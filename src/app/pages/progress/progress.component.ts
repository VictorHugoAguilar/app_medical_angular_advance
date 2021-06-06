import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [
    './progress.component.css'
  ]
})
export class ProgressComponent {

  progress_a: number = 40;
  progress_b: number = 20;

  getProgress_a() {
    return `${this.progress_a}%`;
  }

  getProgress_b() {
    return `${this.progress_b}%`;
  }

}
