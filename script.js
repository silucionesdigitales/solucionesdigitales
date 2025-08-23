async function cargarDatos() {
  const res = await fetch('data.json');
  const data = await res.json();
  mostrarCategorias(data.categorias);
  mostrarProductos(data.productos);
  mostrarBanners(data.banners);
  mostrarRedes(data.redes);
  configurarWhatsApp(data.redes.whatsapp);
}

function mostrarCategorias(categorias) {
  const menu = document.getElementById('menu-categorias');
  menu.innerHTML = '';
  categorias.forEach(cat => {
    const link = document.createElement('a');
    link.textContent = cat;
    link.href = '#';
    link.onclick = () => filtrarProductos(cat);
    menu.appendChild(link);
  });
}

function mostrarProductos(productos) {
  const cont = document.getElementById('productos');
  cont.innerHTML = '';
  productos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'producto';
    card.innerHTML = `<img src="${p.imagen}" style="width:100%"><h3>${p.nombre}</h3><p>${p.descripcion}</p><p>$${p.precio}</p>`;
    cont.appendChild(card);
  });
}

function filtrarProductos(categoria) {
  fetch('data.json').then(res => res.json()).then(data => {
    const filtrados = data.productos.filter(p => p.categoria === categoria);
    mostrarProductos(filtrados);
  });
}

function mostrarBanners(banners) {
  const banner = document.getElementById('banner');
  if (banners.length > 0) {
    banner.innerHTML = `<img src="${banners[0]}" style="width:100%; height:200px; object-fit:cover;">`;
  }
}

function mostrarRedes(redes) {
  const cont = document.getElementById('social-links');
  const footer = document.getElementById('footer-social');
  cont.innerHTML = footer.innerHTML = '';
  for (let red in redes) {
    if (redes[red] && red !== 'whatsapp') {
      const a = document.createElement('a');
      a.href = redes[red]; a.target = '_blank'; a.textContent = red;
      cont.appendChild(a.cloneNode(true));
      footer.appendChild(a);
    }
  }
}

function configurarWhatsApp(numero) {
  if (numero) {
    document.getElementById('whatsapp-btn').href = `https://wa.me/${numero}`;
  } else {
    document.getElementById('whatsapp-btn').style.display = 'none';
  }
}

cargarDatos();
