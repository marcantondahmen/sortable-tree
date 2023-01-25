interface Item {
	href: string;
	text: string;
}

class TableOfContentsComponent extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.classList.add('toc');

		setTimeout(() => {
			this.render();
		}, 0);
	}

	render() {
		const headings = Array.from(document.querySelectorAll('h2'));
		const items: Item[] = [];

		if (!headings) {
			return;
		}

		headings.forEach((h) => {
			h.id = h.textContent.toLowerCase().replace(/\W+/g, '-');

			items.push({
				href: `#${h.id}`,
				text: h.textContent,
			});
		});

		items.forEach((item) => {
			const link = document.createElement('a');

			link.href = item.href;
			link.textContent = item.text;

			this.appendChild(link);
		});

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const id = entry.target.getAttribute('id');
				const link = document.querySelector(
					`demo-toc a[href="#${id}"]`
				);

				try {
					if (entry.intersectionRatio > 0) {
						link.classList.add('active');
					} else {
						link.classList.remove('active');
					}
				} catch (e) {}
			});
		});

		Array.from(document.querySelectorAll('h2')).forEach((heading) => {
			observer.observe(heading);
		});
	}
}

customElements.define('demo-toc', TableOfContentsComponent);
