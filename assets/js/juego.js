/**
 * 2C = Two of Clubs / treboles
 * 2D = Two of Diamons / diamantes
 * 2H = Two of Hearts / corazones
 * 2S = Two of Spades / espadas
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']

let puntosJugador=0;
let puntosComputadora=0;

const btnPedir = document.querySelector('#btnPedir');
const puntosHTML = document.querySelectorAll('small');
const divCartasJugardor = document.querySelector('#jugador-cartas');

// Crea una nueva baraja
const crearDeck = ()=>{
    for( let i=2; i<=10; i++){
      for( let tipo of tipos){
        deck.push( i + tipo);

      }

    }

    for (let tipo of tipos){
      for (let esp of especiales){
        deck.push(esp + tipo);
      }

    }

    deck = _.shuffle(deck);
    // console.log(deck);
    return deck;
}

crearDeck();

// Toma una nueva carta
const pedirCarta = ()=>{

  if( deck.length === 0){
    throw 'No hay cartas en la baraja';
  }
  nuevaCarta = deck.pop();
  // console.log('La carta nueva es', nuevaCarta);
  // console.log('Ahora el deck tiene', deck);

  return nuevaCarta;
}



const valorCarta = (carta)=>{
  // substring    Permite obtener los caracteres desde la posicion 0 hasta lenght-1
  // *1           Lo convierte a number
  // isNaN(valor) Si valor no es un numero return true
  const valor = (carta.substring(0, carta.length-1)) *1;
  return ( isNaN(valor)) ?
         ( valor === 'A')? 11:10
         : valor * 1;


}

//turno de la computadora
const turnComputadora = (puntosMinimos)=>{

  // do{
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugardor.append(imgCarta);

  // } while();
}

// Eventos
btnPedir.addEventListener('click', ()=>{
  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);
  puntosHTML[0].innerText = puntosJugador;

  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add('carta');
  divCartasJugardor.append(imgCarta);

  if(puntosJugador>21){
    console.warn('Perdiste');
    btnPedir.disabled = true;
  }else if( puntosJugador === 21){
    console.warn('21, genial');
    btnPedir.disabled = true;
  }



});