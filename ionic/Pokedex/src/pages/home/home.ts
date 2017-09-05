import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PokedexProvider, Pokemon} from "../../providers/pokedex/pokedex";
import {Observable} from "rxjs/Observable";
import {PokemonDetailPage} from "../pokemon-detail/pokemon-detail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  allPokemon$: Observable<Pokemon[]>

  constructor(private navCtrl: NavController,
              private pokedexProvider: PokedexProvider) {

    this.allPokemon$ = this.pokedexProvider.getAllPokemon();
  }

  openDetail(pokemon: Pokemon) {

    this.navCtrl.push(
      PokemonDetailPage,
      {
        pokemon: pokemon
      });
  }
}
