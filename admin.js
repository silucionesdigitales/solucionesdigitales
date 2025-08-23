async function cargarDatos() {
  const res = await fetch('data.json');
  const data = await res.json();
  window.datos = data;
  mostrarCategorias();
  mostrarProductos();
  mostrarBanners();
}

function guardarDatos() {
  localStorage.setItem('datos', JSON.stringify(window.datos));
  alert('Cambios guardados (en localStorage)');
}

function mostrarProductos() {
  const lista = document.getElementById('lista-productos');
  lista.innerHTML = '';
  window.datos.productos.forEach((p,i) => {
    const div = document.createElement('div');
    div.textContent = `${p.nombre} - ${p.categoria} - $${p.precio}`;
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.onclick = () => { window.datos.productos.splice(i,1); mostrarProductos(); guardarDatos(); };
    div.appendChild(btn);
    lista.appendChild(div);
  });
}

document.getElementById('form-producto').onsubmit = e => {
  e.preventDefault();
  const nuevo = {
    nombre: document.getElementById('nombre').value,
    descripcion: document.getElementById('descripcion').value,
    precio: document.getElementById('precio').value,
    categoria: document.getElementById('categoria').value,
    imagen: document.getElementById('imagen').value
  };
  window.datos.productos.push(nuevo);
  mostrarProductos();
  guardarDatos();
  e.target.reset();
};

function mostrarCategorias() {
  const select = document.getElementById('categoria');
  select.innerHTML = '';
  window.datos.categorias.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c;
    select.appendChild(opt);
  });
}

document.getElementById('form-categoria').onsubmit = e => {
  e.preventDefault();
  const cat = document.getElementById('nueva-categoria').value;
  if(cat) window.datos.categorias.push(cat);
  mostrarCategorias();
  guardarDatos();
  e.target.reset();
};

function mostrarBanners() {
  const lista = document.getElementById('lista-banners');
  lista.innerHTML = '';
  window.datos.banners.forEach((b,i) => {
    const div = document.createElement('div');
    div.textContent = b;
    const btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.onclick = () => { window.datos.banners.splice(i,1); mostrarBanners(); guardarDatos(); };
    div.appendChild(btn);
    lista.appendChild(div);
  });
}

document.getElementById('form-banner').onsubmit = e => {
  e.preventDefault();
  const url = document.getElementById('banner-url').value;
  if(url) window.datos.banners.push(url);
  mostrarBanners();
  guardarDatos();
  e.target.reset();
};

document.getElementById('form-redes').onsubmit = e => {
  e.preventDefault();
  window.datos.redes = {
    facebook: document.getElementById('facebook').value,
    instagram: document.getElementById('instagram').value,
    tiktok: document.getElementById('tiktok').value,
    youtube: document.getElementById('youtube').value,
    whatsapp: document.getElementById('whatsapp').value
  };
  guardarDatos();
};
cargarDatos();
