const charForm = document.getElementById('charForm');
const charList = document.querySelector('#charList ul');

function loadCharacters() {
  const characters = JSON.parse(localStorage.getItem('characters') || '[]');
  charList.innerHTML = '';
  characters.forEach((char, index) => {
    const li = document.createElement('li');
    li.textContent = `${char.name}: ${char.description}`;
    charList.appendChild(li);
  });
}

charForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  const characters = JSON.parse(localStorage.getItem('characters') || '[]');
  characters.push({ name, description });
  localStorage.setItem('characters', JSON.stringify(characters));
  loadCharacters();
  charForm.reset();
});

loadCharacters();