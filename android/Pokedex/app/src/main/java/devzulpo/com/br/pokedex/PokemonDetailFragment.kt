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
import java.io.BufferedReader
import java.io.IOException
import java.io.InputStream
import java.io.InputStreamReader

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
            mItem = readPokemonByIdFromCsv(id)
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
            (rootView.findViewById(R.id.name) as TextView).text = mItem!!.name
            (rootView.findViewById(R.id.height) as TextView).text = mItem!!.height.toString()
            (rootView.findViewById(R.id.weight) as TextView).text = mItem!!.weight.toString()
        }

        return rootView
    }

    private fun readPokemonByIdFromCsv(id: Int): PokemonAnalytic? {
        val inputStream: InputStream = activity.assets.open("pokemon.csv")
        val reader: BufferedReader = BufferedReader(InputStreamReader(inputStream))

        var pokemonAnalytic: PokemonAnalytic? = null

        try {
            while (reader.readLine() != null) {
                val line: String = reader.readLine()

                val rowData = line.split(
                    ",".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()

                if (rowData[0].toInt().equals(id)) {
                    pokemonAnalytic = PokemonAnalytic(
                            rowData[0].toInt(),
                            rowData[1].toUpperCase(),
                            rowData[2].toInt(),
                            rowData[3].toInt())
                }
            }
        } catch (ex: IOException) {
            Log.e("Pokedex", ex.message)
        } finally {
            try {
                inputStream.close()
            } catch (ex: IOException) {
                Log.e("Pokedex", ex.message)
            }
        }

        return pokemonAnalytic
    }

    companion object {
        /**
         * The fragment argument representing the item ID that this fragment
         * represents.
         */
        val ARG_ITEM_ID = "item_id"
    }
}
