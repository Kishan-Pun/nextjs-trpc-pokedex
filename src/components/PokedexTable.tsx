import { Stack } from "@mui/material";
import { PokemonRow } from "./PokemonRow";

type Pokemon = {
  id: number;
  name: string;
  sprite: string;
  types: string[];
};

export function PokedexTable({ pokemon }: { pokemon: Pokemon[] }) {
  return (
    <Stack spacing={2} mt={2}>
      {pokemon.map((p) => (
        <PokemonRow key={p.id} pokemon={p} />
      ))}
    </Stack>
  );
}