import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
	providedIn: 'root',
})
export class AppService {
	private readonly title = inject(Title);
	private readonly meta = inject(Meta);

	setSeo(title: string, description: string, image: string) {
		description = description.trim();

		image = 'https://tpotier.com/' + image;

		this.title.setTitle(title);

		// title metas
		this.meta.updateTag({ itemprop: 'name', content: title } as any, 'itemprop="name"');
		this.meta.updateTag({ name: 'twitter:title', content: title });
		this.meta.updateTag({ property: 'og:title', content: title });

		this.meta.updateTag({ name: 'description', content: description });
		this.meta.updateTag(
			{ itemprop: 'description', content: description } as any,
			'itemprop="description"',
		);
		this.meta.updateTag({ name: 'twitter:description', content: description });
		this.meta.updateTag({ property: 'og:description', content: description });

		this.meta.updateTag({ itemprop: 'image', content: image } as any, 'itemprop="image"');
		this.meta.updateTag({ name: 'twitter:image:src', content: image });
		this.meta.updateTag({ property: 'og:image', content: image });
	}
}
