import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../app.interface';
import { links } from '../../app.links';
import { PRODUCTS } from '../../app.products';
import { toSlug } from '../../app.utils';
import { Footer } from '../../layout/footer/footer';
import { Topbar } from '../../layout/topbar/topbar';

@Component({
	selector: 'app-product',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterLink, Topbar, Footer],
	templateUrl: './product.html',
	styleUrl: './product.css',
})
export class ProductPage {
	private readonly route = inject(ActivatedRoute);
	private readonly title = inject(Title);
	private readonly meta = inject(Meta);

	private readonly all = signal<Product[]>(PRODUCTS);

	protected readonly links = links;
	protected readonly productId = signal<string>('');
	protected readonly selectedIndex = signal(0);

	protected readonly toSlug = toSlug;

	protected readonly product = computed<Product | null>(() => {
		const id = this.productId();
		return this.all().find((p) => p.id === id) ?? null;
	});

	protected readonly mainImage = computed<string>(() => {
		const p = this.product();
		if (!p?.images?.length) return '';
		const idx = this.selectedIndex();
		return p.images[Math.min(Math.max(idx, 0), p.images.length - 1)];
	});

	constructor() {
		const id = this.route.snapshot.paramMap.get('id') || '';
		this.productId.set(id);

		const p = this.product();
		this.applySeo(p);
	}

	protected selectImage(index: number) {
		this.selectedIndex.set(index);
	}

	protected trackBySrc = (_: number, src: string) => src;

	private applySeo(p: Product | null) {
		if (!p) return;

		const t = `${p.name} | Ladies' Dress Store T.Potier`;
		const d = p.description?.en?.trim() || '';
		const img = p.images?.[0] ? `https://tpotier.com/${p.images[0].replace(/^\//, '')}` : '';

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
