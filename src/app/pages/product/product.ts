import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../app.interface';
import { links } from '../../app.links';
import { PRODUCTS } from '../../app.products';
import { AppService } from '../../app.service';
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
	private readonly appService = inject(AppService);

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

		this.appService.setSeo(
			`${p?.name} | Ladies' Dress Store T.Potier`,
			p?.description?.en?.trim() || '',
			`${p?.images[0]}`,
		);
	}

	protected selectImage(index: number) {
		this.selectedIndex.set(index);
	}

	protected trackBySrc = (_: number, src: string) => src;
}
