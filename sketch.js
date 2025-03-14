// Obter o container principal
const quizContainer = document.getElementById("quiz-container");

// Estado do quiz
let quizState = {
  currentQuestion: 0,
  scores: {
    '@': 0, // Clã Natsuzumi
    '¥': 0, // Clã Reinhard
    '£': 0, // Clã Gooba
    '€': 0, // Clã Yateratsu
    '$': 0, // Clã Sereni
    'π': 0  // Clã Zenpak
  }
};

// Dados dos clãs com nome e URL do brasão
const clans = {
  '@': { name: "Natsuzumi", badge: "https://cdn.discordapp.com/attachments/1015790172966748203/1349563927729803344/58_Sem_Titulo_20250312230445.png?ex=67d4379a&is=67d2e61a&hm=d30515febf6dc6b8ea0da38324e0e6411fb74a5f17cd64d5fc5c453366cc31aa" },
  '¥': { name: "Reinhard", badge: "https://cdn.discordapp.com/attachments/1015790172966748203/1349576396527374366/61_Sem_Titulo_20250312235433.png?ex=67d44336&is=67d2f1b6&hm=697f3525ec5925a6eaf9ec909a369cedd75e62d277b043642221f4de662bc394" },
  '£': { name: "Gooba", badge: "https://cdn.discordapp.com/attachments/1015790172966748203/1349848086473740368/62_Sem_Titulo_20250313175239.png?ex=67d4977e&is=67d345fe&hm=ba72eca2687db2e12bce46550d98df61a4533075ef917801554b5ca444ea8a6f" },
  '€': { name: "Yateratsu", badge: "https://cdn.discordapp.com/attachments/1015790172966748203/1349856748978307102/63_Sem_Titulo_20250313182548.png?ex=67d49f90&is=67d34e10&hm=5d2e6b86c66e981b1173a65e122a67a9899069f3dc2a9e3f5cebcee00d430a8d" },
  '$': { name: "Sereni", badge: "https://cdn.discordapp.com/attachments/1015790172966748203/1349570968204611604/59_Sem_Titulo_20250312233124.png?ex=67d43e28&is=67d2eca8&hm=0ba37fd64e04fef10eb1064b652d51db93e8ea2b69e18b5031d20ddbc316aaeb" },
  'π': { name: "Zenpak", badge: "https://cdn.discordapp.com/attachments/1015790172966748203/1349874521255186472/64_Sem_Titulo_20250313193853.png?ex=67d4b01d&is=67d35e9d&hm=b476033fd4bcfee92c0d9cbc3c1c53735cdf4c2b8392bc76c6b87a553536f5f5" }
};

// Lista completa das 20 perguntas e respostas (enumeradas e com temas variados)
// As respostas foram embaralhadas para não agrupar os clãs.
const questions = [
  {
    question: "1. Você está no meio de uma batalha épica e, de repente, seu snack favorito some! O que você faz?",
    answers: [
      { text: "Procuro o lanche perdido com bravura, pois a honra nunca abandona um bom petisco.", clan: '@' },
      { text: "Elimino qualquer suspeito com frieza para recuperar meu lanche!", clan: '¥' },
      { text: "Me escondo com medo, afinal, enfrentar a fome é muito arriscado.", clan: '£' },
      { text: "Grito de raiva e juro vingança contra o ladrão do meu lanche.", clan: '€' },
      { text: "Planejo estrategicamente como recuperar o lanche de forma calma.", clan: '$' },
      { text: "Dou de ombros – é só um lanche, não me importo muito.", clan: 'π' }
    ]
  },
  {
    question: "2. Sua pizza favorita foi roubada pelo vilão da cidade. Qual é sua reação?",
    answers: [
      { text: "Luto com honra para recuperar a pizza, pois a glória está em cada fatia.", clan: '@' },
      { text: "Acabo com o ladrão de forma fria e impiedosa, colonizando o bairro.", clan: '¥' },
      { text: "Corro para me esconder, com medo de enfrentar a situação.", clan: '£' },
      { text: "Explodo em fúria e juro vingança – essa pizza não ficará perdida!", clan: '€' },
      { text: "Traço um plano estratégico para recuperar a pizza com calma.", clan: '$' },
      { text: "Ignoro, afinal, pizza é só pizza.", clan: 'π' }
    ]
  },
  {
    question: "3. Durante uma live de jogos, um meme surge: 'Só os fortes sobrevivem!'. Como reage?",
    answers: [
      { text: "Celebro com bravura e incentivo todos com compaixão.", clan: '@' },
      { text: "Respondo com uma estratégia calma, anotando pontos para o futuro.", clan: '$' },
      { text: "Ignoro o meme com total indiferença.", clan: 'π' },
      { text: "Critico friamente o meme e preparo-me para destruir a fraqueza.", clan: '¥' },
      { text: "Fico tão apavorado que tento evitar qualquer confronto.", clan: '£' },
      { text: "Explodo em raiva, vendo o meme como um convite à vingança.", clan: '€' }
    ]
  },
  {
    question: "4. Você é convidado para um festival de memes e cultura pop. Qual sua atitude?",
    answers: [
      { text: "Participo com orgulho, espalhando mensagens de honra e compaixão.", clan: '@' },
      { text: "Critico o evento com frieza, querendo destruir a frivolidade.", clan: '¥' },
      { text: "Evito o evento, com medo de me expor.", clan: '£' },
      { text: "Grito e me envolvo em uma explosão de raiva contra o tédio.", clan: '€' },
      { text: "Analiso os memes e respondo estrategicamente de forma meiga.", clan: '$' },
      { text: "Assisto indiferente, como se fosse apenas mais um meme.", clan: 'π' }
    ]
  },
  {
    question: "5. No meio de um duelo épico, seu adversário solta um comentário sarcástico. Como responde?",
    answers: [
      { text: "Respondo com bravura e compaixão, mantendo minha honra intacta.", clan: '@' },
      { text: "Corto com frieza, eliminando qualquer traço de fraqueza.", clan: '¥' },
      { text: "Fico paralisado pelo medo e evito o confronto.", clan: '£' },
      { text: "Explodo em ira e prometo vingança sem piedade.", clan: '€' },
      { text: "Respondo de forma estratégica, desarmando o adversário com calma.", clan: '$' },
      { text: "Simplesmente ignoro, permanecendo totalmente indiferente.", clan: 'π' }
    ]
  },
  {
    question: "6. Seu meme favorito está sendo censurado. O que você faz?",
    answers: [
      { text: "Defendo o meme com honra e compaixão, lutando pela liberdade.", clan: '@' },
      { text: "Planejo uma retaliação fria e calculada contra os censores.", clan: '¥' },
      { text: "Fico em pânico e me escondo, com medo das consequências.", clan: '£' },
      { text: "Juro vingança contra a censura, explodindo de raiva.", clan: '€' },
      { text: "Organizo uma resposta estratégica e pacífica para contornar a censura.", clan: '$' },
      { text: "Ignoro o acontecimento com total indiferença.", clan: 'π' }
    ]
  },
  {
    question: "7. Em uma reunião de amigos, surge a proposta de fazer a 'dancinha do clã'. Você:",
    answers: [
      { text: "Abraça a ideia com coragem e dança com honra e compaixão.", clan: '@' },
      { text: "Participa calmamente, traçando uma coreografia estratégica.", clan: '$' },
      { text: "Fica tímido e tenta se esconder, com medo do ridículo.", clan: '£' },
      { text: "Solta toda a fúria e dança como se buscasse vingança contra o tédio.", clan: '€' },
      { text: "Responde com um olhar frio e sarcástico, mas sem se envolver.", clan: '¥' },
      { text: "Dança de forma simples, sem grandes pretensões.", clan: 'π' }
    ]
  },
  {
    question: "8. Você encontra um guarda-roupa mágico que transforma seu visual instantaneamente. Qual estilo escolhe?",
    answers: [
      { text: "Opto por um traje que exale honra, bravura e compaixão.", clan: '@' },
      { text: "Escolho um visual intimidador, com frieza e destruição em mente.", clan: '¥' },
      { text: "Prefiro algo discreto para passar despercebido, por insegurança.", clan: '£' },
      { text: "Seleciono um look que transborda fúria e ira.", clan: '€' },
      { text: "Adoto um estilo elegante e estratégico, com calma.", clan: '$' },
      { text: "Escolho algo simples, sem me importar muito com tendências.", clan: 'π' }
    ]
  },
  {
    question: "9. Durante uma partida de videogame, o chefe final aparece. Como reage?",
    answers: [
      { text: "Encaro com bravura e defendo a honra do clã com compaixão.", clan: '@' },
      { text: "Ataco com frieza, determinado a destruir o chefe sem piedade.", clan: '¥' },
      { text: "Me escondo, tremendo de medo de enfrentar o desafio.", clan: '£' },
      { text: "Explodo em fúria e busco vingança a qualquer custo.", clan: '€' },
      { text: "Planejo uma estratégia calma e eficaz para vencer a partida.", clan: '$' },
      { text: "Reajo indiferente, como se fosse apenas mais um inimigo comum.", clan: 'π' }
    ]
  },
  {
    question: "10. Durante uma maratona de séries, você percebe que acabou a pipoca. O que faz?",
    answers: [
      { text: "Enfrento o desafio com honra – a pipoca deve ser resgatada!", clan: '@' },
      { text: "Ataco o problema com frieza, eliminando a causa da escassez.", clan: '¥' },
      { text: "Corro para me esconder, aterrorizado pela falta de petisco.", clan: '£' },
      { text: "Explodo em raiva, juro vingança contra a ausência de pipoca.", clan: '€' },
      { text: "Elaboro um plano estratégico para garantir reposição de pipoca com calma.", clan: '$' },
      { text: "Dou de ombros – pipoca é só um detalhe, sigo indiferente.", clan: 'π' }
  },
  {
    question: "11. Você recebe um enigmático 'O destino chama, mas quem atende?' no WhatsApp. Como responde?",
    answers: [
      { text: "Aceito o chamado com honra e compaixão, pronto para a aventura.", clan: '@' },
      { text: "Respondo com frieza e planejamento, traçando estratégias para dominar o destino.", clan: '¥' },
      { text: "Ignoro a mensagem, demonstrando total indiferença.", clan: 'π' },
      { text: "Fico paralisado, temendo o desconhecido e me retraindo.", clan: '£' },
      { text: "Respondo de forma calma e estratégica, ponderando os riscos.", clan: '$' },
      { text: "Grito de raiva, vendo o chamado como um insulto que exige vingança.", clan: '€' }
    ]
  },
  {
    question: "12. No meio de uma tempestade, você encontra um guarda-chuva mágico. Qual sua atitude?",
    answers: [
      { text: "Uso-o com honra, protegendo a mim e aos outros com compaixão.", clan: '@' },
      { text: "Utilizo-o para impor meu domínio, com frieza e determinação.", clan: '¥' },
      { text: "Fico com tanto medo que nem ouso usá-lo.", clan: '£' },
      { text: "Transformo-o num símbolo de minha fúria contra a tempestade.", clan: '€' },
      { text: "Planejo seu uso de forma estratégica e calma.", clan: '$' },
      { text: "Sigo indiferente à tempestade, sem dar muita importância.", clan: 'π' }
  },
  {
    question: "13. Você é desafiado a cantar um karaokê com uma música épica. Como reage?",
    answers: [
      { text: "Canto com bravura, exaltando a glória com compaixão.", clan: '@' },
      { text: "Recuso friamente, achando que cantar não é para mim.", clan: '¥' },
      { text: "Fico envergonhado e me escondo, tomado pelo medo.", clan: '£' },
      { text: "Canto com fúria, liberando toda minha ira na performance.", clan: '€' },
      { text: "Entro na dança com calma e estratégia, encantando a todos.", clan: '$' },
      { text: "Canto sem emoção, simplesmente por estar presente.", clan: 'π' }
  },
  {
    question: "14. Durante uma partida de futebol entre amigos, seu time está perdendo. O que você faz?",
    answers: [
      { text: "Inspiro meus amigos com coragem e compaixão para virar o jogo.", clan: '@' },
      { text: "Adoto uma postura fria e atacante, visando destruir os adversários.", clan: '¥' },
      { text: "Fico tão nervoso que prefiro me retirar do jogo.", clan: '£' },
      { text: "Corro em fúria, transformando o jogo num campo de vingança.", clan: '€' },
      { text: "Planejo uma jogada estratégica e pacífica para surpreender o adversário.", clan: '$' },
      { text: "Jogo de forma despretensiosa, sem me importar muito com o placar.", clan: 'π' }
  },
  {
    question: "15. Em um dilema absurdo, você deve escolher entre salvar seu celular ou seu videogame. Qual escolhe?",
    answers: [
      { text: "Salvo meu celular com honra para continuar compartilhando momentos épicos.", clan: '@' },
      { text: "Destruo tudo se for preciso, pois odeio a tecnologia que me atrapalha.", clan: '¥' },
      { text: "Fico em pânico e me escondo, temendo tomar a decisão errada.", clan: '£' },
      { text: "Juro vingança contra a tecnologia que me colocou nesse dilema!", clan: '€' },
      { text: "Elaboro um plano estratégico para minimizar perdas e manter o equilíbrio.", clan: '$' },
      { text: "Dou de ombros e não me importo, pois tanto faz para mim.", clan: 'π' }
  },
  {
    question: "16. Você encontra uma placa na rua que diz 'Acorda, jovem padawan!'. Como reage?",
    answers: [
      { text: "Respondo com honra, sentindo que sou destinado a grandes feitos.", clan: '@' },
      { text: "Ignoro com frieza, sem me deixar envolver por clichês.", clan: '¥' },
      { text: "Riso nervosamente e evito responder por timidez.", clan: '£' },
      { text: "Grito em fúria, como se o clichê fosse um insulto pessoal.", clan: '€' },
      { text: "Anoto a mensagem e penso em como usá-la de forma estratégica.", clan: '$' },
      { text: "Dou de ombros, pois não me importo com tais frases feitas.", clan: 'π' }
  },
  {
    question: "17. Em um debate sobre política e memes, você precisa defender um ponto de vista. Qual postura adota?",
    answers: [
      { text: "Defendo com paixão, exaltando a honra e a compaixão em cada argumento.", clan: '@' },
      { text: "Utilizo argumentos frios e cortantes para eliminar a oposição.", clan: '¥' },
      { text: "Fico em silêncio, temendo entrar em discussões intensas.", clan: '£' },
      { text: "Explodo em raiva, jurando vingança contra os que discordam.", clan: '€' },
      { text: "Respondo de forma estratégica, calma e ponderada.", clan: '$' },
      { text: "Mantenho-me indiferente, tratando o debate como um mero meme.", clan: 'π' }
  },
  {
    question: "18. Você tem a chance de viajar para uma festa temática interplanetária. Como decide participar?",
    answers: [
      { text: "Aceito com honra, disposto a mostrar bravura em qualquer universo.", clan: '@' },
      { text: "Participo para conquistar novos territórios com frieza e domínio.", clan: '¥' },
      { text: "Evito a festa por medo do desconhecido e da imensidão do espaço.", clan: '£' },
      { text: "Entro na festa com fúria, pronto para transformar o ambiente em batalha.", clan: '€' },
      { text: "Planejo a viagem com calma, elaborando cada detalhe de forma estratégica.", clan: '$' },
      { text: "Acho tudo meio sem graça e permaneço totalmente indiferente.", clan: 'π' }
  },
  {
    question: "19. Durante uma competição de dança viral, você precisa mostrar seus melhores passos. Como reage?",
    answers: [
      { text: "Dançando com honra e alegria, inspirando todos com bravura.", clan: '@' },
      { text: "Ignoro a dança, mas secretamente planejo uma coreografia devastadora.", clan: '¥' },
      { text: "Fico envergonhado e tento se esconder, com medo de errar os passos.", clan: '£' },
      { text: "Libero toda minha fúria na pista, transformando a dança em um espetáculo de vingança.", clan: '€' },
      { text: "Crio uma coreografia calma e estratégica, executada com meiguice.", clan: '$' },
      { text: "Danço sem emoção, apenas porque estou lá, sem grandes pretensões.", clan: 'π' }
  },
  {
    question: "20. Você se depara com um dilema absurdo: adotar um dragão de estimação ou um unicórnio. O que escolhe?",
    answers: [
      { text: "Adoto o dragão, encarando-o com coragem, honra e compaixão.", clan: '@' },
      { text: "Opto pelo unicórnio, planejando usá-lo de forma estratégica e pacífica.", clan: '$' },
      { text: "Rejeito ambos com frieza, acreditando que só a destruição resolve.", clan: '¥' },
      { text: "Fico apavorado e não tomo decisão, fugindo da responsabilidade.", clan: '£' },
      { text: "Escolho o dragão para canalizar toda minha fúria e raiva.", clan: '€' },
      { text: "Dou de ombros, pois tanto faz – indiferença é meu lema.", clan: 'π' }
  }
];

// Função para exibir a tela de abertura
function showStartScreen() {
  quizContainer.innerHTML = `
    <h1>Iniciação para o clã</h1>
    <p>Estas perguntas são para definir qual clã você se encontra. Suas opiniões devem ser 100% sinceras. Basta responder qual das respostas mais te representam, simples.</p>
    <button id="start-btn">Iniciar</button>
  `;
  document.getElementById("start-btn").addEventListener("click", startQuiz);
}

// Inicia o quiz
function startQuiz() {
  quizState.currentQuestion = 0;
  // Zera os pontos
  for (let key in quizState.scores) {
    quizState.scores[key] = 0;
  }
  showQuestion();
}

// Exibe a pergunta atual e as respostas como botões
function showQuestion() {
  if (quizState.currentQuestion < questions.length) {
    const current = questions[quizState.currentQuestion];
    let answersHTML = "";
    current.answers.forEach(ans => {
      answersHTML += `<button class="answer-btn" data-clan="${ans.clan}">${ans.text}</button>`;
    });
    quizContainer.innerHTML = `
      <h2>Pergunta ${quizState.currentQuestion + 1} de ${questions.length}</h2>
      <p>${current.question}</p>
      <div id="answers">${answersHTML}</div>
    `;
    // Adiciona evento de clique para cada resposta
    document.querySelectorAll(".answer-btn").forEach(btn => {
      btn.addEventListener("click", function() {
        handleAnswer(this.getAttribute("data-clan"));
      });
    });
  } else {
    showResult();
  }
}

// Incrementa a pontuação do clã selecionado e avança para a próxima pergunta
function handleAnswer(clan) {
  quizState.scores[clan]++;
  quizState.currentQuestion++;
  showQuestion();
}

// Determina o clã com maior pontuação e exibe o resultado final
function showResult() {
  let maxPoints = -1;
  let clanWinner = "";
  for (let key in quizState.scores) {
    if (quizState.scores[key] > maxPoints) {
      maxPoints = quizState.scores[key];
      clanWinner = key;
    }
  }
  const winnerData = clans[clanWinner];
  
  quizContainer.innerHTML = `
    <h2>Seu clã é: ${winnerData.name}</h2>
    <img src="${winnerData.badge}" alt="Brasão do clã ${winnerData.name}" width="150">
    <br><br>
    <input type="text" id="warrior-name" placeholder="Qual o nome do guerreiro/a?">
    <br>
    <button id="create-frame">Criar moldura</button>
    <div id="frame-container"></div>
  `;
  
  document.getElementById("create-frame").addEventListener("click", function() {
    createMoldura(winnerData);
  });
}

// Cria a moldura com fundo cinza, exibindo o nome, o brasão e o nome do clã.
function createMoldura(winnerData) {
  const name = document.getElementById("warrior-name").value || "Guerreiro/a";
  const frameContainer = document.getElementById("frame-container");
  frameContainer.innerHTML = `
    <div class="moldura" id="moldura">
      <h3>${name}</h3>
      <img src="${winnerData.badge}" alt="Brasão do clã ${winnerData.name}" width="150" crossOrigin="anonymous">
      <p>${winnerData.name}</p>
    </div>
  `;
}

// Inicia o app exibindo a tela de abertura
showStartScreen();
