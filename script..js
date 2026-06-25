const PASS = "123";

function navigateTo(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if(id === 'report-screen') renderReport();
  updateWallet();
}

function updateWallet() {
  let hist = JSON.parse(localStorage.getItem('data') || '[]');
  let n = 0, p = 0;
  hist.forEach(i => {
    let a = parseFloat(i.amount) || 0;
    if(i.type === 'Chiqim') a = -a;
    if(i.payment === 'Naqd') n += a; else p += a;
  });
  document.getElementById('balance-total').innerText = (n + p).toLocaleString() + ' so\'m';
  document.getElementById('b-naqd').innerText = 'Naqd: ' + n.toLocaleString();
  document.getElementById('b-plastik').innerText = 'Karta: ' + p.toLocaleString();
}

function saveData() {
  let h = JSON.parse(localStorage.getItem('data') || '[]');
  h.unshift({
    type: document.getElementById('type').value,
    amount: document.getElementById('summa').value,
    payment: document.getElementById('payment').value,
    note: document.getElementById('note').value,
    date: new Date().toLocaleDateString()
  });
  localStorage.setItem('data', JSON.stringify(h));
  document.getElementById('summa').value = '';
  navigateTo('home-screen');
}

function renderReport() {
  let h = JSON.parse(localStorage.getItem('data') || '[]');
  document.getElementById('result').innerHTML = h.map(i => `
    <div style="background:#2d3436; padding:10px; margin:5px 0; border-radius:5px;">
      <b>${i.type}: ${i.amount}</b> (${i.payment})<br><small>${i.date}</small>
    </div>
  `).join('');
}

function showReport() { navigateTo('report-screen'); }
function checkPassword() { document.getElementById('password').value === PASS ? navigateTo('home-screen') : alert("Xato!"); }
function clearData() { localStorage.removeItem('data'); renderReport(); updateWallet(); }