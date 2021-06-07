import { Component , OnDestroy} from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { map, retry, take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public interval$ : Subscription | undefined;

  constructor() {

    /*
    this.returnObservabe().pipe(
      retry()
    ).subscribe(
      data => console.log('data', data),
      (err) => console.error(err),
      () => console.log('Complete observer')
    );
    */

    this.interval$ =  this.returnIntevalo().subscribe(
      console.log
    );


  }
  ngOnDestroy(): void {
    this.interval$?.unsubscribe();
  }

  returnIntevalo() : Observable<number> {
    const intervalo$ = interval(200)
      .pipe(
        //take(10),
        map(x => x + 1),
        filter( x => x%2 === 0)
        );
    return intervalo$;
  }


  returnObservabe(): Observable<number> {
    let i = 0;

    const obs$ = new Observable<number>(observer => {
      const intervalo = setInterval(() => {
        // console.log('ticks')
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {
          observer.error('error');
        }
      }, 1000)
    });

    return obs$;
  }
}
