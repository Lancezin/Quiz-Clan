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
      { text: "Imponho as leis e regras do meu clã a eles, os tornando parte nossa.", clan: '€' },
      { text: "Colonizo eles para que virem nossos escravos.", clan: '¥' }
    ]
  },
  {
    question: "5. No meio da viagem, seus suprimentos acabam, o que você faz?",
    answers: [
      { text: "Vejo métodos alternativos para suprir a falta.", clan: '$' },
      { text: "Caço os meus recursos para que eu não sofra e pego a mais para os outros membros", clan: '@' },
      { text: "Espero até o fim da viagem sem me importar muito.", clan: 'π' },
      { text: "Choro de desespero e penso que vou morrer.", clan: '£' },
      { text: "Faço um desafio da caça para todos do grupo.", clan: '€' },
      { text: "Roubo suprimentos de todos do meu grupo.", clan: '¥' }
    ]
  },
  {
    question: "6. Depois de anos, você encontra quem mais confiou no time inimigo. O que você faz?",
    answers: [
      { text: "Analiso a situação e tomo e não me deixo levar por emoções.", clan: '$' },
      { text: "Agirei com compaixão, mesmo que isso envolva riscos pessoais.", clan: '@' },
      { text: "Mantenho-me distante e não me deixo levar por emoções.", clan: 'π' },
      { text: "Evito ele, para não complicar eu.", clan: '£' },
      { text: "Discuto com ele sobre a traição dele.", clan: '€' },
      { text: "Assassinou ele. Traidores merecem a morte.", clan: '¥' }
    ]
  },
{
    question: "7. Durante uma missão, você acha uma escritura de terras ricas. O que você faz?",
    answers: [
      { text: "Analiso de quem seria e vejo qual a melhor opção.", clan: '$' },
      { text: "Vou devolver a escritura o mais rápido possível ao dono.", clan: '@' },
      { text: "Ignoro o papel e continuo meu rumo.", clan: 'π' },
      { text: "Deixo ali, vai que é uma armadilha.", clan: '£' },
      { text: "Rasgo ela para que ninguém roube.", clan: '€' },
      { text: "Roubo a escritura para mim.", clan: '¥' }
    ]
  },
{
    question: "8. Um idoso pergunta a você quem é Tyler. O que você diz?",
    answers: [
      { text: "Não sei quem é, mas posso te ajudar a procurar.", clan: '$' },
      { text: "Não sei quem seria, mas posso pesquisar sobre.", clan: '@' },
      { text: "Não sei quem é e não me importo.", clan: 'π' },
      { text: "Você vai me sequestrar, ahhhhh!!.", clan: '£' },
      { text: "Quando eu encontralo, iremos lutar.", clan: '€' },
      { text: "Sei la porra.", clan: '¥' }
    ]
  },
  {
    question: "9. Em um festival cultural, uma pessoa aparece morta. O que você faz?",
    answers: [
      { text: "Estudo a situação e tento analisar os culpados.", clan: '$' },
      { text: "Fico o dia todo atrás do culpado.", clan: '@' },
      { text: "Fico vendo peocurarem o culpado sem me envolver.", clan: 'π' },
      { text: "Fico perto de autoridades, para não ser o próximo alvo.", clan: '£' },
      { text: "Ajudo a procurar o culpado para mata-lo a qualquer custo.", clan: '€' },
      { text: "Finjo naturalidade, pois eu sou o assassino.", clan: '¥' }
    ]
  },
  {
    question: "10. Você é designado para liderar uma missão de resgate em uma metrópole. Qual é sua abordagem?",
    answers: [
      { text: "Planejo a operação meticulosamente, considerando todos os riscos.", clan: '$' },
      { text: "Lidero com coragem e empatia, colocando vidas em primeiro lugar.", clan: '@' },
      { text: "Mantenho uma postura distante, focando exclusivamente na missão.", clan: 'π' },
      { text: "Prefiro evitar a responsabilidade e não me arriscar.", clan: '£' },
      { text: "Conduzo a missão com agressividade e determinação total.", clan: '€' },
      { text: "Tomo decisões práticas visando eficiência e ignorando civis.", clan: '¥' }
    ]
  },
  {
    question: "11. Uma garota/o diz que gosta de você. Como você reage?",
    answers: [
      { text: "Vejo se a pessoa é alguém de princípios que eu goste.", clan: '$' },
      { text: "Elogio a coragem dela e falo para marcarmos um encontro.", clan: '@' },
      { text: "Ignoro completamente a pessoa.", clan: 'π' },
      { text: "Recuso-o para evitar coração partido.", clan: '£' },
      { text: "Pergunto se ela quer lutar comigo em forma de união.", clan: '€' },
      { text: "Faço dessa pessoa meu lacaio mais leal.", clan: '¥' }
    ]
  },
  {
    question: "12. O time inimigo descobre que você é o espião infiltrado e te prendem em uma cela, o que você faz?",
    answers: [
      { text: "Planejo minha fuga visando todos os erros que posos cometes.", clan: '$' },
      { text: "Tiro minha própria vida evitando que qualquer informação dos meus sejam reveladas.", clan: '@' },
      { text: "Mantenho-me quieto do início ao fim.", clan: 'π' },
      { text: "Clamo para me soltarem emtrando em desespero.", clan: '£' },
      { text: "Ordeno que deem minha liberdade se eu ganhar uma luta.", clan: '€' },
      { text: "Revelo todas as informações dos meus em troca da minha sobrevivência.", clan: '¥' }
    ]
  },
  {
    question: "13. Seu melhor amigo disse que está se aliando ao inimigo, o que você faz?",
    answers: [
      { text: "Avalio a situação e tento achar o meio menos caótica de resolver.", clan: '$' },
      { text: "Perco a amizade na hora, viato que ele desonrou a todos.", clan: '@' },
      { text: "Permano indiferente. a vida é dele, não minha.", clan: 'π' },
      { text: "Choro pedindo pra ele não me matar.", clan: '£' },
      { text: "Falo que se ele continuar com isso, terei de lutar contra ele.", clan: '€' },
      { text: "Finalizo com a vida dele antes dele contra atacar.", clan: '¥' }
    ]
  },
  {
    question: "14. Você descobre um segredo obscuro sobre uma grande organização. Qual é sua reação?",
    answers: [
      { text: "Investigo a fundo antes de tomar qualquer atitude.", clan: '$' },
      { text: "Denuncio o segredo para proteger os inocentes.", clan: '@' },
      { text: "Ignoro a informação, mantendo-me distante.", clan: 'π' },
      { text: "Não me envolvo, pois isso pode ser perigoso.", clan: '£' },
      { text: "Uso o segredo para impor minha vontade de forma enérgica.", clan: '€' },
      { text: "Faço desse segredo, uma ponte para eu me fortalecer socialmente.", clan: '¥' }
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
      { text: "Faço uma comida envenenada para que todos presentes menos eu adoeçam.", clan: '¥' }
    ]
  },
  {
    question: "16. Você se depara com uma besta mítica. Qual é sua reação?",
    answers: [
      { text: "Analiso cuidadosamente para entender sua origem.", clan: '$' },
      { text: "Adoto ela e chamo ela de Chomusque.", clan: '@' },
      { text: "Observo sem me envolver, mantendo a calma habitual.", clan: 'π' },
      { text: "Procuro rapidamente uma saída segura para não morrer.", clan: '£' },
      { text: "Encaro a besta com fervor e visão intensa.", clan: '€' },
      { text: "Faço dela meu pet usado para matar.", clan: '¥' }
    ]
  },
  {
    question: "17. Você vê varias crianças sendo atacadas, o que você faz?",
    answers: [
      { text: "Analiso o ambiente e vejo um método de salvar sem aumentar os danos.", clan: '$' },
      { text: "Defendo elas e digo algo para se acalmarem (ex: vou te proteger com vagalumes).", clan: '@' },
      { text: "Permaneço neutro sobre isso, esperando alguém agir.", clan: 'π' },
      { text: "Saio correndo de medo de ser atacado também.", clan: '£' },
      { text: "Ataco os inimigos com fúria.", clan: '€' },
      { text: "Ataco as crianças, os inimigos, se deixar até os aliados.", clan: '¥' }
    ]
  },
  {
    question: "18. Se você pudesse ser deus por 1 dia, o que você faria?",
    answers: [
      { text: "Analisaria todas as possibilidades de coisas para fazer e agiria cautelosamente.", clan: '$' },
      { text: "Faria um mundo sem guerras, fome, reinado apenas pela paz e honra.", clan: '@' },
      { text: "Deixaria o mundo sem fome por 1 dia.", clan: 'π' },
      { text: "Faria tudo ter protetor de quina para ninguém se machucar.", clan: '£' },
      { text: "Faria o universo ser um ringue de luta com batalhas todos os dias.", clan: '€' },
      { text: "Banharia o mundo em caos e desordem usando bonecos mortos controlados pela minha fumaça.", clan: '¥' }
    ]
  },
  {
    question: "19. Você está no abismo do universo por 1 hora, o que você faz?",
    answers: [
      { text: "Reflito sobre toda existência nessa 1 hora.", clan: '$' },
      { text: "Fico admirando o universo e agradecendo por existir.", clan: '@' },
      { text: "Espero 1h parado.", clan: 'π' },
      { text: "Fico com medo se eu morrer no vazio.", clan: '£' },
      { text: "Tento incessantemente chamar alguma divindade para lutar ou me dar uma benção.", clan: '€' },
      { text: "Treino durante esse tempo todo minha fumaça e minha manipulação de fantoches.", clan: '¥' }
    ]
  },
  {
    question: "20. Uma entidade está em sua frente, o que você faz",
    answers: [
      { text: "Peço sabedoria e percepção aguçada.", clan: '$' },
      { text: "Peço honra e proteção além de elogiar a beleza dela.", clan: '@' },
      { text: "Peço algo que faça com que eu não me envolva em nada.", clan: 'π' },
      { text: "Peço uma benção que faça eu nunca mais precisar lutar.", clan: '£' },
      { text: "Peço que ela lute comigo.", clan: '€' },
      { text: "Peço fama riqueza, habilidade de cuspir ácido em portas e corte que corta o mundo.", clan: '¥' }
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
