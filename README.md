# Tes Projek — CRUD #1

Tes pertama untuk nyoba bikin sistem **CRUD** sederhana menggunakan HTML, CSS, JavaScript

Tampilannya terinspirasi dari **booting Linux dan terminal**. Awalnya kepikiran bikin form biasa, tapi akhirnya dibuat seperti sistem yang sedang booting dan menerima input dari user.

---

## `typeBoot()`

Fungsi buat nampilin tulisan booting satu per satu.

Jadi waktu halaman dibuka, tulisan nggak langsung muncul semua, tapi keluar secara bertahap seperti proses booting.

`i` dipakai buat menentukan tulisan booting yang sedang ditampilkan.

```text
booting...
loading...
checking system...
...
```

Setelah semua boot selesai, tampilan boot diganti ke form pendaftaran.

---

## `fkeys`

Bagian ini berisi tombol-tombol yang ada di bawah terminal.

```text
F1 Simpan   F2 Edit baris   F3 Hapus baris   F5 Refresh
```

Konsepnya diambil dari penggunaan **function key** pada terminal / program berbasis keyboard.

`map()` dipakai buat mengubah isi array menjadi HTML, lalu `join()` menggabungkannya supaya bisa ditampilkan.

---

## `tick()`

Fungsi buat mengambil waktu sekarang dan menampilkannya di terminal.

```text
21:30:15
```

`setInterval()` dipakai supaya `tick()` dijalankan setiap 1 detik, jadi jamnya terus berjalan.

---

## `siswa`

Array ini yang dipakai buat menyimpan data siswa.

Setiap siswa disimpan sebagai object:

```js
{
    nama: "...",
    kelas: "...",
    jk: "...",
    alamat: "...",
    jurusan: "...",
    ekskul: "..."
}
```

Untuk sekarang datanya masih disimpan di JavaScript, jadi belum ada database.

---

## `editIndex`

Variabel ini buat ngasih tahu JavaScript **data mana yang sedang diedit**.

Kalau nilainya:

```js
-1;
```

berarti nggak sedang edit apa-apa.

Kalau misalnya:

```js
editIndex = 2;
```

berarti data siswa index ke-2 sedang diedit.

---

## `els`

Object ini isinya referensi ke input-input yang ada di form.

Daripada terus-terusan menulis:

```js
document.getElementById("f-nama");
```

cukup pakai:

```js
els.nama;
```

Jadi kode yang lain lebih pendek.

---

## `getRadio()`

Fungsi buat **mengambil pilihan radio button**.

Contohnya:

```text
( ) Laki-laki
( ) Perempuan
```

Kalau user memilih Laki-laki, fungsi ini akan mengambil value tersebut.

---

## `setRadio()`

Kalau `getRadio()` buat mengambil pilihan, `setRadio()` kebalikannya.

Fungsi ini dipakai buat **memilih radio button secara otomatis**.

Ini berguna waktu edit data.

Misalnya data sebelumnya jenis kelaminnya Laki-laki, waktu tombol edit ditekan radio Laki-laki akan otomatis dicentang lagi.

---

## `renderTable()`

Ini salah satu fungsi utama.

Fungsinya buat **menampilkan isi array `siswa` ke tabel HTML**.

Setiap kali data berubah, `renderTable()` dipanggil lagi.

```text
Tambah data
    ↓
siswa.push()
    ↓
renderTable()
    ↓
Tabel diperbarui
```

Hal yang sama dilakukan ketika data diedit atau dihapus.

---

## `clearForm()`

Fungsi buat **mengosongkan semua input form**.

Biasanya dipakai setelah selesai menambahkan data atau membatalkan edit.

---

## `startEdit()`

Fungsi yang dijalankan ketika user menekan tombol **Edit**.

Fungsinya:

1. Mengambil data siswa yang dipilih
2. Memasukkan datanya kembali ke form
3. Mengubah `editIndex`
4. Mengubah tombol dari `Tambah Data` menjadi `Update Data`
5. Menandai baris yang sedang diedit

Jadi user bisa mengubah data yang sudah ada tanpa membuat data baru.

---

## `cancelEdit()`

Fungsi buat **membatalkan mode edit**.

Yang dilakukan:

- `editIndex` dikembalikan ke `-1`
- Form dikosongkan
- Tombol kembali menjadi `Tambah Data`
- Tanda edit pada tabel dihilangkan

---

## `removeRow()`

Fungsi buat **menghapus data siswa**.

Menggunakan:

```js
siswa.splice(idx, 1);
```

`splice()` digunakan untuk menghapus data berdasarkan index-nya.

Setelah dihapus, `renderTable()` dipanggil lagi supaya tabel ikut berubah.

---

## `submitForm()`

Ini fungsi yang menangani tombol **Simpan / Update**.

Pertama, data dari form dikumpulkan menjadi object.

Setelah itu dicek:

```text
Sedang edit?
   ├─ Ya  → Update data lama
   └─ Tidak → Tambah data baru
```

Kalau tidak sedang edit:

```js
siswa.push(data);
```

Kalau sedang edit:

```js
siswa[editIndex] = data;
```

Jadi satu fungsi ini menangani **Create dan Update**.

---

## `addEventListener()`

Dipakai buat memberi tahu JavaScript kalau ada sesuatu yang dilakukan user.

Contohnya:

```js
button.addEventListener("click", submitForm);
```

Artinya ketika tombol diklik, `submitForm()` dijalankan.

Ada juga `keydown` untuk mendeteksi tombol keyboard seperti `F1` dan `Escape`.

---

## `window.startEdit` & `window.removeRow`

```js
window.startEdit = startEdit;
window.removeRow = removeRow;
```

Ini supaya function tersebut bisa dipanggil langsung dari HTML.

Dipakai oleh tombol Edit dan Hapus yang dibuat di dalam tabel.

---

# CRUD

Project ini sekaligus jadi percobaan pertama untuk sistem CRUD.

```text
CREATE
Tambah data siswa
      ↓
READ
Tampilkan data ke tabel
      ↓
UPDATE
Edit data siswa
      ↓
DELETE
Hapus data siswa
```

---

# Kenapa Terminal?

Awalnya cuma mau bikin form pendaftaran biasa.

Tapi karena suka tampilan **terminal Linux**, akhirnya konsepnya dibuat seperti sebuah terminal yang sedang melakukan booting.

Beberapa bagian yang dibuat mengikuti konsep tersebut:

- Boot screen
- Pesan/status sistem
- Jam di terminal
- Function key
- Keyboard shortcut
- Tampilan command line

Jadi ini sebenarnya cuma **tes projek + tugas CRUD**, tapi sekalian buat nyoba apakah tampilan terminal bisa diterapkan ke website.

- Syaka Pandu Farghani
- 
