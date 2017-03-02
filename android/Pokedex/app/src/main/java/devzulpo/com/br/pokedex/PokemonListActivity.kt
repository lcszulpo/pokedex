package devzulpo.com.br.pokedex

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v4.content.ContextCompat
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.*
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import org.json.JSONArray
import java.io.BufferedReader
import java.io.InputStream
import java.io.InputStreamReader

import java.util.ArrayList
import java.io.IOException
import uk.co.chrisjenx.calligraphy.CalligraphyConfig.initDefault
import uk.co.chrisjenx.calligraphy.CalligraphyConfig
import uk.co.chrisjenx.calligraphy.CalligraphyContextWrapper






/**
 * An activity representing a list of Pokemons. This activity
 * has different presentations for handset and tablet-size devices. On
 * handsets, the activity presents a list of items, which when touched,
 * lead to a [PokemonDetailActivity] representing
 * item details. On tablets, the activity presents the list of items and
 * item details side-by-side using two vertical panes.
 */
class PokemonListActivity : AppCompatActivity() {

    /**
     * Whether or not the activity is in two-pane mode, i.e. running on a tablet
     * device.
     */
    private var mTwoPane: Boolean = false
    private var recyclerView: RecyclerView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        CalligraphyConfig.initDefault(CalligraphyConfig.Builder()
            .setDefaultFontPath("fonts/Pokemon.ttf")
            .setFontAttrId(R.attr.fontPath)
            .build()
        )

        setContentView(R.layout.activity_pokemon_list)

        val toolbar = findViewById(R.id.toolbar) as Toolbar
        setupToolbar(toolbar)

        recyclerView = findViewById(R.id.pokemon_list) as RecyclerView
        assert(recyclerView != null)

        if (findViewById(R.id.pokemon_detail_container) != null) {
            // The detail container view will be present only in the
            // large-screen layouts (res/values-w900dp).
            // If this view is present, then the
            // activity should be in two-pane mode.
            mTwoPane = true
        }

        val results: List<PokemonSynthetic> = readPokemonsFromJson()

        setupRecyclerView(recyclerView!!, results)
    }

    override fun attachBaseContext(newBase: Context) {
        super.attachBaseContext(CalligraphyContextWrapper.wrap(newBase))
    }

    private fun setupToolbar(toolbar: Toolbar) {
        setSupportActionBar(toolbar)
        toolbar.title = title
    }

    private fun readPokemonsFromJson(): List<PokemonSynthetic> {
        val inputStream: InputStream = assets.open("pokemon_names.json")
        val size = inputStream.available()
        val buffer = ByteArray(size)

        inputStream.read(buffer)
        inputStream.close()

        val json = String(buffer)

        val pokemonNames: JSONArray = JSONArray(json)

        val pokemonSynthetics: MutableList<PokemonSynthetic> = ArrayList()

        for (i in 0..(pokemonNames.length() - 1)) {
            val pokemonName = pokemonNames.getJSONObject(i)

            var pokemonSynthetic: PokemonSynthetic =
                    PokemonSynthetic(
                            pokemonName.getInt("id"),
                            pokemonName.getString("name"),
                            pokemonName.getString("genus"))

            pokemonSynthetics.add(pokemonSynthetic)
        }

        return sortPokemonsByName(pokemonSynthetics)
    }

    private fun sortPokemonsByName(pokemonSynthetics: MutableList<PokemonSynthetic>): List<PokemonSynthetic> {
        return pokemonSynthetics.sortedBy { p -> p.name }
    }

    private fun setupRecyclerView(recyclerView: RecyclerView,
                                  results: List<PokemonSynthetic>) {
        recyclerView.adapter = SimpleItemRecyclerViewAdapter(results)
    }

    inner class SimpleItemRecyclerViewAdapter(private val mValues: List<PokemonSynthetic>) :
            RecyclerView.Adapter<SimpleItemRecyclerViewAdapter.ViewHolder>() {

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
            val view = LayoutInflater.from(parent.context)
                    .inflate(R.layout.pokemon_list_content, parent, false)
            return ViewHolder(view)
        }

        override fun onBindViewHolder(holder: ViewHolder, position: Int) {
            val pokemon = mValues[position]

            holder.mItem = pokemon

            val drawableImageName: String = "pokemon_" + pokemon.id

            holder.nImageView.setImageResource(applicationContext.resources.getIdentifier(drawableImageName, "drawable", getPackageName()));

            ContextCompat.getDrawable(applicationContext, R.drawable.pokemon_1)

            holder.mNameView.text = pokemon.name
            holder.mTypeView.text = pokemon.type

            holder.mView.setOnClickListener {
                if (mTwoPane) {
                    val arguments: Bundle = Bundle()
                    arguments.putInt(PokemonDetailFragment.ARG_ITEM_ID, holder.mItem.id)
                    val fragment: PokemonDetailFragment = PokemonDetailFragment()
                    fragment.setArguments(arguments)
                    getSupportFragmentManager().beginTransaction()
                        .replace(R.id.pokemon_detail_container, fragment)
                        .commit()
                } else {
                    val intent: Intent = Intent(baseContext, PokemonDetailActivity::class.java)
                    intent.putExtra(PokemonDetailFragment.ARG_ITEM_ID, holder.mItem.id)
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    baseContext.startActivity(intent)
                }
            }
        }

        override fun getItemCount(): Int {
            return mValues.size
        }

        inner class ViewHolder(val mView: View) : RecyclerView.ViewHolder(mView) {
            val nImageView: ImageView
            val mNameView: TextView
            val mTypeView: TextView
            var mItem: PokemonSynthetic = PokemonSynthetic(0, "", "")

            init {
                nImageView = mView.findViewById(R.id.imageView) as ImageView
                mNameView = mView.findViewById(R.id.name) as TextView
                mTypeView = mView.findViewById(R.id.type) as TextView
            }
        }
    }

}
