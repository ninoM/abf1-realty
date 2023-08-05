import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { createClient } from '@libsql/client';

const runMigrate = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }
  if (!process.env.DATABASE_AUTH_TOKEN) {
    throw new Error('DATABASE_AUTH_TOKEN is not set');
  }

  const client = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });

  const db = drizzle(client);

  console.log('🔧Running migrations...');
  const start = Date.now();
  await migrate(db, {
    migrationsFolder: './migrations',
  });
  const end = Date.now();

  console.log(`🟢 Migrations completed in ${end - start}ms`);
  process.exit(0);
};

runMigrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
