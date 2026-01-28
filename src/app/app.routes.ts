import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./pages/products/products').then((m) => m.ProductsPage),
	},
	{
		path: 'collection/:id',
		loadComponent: () => import('./pages/products/products').then((m) => m.ProductsPage),
	},
	{
		path: 'collections',
		loadComponent: () =>
			import('./pages/collections/collections').then((m) => m.CollectionsPage),
	},
	{
		path: 'delivery',
		loadComponent: () => import('./pages/delivery/delivery').then((m) => m.DeliveryPage),
	},
	{
		path: 'dress/:id',
		loadComponent: () => import('./pages/product/product').then((m) => m.ProductPage),
	},
	{
		path: '**',
		redirectTo: '/',
	},
];
