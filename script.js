// JavaScript Document
const elHari = document.getElementById('hari');
const elJam = document.getElementById('jam');
const elMenit = document.getElementById('menit');
const elDetik = document.getElementById('detik');

const countdownBox = document.getElementById('countdown-box');
const pesanSelesai = document.getElementById('pesan-selesai');
const subjudulTanggal = document.getElementById('subjudul-tanggal');

const inputWaktu = document.getElementById('input-waktu');
const btnMulai = document.getElementById('btn-mulai');

// 2. Menentukan waktu target default: 30 Desember 2026 pukul 07:00:00
let waktuTarget = new Date("December 30, 2026 07:00:00").getTime();

// Fungsi pembantu agar angka di bawah 10 selalu memiliki nol di depan (contoh: 09, 05)
function formatAngka(angka) {
    return angka < 10 ? "0" + angka : angka;
}

// 3. Fungsi utama untuk menghitung mundur
function updateCountdown() {
    const waktuSekarang = new Date().getTime();
    const selisih = waktuTarget - waktuSekarang;

    // Cek jika waktu sudah habis (selisih 0 atau negatif)
    if (selisih <= 0) {
        elHari.innerText = "00";
        elJam.innerText = "00";
        elMenit.innerText = "00";
        elDetik.innerText = "00";

        // Sembunyikan kotak angka dan tampilkan pesan peringatan
        countdownBox.classList.add('hidden');
        pesanSelesai.classList.remove('hidden');
        return; // Hentikan perhitungan lebih lanjut
    }

    // Pastikan kotak angka tampil & pesan selesai tersembunyi (jika user mengatur ulang timer)
    countdownBox.classList.remove('hidden');
    pesanSelesai.classList.add('hidden');

    // Rumus konversi milidetik ke Hari, Jam, Menit, dan Detik
    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
    const detik = Math.floor((selisih % (1000 * 60)) / 1000);

    // Masukkan hasil perhitungan ke dalam elemen HTML
    elHari.innerText = formatAngka(hari);
    elJam.innerText = formatAngka(jam);
    elMenit.innerText = formatAngka(menit);
    elDetik.innerText = formatAngka(detik);
}

// 4. Jalankan fungsi pertama kali agar tidak menunggu 1 detik saat halaman baru dibuka
updateCountdown();

// Jalankan fungsi updateCountdown setiap 1000 milidetik (1 detik)
let intervalTimer = setInterval(updateCountdown, 1000);

// 5. Event Listener untuk tombol "Mulai Hitung Mundur" (Custom Timer)
btnMulai.addEventListener('click', function() {
    const nilaiInput = inputWaktu.value;

    // Validasi jika user belum memilih tanggal/waktu
    if (!nilaiInput) {
        alert("Silakan pilih tanggal dan jam terlebih dahulu!");
        return;
    }

    // Ubah waktuTarget dengan input baru dari user
    const waktuBaru = new Date(nilaiInput);
    waktuTarget = waktuBaru.getTime();

    // Perbarui teks keterangan tanggal target di layar
    const opsiFormat = { 
        day: 'numeric', month: 'long', year: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
    };
    subjudulTanggal.innerText = "Target Baru: " + waktuBaru.toLocaleDateString('id-ID', opsiFormat);

    // Langsung perbarui tampilan detik itu juga
    updateCountdown();
});