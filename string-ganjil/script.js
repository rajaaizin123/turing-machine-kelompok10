let tape = [];


// menghitung apakah jumlah string ganjil
 let currentState = "q0";
 let finalState = "q1, q2, q3";
 let headPosition = 0;  // Posisi awal head

function initializeTape() {
  //tape = ["a", "a", "b", "b", "b", "b", "b", "b", "a", "a", " "];
  //updateTape();
 }

 // untuk menentukan jumlah string genap
 let transitions = {
   q0: { "a": { write: "a", move: "R", next: "q1" }, "b": { write: "b", move: "R", next: "q2" } },
   q1: { "a": { write: "a", move: "R", next: "q0" }, "b": { write: "b", move: "R", next: "q3" } },
   q2: { "a": { write: "a", move: "R", next: "q3" }, "b": { write: "b", move: "R", next: "q0" } },
   q3: { "a": { write: "a", move: "R", next: "q2" }, "b": { write: "b", move: "R", next: "q1" } },
 };

//aabbb

// pertambahan biner
// let currentState = "right";
// let finalState = "done";
// let headPosition = 1;

// let transitions = {
//    right: { 0: {write: 0,   move: "R", next: "right"},  1: {write: 1, move: "R", next: "right"},     "+": {write: "+", move: "R", next: "right"}, " ": {write: " ", move: "L", next: "read"} },
//    read:  { 0: {write: "c", move: "L", next: "have0" }, 1: { write: "c", move: "L", next: "have1" }, "+": {write: " ", move: "L", next: "rewrite" } },
//    have0: { 0: {write: 0,   move: "L", next: "have0"},  1: {write: 1, move: "L", next: "have0"},     "+": {write: "+", move: "L", next: "add0"} },
//    have1: { 0: {write: 0,   move: "L", next: "have1"},  1: {write: 1, move: "L", next: "have1"},     "+": {write: "+", move: "L", next: "add1"} },
//    add0:  { 0: {write: "O", move: "R", next: "back0" }, 1: {write:"I",move: "R", next: "back0"},     " ": {write: 0,   move: "R", next: "back0" },"O": {write: "O", move: "L", next: "add0"}, "I": {write: "I", move: "L", next: "add0"}},
//    add1:  { 0: {write: "I", move: "R", next: "back1" }, " ": {write: "I", move: "R", next: "back1"}, 
//             1: {write: "O", move: "L", next: "carry"},  "O": {write: "O", move: "L", next: "add1"},  "I": {write: "I", move: "L", next: "add1"} },
//    carry: { 0: {write: 1,   move: "R", next: "back1"},  " ": {write: 1,   move: "R", next: "back1"}, 
//             1: {write: 0,   move: "L"}},
//    back0: { 0: {write: 0,   move: "R", next: "back0"}, 1: {write: 1, move: "R", next: "back0"}, "O": {write: "O", move: "R", next: "back0"}, "I": {write: "I", move: "R", next: "back0"}, "+": {write: "+", move: "R", next: "back0"}, "c": {write: 0, move:"L", next:"read"}},
//    back1: { 0: {write: 0,   move: "R", next: "back1"}, 1: {write: 1, move: "R", next: "back1"}, "O": {write: "O", move: "R", next: "back1"}, "I": {write: "I", move: "R", next: "back1"}, "+": {write: "+", move: "R", next: "back1"}, "c": {write: 1, move:"L", next:"read"}},

//    rewrite: { "O": {write: 0, move: "L", next: "rewrite"}, "I": {write: 1, move: "L", next: "rewrite"},
//                 0: {write: 0, move:"L",  next: "rewrite"},   1: {write: 1, move: "L", next: "rewrite"}, " ": {write: " ", move: "", next: "done"}},
//     done: {},
   
// };

function simpanKarakter(){
  // ambil input
  const input = document.getElementById('input-ganjil').value;

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
      text: "Silakan input dulu yaa..",
      icon: "warning"
    });
  }

  if (!transition) {
    if ((currentState === "q1") || (currentState === "q2")) {
     return Swal.fire({
        title: "Pesan dari beta!",
        text: "Ciee.. Diterima!",
        icon: "success"
      });
    }
    return Swal.fire({
      title: "Pesan dari beta!",
      text: "Haduh!, Ditolak!",
      icon: "error"
    });
  }


  tape[headPosition] = transition.write;
  moveHead(transition.move);
  currentState = transition.next;
  //console.log(`state sekarang: ${currentState}`);
  //console.log(`inputan: ${currentSymbol}`);
  
  animasiState(currentState);
  updateTape();

  if (((currentState != "q1") || (currentState !== "q2")) && (transition.next !== " ")) {
    setTimeout(start, 1000);
  } else {
    alert("Proses selesai");
  }
  
}

function reset() {
  currentState = "q0";
  headPosition = 0;
  //initializeTape();
  resetTape();
  resetAnimasi();
}

document.addEventListener("DOMContentLoaded", initializeTape);
