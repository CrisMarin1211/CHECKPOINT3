// import styles from './ButtonLogOut.css';

// import { dispatch } from '../../../store';
// import { navigate } from '../../../store/action';
// import { addObserver } from '../../../store';

// class ButtonAdd extends HTMLElement {
// 	constructor() {
// 		super();
// 		this.attachShadow({ mode: 'open' });

// 		this.onButtonClicked = this.onButtonClicked.bind(this);
// 		addObserver(this);
// 	}

// 	connectedCallback() {
// 		this.mount();
// 	}

// 	mount() {
// 		this.render();
// 		this.addListeners();
// 	}

// 	render() {
// 		if (this.shadowRoot) {
// 			this.shadowRoot.innerHTML = `
// 				<section class="Button-Add">
// 					<button class="Add">ADD</button>
// 				</section>
// 			`;
// 		}

// 		const cssAdd = this.ownerDocument.createElement('style');
// 		cssAdd.innerHTML = styles;
// 		this.shadowRoot?.appendChild(cssAdd);
// 	}
// 	addListeners() {
// 		this.shadowRoot.querySelector('.Button-Add')?.addEventListener('click', this.onButtonClicked);
// 	}
    

// 	onButtonClicked() {
// 		console.log('holaaa');
// 		dispatch(navigate('Add'));
// 	}
// }

// customElements.define('button-add', ButtonAdd);
// export default ButtonAdd;