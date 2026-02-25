"use client";

import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { PokemonRow } from "@/components/PokemonRow";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function Home() {
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading } = trpc.pokemon.getPokemon.useQuery(search, {
    enabled: !!search,
  });

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Pokedex
      </Typography>

      {!search && (
        <Typography variant="h6" color="text.secondary" mt={4}>
          Search for a Pokemon by name to begin!
        </Typography>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(name.trim());
        }}
      >
        <TextField
          fullWidth
          label="Enter Pokemon name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button variant="contained" type="submit" sx={{ mt: 2 }} fullWidth>
          Search
        </Button>
      </form>

      <Box mt={3}>
        {isLoading && <Typography>Loading...</Typography>}
        {data && <PokemonRow pokemon={data} />}
      </Box>
    </Box>
  );
}
