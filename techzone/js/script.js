// script.js - UI behaviors, population de cards e animações.
// (Coloque esse arquivo em /js/script.js)

document.addEventListener('DOMContentLoaded', () => {
  // atualiza anos no footer
  document.querySelectorAll('#year-home').forEach(el => { if(el) el.textContent = new Date().getFullYear(); });

  // mobile menu toggles
  const toggles = [
    {btnId: 'menuToggle', navId: 'mobileNav'},
    {btnId: 'menuToggle2', navId: 'mobileNav2'},
    {btnId: 'menuToggle3', navId: 'mobileNav3'},
    {btnId: 'menuToggle4', navId: 'mobileNav4'}
  ];
  toggles.forEach(t => {
    const btn = document.getElementById(t.btnId);
    const nav = document.getElementById(t.navId);
    if(btn && nav){
      btn.addEventListener('click', () => {
        nav.style.display = (nav.style.display === 'block') ? 'none' : 'block';
      });
    }
  });

  // produtos de exemplo (com descrições e preços) — usados na home e na página produtos
  const produtos = [
    { id:1, name:"Notebook Pro X", price:4500, category:"notebook", img:"./imagens/NotebookProX14.jpg", desc:"Intel i7, 16GB RAM, 512GB SSD, tela 14\" IPS" },
    { id:2, name:"Smartphone Ultra", price:2800, category:"smartphone", img:"./imagens/SmartphoneUltra.jpg", desc:"Tela 6.7\", 256GB, câmera 108MP, bateria 5000mAh" },
    { id:3, name:"Fone Bluetooth X2", price:350, category:"audio", img:"./imagens/FoneBluetoothX2.avif", desc:"Cancelamento de ruído, 30h de bateria, carregamento sem fio" },
    { id:4, name:"Monitor Gamer 27\"", price:1200, category:"periferico", img:"./imagens/MonitorGamer27.jpg", desc:"27\", 144Hz, G-Sync compatible, painel IPS" },
    { id:5, name:"Teclado Mecânico TKL", price:450, category:"periferico", img:"./imagens/TecladoMecânicoTKL.webp", desc:"Switches mecânicos, iluminação RGB, compacto TKL" },
    { id:6, name:"Mouse RGB Pro", price:250, category:"periferico", img:"./imagens/MouseRGBPro.webp", desc:"Sensor 16k DPI, botões programáveis, design ergonômico" }
  ];

  // cria card HTML
  function buildCard(p){
    const card = document.createElement('article');
    card.className = 'card reveal';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="card-body">
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <div class="price-row">
          <div class="price">R$ ${p.price.toFixed(2)}</div>
          <div class="card-actions">
            <button class="btn btn-outline" onclick="window.location='produtos.html'">Ver</button>
            <button class="btn btn-primary" onclick="window.location='contato.html'">Comprar</button>
          </div>
        </div>
      </div>
    `;
    return card;
  }

  // popular home destaques (primeiros 4)
  const homeCardsTarget = document.getElementById('home-cards');
  if(homeCardsTarget){
    produtos.slice(0,4).forEach(p => homeCardsTarget.appendChild(buildCard(p)));
  }

  // popular catalog na página de produtos
  const catalogTarget = document.getElementById('catalog-list');
  if(catalogTarget){
    produtos.forEach(p => catalogTarget.appendChild(buildCard(p)));
  }

  // filtro de categoria simples (produtos.html)
  const categoryFilter = document.getElementById('categoryFilter');
  if(categoryFilter){
    categoryFilter.addEventListener('change', (e) => {
      const val = e.target.value;
      const cards = catalogTarget.querySelectorAll('.card');
      produtos.forEach((p, i) => {
        const show = (val === 'all' || p.category === val);
        cards[i].style.display = show ? 'flex' : 'none';
      });
    });
  }

  // busca simples home/catalog
  const globalSearch = document.getElementById('global-search');
  const catalogSearch = document.getElementById('catalog-search');
  function bindSearch(inputEl, listRoot){
    if(!inputEl) return;
    inputEl.addEventListener('input', () => {
      const q = inputEl.value.trim().toLowerCase();
      if(!listRoot) return;
      const cards = listRoot.querySelectorAll('.card');
      cards.forEach(card => {
        const t = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = t.includes(q) ? 'flex' : 'none';
      });
    });
  }
  bindSearch(globalSearch, homeCardsTarget || catalogTarget);
  bindSearch(catalogSearch, catalogTarget);

  // animação reveal on scroll (IntersectionObserver)
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        // opcional: parar de observar depois de revelar
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // lidar com envio do formulário de contato
  window.handleContact = function(e){
    e.preventDefault();
    const note = document.getElementById('contact-note');
    if(note) note.textContent = 'Mensagem enviada com sucesso. Responderemos em até 48h.';
    e.target.reset();
    return false;
  };

});
