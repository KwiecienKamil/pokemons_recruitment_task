import { useState } from "react";
import { PokemonsDisplay } from "./components/PokemonsDisplay"
import SearchBar from "./components/Searchbar"
import { PokemonTypeBar } from "./components/PokemonTypeBar";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  return (
    <>
    <section className="flex flex-col items-center gap-4 p-8">
      <div className="flex items-center gap-4">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="poke-ball" className="min-w-[3rem]"/>
      <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-300 bg-clip-text text-transparent">
      Pokémon Explorer
      </h1>
      </div>
      <SearchBar value={searchTerm} onChange={setSearchTerm}/>
      <PokemonTypeBar selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />

    </section>
    <PokemonsDisplay searchTerm={searchTerm} selectedTypes={selectedTypes}/>
    </>
  )
}

export default App