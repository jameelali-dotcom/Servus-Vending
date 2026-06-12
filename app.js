// ===== Sidebar navigation =====
const navItems = document.querySelectorAll('.nav-item');
const panels = document.querySelectorAll('.panel');

navItems.forEach(btn => {
  btn.addEventListener('click', () => {
    navItems.forEach(b => b.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');

    const targetPanel = document.getElementById('panel-' + btn.dataset.tab);
    if (targetPanel) targetPanel.classList.add('active');

    // Update topbar title
    document.getElementById('topbar-section-title').textContent = btn.querySelector('.nav-label').textContent;
    document.getElementById('topbar-section-meta').textContent = btn.dataset.meta || '';

    // Close mobile sidebar
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  });
});

// ===== Mobile sidebar toggle =====
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');
const hamburger = document.getElementById('hamburgerBtn');

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
});

// ===== Ops sub-tabs (Tab 5) =====
const opsBtns = document.querySelectorAll('.ops-tab-btn');
const opsPanels = document.querySelectorAll('.ops-panel');

opsBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    opsBtns.forEach(b => b.classList.remove('active'));
    opsPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('ops-' + btn.dataset.ops).classList.add('active');
  });
});

// ===== Interactive site checklist (Tab 4) =====
function setupChecklist(containerId, barId, labelId, noun) {
  const container = document.getElementById(containerId);
  const items = container.querySelectorAll('.check-item');
  const bar = document.getElementById(barId);
  const label = document.getElementById(labelId);

  function update() {
    const total = items.length;
    const checked = container.querySelectorAll('.check-item.checked').length;
    bar.style.width = (checked / total * 100) + '%';
    label.textContent = checked + ' / ' + total + ' ' + noun;
  }

  items.forEach(item => {
    function toggle() {
      item.classList.toggle('checked');
      item.setAttribute('aria-checked', item.classList.contains('checked'));
      update();
    }
    item.addEventListener('click', toggle);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  update();
}

setupChecklist('siteChecklist', 'siteProgressBar', 'siteProgressLabel', 'confirmed');

document.querySelectorAll('.clip-reset').forEach(btn => {
  btn.addEventListener('click', () => {
    const container = document.getElementById(btn.dataset.reset);
    container.querySelectorAll('.check-item.checked').forEach(i => {
      i.classList.remove('checked');
      i.setAttribute('aria-checked', 'false');
    });
    const bar = document.getElementById('siteProgressBar');
    const label = document.getElementById('siteProgressLabel');
    bar.style.width = '0%';
    label.textContent = '0 / ' + container.querySelectorAll('.check-item').length + ' confirmed';
  });
});
