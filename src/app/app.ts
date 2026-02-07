import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App {
	private readonly router = inject(Router);
	private readonly _isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

	constructor() {
		this.router.events
			.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
			.subscribe(() => {
				if (this._isBrowser) {
					window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
				}
			});
	}
}
