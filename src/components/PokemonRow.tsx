import { Card, CardContent, Typography, Chip, Box } from "@mui/material";

type Pokemon = {
  id: number;
  name: string;
  sprite: string;
  types: string[];
};

const typeColors: Record<string, string> = {
  grass: "#78C850",
  fire: "#F08030",
  water: "#6890F0",
  poison: "#A040A0",
};

export function PokemonRow({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={3}>
          <img src={pokemon.sprite} width={80} height={80} />

          <Box>
            <Typography variant="h6">
              #{pokemon.id} {pokemon.name}
            </Typography>

            <Box mt={1}>
              {pokemon.types.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  sx={{
                    mr: 1,
                    backgroundColor: typeColors[type] || "#ccc",
                    color: "#fff",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
