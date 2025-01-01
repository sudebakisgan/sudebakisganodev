const canvas = document.getElementById('oyunAlani');
const ctx = canvas.getContext('2d');

const kutu = 20;
let yilan = [{x: 200, y: 200}]; // Yılan başlangıç noktası ortada
let yiyecek = {
    x: Math.floor(Math.random() * 20) * kutu,
    y: Math.floor(Math.random() * 20) * kutu
};
let puan = 0;
let dx = 0;
let dy = 0;

function cizim() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    yilan.forEach(bolum => {
        ctx.fillStyle = 'green';
        ctx.fillRect(bolum.x, bolum.y, kutu, kutu);
    });
    ctx.fillStyle = 'red';
    ctx.fillRect(yiyecek.x, yiyecek.y, kutu, kutu);
    document.getElementById('puanGostergesi').innerText = `Puan: ${puan}`;

    hareket();
    yilanYedi();

    setTimeout(() => requestAnimationFrame(cizim), 100); // Her 100 ms'de bir yeniden çizim
}

function hareket() {
    const bas = {x: yilan[0].x + dx, y: yilan[0].y + dy};
    yilan.unshift(bas);
    if (bas.x === yiyecek.x && bas.y === yiyecek.y) {
        puan += 1;
        yiyecek = {
            x: Math.floor(Math.random() * 20) * kutu,
            y: Math.floor(Math.random() * 20) * kutu
        };
        yilanRengiDegistir();
    } else {
        yilan.pop();
    }
}

function yilanRengiDegistir() {
    const renkler = ['green', 'blue', 'purple', 'orange', 'pink'];
    const randomRenk = renkler[Math.floor(Math.random() * renkler.length)];
    yilan.forEach(bolum => {
        ctx.fillStyle = randomRenk;
        ctx.fillRect(bolum.x, bolum.y, kutu, kutu);
    });
}

function yilanYedi() {
    const bas = yilan[0];
    if (bas.x < 0 || bas.x >= canvas.width || bas.y < 0 || bas.y >= canvas.height) {
        alert("Oyun Bitti");
        document.location.reload();
    }
    for (let i = 1; i < yilan.length; i++) {
        if (bas.x === yilan[i].x && bas.y === yilan[i].y) {
            alert("Oyun Bitti");
            document.location.reload();
        }
    }
}

function sol() {
    if (dx === 0) { // Sol
        dx = -kutu;
        dy = 0;
    }
}

function yukari() {
    if (dy === 0) { // Yukarı
        dx = 0;
        dy = -kutu;
    }
}

function sag() {
    if (dx === 0) { // Sağ
        dx = kutu;
        dy = 0;
    }
}

function asagi() {
    if (dy === 0) { // Aşağı
        dx = 0;
        dy = kutu;
    }
}

cizim();



