// Elements
const genreSelect = document.getElementById('genre');
const subgenreSelect = document.getElementById('subgenre');
const audienceSelect = document.getElementById('audience');

function updateBodyClass() {
  // Clear old classes
  document.body.className = '';

  // Get values
  const genre = genreSelect.value;
  const subgenre = subgenreSelect.value;
  const audience = audienceSelect.value;

  // Add new classes
  if (genre !== 'default') document.body.classList.add(`genre-${genre}`);
  if (subgenre) document.body.classList.add(`subgenre-${subgenre}`);
  if (audience) document.body.classList.add(`audience-${audience}`);
}

// Listen for changes
genreSelect.addEventListener('change', updateBodyClass);
subgenreSelect.addEventListener('change', updateBodyClass);
audienceSelect.addEventListener('change', updateBodyClass);

// Initial set
updateBodyClass();
