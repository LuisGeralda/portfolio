const filterGroup = document.querySelector('#filters');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const projects = [...document.querySelectorAll('.project')];
filterGroup.hidden = false;
function filterProjects(filter) {
  let count = 0;
  for (const project of projects) {
    project.hidden = filter !== 'All' && project.dataset.category !== filter;
    if (!project.hidden) count++;
  }
  for (const button of filterButtons) button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
  document.querySelector('#project-count').textContent = `${String(count).padStart(2,'0')} projects`;
  document.querySelector('#filter-status').textContent = `${count} projects shown, ${filter === 'All' ? 'all disciplines' : filter}, newest first.`;
}
filterButtons.forEach(button => button.addEventListener('click', () => filterProjects(button.dataset.filter)));
function openLinkedProject() {
  const hash = location.hash.slice(1);
  const target = projects.find(project => project.id === hash);
  if (target) {
    filterProjects('All');
    target.querySelector('details').open = true;
    target.scrollIntoView();
  }
}
window.addEventListener('hashchange', openLinkedProject);
openLinkedProject();

const themeButton = document.querySelector('#theme-toggle');
themeButton.hidden = false;
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#111111' : '#F4F2EE';
}
try { const saved = localStorage.getItem('portfolio-theme'); if (saved === 'dark' || saved === 'light') setTheme(saved); } catch {}
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(theme);
  try { localStorage.setItem('portfolio-theme', theme); } catch {}
});

const traces = {
  access: {
    lane: 'Core / EPC',
    messages: [['forward','RRCConnectionRequest'],['reverse','RRCConnectionSetup'],['forward decisive','RRCConnectionSetupComplete + NAS'],['downstream','S1AP Initial UE Message']],
    note: 'Correlate the request, setup, and completion as one procedure. Retransmissions are not new access attempts. RRC setup alone does not prove that NAS registration completed.'
  },
  handover: {
    lane: 'Target eNB',
    messages: [['forward','MeasurementReport'],['downstream','X2AP Handover Request'],['reverse decisive','RRCConnectionReconfiguration'],['return-target','RRCConnectionReconfigurationComplete']],
    note: 'For this simplified LTE X2 handover, preparation precedes the RRC command. Resolve the measurement report against its active configuration, verify that it includes the commanded target, and look for completion at the target. A measurement report alone does not prove handover success.'
  }
};
document.querySelector('#trace-controls').hidden = false;
const traceButtons = [...document.querySelectorAll('[data-trace]')];
const traceCaption = document.querySelector('#trace-caption');
traceCaption.setAttribute('aria-live','polite');
traceButtons.forEach(button => button.addEventListener('click', () => {
  const trace = traces[button.dataset.trace];
  traceButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  document.querySelector('#third-lane').textContent = trace.lane;
  const container = document.querySelector('#trace-messages');
  container.replaceChildren(...trace.messages.map(([direction, label]) => {
    const row = document.createElement('div'); row.className = `trace-message ${direction}`;
    const text = document.createElement('span'); text.textContent = label;
    row.append(text, document.createElement('i')); return row;
  }));
  traceCaption.querySelector('p').textContent = trace.note;
}));
