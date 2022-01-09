import styles from './index.module.scss';

const element = document.createElement('h1');
element.classList.add(styles.heading);
element.innerText = 'Hello World';

const container = document.createElement('div');
container.classList.add(styles.container);
document.body.append(element, container);