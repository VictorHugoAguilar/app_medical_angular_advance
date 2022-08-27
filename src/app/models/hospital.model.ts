import { environment } from "src/environments/environment";

const base_url = environment.base_url;

interface _HospitalUser {
    _id: string;
    nombre: string;
    img: string;
}

export class Hospital {
    constructor(
        public nombre: string,
        public uid?: string,
        public img?: string,
        public usuario?: _HospitalUser
    ) { }


    get imageUrl() {
        if (!this.img) {
            return `${base_url}/upload/hospitales/not-image`;
        } else if (this.img?.includes('https')) {
            return this.img;
        } else if (this.img) {
            return `${base_url}/upload/hospitales/${this.img}`;
        } else {
            return `${base_url}/upload/hospitales/not-image`;
        }
    }
}