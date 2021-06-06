import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private themeLink = document.querySelector('#theme');

  constructor(){
    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.themeLink?.setAttribute('href', url);
  }

  changeTheme( theme: string ){
    const url = `./assets/css/colors/${theme}.css`;
    this.themeLink?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    const links = document.querySelectorAll('.selector');
    if(links === undefined){
      return;
    }
    links.forEach( elem => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.themeLink?.getAttribute('href');
      if( btnThemeUrl == currentTheme){
        elem.classList.add('working');
      }
    });
  }

}
