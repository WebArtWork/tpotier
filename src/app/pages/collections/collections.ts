import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../../layout/footer/footer';
import { Topbar } from '../../layout/topbar/topbar';

@Component({
	selector: 'app-collections',
	imports: [Topbar, Footer, RouterLink],
	templateUrl: './collections.html',
	styleUrl: './collections.css',
})
export class CollectionsPage {}
