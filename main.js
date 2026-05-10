// Shared nav HTML injected into every page
const NAV_HTML = `
<nav>
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">NOR<span>MICH</span></a>
    <div class="nav-menu-wrapper">
      <ul class="nav-links">
        <li><a href="inspeccion.html">Inspección</a></li>
        <li><a href="certificacion.html">Certificación</a></li>
        <li><a href="laboratorio.html">Laboratorio</a></li>
        <li><a href="capacitacion.html">Capacitación</a></li>
        <li><a href="acerca.html">Acerca de</a></li>
        <li><a href="noticias.html">Noticias</a></li>
        <li><a href="contacto.html" class="nav-cta">Contacto</a></li>
      </ul>
      <div class="nav-right">
        <div class="lang-switcher">
          <button class="active">ES</button>
          <button>EN</button>
          <button>ZH</button>
          <button>JA</button>
          <button>KO</button>
        </div>
      </div>
    </div>
    <button class="nav-mobile-toggle" aria-label="Abrir menú">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <h3>NOR<span>MICH</span></h3>
      <p>Organismo de certificación e inspección acreditado, con más de 25 años garantizando la calidad e inocuidad de productos agrícolas mexicanos en mercados internacionales.</p>
    </div>
    <div>
      <h4>Servicios</h4>
      <ul>
        <li><a href="inspeccion.html">Inspección</a></li>
        <li><a href="certificacion.html">Certificación</a></li>
        <li><a href="laboratorio.html">Laboratorio</a></li>
        <li><a href="capacitacion.html">Capacitación</a></li>
      </ul>
    </div>
    <div>
      <h4>Empresa</h4>
      <ul>
        <li><a href="acerca.html">Acerca de</a></li>
        <li><a href="noticias.html">Noticias</a></li>
        <li><a href="contacto.html">Contacto</a></li>
        <li><a href="contacto.html#quejas">Quejas y apelaciones</a></li>
      </ul>
    </div>
    <div>
      <h4>Contacto</h4>
      <ul>
        <li><a href="#">Uruapan, Michoacán</a></li>
        <li><a href="tel:4525249397">Tel. 452 524 9397</a></li>
        <li><a href="mailto:info@normich.com.mx">info@normich.com.mx</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 Normich A.C. Todos los derechos reservados.</span>
    <span>Organismo acreditado ante EMA · GLOBALG.A.P. · PrimusGFS</span>
  </div>
</footer>`;

function initPage() {
  // Inject nav & footer
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  // Mobile menu toggle
  const toggle = document.querySelector('.nav-mobile-toggle');
  const menu = document.querySelector('.nav-menu-wrapper');
  const body = document.body;

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      toggle.classList.toggle('active');
      body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link (useful for hash links or page changes)
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        body.style.overflow = '';
      });
    });
  }

  // Active nav link
  const path = window.location.pathname;
  let page = path.split('/').pop() || 'index.html';
  if (page && !page.includes('.')) page += '.html';

  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // Lang switcher
  document.querySelectorAll('.lang-switcher button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-switcher button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Accordion
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = btn.nextElementSibling;
      const isOpen = body.classList.contains('open');
      document.querySelectorAll('.accordion-body').forEach(b => b.classList.remove('open'));
      document.querySelectorAll('.accordion-btn').forEach(b => b.classList.remove('open'));
      if (!isOpen) { body.classList.add('open'); btn.classList.add('open'); }
    });
  });

  // Filter tabs
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.filter-tabs');
      group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('[data-category]').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category.includes(filter)) ? '' : 'none';
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initPage);
