// ===== DATA 15 PRODUK (gambar lokal) =====
const produkList = [
  {nama:"Seblak Level Neraka",kategori:["Pedas","Favorit"],harga:15000,deskripsi:"Seblak super pedas dengan kerupuk, makaroni, dan bumbu rahasia!",img:"images/seblak.jpg"},
  {nama:"Takoyaki Jepang",kategori:["Snack","Favorit"],harga:18000,deskripsi:"Bola-bola gurita, renyah di luar, lembut di dalam, saus manis gurih.",img:"images/takoyaki.jpg"},
  {nama:"Dimsum Ayam Udang",kategori:["Snack"],harga:20000,deskripsi:"Dimsum kukus isi ayam dan udang, cocok untuk cemilan santai.",img:"images/dimsum.jpg"},
  {nama:"Ramen Pedas Jepang",kategori:["Pedas"],harga:22000,deskripsi:"Ramen kuah pedas dengan topping ayam dan telur.",img:"images/ramen.jpg"},
  {nama:"Burger Homemade",kategori:["Snack"],harga:17000,deskripsi:"Burger daging sapi homemade, sayur segar, dan saus spesial.",img:"images/burger.jpg"},
  {nama:"Ayam Geprek Mozarella",kategori:["Pedas","Favorit"],harga:21000,deskripsi:"Ayam geprek pedas dengan topping keju mozarella leleh.",img:"images/geprek.jpg"},
  {nama:"Mie Goreng Jawa",kategori:["Snack"],harga:14000,deskripsi:"Mie goreng khas Jawa dengan irisan ayam dan sayur.",img:"images/miegoreng.jpg"},
  {nama:"Nasi Goreng Spesial",kategori:["Snack","Favorit"],harga:16000,deskripsi:"Nasi goreng dengan topping ayam, telur, dan kerupuk.",img:"images/nasigoreng.jpg"},
  {nama:"Sate Taichan",kategori:["Pedas"],harga:19000,deskripsi:"Sate ayam tanpa bumbu kacang, pedas segar dan nikmat.",img:"images/taichan.jpg"},
  {nama:"Kwetiau Goreng",kategori:["Snack"],harga:17000,deskripsi:"Kwetiau goreng dengan ayam, sayur, dan kecap manis.",img:"images/kwetiau.jpg"},
  {nama:"Dimsum Goreng",kategori:["Snack"],harga:21000,deskripsi:"Dimsum ayam udang goreng renyah, cocok untuk camilan.",img:"images/dimsum-goreng.jpg"},
  {nama:"Tahu Walik",kategori:["Snack"],harga:12000,deskripsi:"Tahu isi daging ayam, renyah di luar, lembut di dalam.",img:"images/tahu.jpg"},
  {nama:"Sosis Bakar",kategori:["Snack"],harga:10000,deskripsi:"Sosis bakar dengan saus BBQ dan taburan keju.",img:"images/sosis.jpg"},
  {nama:"Es Teh Jumbo",kategori:["Minuman"],harga:5000,deskripsi:"Es teh manis segar ukuran jumbo, pas untuk teman makan.",img:"images/esteh.jpg"},
  {nama:"Jus Alpukat",kategori:["Minuman"],harga:9000,deskripsi:"Jus alpukat segar dengan susu kental manis dan coklat.",img:"images/jusalpukat.jpg"}
];

// ===== RENDER PRODUK LIST =====
function renderProdukList(filter="") {
  let html = '';
  produkList.forEach((p, idx) => {
    // Jika filter kategori, cek juga kategori
    if(filter && filter!=="Favorit" && filter!=="Snack" && filter!=="Minuman" && filter!=="Pedas" &&
      !p.nama.toLowerCase().includes(filter.toLowerCase()) && !p.deskripsi.toLowerCase().includes(filter.toLowerCase())
    ) return;
    if(filter && (filter==="Favorit"||filter==="Snack"||filter==="Minuman"||filter==="Pedas") && !p.kategori.includes(filter)) return;
    html += `<div class="produk">
      <img src="${p.img}" alt="${p.nama}">
      <h3>${p.nama}</h3>
      <p class="harga">Rp${p.harga.toLocaleString()}</p>
      <p>${p.deskripsi.substring(0, 45)}...</p>
      <button class="btn" onclick="showDetailProduk(${idx})">Detail</button>
      <button class="btn" onclick="tambahKeKeranjang('${p.nama}',${p.harga})"><i class="fa fa-cart-plus"></i> Beli</button>
    </div>`;
  });
  document.getElementById('produk-list').innerHTML = html || '<div class="kosong">Produk tidak ditemukan.</div>';
}

// ===== NAVIGASI "HALAMAN" =====
function showPage(page) {
  document.querySelectorAll('main > section').forEach(sec => sec.classList.remove('active-section'));
  document.querySelectorAll('.bottom-nav a').forEach(a => a.classList.remove('active'));
  document.querySelectorAll('.kategori-btn').forEach(btn=>btn.classList.remove('active'));
  if(page === 'home'){ document.getElementById('hal-home').classList.add('active-section'); document.getElementById('nav-home').classList.add('active'); }
  if(page === 'produk'){ document.getElementById('hal-produk').classList.add('active-section'); document.getElementById('nav-produk').classList.add('active'); }
  if(page === 'keranjang'){ document.getElementById('hal-keranjang').classList.add('active-section'); document.getElementById('nav-keranjang').classList.add('active'); tampilkanKeranjang(); }
  if(page === 'kontak'){ document.getElementById('hal-kontak').classList.add('active-section'); document.getElementById('nav-kontak').classList.add('active'); }
  if(page === 'detail'){ document.getElementById('hal-detail').classList.add('active-section'); }
  window.scrollTo({top:0});
}

// ===== FILTER KATEGORI =====
function filterKategori(kat, el) {
  showPage('produk');
  document.querySelectorAll('.kategori-btn').forEach(btn=>btn.classList.remove('active'));
  if(el) el.classList.add('active');
  document.getElementById('searchInput').value = "";
  renderProdukList(kat);
}

// ===== DETAIL PRODUK (MODAL) =====
function showDetailProduk(idx) {
  const p = produkList[idx];
  document.getElementById('detailImg').src = p.img;
  document.getElementById('detailNama').textContent = p.nama;
  document.getElementById('detailHarga').textContent = 'Rp'+p.harga.toLocaleString();
  document.getElementById('detailDeskripsi').textContent = p.deskripsi;
  document.getElementById('modalDetail').style.display = 'flex';
  document.getElementById('detailBeliBtn').onclick = function() {
    tambahKeKeranjang(p.nama, p.harga);
    closeModal();
  };
}
function closeModal() {
  document.getElementById('modalDetail').style.display = 'none';
}

// ===== KERANJANG DENGAN JUMLAH + / - =====
function tambahKeKeranjang(nama, harga) {
  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  let idx = keranjang.findIndex(item => item.nama === nama);
  if (idx > -1) {
    keranjang[idx].jumlah += 1;
  } else {
    keranjang.push({ nama, harga, jumlah: 1 });
  }
  localStorage.setItem('keranjang', JSON.stringify(keranjang));
  updateCartCount();
  alert('Produk masuk ke keranjang!');
}

function tampilkanKeranjang() {
  const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  const container = document.getElementById('keranjangContainer');
  if (keranjang.length === 0) {
    container.innerHTML = '<p class="kosong">Keranjang kamu masih kosong 😢</p>';
    document.getElementById('cart-badge').style.display = 'none';
    return;
  }
  let total = 0;
  let totalItem = 0;
  let html = '<table><thead><tr><th>Produk</th><th>Harga</th><th>Jumlah</th><th>Subtotal</th></tr></thead><tbody>';
  keranjang.forEach((item, idx) => {
    let subtotal = item.harga * item.jumlah;
    html += `<tr>
      <td>${item.nama}</td>
      <td>Rp${item.harga.toLocaleString()}</td>
      <td>
        <button onclick="ubahJumlahKeranjang(${idx},-1)" style="padding:2px 8px;">-</button>
        <span style="margin:0 8px;">${item.jumlah}</span>
        <button onclick="ubahJumlahKeranjang(${idx},1)" style="padding:2px 8px;">+</button>
      </td>
      <td>Rp${subtotal.toLocaleString()}</td>
    </tr>`;
    total += subtotal;
    totalItem += item.jumlah;
  });
  html += `
    </tbody>
    <tfoot>
      <tr style="font-weight:bold; background:#ffe6e6;">
        <td colspan="2">Total Item</td>
        <td colspan="2">${totalItem} produk</td>
      </tr>
      <tr style="font-weight:bold; background:#ffe6e6;">
        <td colspan="2">Total Harga</td>
        <td colspan="2">Rp${total.toLocaleString()}</td>
      </tr>
    </tfoot>
  </table>`;
  container.innerHTML = html;
  updateCartCount();
}

function ubahJumlahKeranjang(idx, delta) {
  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  keranjang[idx].jumlah += delta;
  if (keranjang[idx].jumlah <= 0) {
    keranjang.splice(idx, 1);
  }
  localStorage.setItem('keranjang', JSON.stringify(keranjang));
  tampilkanKeranjang();
  updateCartCount();
}

function kosongkanKeranjang() {
  localStorage.removeItem('keranjang');
  tampilkanKeranjang();
  updateCartCount();
  alert("Keranjang dikosongkan.");
}

function kirimViaWhatsApp() {
  const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong 😢");
    return;
  }
  let pesan = 'Pesanan dari WARUNG SUAP!%0A%0A';
  let total = 0;
  keranjang.forEach(item => {
    pesan += `• ${item.nama} x${item.jumlah}%0A`;
    total += item.harga * item.jumlah;
  });
  pesan += `%0A*Total Harga:* Rp${total.toLocaleString()}%0A%0A`;
  pesan += 'Saya ingin memesan seperti di atas ya! 🙌';
  const noWA = '6285722203461';
  const link = `https://wa.me/${noWA}?text=${pesan}`;
  window.open(link, '_blank');
}

function updateCartCount() {
  const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  let totalItem = 0;
  keranjang.forEach(item => totalItem += item.jumlah);
  const badge = document.getElementById('cart-badge');
  if(totalItem > 0) {
    badge.innerText = totalItem;
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }
}

// ===== METODE PEMBAYARAN INTERAKTIF =====
function pilihPembayaran(metode) {
  document.querySelectorAll('.metode-bayar').forEach(el => el.classList.remove('selected'));
  document.querySelectorAll('.metode-bayar').forEach(el => {
    if(el.innerText.trim().toLowerCase().includes(metode.toLowerCase())) {
      el.classList.add('selected');
    }
  });
  let info = "";
  if(metode==="Gopay") info = "Bayar ke GoPay: <b>0857-2220-3461</b>";
  else if(metode==="COD") info = "Bayar di tempat (COD)";
  else if(metode==="QRIS") info = "Scan QRIS di outlet";
  document.getElementById('pembayaranTerpilih').innerHTML = "Metode dipilih: " + info;
}

// ===== SEARCH BAR =====
function cariProduk() {
  const keyword = document.getElementById('searchInput').value.trim();
  renderProdukList(keyword);
  document.querySelectorAll('.kategori-btn').forEach(btn=>btn.classList.remove('active'));
}
document.getElementById('searchInput').addEventListener('keyup', function(e){
  if(e.key === 'Enter') cariProduk();
});

// ===== FORM KONTAK =====
document.addEventListener('DOMContentLoaded', function () {
  renderProdukList();
  showPage('home');
  updateCartCount();
  const form = document.getElementById('formKontak');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Terima kasih, pesan Anda sudah diterima (simulasi).');
      form.reset();
    });
  }
});

// ===== MODAL CLOSE BY CLICK OUTSIDE =====
document.getElementById('modalDetail').addEventListener('click', function(e){
  if(e.target === this) closeModal();
});