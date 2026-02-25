"use client";

import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { PokedexTable } from "@/components/PokedexTable";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Stack,
  Skeleton,
} from "@mui/material";

export default function MultiplePokemon() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState<string[]>([]);

  const { data, isLoading } =
    trpc.pokemon.getPokemonList.useQuery(search, {
      enabled: search.length > 0,
    });

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Multiple Pokémon Search
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          Enter Pokémon names separated by commas.
        </Typography>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const names = input
              .split(",")
              .map((n) => n.trim())
              .filter(Boolean);

            setSearch(names);
          }}
        >
          <TextField
            fullWidth
            label="Bulbasaur, Charmander"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
            fullWidth
          >
            Search
          </Button>
        </form>

        <Box mt={4}>
          {isLoading && (
            <Stack spacing={2}>
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} variant="rectangular" height={120} />
              ))}
            </Stack>
          )}

          {data && !isLoading && <PokedexTable pokemon={data} />}

          {data && data.length === 0 && (
            <Typography mt={2}>No Pokémon found.</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}