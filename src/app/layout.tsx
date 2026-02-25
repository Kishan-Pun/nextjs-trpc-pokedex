import { TRPCProvider } from "@/providers/trpc-provider";
import { Navbar } from "@/components/Navbar";
import { Box, Toolbar } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TRPCProvider>
          <Navbar />
          <Toolbar />
          <Box>{children}</Box>
        </TRPCProvider>
      </body>
    </html>
  );
}
