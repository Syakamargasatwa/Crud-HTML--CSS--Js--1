const bootLines = [
  {
    t: "[    0.001204]",
    c: "dim",
    r: " initializing letoris-kernel v2.1...",
  },
  {
    t: "[  OK  ]",
    c: "ok",
    r: " Started sekolah-network.service",
  },
  {
    t: "[  OK  ]",
    c: "ok",
    r: " Mounted /data/siswa.db",
  },
  {
    t: "[  OK  ]",
    c: "ok",
    r: " Started letoris-formd.service",
  },
  {
    t: "[  OK  ]",
    c: "ok",
    r: " Reached target pendaftaran.target",
  },
  {
    t: "[  WARN  ]",
    c: "warn",
    r: " 1 siswa ditemukan di cache lokal",
  },
  {
    t: "",
    c: "dim",
    r: "Loading module pendaftaran-siswa ...",
  },
];

const bootEl = document.getElementById("booting");
let i = 0;
function typeBoot() {
  if (i < bootLines.length) {
    const l = bootLines[i];
    const line = document.createElement("div");
    line.innerHTML = `<span class="${l.c}">${l.t}</span>${l.r}`;
    bootEl.appendChild(line);
    i++;
    setTimeout(typeBoot, 220);
  } else {
    const line = document.createElement("div");
    line.innerHTML = `<span class="ok">user@sman1</span>:~$ ./pendaftaran-siswa --start<span class="cursor"></span>`;
    setTimeout(() => {
      bootEl.classList.add("hide");
      document.getElementById("app").classList.add("show");
    }, 700);
  }
}
setTimeout(typeBoot, 300);

const fkeys = [
  ["F1", "Simpan"],
  ["F2", "Edit baris"],
  ["F3", "Hapus baris"],
  ["F5", "Refresh"],
];
document.getElementById("fk-group").innerHTML = fkeys
  .map(
    ([k, label]) =>
      `<div class="fk"><span class="k">${k}</span> ${label}</div>`,
  )
  .join("");

function tick() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  document.getElementById("jam").textContent = `${hh}:${mm}:${ss}`;
}
tick();
setInterval(tick, 1000);

let siswa = [
  {
    nama: "Dummy orang hahahahaa",
    kelas: "X",
    jk: "Perempuan",
    alamat: "Pamulang",
    jurusan: "BDP",
    ekskul: "Volly",
  },
];
let editIndex = -1;

const els = {
  nama: document.getElementById("f-nama"),
  alamat: document.getElementById("f-alamat"),
  jurusan: document.getElementById("f-jurusan"),
  ekskul: document.getElementById("f-ekskul"),
  kelas: document.getElementById("f-kelas"),
  jk: document.getElementById("f-jk"),
};

function getRadio(group) {
  const checked = group.querySelector("input:checked");
  return checked ? checked.value : "";
}
function setRadio(group, value) {
  group
    .querySelectorAll("input")
    .forEach((inp) => (inp.checked = inp.value === value));
}

function renderTable() {
  const wrap = document.getElementById("table-wrap");
  document.getElementById("count").textContent = siswa.length;
  if (siswa.length === 0) {
    wrap.innerHTML = `<div class="empty">// belum ada data — tambahkan siswa lewat form di atas</div>`;
    return;
  }
  let rows = siswa
    .map(
      (s, idx) => `
        <tr class="${idx === editIndex ? "editing" : ""}">
        <td>${s.nama}</td>
        <td><span class="tag">${s.kelas}</span></td>
        <td>${s.jk}</td>
        <td>${s.alamat}</td>
        <td>${s.jurusan}</td>
        <td>${s.ekskul}</td>
        <td class="actions">
        <button onclick="startEdit(${idx})"><span class="k">[F2]</span> edit</button>
        <button class="del" onclick="removeRow(${idx})"><span class="k">[F3]</span> hapus</button>
        </td>
        </tr>
    `,
    )
    .join("");
  wrap.innerHTML = `
        <table>
        <thead><tr>
        <th>Nama</th><th>Kelas</th><th>Kelamin</th><th>Alamat</th><th>Jurusan</th><th>Ekskul</th><th>Aksi</th>
        </tr></thead>
        <tbody>${rows}</tbody>
        </table>`;
}

function clearForm() {
  els.nama.value = "";
  els.alamat.value = "";
  els.jurusan.value = "";
  els.ekskul.value = "";
  setRadio(els.kelas, "");
  setRadio(els.jk, "");
}

function startEdit(idx) {
  editIndex = idx;
  const s = siswa[idx];
  els.nama.value = s.nama;
  els.alamat.value = s.alamat;
  els.jurusan.value = s.jurusan;
  els.ekskul.value = s.ekskul;
  setRadio(els.kelas, s.kelas);
  setRadio(els.jk, s.jk);
  document.getElementById("btn-submit").textContent = "[ F1 ] Update Data";
  document.getElementById("btn-cancel").style.display = "inline-block";
  document.getElementById("form-hint").innerHTML =
    `mengedit baris <b>${idx + 1}</b> — tekan F1 untuk simpan perubahan`;
  renderTable();
}

function cancelEdit() {
  editIndex = -1;
  clearForm();
  document.getElementById("btn-submit").textContent = "[ F1 ] Tambah Data";
  document.getElementById("btn-cancel").style.display = "none";
  document.getElementById("form-hint").innerHTML =
    `isi kolom lalu tekan <b>F1</b> atau klik tombol untuk menyimpan`;
  renderTable();
}

function removeRow(idx) {
  siswa.splice(idx, 1);
  if (editIndex === idx) cancelEdit();
  renderTable();
}

function submitForm() {
  const data = {
    nama: els.nama.value.trim() || "(tanpa nama)",
    kelas: getRadio(els.kelas) || "-",
    jk: getRadio(els.jk) || "-",
    alamat: els.alamat.value.trim() || "-",
    jurusan: els.jurusan.value || "-",
    ekskul: els.ekskul.value || "-",
  };
  if (editIndex >= 0) {
    siswa[editIndex] = data;
  } else {
    siswa.push(data);
  }
  cancelEdit();
}

document.getElementById("btn-submit").addEventListener("click", submitForm);
document.getElementById("btn-cancel").addEventListener("click", cancelEdit);

document.addEventListener("keydown", (e) => {
  if (e.key === "F1") {
    e.preventDefault();
    submitForm();
  }
  if (e.key === "Escape") {
    cancelEdit();
  }
});

window.startEdit = startEdit;
window.removeRow = removeRow;

renderTable();
