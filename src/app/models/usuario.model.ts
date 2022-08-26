import { environment } from "src/environments/environment";

const { base_url } = environment;

export class Usuario {

  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public role?: string,
    public google?: string,
    public img?: string,
    public uid?: string
  ) { }

  get imageUrl() {
    if (!this.img) {
      return `${base_url}/upload/usuarios/not-image`;
    } else if (this.img?.includes('https')) {
      return this.img;
    } else if (this.img) {
      return `${base_url}/upload/usuarios/${this.img}`;
    } else {
      return `${base_url}/upload/usuarios/not-image`;
    }
  }

}
