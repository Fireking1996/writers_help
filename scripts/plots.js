// Existing plot management code

const plotForm = document.getElementById('plotForm');
const plotList = document.querySelector('#plotList ul');

function loadPlots() {
  const plots = JSON.parse(localStorage.getItem('plots') || '[]');
  plotList.innerHTML = '';
  plots.forEach(plot => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${plot.title}</strong>: ${plot.details}`;
    plotList.appendChild(li);
  });
}

plotForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('plotTitle').value;
  const details = document.getElementById('plotDetails').value;

  const plots = JSON.parse(localStorage.getItem('plots') || '[]');
  plots.push({ title, details });
  localStorage.setItem('plots', JSON.stringify(plots));
  loadPlots();
  plotForm.reset();
});

loadPlots();


// ---------------------------
// Genre & Subgenre Flowchart
// ---------------------------

// Initialize Mermaid (make sure mermaid script is included in HTML)
mermaid.initialize({ startOnLoad: false });

// Elements
const genreSelect = document.getElementById('genre');
const subgenreSelect = document.getElementById('subgenre');
const flowchartDiv = document.getElementById('flowchart');

// Subgenres by genre
const subgenresByGenre = {
  fantasy: [
    { value: "high-fantasy", label: "High Fantasy" },
    { value: "urban-fantasy", label: "Urban Fantasy" },
    { value: "dark-fantasy", label: "Dark Fantasy" },
    { value: "fairy-tale", label: "Fairy Tale" }
  ],
  scifi: [
    { value: "space-opera", label: "Space Opera" },
    { value: "dystopian", label: "Dystopian" },
    { value: "cyberpunk", label: "Cyberpunk" },
    { value: "time-travel", label: "Time Travel" }
  ],
  romance: [
    { value: "contemporary", label: "Contemporary" },
    { value: "historical-romance", label: "Historical Romance" },
    { value: "paranormal-romance", label: "Paranormal Romance" },
    { value: "fairy-tale", label: "Fairy Tale" }
  ],
  mystery: [
    { value: "detective", label: "Detective" },
    { value: "cozy-mystery", label: "Cozy Mystery" },
    { value: "thriller", label: "Thriller" }
  ],
  horror: [
    { value: "psychological", label: "Psychological" },
    { value: "supernatural", label: "Supernatural" },
    { value: "slasher", label: "Slasher" }
  ],
  // Add more as needed
};

// Flowcharts by genre and subgenre
const flowcharts = {
  fantasy: {
    "high-fantasy": `
      graph TD
      A[Hero Introduction] --> B[Call to Adventure]
      B --> C[Quest Begins]
      C --> D[Climax Battle]
      D --> E[Resolution]
    `,
    "urban-fantasy": `
      graph TD
      A[Normal Life] --> B[Supernatural Encounter]
      B --> C[Conflict with Hidden World]
      C --> D[Resolution]
    `,
    "dark-fantasy": `
      graph TD
      A[Corrupt World] --> B[Dark Prophecy]
      B --> C[Anti-Hero Journey]
      C --> D[Tragic Climax]
      D --> E[Ambiguous Ending]
    `,
    "fairy-tale": `
      graph TD
      A[Once Upon a Time] --> B[Magical Quest]
      B --> C[Good vs Evil]
      C --> D[Happy Ending]
    `
  },
  scifi: {
    "space-opera": `
      graph TD
      A[Galactic Empire] --> B[Rebel Forces]
      B --> C[Space Battles]
      C --> D[Hero’s Sacrifice]
      D --> E[New Order]
    `,
    "dystopian": `
      graph TD
      A[Oppressive Regime] --> B[Rebellion Begins]
      B --> C[Struggle for Freedom]
      C --> D[Climax Revolt]
      D --> E[New Hope]
    `,
    "cyberpunk": `
      graph TD
      A[Corporate Control] --> B[Hackers Unite]
      B --> C[Digital Heist]
      C --> D[Showdown]
      D --> E[System Overhaul]
    `,
    "time-travel": `
      graph TD
      A[Discovery of Time Travel] --> B[Changing Past]
      B --> C[Unintended Consequences]
      C --> D[Fixing Timeline]
      D --> E[Peace Restored]
    `
  },
  romance: {
    "contemporary": `
      graph TD
      A[Meet Cute] --> B[Conflict]
      B --> C[Reconciliation]
      C --> D[Happy Ending]
    `,
    "historical-romance": `
      graph TD
      A[Society Constraints] --> B[Forbidden Love]
      B --> C[Separation]
      C --> D[Reunion]
      D --> E[Happy Ending]
    `,
    "paranormal-romance": `
      graph TD
      A[Human Meets Supernatural] --> B[Conflict]
      B --> C[Acceptance]
      C --> D[Love Triumphs]
    `,
    "fairy-tale": `
      graph TD
      A[Magical Meeting] --> B[Obstacle]
      B --> C[True Love]
      C --> D[Happily Ever After]
    `
  },
  mystery: {
    "detective": `
      graph TD
      A[Crime Occurs] --> B[Investigation]
      B --> C[Suspects]
      C --> D[Revelation]
      D --> E[Resolution]
    `,
    "cozy-mystery": `
      graph TD
      A[Small Town] --> B[Unusual Event]
      B --> C[Amateur Sleuth]
      C --> D[Clues Gathered]
      D --> E[Case Solved]
    `,
    "thriller": `
      graph TD
      A[Threat Emerges] --> B[Race Against Time]
      B --> C[Confrontation]
      C --> D[Resolution]
    `
  },
  horror: {
    "psychological": `
      graph TD
      A[Normal Life] --> B[Disturbing Events]
      B --> C[Descent into Madness]
      C --> D[Climax]
      D --> E[Aftermath]
    `,
    "supernatural": `
      graph TD
      A[Haunting Begins] --> B[Investigation]
      B --> C[Confrontation]
      C --> D[Escape or Defeat]
    `,
    "slasher": `
      graph TD
      A[Victims Introduced] --> B[Stalking]
      B --> C[Attack]
      C --> D[Final Showdown]
      D --> E[Survivor]
    `
  }
  // Add more genres and subgenres as needed
};

// Populate subgenres dropdown based on selected genre
function populateSubgenres() {
  const genre = genreSelect.value;
  subgenreSelect.innerHTML = '<option value="">--Select Subgenre--</option>';

  if (subgenresByGenre[genre]) {
    subgenresByGenre[genre].forEach(sg => {
      const option = document.createElement('option');
      option.value = sg.value;
      option.textContent = sg.label;
      subgenreSelect.appendChild(option);
    });
  }

  updateFlowchart();
}

// Update flowchart display based on selections
function updateFlowchart() {
  const genre = genreSelect.value;
  const subgenre = subgenreSelect.value;

  if (flowcharts[genre] && flowcharts[genre][subgenre]) {
    flowchartDiv.textContent = flowcharts[genre][subgenre];
    mermaid.init(undefined, flowchartDiv);
  } else {
    flowchartDiv.textContent = 'Select a genre and subgenre to see the flowchart.';
  }
}

// Event listeners for genre and subgenre selectors
genreSelect.addEventListener('change', populateSubgenres);
subgenreSelect.addEventListener('change', updateFlowchart);

// Initialize subgenres on page load
populateSubgenres();
