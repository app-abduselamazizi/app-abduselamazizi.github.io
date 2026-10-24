(() => {
  const grid = document.getElementById('appGrid');
  const search = document.getElementById('searchInput');
  const empty = document.getElementById('emptyState');
  const filters = [...document.querySelectorAll('.filters button')];
  let activeCategory = 'Tümü';
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render() {
    const term = search.value.trim().toLocaleLowerCase('tr-TR');
    const visible = apps.filter(app => (activeCategory === 'Tümü' || app.category === activeCategory) && `${app.name} ${app.category} ${app.description}`.toLocaleLowerCase('tr-TR').includes(term));
    grid.innerHTML = visible.map(app => {
      const icon = app.iconImage ? `<img class="app-icon" src="${escapeHTML(app.iconImage)}" alt="${escapeHTML(app.name)} simgesi" width="84" height="84">` : `<div class="app-icon app-icon-fallback" aria-hidden="true">${escapeHTML(app.icon || '✦')}</div>`;
      const details = [app.version ? `Sürüm ${escapeHTML(app.version)}` : '', escapeHTML(app.size || ''), escapeHTML(app.minAndroid || '')].filter(Boolean).join(' • ');
      const button = app.downloadUrl ? `<a class="apk-btn" href="${escapeHTML(app.downloadUrl)}" download="${escapeHTML(app.fileName || '')}"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>APK İndir</a>` : '';
      return `<article class="app-card"><div class="app-head">${icon}<div class="app-info"><h3>${escapeHTML(app.name)}</h3><p class="app-meta">Android • APK</p><p class="app-desc">${escapeHTML(app.description || '')}</p></div></div>${button}<p class="app-note">${details}</p></article>`;
    }).join('');
    empty.hidden = visible.length > 0;
    grid.hidden = visible.length === 0;
    document.getElementById('shownCount').textContent = String(visible.length).padStart(2, '0');
    document.getElementById('appCount').textContent = String(apps.length).padStart(2, '0');
  }
  filters.forEach(button => button.addEventListener('click', () => { activeCategory = button.dataset.filter; filters.forEach(item => item.classList.toggle('active', item === button)); render(); }));
  search.addEventListener('input', render);
  document.getElementById('year').textContent = new Date().getFullYear();
  render();
})();
