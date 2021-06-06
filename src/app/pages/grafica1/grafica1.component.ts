import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels_1: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public labels_2: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public labels_3: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public labels_4: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];

  public data_1: number[][] = [[350, 150, 600]];
  public data_2: number[][] = [[250, 450, 10]];
  public data_3: number[][] = [[150, 250, 100]];
  public data_4: number[][] = [[50, 750, 200]];

}
