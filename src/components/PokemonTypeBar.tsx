import { typeColors } from '@/types/PokemonsTypes';

type PokemonTypeBarProps = {
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
};

export const PokemonTypeBar = ({ selectedTypes, setSelectedTypes }: PokemonTypeBarProps) => {
  const types = Object.keys(typeColors);

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(pokemonType => pokemonType !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center pt-4">
      {types.map((type) => {
        const isSelected = selectedTypes.includes(type);
        return (
          <button
            key={type}
            onClick={() => toggleType(type)}
            style={{ backgroundColor: typeColors[type as keyof typeof typeColors] }}
            className={`px-3 py-1 rounded-full font-semibold text-white transition ${
              isSelected ? "ring-2 ring-white" : "hover:brightness-90"
            }`}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
};