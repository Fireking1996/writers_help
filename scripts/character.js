// characters.js
import { db } from './firebase-config.js';
import { ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const charForm = document.getElementById('charForm');
const charList = document.querySelector('#charList ul');

function loadCharacters() {
  if (!charList) return;
  const charsRef = ref(db, 'characters');
  onValue(charsRef, snapshot => {
    const characters = snapshot.val() || {};
    charList.innerHTML = '';
    Object.values(characters).forEach(char => {
      const li = document.createElement('li');
      li.textContent = `${char.name}: ${char.description}`;
      charList.appendChild(li);
    });
  });
}

charForm?.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const newCharRef = push(ref(db, 'characters'));
  set(newCharRef, { name, description });
  charForm.reset();
});

document.addEventListener('DOMContentLoaded', () => {
  loadCharacters();
});
