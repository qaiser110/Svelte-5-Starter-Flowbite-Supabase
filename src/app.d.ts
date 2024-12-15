// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { ApexOptions } from 'apexcharts';
import { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
	interface CustomApexOptions extends ApexOptions {
		states: {
			hover?: {
				filter?: {
					type?: string;
					value?: number;
				};
			};
			active?: {
				allowMultipleDataPointsSelection?: boolean;
				filter?: {
					type?: string;
					value?: number;
				};
			};
		};
	}

	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			safeGetSession(): Promise<{ session: Session | null; user: User | null }>;
			session: { session: Session | null; user: User | null };
			user: User | null;
		}
		interface PageData {
			session: Session | null;
			user: User | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
