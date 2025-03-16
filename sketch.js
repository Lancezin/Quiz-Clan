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

// Lista completa das 20 perguntas e respostas remolduladas e enumeradas
const questions = [
{
    question: "1. Você encontra seu inimigo desprevinido, o que você faz?",
    answers: [
      { text: "Analiso minuciosamente ele e vejo quais são seus pontos fracos.", clan: '$' },
      { text: "Grito o nome dele, chamando para uma batalha justa.", clan: '@' },
      { text: "Ignoro-o, pois não tenho nada haver com ele.", clan: 'π' },
      { text: "Fujo sem que ele me veja, pois não sei a força dele.", clan: '£' },
      { text: "Mato ele com um golpe sorrateiro.", clan: '€' },
      { text: "Começo a atacar ele para lutarmos.", clan: '¥' }
    ]
  },
  {
    question: "2. Você se depara com seu inimigo que até então diziam ser sanguinário, levando uma criança machucada, para ser tratada, o que você faz?",
    answers: [
      { text: "Avalio a situação da criança, aproveitando e vendo o nível de força do inimigo.", clan: '$' },
      { text: "Espero pacientemente ele levar a criança até a ajuda e chamo ele para lutar em outro local.", clan: '@' },
      { text: "Permaneço neutro e apenas observo.", clan: 'π' },
      { text: "Evito ficar perto do inimigo para que ele não me de um golpe surpresa.", clan: '£' },
      { text: "Começo a gritar para que o inimigo comece a lutar e não ficar me enrolando.", clan: '€' },
      { text: "Assassino a criança e começo a insultar meu inimigo.", clan: '¥' }
    ]
  },
  {
    question: "3. Você encontra um mendingo dormindo ma sua cidade, o que você faz?",
    answers: [
      { text: "Vejo se ele está bem e se porta alguma doença.", clan: '$' },
      { text: "Ofereço moradia, comida, roupas, etc. Tudo que ele precisar.", clan: '@' },
      { text: "Ignoro o mendingo, pois ele não me interessa.", clan: 'π' },
      { text: "Fico com medo de pegar doença e fujo.", clan: '£' },
      { text: "Chuto incessantemente o mendingo até que ele saia da minha calçada.", clan: '€' },
      { text: "Mato o mendingo, pois ele está estragando o reino.", clan: '¥' }
    ]
  },
  {
    question: "4. Durante uma viagem, você se depara com uma comunidade isolada e necessitada. Como você reage?",
    answers: [
      { text: "Estudo a situação para oferecer ajuda de forma sustentável.", clan: '$' },
      { text: "Forneço apoio imediato, colocando o bem-estar coletivo em primeiro lugar.", clan: '@' },
      { text: "Observo a comunidade sem me envolver emocionalmente.", clan: 'π' },
      { text: "Prefiro não interferir para preservar minha estabilidade.", clan: '£' },
      { text: "Imponho minha vontade de forma enérgica para 'resolver' o problema.", clan: '€' },
      { text: "Aproximo-me apenas se houver benefícios estratégicos para mim.", clan: '¥' }
    ]
  },
  {
    question: "5. Você é convidado para um banquete em um ambiente moderno com toques medievais. Qual sua atitude?",
    answers: [
      { text: "Organizo a noite para aproveitar cada detalhe de forma planejada.", clan: '$' },
      { text: "Desfruto do evento valorizando tradições e hospitalidade.", clan: '@' },
      { text: "Participo sem muita empolgação, mantendo distância emocional.", clan: 'π' },
      { text: "Fico na margem, evitando qualquer situação de risco.", clan: '£' },
      { text: "Envolvo-me intensamente, demonstrando vigor e paixão.", clan: '€' },
      { text: "Participarei se houver oportunidades para ganhos práticos.", clan: '¥' }
    ]
  },
  {
    question: "6. Ao investigar uma lenda urbana, você se depara com um dilema moral inesperado. O que você faz?",
    answers: [
      { text: "Analiso a situação e tomo uma decisão com base na lógica.", clan: '$' },
      { text: "Agirei com compaixão, mesmo que isso envolva riscos pessoais.", clan: '@' },
      { text: "Mantenho-me distante e não me deixo levar por emoções.", clan: 'π' },
      { text: "Evito o dilema para não complicar minha vida.", clan: '£' },
      { text: "Enfrento o dilema com intensidade e soluções radicais.", clan: '€' },
      { text: "Decido com frieza, priorizando resultados práticos.", clan: '¥' }
    ]
  },
  {
    question: "7. Durante uma sessão de brainstorming em uma startup inovadora, uma ideia ousada é proposta. Como você reage?",
    answers: [
      { text: "Estruturo um plano robusto analisando prós e contras.", clan: '$' },
      { text: "Incentivo a criatividade e o trabalho em equipe com entusiasmo.", clan: '@' },
      { text: "Observo calmamente sem me comprometer com a ideia.", clan: 'π' },
      { text: "Prefiro métodos tradicionais e evito riscos.", clan: '£' },
      { text: "Defendo uma execução rápida e enérgica, sem reservas.", clan: '€' },
      { text: "Apoio a ideia somente se houver benefícios claros e imediatos.", clan: '¥' }
    ]
  },
  {
    question: "8. Você descobre que um velho amigo anda envolvido em atividades duvidosas. Qual é sua reação?",
    answers: [
      { text: "Procuro entender a situação antes de tomar uma decisão.", clan: '$' },
      { text: "Ofereço ajuda para que ele retome o caminho certo.", clan: '@' },
      { text: "Mantenho distância e deixo a situação como está.", clan: 'π' },
      { text: "Ignoro o problema, pois não afeta diretamente minha vida.", clan: '£' },
      { text: "Confronto-o com intensidade exigindo mudanças imediatas.", clan: '€' },
      { text: "Utilizo a situação para obter alguma vantagem estratégica.", clan: '¥' }
    ]
  },
  {
    question: "9. Em um festival cultural futurista, você é desafiado a competir em um jogo inovador. O que você faz?",
    answers: [
      { text: "Estudo as regras para maximizar minhas chances de vitória.", clan: '$' },
      { text: "Participo com entusiasmo e espírito esportivo.", clan: '@' },
      { text: "Prefiro assistir, sem entrar na competição.", clan: 'π' },
      { text: "Fico fora, buscando evitar riscos desnecessários.", clan: '£' },
      { text: "Competirei com toda a minha energia para vencer a qualquer custo.", clan: '€' },
      { text: "Envolvo-me se isso trouxer vantagens práticas para mim.", clan: '¥' }
    ]
  },
  {
    question: "10. Você é designado para liderar uma missão de resgate em uma metrópole futurista. Qual é sua abordagem?",
    answers: [
      { text: "Planejo a operação meticulosamente, considerando todos os riscos.", clan: '$' },
      { text: "Lidero com coragem e empatia, colocando vidas em primeiro lugar.", clan: '@' },
      { text: "Mantenho uma postura distante, focando exclusivamente na missão.", clan: 'π' },
      { text: "Prefiro evitar a responsabilidade e não me arriscar.", clan: '£' },
      { text: "Conduzo a missão com agressividade e determinação total.", clan: '€' },
      { text: "Tomo decisões práticas visando eficiência e resultados imediatos.", clan: '¥' }
    ]
  },
  {
    question: "11. Durante uma expedição a uma floresta encantada, um ser místico oferece um presente. Como você reage?",
    answers: [
      { text: "Aceito o presente após analisar suas implicações cuidadosamente.", clan: '$' },
      { text: "Recebo-o com gratidão, valorizando o gesto simbólico.", clan: '@' },
      { text: "Ignoro o presente, sem me deixar envolver por superstições.", clan: 'π' },
      { text: "Recuso-o para evitar distrações em minha jornada.", clan: '£' },
      { text: "Agarro o presente impulsivamente, mesmo sem considerar as consequências.", clan: '€' },
      { text: "Utilizo-o de forma prática se isso me trouxer uma vantagem.", clan: '¥' }
    ]
  },
  {
    question: "12. Você é convidado para um encontro social em um ambiente de realidade virtual imersiva. Qual é sua atitude?",
    answers: [
      { text: "Planejo minha participação para obter os melhores resultados.", clan: '$' },
      { text: "Participo ativamente, valorizando conexões mesmo que virtuais.", clan: '@' },
      { text: "Mantenho-me reservado, observando sem me envolver muito.", clan: 'π' },
      { text: "Evito o encontro para preservar minha estabilidade.", clan: '£' },
      { text: "Mergulho na experiência de forma intensa, desafiando convenções.", clan: '€' },
      { text: "Só participo se houver ganhos práticos para meus objetivos.", clan: '¥' }
    ]
  },
  {
    question: "13. Durante uma crise ambiental, você tem a chance de implementar uma solução inovadora. O que faz?",
    answers: [
      { text: "Avalio os dados e proponho uma estratégia sustentável.", clan: '$' },
      { text: "Mobilizo todos ao redor para uma ação conjunta e altruísta.", clan: '@' },
      { text: "Permano alheio, sem me envolver na crise diretamente.", clan: 'π' },
      { text: "Prefiro não me arriscar e me isolo da situação.", clan: '£' },
      { text: "Defendo medidas radicais, mesmo que controversas.", clan: '€' },
      { text: "Implemento a solução se ela gerar benefícios tangíveis.", clan: '¥' }
    ]
  },
  {
    question: "14. Você descobre um segredo obscuro sobre uma grande organização. Qual é sua reação?",
    answers: [
      { text: "Investigo a fundo antes de tomar qualquer atitude.", clan: '$' },
      { text: "Denuncio o segredo para proteger os inocentes.", clan: '@' },
      { text: "Ignoro a informação, mantendo-me distante.", clan: 'π' },
      { text: "Não me envolvo, pois isso não afeta meus interesses.", clan: '£' },
      { text: "Uso o segredo para impor minha vontade de forma enérgica.", clan: '€' },
      { text: "Avalio como explorá-lo para obter vantagens práticas.", clan: '¥' }
    ]
  },
  {
    question: "15. Em um desafio culinário, você precisa criar um prato que represente sua personalidade. Como você aborda a tarefa?",
    answers: [
      { text: "Planejo cada detalhe e executo com precisão estratégica.", clan: '$' },
      { text: "Cozinho com paixão, valorizando a tradição e os sabores autênticos.", clan: '@' },
      { text: "Sigo a receita de forma básica, sem grandes inovações.", clan: 'π' },
      { text: "Opto por um prato simples e seguro, evitando riscos na cozinha.", clan: '£' },
      { text: "Experimento sabores intensos e ousados, sem medo de inovar.", clan: '€' },
      { text: "Aprovo a receita se ela demonstrar praticidade e eficiência.", clan: '¥' }
    ]
  },
  {
    question: "16. Você se depara com um fenômeno inexplicável durante uma expedição urbana. Qual é sua reação?",
    answers: [
      { text: "Analiso cuidadosamente para entender seu impacto.", clan: '$' },
      { text: "Mergulho na experiência, encantado com o mistério.", clan: '@' },
      { text: "Observo sem me envolver, mantendo a calma habitual.", clan: 'π' },
      { text: "Procuro rapidamente uma rota segura para evitar complicações.", clan: '£' },
      { text: "Encaro o fenômeno com fervor e visão intensa.", clan: '€' },
      { text: "Identifico oportunidades práticas mesmo na anomalia.", clan: '¥' }
    ]
  },
  {
    question: "17. Durante um debate acalorado sobre política e sociedade, você precisa tomar uma posição. Qual postura adota?",
    answers: [
      { text: "Formulo argumentos sólidos baseados em fatos e estratégia.", clan: '$' },
      { text: "Defendo com convicção os valores da justiça e solidariedade.", clan: '@' },
      { text: "Permano neutro, evitando envolvimento em discussões intensas.", clan: 'π' },
      { text: "Evito o debate para não arriscar conflitos desnecessários.", clan: '£' },
      { text: "Ataco as ideias contrárias com paixão e vigor.", clan: '€' },
      { text: "Adoto uma postura pragmática, focando em resultados concretos.", clan: '¥' }
    ]
  },
  {
    question: "18. Você tem a oportunidade de embarcar em uma viagem interplanetária. Qual é sua reação?",
    answers: [
      { text: "Planejo a expedição com detalhes minuciosos e realistas.", clan: '$' },
      { text: "Aceito com entusiasmo, animado com a possibilidade de explorar o desconhecido.", clan: '@' },
      { text: "Fico indiferente, pois o espaço não me desperta grandes emoções.", clan: 'π' },
      { text: "Recuso, preferindo a segurança e a rotina da Terra.", clan: '£' },
      { text: "Empolgo-me com a ideia e me preparo para desafios extremos.", clan: '€' },
      { text: "Aceito se houver ganhos práticos que justifiquem a viagem.", clan: '¥' }
    ]
  },
  {
    question: "19. Durante uma competição de habilidades artísticas, você é desafiado a criar uma obra original. Como você procede?",
    answers: [
      { text: "Estruturo um plano meticuloso para criar algo tecnicamente excelente.", clan: '$' },
      { text: "Inspiro-me na tradição e busco emocionar com minha criação.", clan: '@' },
      { text: "Produzo a obra sem muito empenho emocional, apenas cumprindo o básico.", clan: 'π' },
      { text: "Prefiro uma abordagem segura, sem arriscar em inovações.", clan: '£' },
      { text: "Experimento técnicas ousadas para criar uma peça vibrante e impactante.", clan: '€' },
      { text: "Adoto uma estratégia prática se a obra trouxer reconhecimento imediato.", clan: '¥' }
    ]
  },
  {
    question: "20. Você se vê diante de um dilema ético: escolher entre um benefício pessoal imediato e o bem coletivo. O que faz?",
    answers: [
      { text: "Analiso os impactos e opto pela solução que maximize os benefícios a longo prazo.", clan: '$' },
      { text: "Coloco o bem-estar coletivo acima dos interesses pessoais, sem hesitar.", clan: '@' },
      { text: "Mantenho minha postura indiferente, sem deixar que a emoção interfira.", clan: 'π' },
      { text: "Priorizo minha segurança e ganhos imediatos, evitando riscos coletivos.", clan: '£' },
      { text: "Encaro o dilema com intensidade, impondo minha vontade com convicção.", clan: '€' },
      { text: "Escolho a opção que traga resultados práticos e vantajosos de forma rápida.", clan: '¥' }
    ]
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
    // Adiciona evento de clique em cada resposta
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
