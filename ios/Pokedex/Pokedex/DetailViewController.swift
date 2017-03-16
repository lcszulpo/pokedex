//
//  DetailViewController.swift
//  Pokedex
//
//  Created by SOFTIMAC01 on 14/03/17.
//
//

import UIKit
import SwiftyJSON

class DetailViewController: UIViewController {
    
    @IBOutlet weak var imageViewPokemon: UIImageView!
    @IBOutlet weak var labelPokemonName: UILabel!
    @IBOutlet weak var labelPokemonHeight: UILabel!
    @IBOutlet weak var labelPokemonWeight: UILabel!
    
    var detailItem: PokemonSynthetic? {
        didSet {
            // Update the view.
            self.configureView()
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        self.configureView()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func configureView() {
        // Update the user interface for the detail item.
        if let detail = self.detailItem {
            if let pokemon: PokemonAnalytic = readPokemonsByIdFromJson(id: detail.id!) {
                if imageViewPokemon != nil {
                    imageViewPokemon!.image = UIImage(named: "pokemon_\(pokemon.id!)")
                }
                
                if labelPokemonName != nil {
                    labelPokemonName!.text = "\(pokemon.name!)".uppercased()
                }
                
                if labelPokemonHeight != nil {
                    labelPokemonHeight!.text = "\(pokemon.height!)"
                }
                
                if labelPokemonWeight != nil {
                    labelPokemonWeight!.text = "\(pokemon.weight!)"
                }
            }
        }
    }
    
    func readPokemonsByIdFromJson(id: Int) -> PokemonAnalytic {
        var pokemon: PokemonAnalytic?
        
        if let path = Bundle.main.path(forResource: "pokemon", ofType: "json") {
            do {
                let data = try Data(contentsOf: URL(fileURLWithPath: path), options: .alwaysMapped)
                let jsonObj = JSON(data: data)
                if jsonObj != JSON.null {
                    for (key, subJson):(String, JSON) in jsonObj {
                        if subJson["id"].int! == id {
                            pokemon = PokemonAnalytic(id: subJson["id"].int!, name: subJson["name"].string!, height: subJson["height"].int!, weight: subJson["weight"].int!)
                        }
                    }
                } else {
                    print("Could not get json from file, make sure that file contains valid json.")
                }
            } catch let error {
                print(error.localizedDescription)
            }
        } else {
            print("Invalid filename/path.")
        }
        
        return pokemon!
    }
    
}

