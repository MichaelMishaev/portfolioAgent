import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  // Don't specify datasource URL here - let schema.prisma handle it
  // This prevents build errors when DATABASE_URL isn't available during postinstall
});
