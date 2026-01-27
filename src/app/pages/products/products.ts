import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../app.interface';
import { PRODUCTS } from '../../app.products';
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

	private readonly title = inject(Title);
	private readonly meta = inject(Meta);

	private router = inject(Router);

	constructor() {
		const collection = this.router.url.startsWith('/collection/')
			? fromSlug(this.router.url.replace('/collection/', ''))
			: '';

		if (collection) {
			this.products.set(this.products().filter((p) => p.category === collection));
		}

		const t = collection
			? `${collection} | Ladies' Dress Store T.Potier`
			: `T.Potier | Ladies' Dress Store`;

		const d = `T.Potier offers a collection of women's wedding dresses, ranging from classic styles to extraordinary designs. Our brand guarantees the high quality and perfection of each product. You can easily place a wholesale order for any dress design you wish by contacting us; you can find our contact information below. We look forward to working with you!`;

		const img = `https://tpotier.com/assets/logoceo.jpg`;

		this.title.setTitle(t);

		// title metas
		this.meta.updateTag({ itemprop: 'name', content: t });
		this.meta.updateTag({ name: 'twitter:title', content: t });
		this.meta.updateTag({ property: 'og:title', content: t });

		// description metas (only if we have EN description)
		if (d) {
			this.meta.updateTag({ name: 'description', content: d });
			this.meta.updateTag({ itemprop: 'description', content: d });
			this.meta.updateTag({ name: 'twitter:description', content: d });
			this.meta.updateTag({ property: 'og:description', content: d });
		}

		// image metas (only if we have an image)
		if (img) {
			this.meta.updateTag({ itemprop: 'image', content: img });
			this.meta.updateTag({ name: 'twitter:image:src', content: img });
			this.meta.updateTag({ property: 'og:image', content: img });
		}
	}
}
