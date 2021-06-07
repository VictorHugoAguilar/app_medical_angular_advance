import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo!: string;
  public titulosSubs$!: Subscription;

  constructor(private router: Router) {
    this.titulosSubs$ = this.getArgumentsOfRouter()
      .subscribe(event => {
        this.titulo = event.titulo;
        document.title = `AdminPro - ${this.titulo}`;
      });
  }

  ngOnDestroy(): void {
    this.titulosSubs$.unsubscribe();
  }

  getArgumentsOfRouter() {
    return this.router.events
      .pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => { return event.snapshot.data })
      );
  }

}
