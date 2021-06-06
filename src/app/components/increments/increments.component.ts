import { Component, EventEmitter, Input, Output  } from '@angular/core';

@Component({
  selector: 'app-increments',
  templateUrl: './increments.component.html',
  styles: [
  ]
})
export class IncrementsComponent  {
  // @Input('valor') progress: number = 0; // para especificar un nombre personalizado
  @Input() progress: number = 0;
  @Input('btnClass') btnClass: string = 'btn btn-primary';

  @Output() valueSended: EventEmitter<number> = new EventEmitter();

  constructor() { }

  changeValue(value: number) : number | void {
    if(this.progress >= 100 && value >= 0){
      this.valueSended.emit(100);
       this.progress = 100;
       return;
    }

    if(this.progress <= 0 && value < 0){
      this.valueSended.emit(0);
       this.progress = 0;
       return;
    }

    this.progress = this.progress + value;
    this.valueSended.emit(this.progress);
  }

  onChange( newValue: number){
    if(newValue >= 100){
      newValue = 100;
    }else if (newValue <= 0){
      newValue = 0;
    }
    this.progress = newValue;
    this.valueSended.emit(this.progress);
  }
}
