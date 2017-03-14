//
//  PokemonSynthetic.swift
//  Pokedex
//
//  Created by Lucas Zulpo Pasa on 14/03/17.
//
//

import Foundation

class PokemonSynthetic {
    
    var id: Int?
    var name: String?
    var genus: String?
    
    //MARK: Initialization
    
    init(id: Int, name: String, genus: String) {
        // Initialize stored properties.
        self.id = id
        self.name = name
        self.genus = genus
    }
    
}
