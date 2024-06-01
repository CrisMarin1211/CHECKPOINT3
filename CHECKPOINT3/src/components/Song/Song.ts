import styles from './Song.css';

export enum MusicAttribute {
	'image' = 'image',
	'ttitle' = 'ttitle',
	'autor' = 'autor',
	'album' = 'album',
	'stock' = 'stock',
	'price' = 'price',
}

export default class Music extends HTMLElement {
	image?: string;
	ttitle?: string;
	autor?: string;
	album?: string;
	stock?: string;
	price?: number;

	static get observedAttributes() {
		const attrs: Record<MusicAttribute, null> = {
			image: null,
			ttitle: null,
			autor: null,
			album: null,
			stock: null,
			price: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propname: MusicAttribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propname) {
            case MusicAttribute.price:
               this.price = newValue? Number(newValue) : undefined;
               break;

			default:
				this[propname] = newValue;
				break;
		}
	}
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}


	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `<section>
			<div>
			<img src="${this.image}">
			<b>${this.ttitle}</b>
			<p>${this.autor}</p>
			<p>Album: ${this.album}</p>
			<p>Stockd: ${this.stock}</p>
			<p>Price: ${this.price}</p>
	</div>
	</section>
`;
		}
		const cssSongs = this.ownerDocument.createElement('style');
		cssSongs.innerHTML = styles;
		this.shadowRoot?.appendChild(cssSongs);
	}
}

customElements.define('my-music', Music);