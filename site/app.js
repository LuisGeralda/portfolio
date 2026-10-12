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
