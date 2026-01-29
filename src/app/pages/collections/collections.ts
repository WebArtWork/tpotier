import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppService } from '../../app.service';
import { Footer } from '../../layout/footer/footer';
import { Topbar } from '../../layout/topbar/topbar';

@Component({
	selector: 'app-collections',
	imports: [Topbar, Footer, RouterLink],
	templateUrl: './collections.html',
	styleUrl: './collections.css',
})
export class CollectionsPage {
	private appService = inject(AppService);

	constructor() {
		this.appService.setSeo(
			`Collections | Ladies' Dress Store T.Potier`,
			`Discover T.Potier’s signature collections, each crafted with a distinct character and aesthetic. From timeless elegance to expressive couture details, our collections reflect refined craftsmanship, premium materials, and a dedication to creating dresses that feel truly exceptional.`,
			`/assets/logoceo.jpg`,
		);
	}
}
