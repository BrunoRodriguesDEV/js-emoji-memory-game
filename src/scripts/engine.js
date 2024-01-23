const emojis = [
  "🐱",
  "🐱",
  "🦝",
  "🦝",
  "🦊",
  "🦊",
  "🐶",
  "🐶",
  "🐵",
  "🐵",
  "🦁",
  "🦁",
  "🐯",
  "🐯",
  "🐮",
  "🐮",
];

let tempoTotal = 120; 
    let cronometro;

    function formatarTempo(tempo) {
        const minutos = Math.floor(tempo / 60);
        const segundos = tempo % 60;

        return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    }

    function iniciarContagemRegressiva() {
        cronometro = setInterval(function () {
            tempoTotal--;
            document.getElementById('cronometro').innerText = formatarTempo(tempoTotal);

            if (tempoTotal <= 0) {
                clearInterval(cronometro);
                
            }
        }, 1000);
    }

    let tentativasRestantes = 50;

    document.body.addEventListener('click', function () {
        if (tentativasRestantes > 0) {
            tentativasRestantes--;
            document.getElementById('tentativas').innerText = tentativasRestantes;

            if (tentativasRestantes === 0) {
              
                document.getElementById('mensagem').innerText = 'Você atingiu o limite de tentativas!';
               var gameOver = document.getElementById('gameOver');
               var game = document.getElementById('teste');
               game.style.display = 'none';
               gameOver.style.display = 'block';
              
                
            }
        }
    });





let openCards = [];
playSound('hit');
let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < emojis.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = shuffleEmojis[i];
  box.onclick = handleClick;
  document.querySelector(".game").appendChild(box);
}

function handleClick() {
  if (openCards.length < 2) {
    this.classList.add("boxOpen");
    openCards.push(this);
    

  }

  if (openCards.length == 2) {
    setTimeout(checkMatch, 500);
  }

  console.log(openCards);
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
  } else {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
  }

  openCards = [];

  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    playSound('vitoria');
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.mp3`);
  let vitoria = new Audio (`./src/audios/${audioName}.mp3`);
  audio.volume = 0.1;
  audio.play();
  vitoria.play();
}

function reiniciarJogo(){
  location.reload();
}