import { Injectable } from "@angular/core";
@Injectable()
export class Adresse {
    public id: string;
    public label: string;
    public num: string;
    public rue: string;
    public cp: string;
    public ville: string;
    public lat: number;
    public lng: number; 

    constructor() { }

}