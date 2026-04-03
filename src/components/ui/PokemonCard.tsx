import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"; 
import { typeColors, type PokemonDetail } from "@/types/PokemonsTypes";

interface PokemonCardProps {
  pokemon: PokemonDetail;
  className?: string; 
}

export default function PokemonCard({ pokemon, className }: PokemonCardProps) {
  const backgroundStyle =
  pokemon.types.length === 1
    ? { backgroundColor: typeColors[pokemon.types[0].type.name as keyof typeof typeColors] }
    : {
        background: `linear-gradient(
          135deg, 
          ${typeColors[pokemon.types[0].type.name as keyof typeof typeColors]}, 
          ${typeColors[pokemon.types[1].type.name as keyof typeof typeColors]}
        )`,
      };

  return (
    <Card style={backgroundStyle} className={`hover:shadow-lg transition ${className}`}>
      <CardHeader className="flex flex-col items-center">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-32 h-32"
        />
       <div className="text-white text-sm md:text-lg">
         <CardTitle className="capitalize">{pokemon.name}</CardTitle>
        <p className="text-center"># {pokemon.id}</p>
       </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-center gap-2">
          {pokemon.types.map((pokemonType) => (
            <span
              key={pokemonType.type.name}
              className="px-2 py-1 rounded-full text-xs md:text-sm font-semibold bg-white/20 text-white"
            >
              {pokemonType.type.name}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}