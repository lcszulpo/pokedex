package devzulpo.com.br.pokedex

import android.support.design.widget.CollapsingToolbarLayout
import android.os.Bundle
import android.support.v4.app.Fragment
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import org.json.JSONArray
import java.io.BufferedReader
import java.io.IOException
import java.io.InputStream
import java.io.InputStreamReader
import java.util.*

/**
 * A fragment representing a single PokemonSynthetic detail screen.
 * This fragment is either contained in a [PokemonListActivity]
 * in two-pane mode (on tablets) or a [PokemonDetailActivity]
 * on handsets.
 */
/**
 * Mandatory empty constructor for the fragment manager to instantiate the
 * fragment (e.g. upon screen orientation changes).
 */
class PokemonDetailFragment : Fragment() {

    /**
     * The dummy content this fragment is presenting.
     */
    private var mItem: PokemonAnalytic? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        if (arguments.containsKey(ARG_ITEM_ID)) {
            // Load the dummy content specified by the fragment
            // arguments. In a real-world scenario, use a Loader
            // to load content from a content provider.
            val id: Int = arguments.getInt(ARG_ITEM_ID)
            mItem = readPokemonByIdFromJson(id)
        }
    }

    override fun onCreateView(inflater: LayoutInflater?, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        val rootView = inflater!!.inflate(R.layout.pokemon_detail, container, false)

        // Show the dummy content as text in a TextView.
        if (mItem is PokemonAnalytic) {
            val drawableImageName: String = "pokemon_" + mItem!!.id
            (rootView.findViewById(R.id.image) as ImageView).setImageResource(
                activity.applicationContext.resources.getIdentifier(drawableImageName, "drawable", activity.getPackageName())
            )
            (rootView.findViewById(R.id.name) as TextView).text = mItem!!.name.toUpperCase()
            (rootView.findViewById(R.id.height) as TextView).text = mItem!!.height.toString()
            (rootView.findViewById(R.id.weight) as TextView).text = mItem!!.weight.toString()
        }

        return rootView
    }

    private fun readPokemonByIdFromJson(id: Int): PokemonAnalytic? {
        val inputStream: InputStream = activity.assets.open("pokemon.json")
        val size = inputStream.available()
        val buffer = ByteArray(size)

        inputStream.read(buffer)
        inputStream.close()

        val json = String(buffer)

        val pokemons: JSONArray = JSONArray(json)

        val pokemonAnalytics: MutableList<PokemonAnalytic> = ArrayList()

        for (i in 0..(pokemons.length() - 1)) {
            val pokemon = pokemons.getJSONObject(i)

            var pokemonAnalytic: PokemonAnalytic =
                    PokemonAnalytic(
                            pokemon.getInt("id"),
                            pokemon.getString("name"),
                            pokemon.getInt("height"),
                            pokemon.getInt("weight"))

            pokemonAnalytics.add(pokemonAnalytic)
        }

        return pokemonAnalytics.find { p -> p.id == id }
    }

    companion object {
        /**
         * The fragment argument representing the item ID that this fragment
         * represents.
         */
        val ARG_ITEM_ID = "item_id"
    }
}
