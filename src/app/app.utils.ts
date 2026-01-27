export function toSlug(value: string): string {
	return (value || '')
		.trim()
		.toLowerCase()
		.replace(/['"]/g, '') // drop quotes
		.replace(/[^a-z0-9]+/g, '-') // spaces + symbols -> "-"
		.replace(/-+/g, '-') // collapse
		.replace(/^-|-$/g, ''); // trim "-"
}

export function fromSlug(slug: string): string {
	return decodeURIComponent(slug || '')
		.replace(/-/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.replace(/\b\w/g, (c) => c.toUpperCase());
}
