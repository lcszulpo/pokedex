//
//  PokemonAnalytic.swift
//  Pokedex
//
//  Created by Lucas Zulpo Pasa on 16/03/17.
//
//

import Foundation

class PokemonAnalytic {
    
    var id: Int?
    var name: String?
    var height: Int?
    var weight: Int?
    
    //MARK: Initialization
    
    init(id: Int, name: String, height: Int, weight: Int) {
        // Initialize stored properties.
        self.id = id
        self.name = name
        self.height = height
        self.weight = weight
    }
    
}
