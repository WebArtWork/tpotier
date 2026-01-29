import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../app.interface';
import { PRODUCTS } from '../../app.products';
import { AppService } from '../../app.service';
import { fromSlug } from '../../app.utils';
import { Footer } from '../../layout/footer/footer';
import { Topbar } from '../../layout/topbar/topbar';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterLink, Topbar, Footer],
	templateUrl: './products.html',
	styleUrl: './products.css',
})
export class ProductsPage {
	protected readonly products = signal<Product[]>(PRODUCTS);

	private readonly appService = inject(AppService);

	private router = inject(Router);

	header =
		'T. Potier is a wholesale bridal brand from Ukraine, creating timeless wedding dresses handcrafted from premium fabrics with refined attention to detail.';

	collection = this.router.url.startsWith('/collection/')
		? fromSlug(this.router.url.replace('/collection/', ''))
		: '';

	collectionHeaders = {
		'Essence Collection':
			'Essence is a fresh take on bridal design, defined by modern silhouettes, subtle sensuality, and confident elegance.',
		'Signature Collection':
			'Signature brings together our most distinctive designs, where timeless classics meet bolder silhouettes that leave a lasting impression.',
		'Atelier Collection':
			'Atelier reflects our approach to craftsmanship and design, defined by clean lines, refined silhouettes, and understated elegance with a focus on comfort and ease.',
	};

	images = {
		web: '/assets/bgw.jpg',
		mobile: '/assets/bg.jpg',
	};

	collectionsImages = {
		'Essence Collection': {
			web: '/assets/bgwessence.png',
			mobile: '/assets/bgessence.png',
		},
		'Signature Collection': {
			web: '/assets/bgwsignature.png',
			mobile: '/assets/bgsignature.png',
		},
		'Atelier Collection': {
			web: '/assets/bgwatelier.png',
			mobile: '/assets/bgatelier.png',
		},
	};

	constructor() {
		if (this.collection) {
			this.products.set(this.products().filter((p) => p.category === this.collection));

			this.header =
				this.collectionHeaders[this.collection as keyof ProductsPage['collectionHeaders']];

			this.images =
				this.collectionsImages[this.collection as keyof ProductsPage['collectionsImages']];
		}

		this.appService.setSeo(
			this.collection
				? `${this.collection} | Ladies' Dress Store T.Potier`
				: `T.Potier | Ladies' Dress Store`,
			this.collection
				? this.header
				: `T.Potier offers a collection of women's wedding dresses, ranging from classic styles to extraordinary designs. Our brand guarantees the high quality and perfection of each product. You can easily place a wholesale order for any dress design you wish by contacting us; you can find our contact information below. We look forward to working with you!`,
			this.collection ? this.images.mobile : `/assets/logoceo.jpg`,
		);
	}
}
