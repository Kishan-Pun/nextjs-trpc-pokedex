import { Box, Typography, Container } from "@mui/material";
import { FilterablePokedexTable } from "@/components/FilterablePokedexTable";

export default function FilterPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Filter Pokémon By Type
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          Select a type to filter Pokémon from the database.
        </Typography>

        <FilterablePokedexTable />
      </Box>
    </Container>
  );
}