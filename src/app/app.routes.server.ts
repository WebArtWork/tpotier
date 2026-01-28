import { RenderMode, ServerRoute } from '@angular/ssr';
import { PRODUCTS } from './app.products';
import { toSlug } from './app.utils';

export const serverRoutes: ServerRoute[] = [
	{
		path: '',
		renderMode: RenderMode.Prerender,
	},

	{
		path: 'collections',
		renderMode: RenderMode.Prerender,
	},

	{
		path: 'dress/:id',
		renderMode: RenderMode.Prerender,
		async getPrerenderParams() {
			return PRODUCTS.map((p) => ({ id: p.id }));
		},
	},

	{
		path: 'collection/:id',
		renderMode: RenderMode.Prerender,
		async getPrerenderParams() {
			const seen = new Set<string>();

			return PRODUCTS.map((p) => toSlug(p.category))
				.filter((slug) => {
					if (seen.has(slug)) return false;
					seen.add(slug);
					return true;
				})
				.map((slug) => ({ id: slug }));
		},
	},

	// default: no SSR, just client-render
	{
		path: '**',
		renderMode: RenderMode.Client,
	},
];
