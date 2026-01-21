import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',

  migrations: {
    path: 'prisma/migrations',
  },

  // To generate the migrations is necessary to set the database connection string.
  // This connection or directory is different from the app database connection.
  // This connection is just for DEVELOPMENT PURPOSES.
  datasource: {
    url: process.env.DATABASE_URL || 'file:./dev.db',
  },
});
