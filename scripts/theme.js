// Elements
const genreSelect = document.getElementById('genre');
const subgenreSelect = document.getElementById('subgenre');
const audienceSelect = document.getElementById('audience');

// Update body class based on selections
function updateBodyClass() {
  // Remove previous theme-related classes
  const themeClasses = Array.from(document.body.classList).filter(cls =>
    cls.startsWith('genre-') || cls.startsWith('subgenre-') || cls.startsWith('audience-') || cls === 'default-theme'
  );
  document.body.classList.remove(...themeClasses);

  const genre = genreSelect.value;
  const subgenre = subgenreSelect.value;
  const audience = audienceSelect.value;

  let hasTheme = false;

  if (genre && genre !== 'default') {
    document.body.classList.add(`genre-${genre}`);
    hasTheme = true;
  }

  if (subgenre) {
    document.body.classList.add(`subgenre-${subgenre}`);
    hasTheme = true;
  }

  if (audience) {
    document.body.classList.add(`audience-${audience}`);
    hasTheme = true;
  }

  if (!hasTheme) {
    document.body.classList.add('default-theme');
  }
}

// Filter subgenres based on genre
function filterSubgenres() {
  const selectedGenre = genreSelect.value;

  Array.from(subgenreSelect.options).forEach(option => {
    const parent = option.getAttribute('data-parent');
    option.style.display = !parent || parent === selectedGenre ? 'block' : 'none';
  });

  // Reset subgenre value when genre changes
  subgenreSelect.value = '';
}

// Event listeners
genreSelect.addEventListener('change', () => {
  filterSubgenres();
  updateBodyClass();
});
subgenreSelect.addEventListener('change', updateBodyClass);
audienceSelect.addEventListener('change', updateBodyClass);

// Initialize on load
filterSubgenres();
updateBodyClass();
