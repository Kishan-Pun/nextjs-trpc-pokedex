"use client";

import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { PokedexTable } from "./PokedexTable";
import {
  Box,
  Button,
  Modal,
  Typography,
  Stack,
  Pagination,
  Chip,
} from "@mui/material";

export function FilterablePokedexTable() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const limit = 5;

  const { data: types } = trpc.pokemon.getAllTypes.useQuery();

  const { data, isLoading } = trpc.pokemon.getPokemonByType.useQuery({
    types: selectedTypes,
    page,
    limit,
  });

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  return (
    <Box>
      {/* Filter Button */}
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Filter
        </Button>

        <Stack direction="row" spacing={1}>
          {selectedTypes.map((type) => (
            <Chip
              key={type}
              label={type}
              onDelete={() =>
                setSelectedTypes((prev) => prev.filter((t) => t !== type))
              }
              color="primary"
            />
          ))}
        </Stack>
      </Box>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#fafafa",
            p: 4,
            width: 700,
            maxHeight: "80vh",
            overflowY: "auto",
            borderRadius: 3,
            boxShadow: 24,
            backdropFilter: "blur(4px)",
          }}
        >
          <Typography variant="h5" mb={3}>
            Select Pokémon Type
          </Typography>

          {/* Type Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: 2,
            }}
          >
            {types?.map((type) => (
              <Box
                key={type}
                onClick={() => {
                  setSelectedTypes((prev) =>
                    prev.includes(type)
                      ? prev.filter((t) => t !== type)
                      : [...prev, type],
                  );
                }}
                sx={{
                  cursor: "pointer",
                  padding: 2,
                  textAlign: "center",
                  borderRadius: 2,
                  border: selectedTypes.includes(type)
                    ? "2px solid #1976d2"
                    : "1px solid #ddd",
                  backgroundColor: selectedTypes.includes(type)
                    ? "#1976d2"
                    : "#f5f5f5",
                  color: selectedTypes.includes(type) ? "#fff" : "#333",
                  fontWeight: 500,
                  transition: "0.2s",
                  "&:hover": {
                    backgroundColor: selectedTypes.includes(type)
                      ? "#1565c0"
                      : "#e0e0e0",
                  },
                }}
              >
                {type.toUpperCase()}
              </Box>
            ))}
          </Box>

          <Box mt={4}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={() => {
                setPage(1);
                setOpen(false);
              }}
            >
              Apply Filter
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Pokemon Table */}
      {data && <PokedexTable pokemon={data.pokemon} />}

      {/* Pagination */}
      {data && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          sx={{ mt: 3 }}
        />
      )}
    </Box>
  );
}
