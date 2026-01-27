import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../app.interface';
import { links } from '../../app.links';
import { PRODUCTS } from '../../app.products';

@Component({
	selector: 'app-footer',
	imports: [RouterLink],
	templateUrl: './footer.html',
	styleUrl: './footer.css',
})
export class Footer {
	protected readonly products = signal<Product[]>(PRODUCTS);

	protected readonly year = new Date().getFullYear();

	protected readonly links = links;
}
