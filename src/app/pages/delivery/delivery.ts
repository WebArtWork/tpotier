import { Component, inject } from '@angular/core';
import { AppService } from '../../app.service';
import { Footer } from '../../layout/footer/footer';
import { Topbar } from '../../layout/topbar/topbar';

@Component({
	imports: [Topbar, Footer],
	templateUrl: './delivery.html',
	styleUrl: './delivery.css',
})
export class DeliveryPage {
	private appService = inject(AppService);

	constructor() {
		this.appService.setSeo(
			`Payment & delivery | Ladies' Dress Store T.Potier`,
			`Transparent payment terms, clear production timelines, and worldwide delivery. We ensure a smooth ordering process from deposit to shipment, with quality control at every stage and dedicated support for retail and wholesale clients.`,
			`/assets/logoceo.jpg`,
		);
	}
}
