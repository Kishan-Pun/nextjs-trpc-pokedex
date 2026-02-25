"use client";

import { trpc } from "@/utils/trpc";
import { Button, Stack } from "@mui/material";

type PokemonTypeSelectionProps = {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
};

export function PokemonTypeSelection({
  selectedType,
  selectType,
}: PokemonTypeSelectionProps) {
  const { data: types, isLoading } = trpc.pokemon.getAllTypes.useQuery();

  if (isLoading) return null;

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
      <Button
        variant={!selectedType ? "contained" : "outlined"}
        onClick={() => selectType(undefined)}
      >
        All
      </Button>

      {types?.map((type) => (
        <Button
          key={type}
          variant={selectedType === type ? "contained" : "outlined"}
          onClick={() => selectType(type)}
        >
          {type}
        </Button>
      ))}
    </Stack>
  );
}
