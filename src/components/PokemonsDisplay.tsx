import { useEffect, useState } from "react";
import PokemonCard from "./ui/PokemonCard";
import type { PokemonDetail, PokemonListItem, PokemonListResponse } from "@/types/PokemonsTypes";

interface PokemonsDisplayProps {
  searchTerm: string;
  selectedTypes: string[];
}

export const PokemonsDisplay = ({ searchTerm, selectedTypes  }: PokemonsDisplayProps) => {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [nextUrl, setNextUrl] = useState<string | null>(
    "https://pokeapi.co/api/v2/pokemon?limit=6"
  );
  const [loadingMore, setLoadingMore] = useState(false);

  const MAX_POKEMON_PER_PAGE = 24;

  const fetchPokemon = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Błąd pobierania");

    const data: PokemonListResponse = await res.json();

    const pokemonDetailsPromises = data.results.map(async (pokemonItem: PokemonListItem) => {
      const response = await fetch(pokemonItem.url);
      if (!response.ok) throw new Error(`Błąd pobierania danych dla ${pokemonItem.name}`);
      const pokemonDetail: PokemonDetail = await response.json();
      return pokemonDetail;
    });

    const pokemonDetails = await Promise.all(pokemonDetailsPromises);

    setPokemonList((prev) => {
      const newPokemon = pokemonDetails.filter(
        (pokemon) => !prev.some((existing) => existing.id === pokemon.id)
      );
      const combined = [...prev, ...newPokemon];
      return combined.slice(0, MAX_POKEMON_PER_PAGE);
    });

    setNextUrl(data.next);
  } catch (err: any) {
    setError(err.message || "Nieznany błąd");
  } finally {
    setLoading(false);
    setLoadingMore(false);
  }
};

  useEffect(() => {
    if (nextUrl && pokemonList.length === 0) fetchPokemon(nextUrl);
  }, []);

  const filteredPokemonList = pokemonList
  .filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter((pokemon) =>
    selectedTypes.length > 0 
      ? pokemon.types.some((t) => selectedTypes.includes(t.type.name))
      : true
  );

  if (loading) return <p className="text-center">Ładowanie Pokémonów...</p>;
  if (error) return <p className=" text-red-500">{error}</p>;

  const canLoadMore = nextUrl !== null && pokemonList.length < MAX_POKEMON_PER_PAGE;

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredPokemonList.length > 0 ? (
          filteredPokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-300">
            Brak pasujących Pokémonów
          </p>
        )}
      </div>

      {canLoadMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              setLoadingMore(true);
              if (nextUrl) fetchPokemon(nextUrl);
            }}
            disabled={loadingMore}
            className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-50"
          >
            {loadingMore ? "Ładowanie..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};