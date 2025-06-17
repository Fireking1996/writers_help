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