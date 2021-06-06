import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input()
  title: string = '';

  @Input('labels')
  doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];

  @Input('data')
  doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];

  doughnutChartType: ChartType = 'doughnut';

  colors: Color[] = [
    {
      backgroundColor: ['#6857E6', '#009FEE', '#F02059']
    }
  ]

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
