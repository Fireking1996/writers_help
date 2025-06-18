import { db } from './firebase-config.js';  // Import db if needed later for flowchart

document.addEventListener('DOMContentLoaded', () => {
  const genreSelect = document.getElementById('genre');
  const subgenreSelect = document.getElementById('subgenre');
  const audienceSelect = document.getElementById('audience');

  function updateSubgenreOptions() {
    const selectedGenre = genreSelect.value;
    let hasVisible = false;

    Array.from(subgenreSelect.options).forEach(option => {
      const parent = option.getAttribute('data-parent');

      if (!parent || parent === selectedGenre) {
        option.hidden = false;
        option.disabled = false;
        hasVisible = true;
      } else {
        option.hidden = true;
        option.disabled = true;
      }
    });

    subgenreSelect.style.display = hasVisible ? 'block' : 'none';
    subgenreSelect.value = '';
  }

  function updateTheme() {
    const genre = genreSelect.value;
    const subgenre = subgenreSelect.value;
    const audience = audienceSelect.value;

    document.body.className = `default-theme`;

    if (genre) {
      document.body.classList.add(`genre-${genre}`);
    }

    if (subgenre) {
      document.body.classList.add(`subgenre-${subgenre}`);
    }

    if (audience) {
      document.body.classList.add(`audience-${audience}`);
    }
  }

  genreSelect.addEventListener('change', () => {
    updateSubgenreOptions();
    updateTheme();
  });

  subgenreSelect.addEventListener('change', updateTheme);
  audienceSelect.addEventListener('change', updateTheme);
});
