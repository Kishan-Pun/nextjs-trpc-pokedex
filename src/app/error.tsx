"use client";

import { Button, Container, Typography } from "@mui/material";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" color="error" gutterBottom>
        Something went wrong!
      </Typography>

      <Typography>{error.message}</Typography>

      <Button variant="contained" sx={{ mt: 2 }} onClick={() => reset()}>
        Try Again
      </Button>
    </Container>
  );
}