/// <reference types="vite/client" />

interface ImportMetaEnv {
	// SUPABASE
	readonly VITE_SUPABASE_URL: string;
	readonly VITE_SUPABASE_ANON_KEY: string;
	// FIREBASE
	readonly VITE_API_KEY: string;
	readonly VITE_AUTH_DOMAIN: string;
	readonly VITE_PROJECT_ID: string;
	readonly VITE_STORAGE_BUCKET: string;
	readonly VITE_MESSAGING_SENDER_ID: string;
	readonly VITE_APP_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
