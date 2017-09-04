import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

export class Pokemon {
  id: number;
  name: string;
  species_id: number;
  height: 7;
  weight: 69;
  base_experience: number;
  order: number;
}

@Injectable()
export class PokedexProvider {

  constructor(public http: Http) {
  }

  public getAllPokemon(): Observable<Pokemon[]>{
    return this.http.get('assets/data/pokemon.json')
      .map(next=> next.json());
  }

}
