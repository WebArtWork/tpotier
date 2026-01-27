import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { links } from '../../app.links';

@Component({
	selector: 'app-topbar',
	imports: [RouterLink],
	templateUrl: './topbar.html',
	styleUrl: './topbar.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Topbar {
	protected readonly scrolled = signal(false);

	protected readonly links = links;

	@HostListener('window:scroll')
	protected onScroll() {
		this.scrolled.set(window.scrollY > 8);
	}
}
