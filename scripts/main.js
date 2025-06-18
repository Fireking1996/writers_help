// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  databaseURL: "YOUR_DATABASE_URL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Elements
const genreSelect = document.getElementById('genre');
const subgenreSelect = document.getElementById('subgenre');
const audienceSelect = document.getElementById('audience');
const plotForm = document.getElementById('plotForm');
const plotList = document.querySelector('#plotList ul');
const charForm = document.getElementById('charForm');
const charList = document.querySelector('#charList ul');
const flowchartDiv = document.getElementById('flowchart');

// ------------------------
// Theme Class Management
// ------------------------
function updateBodyClass() {
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

// ------------------------
// Subgenre Filtering
// ------------------------
function filterSubgenres() {
  const selectedGenre = genreSelect.value;

  Array.from(subgenreSelect.options).forEach(option => {
    const parent = option.getAttribute('data-parent');
    option.style.display = !parent || parent === selectedGenre ? 'block' : 'none';
  });

  subgenreSelect.value = '';
}

// ------------------------
// Plot Management with Firebase
// ------------------------
function loadPlots() {
  const plotsRef = ref(db, 'plots');
  onValue(plotsRef, snapshot => {
    const plots = snapshot.val() || {};
    plotList.innerHTML = '';
    Object.values(plots).forEach(plot => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${plot.title}</strong>: ${plot.details}`;
      plotList.appendChild(li);
    });
  });
}

plotForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('plotTitle').value;
  const details = document.getElementById('plotDetails').value;

  const newPlotRef = push(ref(db, 'plots'));
  set(newPlotRef, { title, details });
  plotForm.reset();
});

// ------------------------
// Character Management with Firebase
// ------------------------
function loadCharacters() {
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

charForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  const newCharRef = push(ref(db, 'characters'));
  set(newCharRef, { name, description });
  charForm.reset();
});

// ------------------------
// Flowchart Logic
// ------------------------
const flowcharts = {
  fantasy: {
    "high-fantasy": `graph TD\nA[Hero Introduction] --> B[Call to Adventure]\nB --> C[Quest Begins]\nC --> D[Climax Battle]\nD --> E[Resolution]`,
    "urban-fantasy": `graph TD\nA[Normal Life] --> B[Supernatural Encounter]\nB --> C[Conflict with Hidden World]\nC --> D[Resolution]`,
    "dark-fantasy": `graph TD\nA[Corrupt World] --> B[Dark Prophecy]\nB --> C[Anti-Hero Journey]\nC --> D[Tragic Climax]\nD --> E[Ambiguous Ending]`,
    "fairy-tale": `graph TD\nA[Once Upon a Time] --> B[Magical Quest]\nB --> C[Good vs Evil]\nC --> D[Happy Ending]`
  }
  // Add other genres and subgenres here
};

function updateFlowchart() {
  const genre = genreSelect.value;
  const subgenre = subgenreSelect.value;

  if (flowchartDiv && flowcharts[genre] && flowcharts[genre][subgenre]) {
    flowchartDiv.textContent = flowcharts[genre][subgenre];
    mermaid.init(undefined, flowchartDiv);
  } else if (flowchartDiv) {
    flowchartDiv.textContent = 'Select a genre and subgenre to see the flowchart.';
  }
}

// ------------------------
// Initialize
// ------------------------
document.addEventListener('DOMContentLoaded', () => {
  filterSubgenres();
  updateBodyClass();
  loadPlots();
  loadCharacters();
  updateFlowchart();
});

genreSelect?.addEventListener('change', () => {
  filterSubgenres();
  updateBodyClass();
  updateFlowchart();
});
subgenreSelect?.addEventListener('change', () => {
  updateBodyClass();
  updateFlowchart();
});
audienceSelect?.addEventListener('change', updateBodyClass);


  if (audience) {
    document.body.classList.add(`audience-${audience}`);
    hasTheme = true;
  }

  if (!hasTheme) {
    document.body.classList.add('default-theme');
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
