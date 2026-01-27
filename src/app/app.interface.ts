export interface Product {
	id: string;

	// display
	name: string;
	description?: {
		en?: string;
		ua?: string;
	};

	// media
	images: string[];

	category: string;
}
