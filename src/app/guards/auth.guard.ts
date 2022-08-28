import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    return this.usuarioService.validateToken()
      .pipe(
        tap(isAuthentificated => {
          if (!isAuthentificated) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.usuarioService.validateToken()
    .pipe(
      tap(isAuthentificated => {
        if (!isAuthentificated) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }

}
