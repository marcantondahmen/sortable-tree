class CodeComponent extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		if (document.readyState === 'loading') {
			document.addEventListener(
				'DOMContentLoaded',
				this.highlight.bind(this)
			);
		} else {
			this.highlight();
		}
	}

	highlight() {
		const code = this.textContent;

		this.innerHTML = `
			<pre><code class="ts">${code}</code></pre>
		`;

		const element = this.querySelector('code');
		(window as any).hljs.highlightElement(element);
		(window as any).hljs.lineNumbersBlock(element, { singleLine: true });
	}
}

customElements.define('demo-code', CodeComponent);
