import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
	schema: ['./src/lib/schemas/'],
	dialect: 'postgresql',
	out: './migrations',
	dbCredentials: {
		url: process.env.DATABASE_URL!
	},
	verbose: true
});
