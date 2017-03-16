//
//  MasterViewController.swift
//  Pokedex
//
//  Created by SOFTIMAC01 on 14/03/17.
//
//

import UIKit
import SwiftyJSON

class MasterViewController: UITableViewController {

    var detailViewController: DetailViewController? = nil
    var pokemons = Array<PokemonSynthetic>()

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.

        if let split = self.splitViewController {
            let controllers = split.viewControllers
            self.detailViewController = (controllers[controllers.count-1] as! UINavigationController).topViewController as? DetailViewController
        }
        
        pokemons = readPokemonsFromJson()
    }

    override func viewWillAppear(_ animated: Bool) {
        self.clearsSelectionOnViewWillAppear = self.splitViewController!.isCollapsed
        super.viewWillAppear(animated)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: - Segues
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "showDetail" {
            if let indexPath = self.tableView.indexPathForSelectedRow {
                let pokemon = pokemons[indexPath.row]
                let controller = (segue.destination as! UINavigationController).topViewController as! DetailViewController
                controller.detailItem = pokemon
                controller.navigationItem.leftBarButtonItem = self.splitViewController?.displayModeButtonItem
                controller.navigationItem.leftItemsSupplementBackButton = true
            }
        }
    }

    // MARK: - Table View

    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return pokemons.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath) as! PokemonUITableViewCell

        let object = pokemons[indexPath.row]
        
        cell.imageViewPokemon!.image = UIImage(named: "pokemon_\(object.id!)")
        cell.labelName!.text = object.name
        cell.labelGenus!.text = object.genus
        
        return cell
    }

    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return false
    }

    // MARK: - Functions
    
    func readPokemonsFromJson() -> Array<PokemonSynthetic> {
        var pokemons: Array<PokemonSynthetic> = []
        
        if let path = Bundle.main.path(forResource: "pokemon_names", ofType: "json") {
            do {
                let data = try Data(contentsOf: URL(fileURLWithPath: path), options: .alwaysMapped)
                let jsonObj = JSON(data: data)
                if jsonObj != JSON.null {
                    for (key, subJson):(String, JSON) in jsonObj {
                        let pokemonSynthetic = PokemonSynthetic(
                            id: subJson["id"].int!,
                            name: subJson["name"].string!,
                            genus: subJson["genus"].string!)
                        
                        pokemons.append(pokemonSynthetic)
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
        
        return sortPokemonsByName(pokemons: pokemons)
    }
    
    func sortPokemonsByName(pokemons: Array<PokemonSynthetic>) -> Array<PokemonSynthetic> {
        return pokemons.sorted { $0.name! < $1.name! }
    }

}

