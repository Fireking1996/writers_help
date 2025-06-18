// plots.js
import { db } from './firebase-config.js';
import { ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const plotForm = document.getElementById('plotForm');
const plotList = document.querySelector('#plotList ul');

function loadPlots() {
  if (!plotList) return;
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

plotForm?.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('plotTitle').value;
  const details = document.getElementById('plotDetails').value;
  const newPlotRef = push(ref(db, 'plots'));
  set(newPlotRef, { title, details });
  plotForm.reset();
});

document.addEventListener('DOMContentLoaded', () => {
  loadPlots();
});