/**
 * 2C = Two of Clubs / treboles
 * 2D = Two of Diamons / diamantes
 * 2H = Two of Hearts / corazones
 * 2S = Two of Spades / espadas
 */

 //Funcion anonima autoinvocada
 // Patron modulo
const miModulo = (()=>{
  'use strict'

  let deck = [];
  const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];
  let puntosJugadores = [];

  const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

  const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');

  // Inicializa el juego
  const inicializarJuego = (numJugadores = 2 )=>{
    deck=crearDeck();
    puntosJugadores = [];
    for ( let i=0; i< numJugadores; i++){
      puntosJugadores.push(0);
    }
    puntosHTML.forEach( elem => elem.innerText = 0);
    divCartasJugadores.forEach(elem => elem.innerHTML = '');

    btnPedir.disabled = false;
    btnDetener.disabled = false;

  };

  // Crea una nueva baraja
  const crearDeck = () => {
    deck=[];

    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);

      }

    }

    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo);
      }

    }

    return  _.shuffle(deck);

  }


  // Toma una nueva carta
  const pedirCarta = () => {

    if (deck.length === 0) {
      throw 'No hay cartas en la baraja';
    }
    return deck.pop();
  }



  const valorCarta = (carta) => {
    // substring    Permite obtener los caracteres desde la posicion 0 hasta lenght-1
    // *1           Lo convierte a number
    // isNaN(valor) Si valor no es un numero return true
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
      (valor === 'A') ? 11 : 10
      : valor * 1;
  }

  // Turno: 0 = primer jugador; ultimo sera para la computadora
  const acumularPuntos = (carta, turno)=>{
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  }

const crearCarta =(carta, turno)=>{
  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add('carta');
  divCartasJugadores[turno].append(imgCarta);
}

const determinarGanador = ()=>{

  const [puntosMinimos, puntosComputadora] = puntosJugadores;
  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert('Nadie gana');
    } else if (puntosMinimos > 21) {
      alert('Computadora gana');
    } else if (puntosComputadora > 21) {
      alert('Jugador gana');
    } else {
      alert('Computadora gana');

    }

  }, 100);
}
  //turno de la computadora
const turnComputadora = (puntosMinimos) => {
  let puntosComputadora = 0;

    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length-1 );
      crearCarta(carta, puntosJugadores.length - 1 );


    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    determinarGanador();
    // return puntosComputadora;
  }

  // Eventos
  btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);

    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      console.warn('Perdiste');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnComputadora(puntosJugador);

    } else if (puntosJugador === 21) {
      console.warn('21, genial');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnComputadora(puntosJugador);
    }
  });

  btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnComputadora(puntosJugadores[0]);

  });

  // btnNuevo.addEventListener('click', () => {
  //   inicializarJuego();
  // });

  return {
    nuevoJuego: inicializarJuego
  };

})();
