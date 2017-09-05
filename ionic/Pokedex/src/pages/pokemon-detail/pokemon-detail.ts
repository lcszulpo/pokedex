import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {Pokemon} from "../../providers/pokedex/pokedex";

@Component({
  selector: 'page-pokemon-detail',
  templateUrl: 'pokemon-detail.html',
})
export class PokemonDetailPage {

  pokemon: Pokemon;

  constructor(private navParams: NavParams) {
    this.pokemon = this.navParams.get('pokemon');
  }

}
