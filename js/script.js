'use strict';

const URL = 'https://api.adviceslip.com/advice';
const adviceEl = document.querySelector('.advice__container');
const btn = document.querySelector('.advice__btn');

class App {
  constructor() {
    this.fetchAdvice();
    btn.addEventListener('click', this.fetchAdvice.bind(this));
  }

  async fetchAdvice() {
    try {
      const data = await fetch(URL, { cache: 'no-cache' });
      if (!data.ok) throw new Error('Failed to get advice ⚠');
      const advice = await data.json();
      this.displayAdvice(advice);
    } catch (err) {
      console.error(err);
    }
  }

  displayAdvice({ slip: { id, advice } }) {
    adviceEl.innerHTML = '';
    const html = `
    <h4 class="advice__id">Advice #${id}</h4>
    <h1 class="advice__text">
      &ldquo;${advice}&rdquo;
    </h1>
    `;
    adviceEl.insertAdjacentHTML('afterbegin', html);
  }
}

const app = new App();
