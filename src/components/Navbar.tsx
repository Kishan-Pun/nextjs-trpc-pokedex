"use client";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

export function Navbar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Pokedex
        </Typography>

        <Box>
          <Button color="inherit" component={Link} href="/">
            Single
          </Button>
          <Button color="inherit" component={Link} href="/multiple">
            Multiple
          </Button>
          <Button color="inherit" component={Link} href="/filter">
            Filter
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}