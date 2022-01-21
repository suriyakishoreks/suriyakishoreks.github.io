import styles from './index.module.scss';
import Imag from './assets/road-sign.png';

const element = document.createElement('h1');
element.classList.add(styles.heading);
element.innerText = 'Hello World';

const container = document.createElement('div');
container.classList.add(styles.container);

const image = document.createElement('img');
image.src = Imag;
document.body.append(element, container, image);