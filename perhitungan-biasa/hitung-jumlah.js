let tape = [];

let currentState = "q0";
let finalState = "q5";
let headPosition = 0;

let transitions = {
    q0: { 0: { write: "X", move: "R", next: "q1" }, "C": { write: " ", move: "R", next: "q5" } },
    q1: { 0: { write: 0, move: "R", next: "q1" },   "C": { write: "C", move: "R", next: "q2" } },
    q2: { 0: { write: 0, move: "R", next: "q2" },   " ": { write: 0,   move: "L", next: "q3" } },
    q3: { 0: { write: 0, move: "L", next: "q3" },   "C": { write: "C", move: "L", next: "q4" } },
    q4: { 0: { write: 0, move: "L", next: "q4" },   "X": { write: "X", move: "R", next: "q0" } },
    q5: { },
};

function simpanKarakter(){
//   // // ambil input
const input = document.getElementById('input-hitung').value;

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

function animasiPanah(stateId, garisId){
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

  if (garisId === " ")  // blank
  garisId = "B";
  // animasi panah
  let transisiPanah = `${stateId}_${garisId}`;
  let panahAnimasi = document.getElementById(transisiPanah);
  if (panahAnimasi)
    panahAnimasi.classList.add('active');

  // animasi garis
  let transisiId = `${stateId}-${garisId}`;
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
    state.classList.remove('.active');
  });
}

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

function moveHead(direction) {
  if (direction === "R") headPosition++;
  else if (direction === "L") headPosition--;

  if (headPosition < 0) {
    tape.unshift(0);
    headPosition = 0;
  } else if (headPosition >= tape.length) {
    tape.push(" ");
  }
}

function start() {
  const currentSymbol = tape[headPosition];
  const transition = transitions[currentState]?.[currentSymbol];
  animasiPanah(currentState, currentSymbol);

  if (tape.length == 0){
    return Swal.fire({
      title: "Pesan dari beta!",
      text: "Input dulu mbah..!",
      icon: "warning"
    });
  }

  if (!transition) {
    if (currentState === "q5"){
      return Swal.fire({
        title: "Pesan dari beta!",
        text: "Wah sudah selesai!",
        icon: "success"
      });
    }
    return Swal.fire({
      title: "Pesan dari beta!",
      text: "waduh! coba lagi...",
      icon: "error"
    });
  }

  tape[headPosition] = transition.write;
  moveHead(transition.move);
  currentState = transition.next;
  animasiState(currentState);
  updateTape();

  if ((currentState === "q5") && (transition.next === 0)) {
    alert("Proses selesai");
  } else {
    setTimeout(start, 800);
  }
}

function reset() {
  currentState = "q0";
  headPosition = 0;
  resetTape();
  resetAnimasi();
}

document.addEventListener("DOMContentLoaded", initializeTape);
