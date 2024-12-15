let tape = [];
let transitions = {};
let currentState = "qs";
let finalState = "qf";
let headPosition = 0;

// mesin validasi email dengan panjang 6 karakter
function initializeTape() {
  // tape = ["R", "o", "Y", "A", "a", "7", "@", "g", "m", "a", "i", "l",".", "c", "o", "m"];
  // updateTape();
}

// Fungsi pengecekan karakter valid
function isValidCharacter(char) {
  const validRegex = /^[a-zA-Z0-9@]$/;
  return validRegex.test(char);
}

// Definisi fungsi transisi
transitions = {
  qs: {
    default: {
      check: isValidCharacter,
      write: (c) => c,
      move: "R",
      next: "q0",
    },
  },
  q0: {
    default: {
      check: isValidCharacter,
      write: (c) => c,
      move: "R",
      next: "q1",
    },
    ".": { check: (c) => c === ".", write: (c) => c, move: "R", next: "q1",},
  },
  q1: {
    default: {
      check: isValidCharacter,
      write: (c) => c,
      move: "R",
      next: "q2",
    },
    ".": { check: (c) => c === ".", write: (c) => c, move: "R", next: "q2",},
  },
  q2: {
    default: {
      check: isValidCharacter,
      write: (c) => c,
      move: "R",
      next: "q3",
    },
    ".": { check: (c) => c === ".", write: (c) => c, move: "R", next: "q3",},
  },
  q3: {
    default: {
      check: isValidCharacter,
      write: (c) => c,
      move: "R",
      next: "q4",
    },
    ".": { check: (c) => c === ".", write: (c) => c, move: "R", next: "q4",},
  },
  q4: {
    default: {
      check: isValidCharacter,
      write: (c) => c,
      move: "R",
      next: "q5",
    },
  },
  q5: {
    "@": { check: (c) => c === "@", write: (c) => c, move: "R", next: "q6", },
  },
  q6:  { "g": { check: (c) => c === "g", write: (c) => c, move: "R", next: "q7",} },
  q7:  { "m": { check: (c) => c === "m", write: (c) => c, move: "R", next: "q8",} },
  q8:  { "a": { check: (c) => c === "a", write: (c) => c, move: "R", next: "q9",} },
  q9: { "i": { check: (c) => c === "i", write: (c) => c, move: "R", next: "q10",} }, 
  q10: { "l": { check: (c) => c === "l", write: (c) => c, move: "R", next: "q11",} }, 
  q11: { ".": { check: (c) => c === ".", write: (c) => c, move: "R", next: "q12",} }, 
  q12: { "c": { check: (c) => c === "c", write: (c) => c, move: "R", next: "q13",} }, 
  q13: { "o": { check: (c) => c === "o", write: (c) => c, move: "R", next: "q14",} }, 
  q14: { "m": { check: (c) => c === "m", write: (c) => c, move: "R", next: "qf",} },
  qf: {  },      
};

function simpanKarakter(){
  // ambil input
  const input = document.getElementById('input-email').value;

  // parsing
  tape = input.split('');
  updateTape();
}

function resetTape(){
  tape = [];
  updateTape();
}

function animasiState(stateId){
      // reset state
    let semuaState = document.querySelectorAll('.state');
      semuaState.forEach(state => {
      state.classList.remove('active');
    });

    // animasi state
    let stateAnimasi = document.getElementById(stateId);
    if (stateAnimasi)
      stateAnimasi.classList.add('active');
}

function animasiPanah(stateId, inputan){
      // reset garis
      let semuaGaris = document.querySelectorAll('.line');
      semuaGaris.forEach(state => {
        state.classList.remove('active');
      });

      // reset panah
      let semuaPanah = document.querySelectorAll('.arrow');
      semuaPanah.forEach(panah => {
        panah.classList.remove('active');
      });

      // animasi panah
      let transisiPanah = `${stateId}_${inputan}`;
      let panahAnimasi = document.getElementById(transisiPanah);
      if (panahAnimasi)
        panahAnimasi.classList.add('active');

      // animasi garis
      let transisiId = `${stateId}-${inputan}`;
      let garisAnimasi = document.getElementById(transisiId);
      if (garisAnimasi)
        garisAnimasi.classList.add('active');
}

function resetAnimasi(){
  document.querySelectorAll('.state').forEach(state => {
    state.classList.remove('active');
  });

  document.querySelectorAll('.line').forEach(state => {
    state.classList.remove('active');
  });

  document.querySelectorAll('.arrow').forEach(state => {
    state.classList.remove('active');
  });
}


// Fungsi memperbarui pita
function updateTape() {
  const tapeContainer = document.getElementById("tape");
  tapeContainer.innerHTML = "";
  tape.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    if (index === headPosition) {
      const head = document.createElement("div");
      head.classList.add("head");
      cell.appendChild(head);
    }
    cell.appendChild(document.createTextNode(value));
    tapeContainer.appendChild(cell);
  });
}

// Fungsi memindahkan head
function moveHead(direction) {
  if (direction === "R") headPosition++;
  else if (direction === "L") headPosition--;

  if (headPosition < 0) {
    tape.unshift(" ");
    headPosition = 0;
  } else if (headPosition >= tape.length) {
    tape.push(" ");
  }
}

// Fungsi untuk menjalankan mesin
function start() {
   if (tape[headPosition--] === tape[headPosition++]){
    return Swal.fire({
      title: "Pesan dari beta!",
      text: "titik nya banyak kali!",
      icon: "error"
    });
   }

  const currentSymbol = tape[headPosition];
  const transition = Object.values(transitions[currentState]).find((t) =>
    t.check(currentSymbol)
  );

  if (currentState === finalState) {
    return Swal.fire({
      title: "Pesan dari beta!",
      text: "Wah selamat emailnya lulus sensor!",
      icon: "success"
    });
  }

  if (tape.length == 0){
    return Swal.fire({
      title: "Pesan dari beta!",
      text: "Isi dulu..!",
      icon: "warning"
    });
  }

  // if (tape.length != 16){
  //   return alert("Email hanya bisa dengan panjang 6 karakter");
  // }

  if (!transition) {
    return Swal.fire({
      title: "Pesan dari beta!",
      text: "Wah salah nih!",
      icon: "error"
    });
  }

  // selama ada transisi maka valid
  animasiPanah(currentState, "valid")
  //animasiState(currentState);

  console.log(`State: ${currentState}`);
  console.log(`inputan: ${tape[headPosition]}`);

  tape[headPosition] = transition.write(currentSymbol);
  moveHead(transition.move);
  currentState = transition.next;
  animasiState(currentState);
  updateTape();

  setTimeout(start, 650);
}

// Fungsi untuk reset mesin
function reset() {
  //initializeTape();
  currentState = "qs";
  headPosition = 0;
  resetTape();
  resetAnimasi();
}


