import styles from './index.css';
import { addSongs, getSongs } from '../utils/firebaseConfig';
import './components/index';
import { Music } from '../components';
import { dashboard } from './export';

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.loadSongs();
		const formElement = this.shadowRoot?.querySelector('form');
		if (formElement) {
			formElement.addEventListener('submit', this.handleSubmit.bind(this));
		}
	}

	async handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const songData = {
			name: formData.get('title') as string,
			image: formData.get('image') as string,
			author: formData.get('author') as string,
			album: formData.get('album') as string,
			stock: formData.get('stock') as string,
			price: formData.get('price') as any,
		};
		await addSongs(songData);

		const removeElement = this.shadowRoot?.querySelector('form');
		if (removeElement) {
			removeElement.reset();
		}

		this.loadSongs();
	}

	async loadSongs() {
		const saveSongs = await getSongs();

		const container = this.shadowRoot?.querySelector('.list-songs');
		if (container) {
			container.innerHTML = '';

			saveSongs.forEach((song) => {
				const songComponent = document.createElement('my-music') as Music;
				songComponent.ttitle = song.name;
				songComponent.image = song.image;
				songComponent.autor = song.author;
				songComponent.album = song.album;
				songComponent.stock = song.stock;
				songComponent.price = song.price;
				container.appendChild(songComponent);
			});
		}
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>${styles}</style>
				<div class="app-container">
					<div class="title"><h1>MY PLAYLIST</h1></div>
					<div class = "form-create-song">
						<form id="form-song">
							<input type="text" name="title" placeholder="Title" required>
							<input type="text" name="author" placeholder="Author" required>
							<input type="text" name="album" placeholder="Album" required>
							<input type="text" name="image" placeholder="Image" required>
                            <input type="number" name="price" placeholder="Price" required>
                            <input type="text" name="stock" placeholder="Stock" required>
							<input type="submit" id="save-song" value="Save"/>
						</form>
					</div>
					<div class="list-songs"></div>
				</div>
      `;
		}
	}
}

customElements.define('app-dashboard', dashboard);
export default dashboard