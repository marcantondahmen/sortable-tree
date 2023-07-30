class EmbedComponent extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const name = this.getAttribute('name');
		const details = document.createElement('details');
		const summary = document.createElement('summary');
		const nodes = this.createEmbed('nodes');

		summary.textContent = 'full example data';
		details.appendChild(summary);
		details.appendChild(nodes);

		this.appendChild(this.createEmbed(name));
		this.appendChild(details);
	}

	createEmbed(name: string): HTMLElement {
		const script = document.createElement('script');

		script.setAttribute('src', this.createSrc(name));

		return script;
	}

	createSrc(name: string): string {
		const theme = 'dark';

		return `https://marcantondahmen.github.io/emgithub/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Fmarcantondahmen%2Fsortable-tree%2Fblob%2Fmaster%2Fdemo%2Fexamples%2F${name}.ts%3Fts%3D2&style=${theme}&type=code&showLineNumbers=on&showCopy=on`;
	}
}

customElements.define('demo-embed', EmbedComponent);
