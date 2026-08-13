// Calculadora Tzolkin pura — convenção Dreamspell (José Argüelles).
// Regra: o ano galáctico começa em 26/julho e o dia 29/fev é "fora do tempo" (ignorado).
// Âncora fixa validada: 26/07/2024 = Kin 19 (Tormenta Rítmica Azul).

export type SealColor = "vermelho" | "branco" | "azul" | "amarelo";

export interface Seal {
  index: number; // 1..20
  name: string; // pt-BR
  maya: string; // nome maia
  color: SealColor;
  action: string;
  essence: string;
  power: string;
}

export interface Tone {
  index: number; // 1..13
  name: string; // pt-BR (Magnético, Lunar, ...)
  maya: string; // Hun, Ca, ...
  action: string;
  essence: string;
  power: string;
}

export interface KinInfo {
  kin: number; // 1..260
  seal: Seal;
  tone: Tone;
  fullName: string; // ex.: "Dragão Magnético Vermelho"
  affirmation: string; // frase pessoal do kin (fonte: sincronariodapaz.org)
  mantra: readonly [string, string, string, string, string]; // 5 linhas do mantra galáctico
  trecena: { seal: Seal; kinStart: number }; // trecena atual (13 kins)
  castle: { name: string; color: SealColor; index: number }; // 1..5
}

export const SEALS: Seal[] = [
  { index: 1, maya: "Imix", name: "Dragão", color: "vermelho", action: "Nutrir", essence: "Ser", power: "Nascimento" },
  { index: 2, maya: "Ik", name: "Vento", color: "branco", action: "Comunicar", essence: "Espírito", power: "Alento" },
  { index: 3, maya: "Akbal", name: "Noite", color: "azul", action: "Sonhar", essence: "Intuição", power: "Abundância" },
  { index: 4, maya: "Kan", name: "Semente", color: "amarelo", action: "Ter como Alvo", essence: "Consciência", power: "Florescimento" },
  { index: 5, maya: "Chicchan", name: "Serpente", color: "vermelho", action: "Sobreviver", essence: "Instinto", power: "Força Vital" },
  { index: 6, maya: "Cimi", name: "Enlaçador de Mundos", color: "branco", action: "Igualar", essence: "Morte", power: "Oportunidade" },
  { index: 7, maya: "Manik", name: "Mão", color: "azul", action: "Saber", essence: "Cura", power: "Realização" },
  { index: 8, maya: "Lamat", name: "Estrela", color: "amarelo", action: "Embelezar", essence: "Elegância", power: "Arte" },
  { index: 9, maya: "Muluc", name: "Lua", color: "vermelho", action: "Purificar", essence: "Fluxo", power: "Água Universal" },
  { index: 10, maya: "Oc", name: "Cachorro", color: "branco", action: "Amar", essence: "Lealdade", power: "Coração" },
  { index: 11, maya: "Chuen", name: "Macaco", color: "azul", action: "Jogar", essence: "Ilusão", power: "Magia" },
  { index: 12, maya: "Eb", name: "Humano", color: "amarelo", action: "Influenciar", essence: "Sabedoria", power: "Livre Arbítrio" },
  { index: 13, maya: "Ben", name: "Caminhante do Céu", color: "vermelho", action: "Explorar", essence: "Vigilância", power: "Espaço" },
  { index: 14, maya: "Ix", name: "Mago", color: "branco", action: "Encantar", essence: "Receptividade", power: "Intemporalidade" },
  { index: 15, maya: "Men", name: "Águia", color: "azul", action: "Criar", essence: "Mente", power: "Visão" },
  { index: 16, maya: "Cib", name: "Guerreiro", color: "amarelo", action: "Questionar", essence: "Destemor", power: "Inteligência" },
  { index: 17, maya: "Caban", name: "Terra", color: "vermelho", action: "Evoluir", essence: "Sincronia", power: "Navegação" },
  { index: 18, maya: "Etznab", name: "Espelho", color: "branco", action: "Refletir", essence: "Ordem", power: "Interminabilidade" },
  { index: 19, maya: "Cauac", name: "Tormenta", color: "azul", action: "Catalisar", essence: "Auto-geração", power: "Energia" },
  { index: 20, maya: "Ahau", name: "Sol", color: "amarelo", action: "Iluminar", essence: "Vida", power: "Fogo Universal" },
];

/** Descrições aprofundadas dos 20 Selos Solares (convenção Dreamspell). */
export const SEAL_DETAILS: Record<number, {
  meaning: string;
  description: string;
  keywords: string[];
  dailyPractice: string;
  question: string;
}> = {
  1: {
    meaning: "A força primordial do início",
    description:
      "O Dragão é o primeiro selo solar — a pulsação que abre a roda do Tzolkin. Ele carrega a energia do nascimento, da nutrição e do potencial ainda adormecido. É o útero cósmico onde tudo se gesta antes de emergir, lembrando que todo início merece cuidado, calor e paciência.",
    keywords: ["início", "nutrição", "nascimento", "potencial", "cuidado"],
    dailyPractice: "Pergunte-se: o que está querendo nascer em mim hoje? Alimente essa semente com atenção e pequenas ações.",
    question: "O que preciso nutrir para que possa nascer?",
  },
  2: {
    meaning: "O mensageiro do espírito",
    description:
      "O Vento é o sopro que leva palavras, ideias, orações e espíritos pelo mundo. Ele governa a comunicação, a mente e a conexão com o invisível. Tudo que o Vento toca é polinizado — por isso suas palavras e pensamentos de hoje são sementes de realidade.",
    keywords: ["comunicação", "palavra", "espírito", "mente", "mensagem"],
    dailyPractice: "Observe suas palavras hoje. Cada uma é um vento que leva uma semente. Respire antes de falar.",
    question: "O que o vento da minha boca está semeando?",
  },
  3: {
    meaning: "A escuridão que conhece",
    description:
      "A Noite é o abismo estrelado, o tempo dos sonhos e da intuição. Ela guarda a abundância que não é vista à luz do dia — riquezas interiores, memórias, medos e dons. Sob a Noite, aprendemos a confiar no que sentimos mais do que no que vemos.",
    keywords: ["sonho", "intuição", "abundância", "mistério", "interior"],
    dailyPractice: "Antes de dormir, coloque uma intenção para seus sonhos. Ao acordar, registre o que trouxeram.",
    question: "O que meus sonhos estão tentando me mostrar?",
  },
  4: {
    meaning: "A semente que se conhece",
    description:
      "A Semente é a centelha de consciência que sabe para onde crescer. Ela tem alvo, direção e a paciência silenciosa para florescer. Semente ensina que a consciência precede a forma: primeiro vem a intenção, depois a manifestação.",
    keywords: ["foco", "consciência", "crescimento", "direção", "florescimento"],
    dailyPractice: "Defina uma meta clara para hoje. Plante uma ação concreta em direção a ela.",
    question: "Qual semente estou plantando com minha atenção?",
  },
  5: {
    meaning: "A força vital da vida",
    description:
      "A Serpente governa o instinto, a sobrevivência e a kundalini — a energia que desperta e sobe pela coluna. É a força vital que cura através do movimento, da sensação e da transformação. A Serpente renasce a cada ciclo, trocando de pele para crescer.",
    keywords: ["instinto", "vitalidade", "cura", "kundalini", "transformação"],
    dailyPractice: "Sinta a energia do seu corpo. Mova-se, dance, respire profundamente. Deixe a vida circular.",
    question: "Onde minha força vital está pedindo movimento?",
  },
  6: {
    meaning: "O portal entre mundos",
    description:
      "O Enlaçador de Mundos é o guia dos limiares — entre a vida e a morte, o antigo e o novo, o conhecido e o desconhecido. Ele transforma o fim em começo e mostra que toda morte é também oportunidade. É o grande compostador cósmico.",
    keywords: ["transição", "morte", "oportunidade", "limiar", "renovação"],
    dailyPractice: "Libere algo que já cumpriu seu ciclo. Abra espaço físico e emocional para o novo.",
    question: "O que estou pronto para deixar ir hoje?",
  },
  7: {
    meaning: "A mão que cura e realiza",
    description:
      "A Mão é o instrumento do saber, da cura e da manifestação. Ela não conhece pela teoria, mas pelo toque, pela prática e pela devoção. A Mão nos lembra que somos feitos para criar e servir com precisão e amor.",
    keywords: ["cura", "saber", "realização", "tocar", "devoção"],
    dailyPractice: "Use suas mãos para criar ou curar hoje: escreva, cozinhe, arrume, toque alguém com cuidado.",
    question: "Como minhas mãos podem servir à cura hoje?",
  },
  8: {
    meaning: "A elegância do cosmos",
    description:
      "A Estrela é a luz que embeleza e mostra o caminho. Ela governa a arte, a elegância e a capacidade de brilhar sem ofuscar. Estrela ensina que a beleza é uma frequência de atenção — e que tudo pode ser elevado pelo cuidado estético.",
    keywords: ["beleza", "arte", "elegância", "brilho", "harmonia"],
    dailyPractice: "Adicione beleza a algo ordinário hoje. Vista-se com cuidado, arrume um espaço, crie algo belo.",
    question: "Onde posso colocar mais beleza no mundo hoje?",
  },
  9: {
    meaning: "A água universal",
    description:
      "A Lua é a água cósmica que purifica, memoriza e emociona. Ela governa o fluxo das emoções, as memórias ancestrais e a purificação através da água. Lua lembra que tudo flui — e que chorar, rir ou deixar ir são formas de limpeza.",
    keywords: ["fluxo", "emoção", "purificação", "memória", "água"],
    dailyPractice: "Beba água com consciência. Deixe uma emoção fluir sem julgamento.",
    question: "O que precisa ser purificado em mim hoje?",
  },
  10: {
    meaning: "O coração leal",
    description:
      "O Cão é o amor incondicional, a lealdade e o coração aberto. Ele ensina a amar sem medo, a confiar na vida e a acompanhar com fidelidade. O Cão não ama por conveniência — ama por essência.",
    keywords: ["amor", "lealdade", "coração", "confiança", "companheirismo"],
    dailyPractice: "Demonstre amor hoje — a uma pessoa, a um animal ou a você mesmo. Deixe o coração pulsar abertamente.",
    question: "Como posso amar mais abertamente hoje?",
  },
  11: {
    meaning: "O mágico do jogo",
    description:
      "O Macaco é o travesso, o artista, o ilusionista. Ele desafia a seriedade excessiva e revela que a vida é um jogo cósmico — e que o melhor instrumento de transformação é o riso. Sob Macaco, aprendemos a criar sem apertar.",
    keywords: ["jogo", "magia", "ilusão", "criatividade", "leveza"],
    dailyPractice: "Brinque com algo sério hoje. Faça uma atividade sem objetivo, apenas pela alegria.",
    question: "Onde estou me levando demais a sério?",
  },
  12: {
    meaning: "O viajante livre",
    description:
      "O Humano é o caminho da sabedoria, da livre escolha e da influência responsável. Ele lembra que somos viajantes em aprendizado e que cada escolha desenha o trajeto. A liberdade do Humano está em assumir seu papel de co-criador.",
    keywords: ["sabedoria", "livre-arbítrio", "influência", "caminho", "aprendizado"],
    dailyPractice: "Escolha conscientemente hoje. Cada escolha é um passo no caminho — escolha com intenção.",
    question: "Qual escolha me aproxima do meu caminho verdadeiro?",
  },
  13: {
    meaning: "O explorador do espaço",
    description:
      "O Caminhante do Céu é o mensageiro cósmico, o explorador de mundos e estados. Ele governa a expansão, a vigilância e a liberdade de ir além. Este selo nos convida a olhar para o céu e a lembrar que nossa origem é estelar.",
    keywords: ["exploração", "espaço", "vigilância", "expansão", "liberdade"],
    dailyPractice: "Explore algo novo hoje — um lugar, uma ideia, uma perspectiva. Deixe a curiosidade guiar.",
    question: "Para onde minha alma quer expandir hoje?",
  },
  14: {
    meaning: "O encantador do tempo",
    description:
      "O Mago é a receptividade mágica, a capacidade de encantar a realidade. Ele vive fora do tempo linear e acessa dimensões ocultas. O Mago lembra que a realidade responde à nossa intenção e que tudo é matéria-prima de encantamento.",
    keywords: ["encantamento", "receptividade", "magia", "intemporalidade", "intenção"],
    dailyPractice: "Crie um ritual simples hoje. Encante o ordinário com intenção: acenda uma vela, respire, silencie.",
    question: "Qual realidade estou pronto para encantar?",
  },
  15: {
    meaning: "A visão que cria",
    description:
      "A Águia voa alto e vê o padrão completo. Ela governa a mente, a visão e a criatividade que nasce de uma perspectiva ampliada. Águia ensina que a mente é uma ferramenta de criação quando consegue sair dos detalhes.",
    keywords: ["visão", "criação", "mente", "perspectiva", "foco"],
    dailyPractice: "Eleve sua perspectiva hoje. Olhe um problema de cima e procure o padrão maior.",
    question: "O que a visão ampla está mostrando?",
  },
  16: {
    meaning: "A inteligência destemida",
    description:
      "O Guerreiro é a coragem de questionar, de buscar a verdade e de defender o que é essencial. Ele usa a inteligência como ferramenta de discernimento e não teme desafiar crenças confortáveis. O Guerreiro luta pela sabedoria, não pelo ego.",
    keywords: ["coragem", "questionar", "verdade", "destemor", "discernimento"],
    dailyPractice: "Questione uma crença automática hoje. Busque a verdade por trás de uma opinião pronta.",
    question: "O que preciso questionar com coragem?",
  },
  17: {
    meaning: "A navegadora da evolução",
    description:
      "A Terra é a inteligência planetária, a sincronia com o cosmos. Ela governa a evolução, a navegação e a conexão com o pulso da vida. Terra nos lembra que somos células de um corpo maior e que nossa evolução é coletiva.",
    keywords: ["evolução", "sincronia", "navegação", "planeta", "conexão"],
    dailyPractice: "Sincronize-se com a natureza hoje. Olhe o céu, caminhe descalço, sinta o chão.",
    question: "Como estou navegando minha evolução?",
  },
  18: {
    meaning: "A reflexão infinita",
    description:
      "O Espelho é a verdade refletida, a ordem cósmica e o infinito. Ele mostra o que outros não conseguem ver e desafia a ilusão. Sob o Espelho, a realidade vira espelho — e tudo que nos irrita ou encanta é reflexo de algo interno.",
    keywords: ["reflexão", "verdade", "ordem", "infinito", "clareza"],
    dailyPractice: "Olhe-se no espelho com honestidade hoje. Reconheça uma verdade que já conhece.",
    question: "O que a realidade está espelhando de volta para mim?",
  },
  19: {
    meaning: "A tempestade que renova",
    description:
      "A Tormenta é a energia de transformação, o catalisador que desorganiza para reorganizar. Ela trava o céu e a terra para gerar nova vida — a chuva que limpa, o trovão que desperta. Tormenta é intensidade com propósito.",
    keywords: ["catalisar", "transformação", "energia", "renovação", "intensidade"],
    dailyPractice: "Permita que uma energia intensa se mova por você. Não a suprima — dê-lhe voz e direção.",
    question: "O que a tormenta em mim está querendo limpar?",
  },
  20: {
    meaning: "A luz universal",
    description:
      "O Sol é a iluminação, o fogo universal e a vida em plenitude. Ele encerra a roda com a entrega total da luz. Sol lembra que o propósito final é irradiar — ser luz, dar calor, sem condições.",
    keywords: ["iluminação", "vida", "plenitude", "fogo", "universalidade"],
    dailyPractice: "Compartilhe sua luz. Faça algo que ilumine o dia de outra pessoa ou o seu próprio.",
    question: "Como posso iluminar o mundo hoje?",
  },
};

export const TONES: Tone[] = [
  { index: 1, maya: "Hun", name: "Magnético", action: "Atrair", essence: "Propósito", power: "Unificar" },
  { index: 2, maya: "Ca", name: "Lunar", action: "Polarizar", essence: "Desafio", power: "Estabilizar" },
  { index: 3, maya: "Ox", name: "Elétrico", action: "Ativar", essence: "Serviço", power: "Vincular" },
  { index: 4, maya: "Can", name: "Autoexistente", action: "Definir", essence: "Forma", power: "Medir" },
  { index: 5, maya: "Ho", name: "Harmônico", action: "Comandar", essence: "Radiância", power: "Enaltecer" },
  { index: 6, maya: "Uac", name: "Rítmico", action: "Organizar", essence: "Equanimidade", power: "Equilibrar" },
  { index: 7, maya: "Uuc", name: "Ressonante", action: "Inspirar", essence: "Sintonização", power: "Canalizar" },
  { index: 8, maya: "Uaxac", name: "Galáctico", action: "Harmonizar", essence: "Integridade", power: "Modelar" },
  { index: 9, maya: "Bolon", name: "Solar", action: "Pulsar", essence: "Intenção", power: "Realizar" },
  { index: 10, maya: "Lahun", name: "Planetário", action: "Aperfeiçoar", essence: "Manifestação", power: "Produzir" },
  { index: 11, maya: "Hunlahun", name: "Espectral", action: "Dissolver", essence: "Libertação", power: "Liberar" },
  { index: 12, maya: "Calahun", name: "Cristal", action: "Dedicar", essence: "Cooperação", power: "Universalizar" },
  { index: 13, maya: "Oxlahun", name: "Cósmico", action: "Perdurar", essence: "Presença", power: "Transcender" },
];

/** Detalhes narrativos dos 13 Tons (fonte: EssênciaAlma — "Modelando o Fluxo"). */
export const TONE_DETAILS: Record<number, { vibration: string; summary: string; guidance: string }> = {
  1: {
    vibration: "Vibração da Unidade e da Atração",
    summary: "Unifica o propósito, atrai e inicia a execução de alguma meta.",
    guidance:
      "Atraia tudo de que necessita para unificar-se com o seu propósito. Ao identificá-lo e unir-se totalmente a ele, forças naturais te apoiam. Seja receptivo e receba bem pessoas e coisas que alimentem seu propósito.",
  },
  2: {
    vibration: "Vibração da Polaridade e da Estabilidade",
    summary: "Identifica o desafio, estabiliza, polariza, distingue.",
    guidance:
      "O desafio não é problema — é o que fortalece e expande seu potencial e sua espiritualidade. Vencer obstáculos faz crescer. Aprenda com a polaridade e agradeça a consciência que ela traz à sua vida.",
  },
  3: {
    vibration: "Vibração do Ritmo, Ativação e Ligação",
    summary: "Ativa e identifica o serviço, une as ações, cumpre a meta.",
    guidance:
      "Serviço é a expressão da gratidão por viver. Ajudar da forma que só você pode. Amor, louvor e gratidão são as formas mais elevadas de serviço — despertam a energia criativa. Ative o ritmo natural do seu servir.",
  },
  4: {
    vibration: "Vibração da Definição, da Medida e da Ordem",
    summary: "Define a forma de atuação, toma as medidas, decide.",
    guidance:
      "A forma ideal emerge quando entregamos propósito e desejos ao Plano Maior. Use a definição para ver e relacionar-se com a vida autenticamente. A medida dá discernimento para manifestar o alinhamento correto.",
  },
  5: {
    vibration: "Vibração do Centro — recebe Poder e toma o Comando",
    summary: "Potencializa a radiação, comanda e lidera. Ordena sem impor.",
    guidance:
      "Radiar é irradiar a essência a partir do centro para que seja percebida de longe. Dê poder à sua radiação sendo fiel ao seu centro — cria um efeito de onda que influencia o mundo.",
  },
  6: {
    vibration: "Vibração do Equilíbrio orgânico",
    summary: "Organiza a igualdade, equilibra, modera as dificuldades, administra o desafio.",
    guidance:
      "Igualdade significa consciência e compromisso para criar equilíbrio. O orgânico está em constante transformação — é preciso equilibrar sempre. Nutra a mente com energias que a levem à cooperação com o espírito.",
  },
  7: {
    vibration: "Vibração da Inspiração, Canalização e Poder Místico",
    summary: "Canaliza a harmonização. Motiva, busca eficiência, inspira, cria, sintoniza serviço e ação.",
    guidance:
      "Harmonizar é alinhar-se com as vibrações desejadas. Quanto mais sintonizado com sua natureza superior, mais fácil canalizar informações, energias e formas. Observe com o que ressoa — deixe o resto de lado.",
  },
  8: {
    vibration: "Vibração da Harmonização e do Modelo",
    summary: "Harmoniza a integridade, modela a forma. A ação toma forma.",
    guidance:
      "Integridade nasce do autoconhecimento e da reverência pela vida. Faça o melhor e aceite as imperfeições humanas. Comprometa-se a viver sua verdade — e será um modelo para os outros.",
  },
  9: {
    vibration: "Vibração da Realização e Mobilização",
    summary: "Formaliza a intenção. A finalidade da ação é posta em movimento.",
    guidance:
      "A intenção é o combustível que cria toda manifestação. Tenha clareza de onde vem e para onde vai. Determine ações específicas para realizar as intenções do seu Eu Místico.",
  },
  10: {
    vibration: "Vibração da Produção e Aperfeiçoamento",
    summary: "Aperfeiçoa a manifestação do desafio. Enfrenta os caminhos e vence os obstáculos.",
    guidance:
      "Seja um manifestador consciente. Manifeste o que plenifica, alimenta a alma e traz sucesso, satisfação e auto-amor. Abra-se para receber o apoio do Universo.",
  },
  11: {
    vibration: "Vibração do Abrir Mão, Deixar Ir e Dissolver",
    summary: "Dissolve. Ocasiona a liberação do serviço, da ação. Não requer ação.",
    guidance:
      "Liberte-se de fronteiras, crenças, estruturas e limitações. Traga liberdade às áreas que precisam. Dissolva formas-pensamento de derrota e hábitos que tiram seu poder — brilhe sua luz.",
  },
  12: {
    vibration: "Vibração da Estabilidade Complexa e Dedicação",
    summary: "Dedica à cooperação da forma. Sintetiza, universaliza. Evolui e prepara a ação futura.",
    guidance:
      "A cooperação emerge quando você abre o coração para o resultado Maior que beneficia a todos. Rigidez e controle impedem cooperação. Seja aberto e fluido — integre experiências com fluidez.",
  },
  13: {
    vibration: "Vibração da Perseverança, Transcendência e Vôo Mágico",
    summary: "Perdura a existência. Transcende. Presença. Estabelece um novo ciclo.",
    guidance:
      "Presença é o fio que conecta tudo — a Força Vital Universal. Esteja presente em todos os momentos. Rejubile-se na possibilidade de transcender limitações e perseverar através das ondas da vida.",
  },
};

const CASTLES: { name: string; color: SealColor }[] = [
  { name: "Castelo Vermelho do Girar", color: "vermelho" },
  { name: "Castelo Branco do Cruzar", color: "branco" },
  { name: "Castelo Azul do Queimar", color: "azul" },
  { name: "Castelo Amarelo do Dar", color: "amarelo" },
  { name: "Castelo Verde do Encantar", color: "vermelho" }, // corte central
];

/** As 5 Famílias Planetárias (também chamadas de Famílias Terrestres). */
export interface EarthFamily {
  index: number; // 1..5
  name: string;
  function: string;
  bodyRegion: string;
  seals: number[]; // índices dos 4 selos
  description: string;
}

export const EARTH_FAMILIES: EarthFamily[] = [
  {
    index: 1,
    name: "Família Polar",
    function: "Abre",
    bodyRegion: "Coroa da cabeça",
    seals: [1, 6, 11, 16],
    description:
      "A Família Polar abre o campo do tempo. Reúne o Dragão, o Enlaçador de Mundos, o Macaco e o Guerreiro — as forças que iniciam ciclos e sustentam os polos.",
  },
  {
    index: 2,
    name: "Família Cardinal",
    function: "Estabelece",
    bodyRegion: "Ombros e pescoço",
    seals: [2, 7, 12, 17],
    description:
      "A Família Cardinal estabelece direções. Vento, Mão, Humano e Terra firmam o rumo e fazem a mensagem circular pelo corpo do mundo.",
  },
  {
    index: 3,
    name: "Família Central (Core)",
    function: "Nutre",
    bodyRegion: "Coração e plexo",
    seals: [3, 8, 13, 18],
    description:
      "A Família Central nutre a chama do coração. Noite, Estrela, Caminhante do Céu e Espelho alimentam a beleza e a verdade interior.",
  },
  {
    index: 4,
    name: "Família Sinal",
    function: "Formula",
    bodyRegion: "Órgãos internos",
    seals: [4, 9, 14, 19],
    description:
      "A Família Sinal formula a manifestação. Semente, Lua, Mago e Tormenta traduzem intenção em forma pelas águas do corpo.",
  },
  {
    index: 5,
    name: "Família Portal",
    function: "Transporta",
    bodyRegion: "Mãos e pés",
    seals: [5, 10, 15, 20],
    description:
      "A Família Portal transporta consciência. Serpente, Cão, Águia e Sol abrem passagens: onde suas mãos tocam e seus pés pisam, dimensões se encontram.",
  },
];

/** Retorna a Família Planetária (Terrestre) de um selo (1..20). */
export function getEarthFamily(sealIndex: number): EarthFamily {
  const i = ((sealIndex - 1) % 5 + 5) % 5;
  return EARTH_FAMILIES[i];
}

/** Detalhes dos 5 Castelos do Destino (52 Kins cada). */
export const CASTLE_DETAILS: Record<number, {
  name: string;
  direction: string;
  color: string;
  totem: string;
  action: string;
  power: string;
  kinRange: [number, number];
  description: string;
}> = {
  1: {
    name: "Castelo Vermelho do Leste",
    direction: "Leste",
    color: "Vermelho",
    totem: "Tartaruga",
    action: "Girar",
    power: "Iniciar",
    kinRange: [1, 52],
    description:
      "A Corte do Nascimento. É onde a vida põe as sementes em movimento e o ser começa a girar sua própria roda. Aqui aprendemos a iniciar com nutrição.",
  },
  2: {
    name: "Castelo Branco do Norte",
    direction: "Norte",
    color: "Branco",
    totem: "Escorpião",
    action: "Cruzar",
    power: "Refinar",
    kinRange: [53, 104],
    description:
      "A Corte da Morte e da travessia. Cruzamos o portal do que já não serve para refinar a essência. É o Castelo do desapego e da coragem branca.",
  },
  3: {
    name: "Castelo Azul do Oeste",
    direction: "Oeste",
    color: "Azul",
    totem: "Coiote",
    action: "Queimar",
    power: "Transformar",
    kinRange: [105, 156],
    description:
      "A Corte da Magia e da alquimia. O fogo azul transforma o que foi refinado em nova forma. Aqui a magia se manifesta pela mudança consciente.",
  },
  4: {
    name: "Castelo Amarelo do Sul",
    direction: "Sul",
    color: "Amarelo",
    totem: "Humano",
    action: "Dar",
    power: "Amadurecer",
    kinRange: [157, 208],
    description:
      "A Corte da Inteligência e do fruto. O ser amadurece o próprio dom e o oferece ao mundo. Dar é a forma mais alta de sabedoria colhida.",
  },
  5: {
    name: "Castelo Verde Central",
    direction: "Centro",
    color: "Verde",
    totem: "Sol",
    action: "Encantar",
    power: "Sintetizar",
    kinRange: [209, 260],
    description:
      "A Corte da Sincronização — o coração da matriz. Aqui os quatro raios se encontram e a existência inteira se torna arte sincronizada com o Universo.",
  },
};

/** Retorna o Castelo do Destino (1..5) a partir de um Kin (1..260). */
export function getCastleOfKin(kin: number) {
  const idx = Math.floor(((((kin - 1) % 260) + 260) % 260) / 52) + 1;
  return { index: idx, ...CASTLE_DETAILS[idx] };
}

function isLeap(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

// Epoch de referência do Sincronário da Paz / Dreamspell:
// 26 de julho de 2024 = Kin 19 (Tormenta Rítmica Azul).
const EPOCH_UTC = Date.UTC(2024, 6, 26);
const EPOCH_KIN = 19;

/** Conta quantos 29/fev existem estritamente entre duas datas UTC (a, b], ambas dias inteiros. */
function feb29sBetween(aUtc: number, bUtc: number): number {
  if (aUtc === bUtc) return 0;
  const [lo, hi, sign] = aUtc < bUtc ? [aUtc, bUtc, 1] : [bUtc, aUtc, -1];
  const yLo = new Date(lo).getUTCFullYear();
  const yHi = new Date(hi).getUTCFullYear();
  let count = 0;
  for (let y = yLo; y <= yHi; y++) {
    if (!isLeap(y)) continue;
    const feb29 = Date.UTC(y, 1, 29);
    if (feb29 > lo && feb29 <= hi) count++;
  }
  return sign * count;
}

/** Kin Dreamspell/Sincronário — âncora 26/07/2024 = Kin 19, pulando 29/fev. */
export function kinFromDate(date: Date = new Date()): number {
  const target = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const rawDays = Math.round((target - EPOCH_UTC) / 86400000);
  const dreamspellDays = rawDays - feb29sBetween(EPOCH_UTC, target);
  const kin = ((EPOCH_KIN - 1 + dreamspellDays) % 260 + 260) % 260 + 1;
  return kin;
}

/**
 * Inversa de kinFromDate: dado um Kin (1–260) e uma data de referência, retorna
 * o Date gregoriano (UTC) da ocorrência mais próxima da referência.
 * Em anos bissextos, o 29/fev é pulado (Dreamspell não conta esse dia);
 * se o resultado cair em 29/fev, retorna 28/fev (mesmo Kin, último dia nomeado).
 */
export function dateFromKin(kin: number, near: Date = new Date()): Date {
  // Offset Dreamspell do kin em relação ao EPOCH_KIN (0..259)
  const kinOffset = ((kin - EPOCH_KIN + 260) % 260);

  // Dia Dreamspell da data de referência
  const nearUtc = Date.UTC(near.getUTCFullYear(), near.getUTCMonth(), near.getUTCDate());
  const nearRaw = Math.round((nearUtc - EPOCH_UTC) / 86400000);
  const nearDs  = nearRaw - feb29sBetween(EPOCH_UTC, nearUtc);

  // Ciclo de 260 mais próximo da referência
  const n = Math.round((nearDs - kinOffset) / 260);
  const targetDs = kinOffset + 260 * n;

  // Inverter dreamspellDays → rawDays (itera para incluir 29/fev pulados)
  let rawDays = targetDs;
  for (let i = 0; i < 5; i++) {
    const utc = EPOCH_UTC + rawDays * 86400000;
    const skipped = feb29sBetween(EPOCH_UTC, utc);
    const next = targetDs + skipped;
    if (next === rawDays) break;
    rawDays = next;
  }

  // Se cair em 29/fev, retrocede para 28/fev (mesmo Kin)
  const result = new Date(EPOCH_UTC + rawDays * 86400000);
  if (result.getUTCMonth() === 1 && result.getUTCDate() === 29) {
    return new Date(EPOCH_UTC + (rawDays - 1) * 86400000);
  }
  return result;
}

/** Decompõe um Kin em Selo (1..20) e Tom (1..13). Ambos ciclam independentemente. */
export function decomposeKin(kin: number): { toneIndex: number; sealIndex: number } {
  const k = ((kin - 1) % 260 + 260) % 260;
  return {
    toneIndex: (k % 13) + 1,
    sealIndex: (k % 20) + 1,
  };
}

/** Gera a afirmação galáctica dinâmica no estilo Dreamspell. */
/** Frases específicas por kin — fonte: sincronariodapaz.org */
export const KIN_FRASE: readonly string[] = [
  "Sou um imã. Atraio conhecimento e consigo apoio divino.", // 1
  "Transmuto meus desafios e estabilizo minha comunicação.", // 2
  "Hoje danço na abundância e me direciono à humanidade.", // 3
  "Definindo-me sem tensões, a semeadura mágica florescerá.", // 4
  "Comando com paixão minha evolução terrena; amo a vida.", // 5
  "Quando tua intenção é clara, tu te equilibras e organizas com mais acerto.", // 6
  "Presta atenção em tuas mãos, o portal da cura, e cria a magia de tuas mudanças.", // 7
  "Posso tecer a arte dos meus pensamentos para explorar livremente.", // 8
  "Sou um farol no rio do esquecimento e comando minha emoção.", // 9
  "O guardião do meu coração me pede para brincar com ordem e perfeição.", // 10
  "Inocente e espontâneo, dissolvo minhas estruturas e consigo liberar-me.", // 11
  "Despojo-me de minhas inquitações e coopero como um corpo de luz, com sabedoria e amor.", // 12
  "Exploro meus espaços, viajo através da minha mente e sou mensageiro da arte de amar.", // 13
  "Começa no aqui e agora, a magia do conhecimento e da cura.", // 14
  "Crendo em si próprio, você estabiliza a mente, vence os desafios e comunica-se espiritualmente.", // 15
  "A abundância da inteligência comanda a nossa verdade com fé, esperança e caridade.", // 16
  "Vigilante do planeta, define a semeadura perfeita: que queres nesta existência?", // 17
  "Sem pensamentos negativos, comando a abundância de meus conhecimentos para nutrir com generosidade.", // 18
  "No ritmo deste dia, equilibro a energia se ilumino minhas palavras, com amor e sem ordens.", // 19
  "Ó coroa de iluminação, que atravessas minhas portas com pureza, sabedoria e com a essência do amor.", // 20
  "Nutro-me quando ordeno meus pensamentos e divirto-me com minha força vital.", // 21
  "Comunico-me, disciplino-me e realizo minhas melhores intenções.", // 22
  "Viajo ao meu interior, ordeno-me, alcanço a abundância e semeio.", // 23
  "Dissolvo amarras, evoluo e posso florescer.", // 24
  "Hoje mudo minha pele passado, torno-me livre e posso cooperar.", // 25
  "Na quietude de minha mente, encontro a oportunidade de cruzar o portal do perdão.", // 26
  "Inicio minha cura, realizando meus propósitos de auto-aceitação.", // 27
  "Harmonizo-me; sou energia; venço os desafios e alcanço a compreensão.", // 28
  "Aceito purificar minhas emoções e meu serviço é abundância.", // 29
  "Como guardião da lealdade, defino minha maneira de amar.", // 30
  "Abandono as crenças que não me servem e divirto-me comandando.", // 31
  "Receptivo, sem ansiedade, recebes os dons do equilíbrio e do livre-arbítrio.", // 32
  "Exploro o espaço, presto atenção e abro minhas portas para a canalização.", // 33
  "Sem apegos no aqui e agora sou um Mago da Luz.", // 34
  "Posso criar, ver e realizar o meu despertar.", // 35
  "Ó viajante, ó questionador, a perfeição está em ti; semeia com amor.", // 36
  "Busca a alegria e a energia da Terra te dará a libertação.", // 37
  "Coopero como fim de refletir minha abundância espiritual.", // 38
  "Permitindo o surgimento de novas aberturas, poderás explorar teu mundo interior.", // 39
  "Inicia tua ascensão com o conhecimento e a iluminação.", // 40
  "Divirto-me na fonte do conhecimento e encontro o êxtase da liberdade.", // 41
  "Comunico a abundante transformação da minha liberação.", // 42
  "O real ou o imaginário, sonhos ou ideias hoje se definem de forma natural.", // 43
  "Sem tensões, livre e com sabedoria, comando a sementeira de minha realização.", // 44
  "Equilibro e harmonizo o que penso de meu corpo e de minha sexualidade.", // 45
  "Quietude e entrega, nada sob controle e as portas se abrem para a visão.", // 46
  "Artesão da vida, a magia para tuas mudanças está dentro de ti.", // 47
  "A elegância de meus pensamentos embelezam a vida.", // 48
  "Purifico minhas emoções, trabalhando em grupo com disciplina e amor.", // 49
  "O dom de mais este dia é a mágica abundância de minha liberação.", // 50
  "Minha comunicação precisa estar plena de paciência e humor.", // 51
  "Hoje examina como influencias para cooperar com tuas crenças.", // 52
  "Inicia-te na arte de explorar, pois espera-te uma viagem misteriosa no tempo e no espaço.", // 53
  "Que o raio de poder canalizar me comunique com a magia da mudança.", // 54
  "Agora é o tempo de despertar e de ver com a visão da águia.", // 55
  "No caminho do coração, a Inteligência Divina define nossa auto-existência.", // 56
  "Comando meu egoísmo e realizo um céu na Terra.", // 57
  "A ordem, o conhecimento e harmonia equilibram a abundância da vida.", // 58
  "Purificado, ilumino, semeio minha energia e comunico a verdade.", // 59
  "Harmonia da luz e do serviço, amemos ser filhos do Sol.", // 60
  "Aplico o conhecimento para comandar a ordem e a mestria.", // 61
  "Aperfeiçôo minha comunicação para estabilizar meu coração.", // 62
  "Saio das estruturas e entro na abundância da liberação.", // 63
  "Comunico a cooperação para semear a Terra com liberdade.", // 64
  "Animo-me e atuo, pois o conhecimento, a visão e a magia de ser estão em mim.", // 65
  "Inicia-se minha organização; deixo de querer controlar todas as coisas que me rodeiam.", // 66
  "O desafio de minha cura é minha dedicação para transformar-me.", // 67
  "Revisa como vês a ti mesmo, com tuas crenças, ideais e sonhos.", // 68
  "Presta atenção ao que te atrai e ao que rejeitas, e estabiliza tua força e teu talento.", // 69
  "A verdadeira amizade comanda a lealdade do coração, no centro de meu ser.", // 70
  "Afasto as preocupações, atuo com espontaneidade e equilibro minha criatividade.", // 71
  "Avalia tudo o que podes ser e abre-te para esta oportunidade.", // 72
  "Cria um equilíbrio entre o céu e a Terra em teu dia a dia.", // 73
  "Através do coração, portas mágicas se abrem para minha realização.", // 74
  "Entrego o que me limita ao céu e deixo minha abundância na Terra.", // 75
  "Aonde tudo é possível, liberte-se das ataduras e dos velhos padrões.", // 76
  "Examino meus conflitos para encaminhar minhas emoções na Terra.", // 77
  "Se me é oferecido um caminho de saída dentro de uma ordem harmoniosa, vivo com autenticidade.", // 78
  "Inicia-se minha expansão; atravesso as muralhas para minha autogeração.", // 79
  "Sou humanitário e estabilizo a energia, iluminando a vida.", // 80
  "Solta-te, liberta-te e o conhecimento te nutrirá.", // 81
  "Aperfeiçôo minha forma de expressar-me e defino minha comunicação.", // 82
  "Vigio meus pensamentos e realizo a magia de meus sonhos.", // 83
  "Semeando sem tensões, o egoísmo que me desequilibra, desaparecerá.", // 84
  "Saio dos enroscos sobre o que dirão, e não me deixo pisotear.", // 85
  "Hoje é minha oportunidade de enlaçar com harmonia meu serviço e minha autoridade.", // 86
  "A cura para minha realização é viver no tempo presente.", // 87
  "Pensar com arte e elegância aperfeiçoa o poder de minha inteligência.", // 88
  "Devo purificar e liberar o que está estruturado em mim.", // 89
  "Dedico-me de coração, quando exercito a cooperação.", // 90
  "O amor é o círculo infinito de brincar com a magia da vida.", // 91
  "Inicia-se meu propósito de comunicar-me e cooperar com livre-arbítrio.", // 92
  "O desafio de nossos caminhos é fazer respeitar nossos espaços.", // 93
  "Abro minhas portas internas e externas e magicamente presto serviço à humanidade.", // 94
  "Defino minha existência, semeando de forma simples e criativa.", // 95
  "Ordenar e questionar sem impor é o poder de minha realização.", // 96
  "Comunico-me sem apegos e descubro a harmonia de evoluir na Terra.", // 97
  "Meu corpo é o reflexo de minha mente e o conhecimento é a abundância para minha cura.", // 98
  "No caminho, os relâmpagos permitem minha transformação.", // 99
  "Iluminas a matéria quando aplicas tuas melhores intenções.", // 100
  "Trabalharemos em grupo para adquirirmos conhecimentos e definir nossas emoções.", // 101
  "Expresso minhas ideias e atravesso as muralhas de minhas resistências.", // 102
  "Ofereço-me para cooperar com amor a fim de compartilhar a abundância de meu coração.", // 103
  "Como semente do universo, no aqui e agora, semeio com os braços abertos.", // 104
  "Começo a vibrar com a inteligência de meu corpo par mudar minha casca do passado.", // 105
  "Sem reprovações, meus obstáculos deixam de ser um desafio.", // 106
  "Quando a ignorância termina, alcanço e descubro a magia de minha cura.", // 107
  "Hoje, educo com arte meus pensamentos para definir o florescimento de minha existência.", // 108
  "Comando meu mundo emocional e sou capaz de pedir o que quero com o poder do amor.", // 109
  "Decido equilibrar meus afetos e confio no processo da vida.", // 110
  "Declaro a paz e a harmonia em meu interior e de meu corpo sai o de que não mais necessito.", // 111
  "Perdôo toda experiência anterior. Sou livre e alcanço o poder da sabedoria que vive em mim.", // 112
  "A base de todo pensamento é explorar-nos por dentro e encontrar a abundância, sem ego.", // 113
  "A magia de encantar está em edificar seu templo com a semeadura espiritual.", // 114
  "Dissolvo meus bloqueios, desprendo-me do passado e estou livre para avançar.", // 115
  "Escolho pensamentos harmoniosos e coopero comunicando o melhor de mim.", // 116
  "Visualizo minha vida guiada pelo conhecimento e transcendo, criando um céu na Terra.", // 117
  "Começo a refletir a ordem. Hoje é um novo dia de harmonia, conhecimento e abundância espiritual.", // 118
  "Com bom humor, estabilizo os desafios de minha comunicação com os que me rodeiam.", // 119
  "Estou pleno de alegria e entusiasmo pela vida; deixo fluir e me libero no serviço.", // 120
  "Tomo minhas decisões, baseando-me nos princípios da verdade; rompo estruturas e vivo ordenadamente.", // 121
  "Através de mim se expressam ideias calcadas no poder do coração.", // 122
  "Aceito organizar-me e meus sonhos se tornam realidade. Estou em paz.", // 123
  "O prazer da força criadora é viver o aqui e agora.", // 124
  "Equilibro-me ao viver o presente e bendigo minha força vital.", // 125
  "Desligar-se da atadura dos desejos é a oportunidade da tua realização.", // 126
  "Renuncio à necessidade de ter razão e trabalho em grupo com amor.", // 127
  "Hoje tenho a faculdade de sentir que a vida está a serviço de minha libertação.", // 128
  "Sinto que me fortaleço quando me nutro de conhecimento.", // 129
  "A gratidão é a memória do coração, com a magia da iluminação.", // 130
  "Começo a brincar com a minha teimosia e a processar a magia da mudança.", // 131
  "Hoje tenho um sorriso e minhas mãos para compartilhar os desafios.", // 132
  "O caminho para chegar ao conhecimento da verdade é atravessar o horizonte do temor, servindo.", // 133
  "Hoje, aproveito a ocasião para fazer que outros conheçam a verdade, em uma forma sábia e discreta, como um mago.", // 134
  "Faço tudo o que posso para limpar a mente de intenções enganosas e, assim, poder comandar.", // 135
  "Na medida em que renuncio ao passado, equilibro-me com ritmo e deixo fluir vitalidade.", // 136
  "Para evoluir e sincronizar-me, devo pensar, sentir e decidir por mim.", // 137
  "Se hoje nos concentrarmos em olhar mais o dia do que a noite, poderemos refletir Deus.", // 138
  "Arrisco-me sem medo, atravesso as muralhas e poderei escolher minha própria realização.", // 139
  "Aperfeiçôo minha iluminação, harmonizando meus pensamentos com amor, para poder definir-me.", // 140
  "Ponho em ordem minha liberação, através do conhecimento e da magia de brincar com a vida, sem ofender-me.", // 141
  "Ainda que seja um desafio, mudo minha forma de pensar e, no aqui e agora, me dedico e coopero.", // 142
  "Hoje estou vivendo com a imagem da abundância e as portas da realização estão sendo abertas.", // 143
  "Começo a prestar atenção e, sem tensões, abro meus braços e entrego o melhor de mim.", // 144
  "Examino os sentidos de meu corpo para estabilizar meus desafios.", // 145
  "Sinto necessidade de perdoar para alcançar a libertação.", // 146
  "Sou como a água: com fluidez atravesso o portão que se abre para mim.", // 147
  "Brilharei sem questionar e sem acreditar que sou uma autoridade.", // 148
  "Hoje busco meu equilibrio, organizo-me e purifico meu estado emocional.", // 149
  "Companheirismo e lealdade curarão meus afetos e poderei canalizar.", // 150
  "Rompo as estruturas mentais e poderei embelezar meus pensamentos.", // 151
  "Hoje controlo o que comunico e me realizo abrindo uma nova porta de sabedoria.", // 152
  "Não me envolvo; deixo de querer controlar e posso culti em mim um novo nascimento.", // 153
  "No aqui e agora consigo a libertação, se eu atuar sem teimosia.", // 154
  "Vejo-me no cristal de minha janela e aprendo a enxergar mais além.", // 155
  "Concentro e questiono meus pensamentos para avançar com intrepidez.", // 156
  "Começo a receber os dons da Terra e a permitir minha evolução.", // 157
  "Observo-me no espelho da vida, embora seja um desafio sair da obscuridade.", // 158
  "Tomo consciência de tudo que há de tempestuoso em mim e procuro comunicar-me espiritualmente.", // 159
  "Ilumina como um sol, para semear e colher em tua própria auto-existência.", // 160
  "O fato de eu sentir-me eterno, me induz a iluminar-me com o conhecimento.", // 161
  "Respondo com equilibrio na maneira de dizer minha verdade.", // 162
  "A abundância de meu mundo interior abre o cofre oculto de minha visão.", // 163
  "Interiorizo-me na energia da semente e floreço na arte de viver.", // 164
  "Sem preconceitos, sem rotina, danço criando a magia de minhas mudanças.", // 165
  "Mudo velhos esquemas e aperfeiçôo o desapego.", // 166
  "Abro-me para receber a liberação e curo qualquer bloqueio com amor.", // 167
  "Sou a arte da criação. Participo, brinco, simplifico, ordeno e ilumino cordialmente.", // 168
  "Dons me são oferecidos; eu sou a ferramenta de minha própria purificação.", // 169
  "Sinto o chamado do coração e examino o propósito e os ensinamentos que ele está trazendo.", // 170
  "Rompo as estruturas, imagens e crenças que já não me servem.", // 171
  "Não me envolvo, deixo de controlar, consigo abundância e aprendo a viver em liberdade.", // 172
  "Exploro e semeio trabalhando em grupo, e defino meus conhecimentos.", // 173
  "Dedico-me e coopero comigo mesmo. Sou receptivo e posso mudar.", // 174
  "Equilibro-me com paciência e organizo tudo o que a minha mente descobre.", // 175
  "Comunico-me com minha voz interior e peço-lhe que guie meus passos com base na perfeição que trago em mim.", // 176
  "Projeto raízes aonde me encontro agora e faço somente o que me dá alegria a fim de poder evoluir.", // 177
  "Esta é a oportunidade para ver a verdade. Olho-me no espelho e contemplo partes não muito claras em mim.", // 178
  "Poderosa energia ajuda-me a limpar os recantos de velhos esquemas.", // 179
  "Elevas a humanidade com o simples fato de representares a libertação da luz.", // 180
  "Vou em busca da fonte abundante da vida e nutro-me para dedicar-me e cooperar.", // 181
  "Cheguei ao limite do que é conhecido em mim. Agora devo abrir meu espírito para receber ensinamento e inspiração.", // 182
  "Em minha quietude interior começa a abundância e dons potentes vão se formando.", // 183
  "Planto agora a semente de alguma intenção, projeto ou sonho.", // 184
  "Libero o que penso do meu corpo e de minha sexualidade.", // 185
  "Sinto necessidade de perdoar para definir-me e alcançar minha libertação com amor.", // 186
  "À medida que comando meu crescimento, ponho de lado meu esquema familiar, criando novas possibilidades.", // 187
  "Sigo o caminho que meu coração indica e abandono as situações que limitam minha harmonia.", // 188
  "Olho ao redor de mim e presto atenção no que me atrai e no que rejeito fortemente.", // 189
  "Este selo energético anuncia uma abertura em minha vida, novos começos, percepções, aliados e amigos.", // 190
  "A realização não tem que ser difícil, pode ser algo muito delicioso.", // 191
  "Preparo-me para receber, para dar e para ser aperfeiçoado pelo poder da verdade.", // 192
  "Equilibro-me, desapego-me e a abundância cresce em mim liberando um caminho para o céu.", // 193
  "Meu desafio de hoje é pegar a varinha mágica da sabedoria, dedicar-me e cooperar com boa vontade.", // 194
  "Tenho a energia e o poder de atravessar a terra para recordar e despertar tudo o que sou.", // 195
  "Começa minha devoção ao divino, unindo meus questionamentos entre o coração e a mente.", // 196
  "Uso meu tempo para escutar a informação que recebo através da energia da Terra.", // 197
  "Ofereço serviço que reflete meu equilíbrio e comunico como o céu e a Terra são minha liberação.", // 198
  "Sou o poder de limpeza e cura para a estabilidade do planeta.", // 199
  "Amo incondicionalmente e dirijo minha vida com a tocha do amor.", // 200
  "Sinta-se sempre nos braços do divino, sejam quais forem as circunstâncias ou situações.", // 201
  "Dentro do que parece complexo, solto-me, respiro, simplifico e canalizo.", // 202
  "Libero-me para que possa obser plenamente minha situação atual, a partir de um ângulo subjetivo.", // 203
  "A energia da semente me pede receptividade, pois germina melhor em um campo de entrega.", // 204
  "Se estou aborrecido com minha vida, examino minhas rotinas e defino meus comportamentos.", // 205
  "A transformação que este selo me oferece, está na entrega, na liberação e no perdão.", // 206
  "Minhas mãos se associam com a abertura, a fim de receber ferramentas espirituais.", // 207
  "Lanço-me a uma maneira diferente de ver as coisas, de escutá-las e de ser.", // 208
  "Inicia-se minha purificação para recordar quem sou, porque estou aqui e qual é a minha tarefa.", // 209
  "Salto e solto o apego à ideia de separatividade, para vencer meus desafios.", // 210
  "Sorrio, não estou tão sério; creio na magia do momento e me libero.", // 211
  "Determino o que quero, sinto-me livre, aplico minha sabedoria e conquisto afeições.", // 212
  "Adquiro coragem, atravesso as barreiras que me limitam e dirijo minha vida.", // 213
  "Despojo-me de minhas capas pesadas do passado e consigo equilíbrio para minha cura.", // 214
  "Meu compromisso de servidor planetário inspira minha mente, amplia minha visão e faz-me dançar com alegria.", // 215
  "A graça de ser uno com a inteligência não requer esforço e sim amor.", // 216
  "Realizo o retrato de minha vida, dou-lhe novas pinceladas e o retoque permite minha evolução.", // 217
  "Atraio os elementos dentro do espaço-tempo para refletir a ordem da criação.", // 218
  "Estou no meio de uma revolução pessoal; despojo – me de velhos esquemas e experiências passadas.", // 219
  "Como guardião da luz, trago para minha vida o poder curador do amor incondicional.", // 220
  "A partir do conhecimento transfiro-me da aparente separação para a reunião.", // 221
  "Inicia-se minha comunicação para cumprir minha tarefa como mensageiro da orientação divina.", // 222
  "Aprendo e presto atenção aos sonhos a fim de estabilizar minhas intuições.", // 223
  "A Terra será minha libertação, se eu semear meu serviço com harmonia e atenção.", // 224
  "Escuto o que diz meu corpo e semeio somente o que o meu coração deseja.", // 225
  "Disponho-me a soltar as ataduras dos preconceitos e a comandar minha realização.", // 226
  "Examino o que existe em minha vida que necessita completar-se e equilibro minha cura.", // 227
  "Deixo ir as situações que limitam minha serenidade e sou o amor, sou luminoso, sou a harmonia.", // 228
  "Tenho ciência de que recebo e transmito a comunicação cósmica.", // 229
  "Sou leal porque, ao morrer simbolicamente, entrego minhas crenças limitadoras e posso realizar-me.", // 230
  "Recordo-me que há perfeição em tudo e que é perfeito tudo o que me acontece.", // 231
  "Diminuo meu ritmo, não fico ansioso e alcanço, com sabedoria, a libertação.", // 232
  "Velhos pontos de referência estão mudando; acolho novas aberturas e oportunidades.", // 233
  "Assumo meu próprio poder. Ninguém fora de mim pode dar-me verdadeiro poder.", // 234
  "Sinto a energia de poder crer e criar, em mim mesmo, meus sonhos e visões.", // 235
  "Pergunto-me o que eu verdadeiramente quero neste momento e crio harmonia em meus pensamentos.", // 236
  "Devo abrir as portas da sabedoria interior para liberar meus questionamentos na Terra.", // 237
  "Deixo-me guiar pela magia de ver-me refletido e contemplo partes que estão na sombra, impedindo-me de ver a luz.", // 238
  "Comando minha energia e entro no jogo que muda cada nível de meu ser.", // 239
  "Sinto como o fogo universal me abraça e fico em paz e harmonizado.", // 240
  "Devo ficar atento quanto a maneira de relacionar-me e ver o mundo a fim de nascer novamente.", // 241
  "Permito que os outros dêem a opinião deles e consigo a integridade do diálogo equilibrado.", // 242
  "A transformação de minha realização está baseada numa ordem de abundância permanente.", // 243
  "Não espere condições perfeitas para plantar a semente. Agora é o momento correto.", // 244
  "Escuto o que meu corpo me diz e libero-me da atadura de velhos padrões.", // 245
  "Coloco ordem nas coisas e nunca abandono minha tarefa, pois sempre há alguém em algum lugar que pode ajudar-me.", // 246
  "Estou na encruzilhada do caminho e a mão me oferece um portão para minha cura; magicamente atravesso-o.", // 247
  "Inicia a prática constante da harmonia diária para sincronizar-me com meus talentos.", // 248
  "A partir de minha liberdade interior, me inicio com a lua deixando mensagens de purificação.", // 249
  "Sinto-me liberado ao ver minha vida em determinadas posições e sinto a magia de meu próprio valor.", // 250
  "Entre o céu e a Terra está a magia da vida; por isso abro minhas portas para semear com amor.", // 251
  "Assumo o meu próprio poder e nada fora de mim pode interferir em minha realização.", // 252
  "Examino-me e parto em busca do equilíbrio para cruzar o horizonte com harmonia.", // 253
  "Hoje abro meu coração e vivo no aqui e agora para canalizar minha cura.", // 254
  "Harmonizo meus pensamentos para criar com a visão.", // 255
  "Tua ferramenta para te realizares emocionalmente, é a inteligência.", // 256
  "Aplicar o conhecimento adquirido significa minha evolução na Terra.", // 257
  "Hoje, direciono-me, reorganizo-me e alcanço minha libertação.", // 258
  "Atravesso a tormenta e sinto o êxtase da libertação.", // 259
  "Cruzo o horizonte de minhas limitações e sigo em busca da iluminação." // 260
];


/** Mantra galáctica por kin (5 linhas) — fonte: sincronariodapaz.org */
export const KIN_MANTRA: readonly [string, string, string, string, string][] = [
  ["Unifico com o fim de nutrir", "Atraindo o ser", "Selo a entrada do nascimento", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 1
  ["Polarizo com o fim de comunicar", "Estabilizando o alento", "Selo a entrada do espírito", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder da intemporalidade"], // 2
  ["Ativo com o fim de sonhar", "Vinculando a intuição", "Selo a entrada da abundância", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder da realização"], // 3
  ["Defino com o fim de focalizar", "Medindo a percepção", "Selo a entrada do florescimento", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder do fogo universal"], // 4
  ["Potencializo com o fim de sobreviver", "Comandando o instinto", "Selo o armazém da força vital", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder do espaço"], // 5
  ["Organizo com o fim de igualar", "Equilibrando a oportunidade", "Selo o armazém da morte", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 6
  ["Canalizo com o fim de conhecer", "Inspirando a cura", "Selo o armazém da realização", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder da autogeração"], // 7
  ["Harmonizo com o fim de embelezar", "Modelando a arte", "Selo o armazém da elegância", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder do livre-arbítrio"], // 8
  ["Pulso com o fim de purificar", "Realizando o fluxo", "Selo o processo da água universal", "Com o tom Solar da intenção", "Eu sou guiado pelo poder da força vital"], // 9
  ["Aperfeiçoo com o fim de amar", "Produzindo a lealdade", "Selo o processo do coração", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder do infinito Sou um kin polar Estendo o espectro galáctico branco"], // 10
  ["Dissolvo com o fim de brincar", "Libertando a ilusão", "Selo o processo da magia", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado"], // 11
  ["Dedico-me com o fim de influenciar", "Universalizando a sabedoria", "Selo o processo do livre-arbítrio", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder do florescimento"], // 12
  ["Persevero com o fim de explorar", "Transcendendo a vigilância", "Selo a saída do espaço", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder da navegação"], // 13
  ["Unifico com o fim de encantar", "Atraindo a receptividade", "Selo a saída da intemporalidade", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 14
  ["Polarizo com o fim de criar", "Estabilizando a mente", "Selo a saída da visão", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder da realização"], // 15
  ["Ativo com o fim de questionar", "Vinculando a intrepidez", "Selo a saída da inteligência", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder do fogo universal"], // 16
  ["Defino com o fim de evoluir", "Medindo a sincronicidade", "Selo a matriz da navegação", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder do espaço"], // 17
  ["Potencializo com o fim de refletir", "Comandando a ordem", "Selo a matriz do infinito", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder da morte"], // 18
  ["Organizo com o fim de catalisar", "Equilibrando a energia", "Selo a matriz da autogeração", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 19
  ["Canalizo com o fim de iluminar", "Inspirando a vida", "Selo a matriz do fogo universal", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder do livre-arbítrio"], // 20
  ["Harmonizo com o fim de nutrir", "Modelando o ser", "Selo a entrada do nascimento", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder da força vital"], // 21
  ["Pulso com o fim de comunicar", "Realizando o alento", "Selo a entrada do espírito", "Com o tom Solar da intenção", "Eu sou guiado pelo poder do infinito"], // 22
  ["Aperfeiçoo com o fim de sonhar", "Produzindo a intuição", "Selo a entrada da abundância", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder da magia"], // 23
  ["Dissolvo com o fim de focalizar", "Libertando a percepção", "Selo a entrada do florescimento", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado"], // 24
  ["Dedico-me com o fim de sobreviver", "Universalizando o instinto", "Selo o armazém da força vital", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder da navegação"], // 25
  ["Persevero com o fim de igualar", "Transcendendo a oportunidade", "Selo o armazém da morte", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder do coração"], // 26
  ["Unifico com o fim de conhecer", "Atraindo a cura", "Selo o armazém da realização", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 27
  ["Polarizo com o fim de embelezar", "Estabilizando a arte", "Selo o armazém da elegância", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder do fogo universal"], // 28
  ["Ativo com o fim de purificar", "Vinculando o fluxo", "Selo o processo da água universal", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder do espaço"], // 29
  ["Defino com o fim de amar", "Medindo a lealdade", "Selo o processo do coração", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder da morte Sou um kin polar Converto o espectro galáctico branco"], // 30
  ["Potencializo com o fim de brincar", "Comandando a ilusão", "Selo o processo da magia", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder da autogeração"], // 31
  ["Organizo com o fim de influenciar", "Equilibrando a sabedoria", "Selo o processo do livre-arbítrio", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 32
  ["Canalizo com o fim de explorar", "Inspirando a vigilância", "Selo a saída do espaço", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder da força vital"], // 33
  ["Harmonizo com o fim de encantar", "Modelando a receptividade", "Selo a saída da intemporalidade", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder do infinito"], // 34
  ["Pulso com o fim de criar", "Realizando a mente", "Selo a saída da visão", "Com o tom Solar da intenção", "Eu sou guiado pelo poder da magia"], // 35
  ["Aperfeiçoo com o fim de questionar", "Produzindo a intrepidez", "Selo a saída da inteligência", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder do florescimento"], // 36
  ["Dissolvo com o fim de evoluir", "Libertando a sincronicidade", "Selo a matriz da navegação", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado"], // 37
  ["Dedico-me com o fim de refletir", "Universalizando a ordem", "Selo a matriz do infinito", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder do coração"], // 38
  ["Persevero com o fim de catalisar", "Transcendendo a energia", "Selo a matriz da autogeração", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder da abundância"], // 39
  ["Unifico com o fim de iluminar", "Atraindo a vida", "Selo a matriz do fogo universal", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 40
  ["Polarizo com o fim de nutrir", "Estabilizando o ser", "Selo a entrada do nascimento", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder do espaço"], // 41
  ["Ativo com o fim de comunicar", "Vinculando o alento", "Selo a entrada do espírito", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder da morte"], // 42
  ["Defino com o fim de sonhar", "Medindo a intuição", "Selo a entrada da abundância", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder da autogeração"], // 43
  ["Potencializo com o fim de focalizar", "Comandando a percepção", "Selo a entrada do florescimento", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder do livre-arbítrio"], // 44
  ["Organizo com o fim de sobreviver", "Equilibrando o instinto", "Selo o armazém da força vital", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 45
  ["Canalizo com o fim de igualar", "Inspirando a oportunidade", "Selo o armazém da morte", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder do infinito"], // 46
  ["Harmonizo com o fim de conhecer", "Modelando a cura", "Selo o armazém da realização", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder da magia"], // 47
  ["Pulso com o fim de embelezar", "Realizando a arte", "Selo o armazém da elegância", "Com o tom Solar da intenção", "Eu sou guiado pelo poder do florescimento"], // 48
  ["Aperfeiçoo com o fim de purificar", "Produzindo o fluxo", "Selo o processo da água universal", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder da navegação"], // 49
  ["Dissolvo com o fim de amar", "Libertando a lealdade", "Selo o processo do coração", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado"], // 50
  ["Dedico-me com o fim de brincar", "Universalizando a ilusão", "Selo o processo da magia", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder da abundância"], // 51
  ["Persevero com o fim de influenciar", "Transcendendo a sabedoria", "Selo o processo do livre-arbítrio", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder da inteligência"], // 52
  ["Unifico com o fim de explorar", "Atraindo a vigilância", "Selo a saída do espaço", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 53
  ["Polarizo com o fim de encantar", "Estabilizando a receptividade", "Selo a saída da intemporalidade", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder da morte"], // 54
  ["Ativo com o fim de criar", "Vinculando a mente", "Selo a saída da visão", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder da autogeração Sou um kin polar Estabeleço o espectro galáctico azul"], // 55
  ["Defino com o fim de questionar", "Medindo a intrepidez", "Selo a saída da inteligência", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder do livre-arbítrio"], // 56
  ["Potencializo com o fim de evoluir", "Comandando a sincronicidade", "Selo a matriz da navegação", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder da força vital"], // 57
  ["Organizo com o fim de refletir", "Equilibrando a ordem", "Selo a matriz do infinito", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 58
  ["Canalizo com o fim de catalisar", "Inspirando a energia", "Selo a matriz da autogeração", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder da magia"], // 59
  ["Harmonizo com o fim de iluminar", "Modelando a vida", "Selo a matriz do fogo universal", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder do florescimento"], // 60
  ["Pulso com o fim de nutrir", "Realizando o ser", "Selo a entrada do nascimento", "Com o tom Solar da intenção", "Eu sou guiado pelo poder da navegação"], // 61
  ["Aperfeiçoo com o fim de comunicar", "Produzindo o alento", "Selo a entrada do espírito", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder do coração"], // 62
  ["Dissolvo com o fim de sonhar", "Libertando a intuição", "Selo a entrada da abundância", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado"], // 63
  ["Dedico-me com o fim de focalizar", "Universalizando a percepção", "Selo a entrada do florescimento", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder da inteligência"], // 64
  ["Persevero com o fim de sobreviver", "Transcendendo o instinto", "Selo o armazém da força vital", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder da água universal"], // 65
  ["Unifico com o fim de igualar", "Atraindo a oportunidade", "Selo o armazém da morte", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 66
  ["Polarizo com o fim de conhecer", "Estabilizando a cura", "Selo o armazém da realização", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder da autogeração"], // 67
  ["Ativo com o fim de embelezar", "Vinculando a arte", "Selo o armazém da elegância", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder do livre-arbítrio"], // 68
  ["Defino com o fim de purificar", "Medindo o fluxo", "Selo o processo da água universal", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder da força vital"], // 69
  ["Potencializo com o fim de amar", "Comandando a lealdade", "Selo o processo do coração", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder do infinito"], // 70
  ["Organizo com o fim de brincar", "Equilibrando a ilusão", "Selo o processo da magia", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 71
  ["Canalizo com o fim de influenciar", "Inspirando a sabedoria", "Selo o processo do livre-arbítrio", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder do florescimento"], // 72
  ["Harmonizo com o fim de explorar", "Modelando a vigilância", "Selo a saída do espaço", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder da navegação"], // 73
  ["Pulso com o fim de encantar", "Realizando a receptividade", "Selo a saída da intemporalidade", "Com o tom Solar da intenção", "Eu sou guiado pelo poder do coração"], // 74
  ["Aperfeiçoo com o fim de criar", "Produzindo a mente", "Selo a saída da visão", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder da abundância Sou um kin polar Estendo o espectro galáctico azul"], // 75
  ["Dissolvo com o fim de questionar", "Libertando a intrepidez", "Selo a saída da inteligência", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado"], // 76
  ["Dedico-me com o fim de evoluir", "Universalizando a sincronicidade", "Selo a matriz da navegação", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder da água universal"], // 77
  ["Persevero com o fim de refletir", "Transcendendo a ordem", "Selo a matriz do infinito", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder do espírito"], // 78
  ["Unifico com o fim de catalisar", "Atraindo a energia", "Selo a matriz da autogeração", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 79
  ["Polarizo com o fim de iluminar", "Estabilizando a vida", "Selo a matriz do fogo universal", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder do livre-arbítrio"], // 80
  ["Ativo com o fim de nutrir", "Vinculando o ser", "Selo a entrada do nascimento", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder da força vital"], // 81
  ["Defino com o fim de comunicar", "Medindo o alento", "Selo a entrada do espírito", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder do infinito"], // 82
  ["Potencializo com o fim de sonhar", "Comandando a intuição", "Selo a entrada da abundância", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder da magia"], // 83
  ["Organizo com o fim de focalizar", "Equilibrando a percepção", "Selo a entrada do florescimento", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 84
  ["Canalizo com o fim de sobreviver", "Inspirando o instinto", "Selo o armazém da força vital", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder da navegação"], // 85
  ["Harmonizo com o fim de igualar", "Modelando a oportunidade", "Selo o armazém da morte", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder do coração"], // 86
  ["Pulso com o fim de conhecer", "Realizando a cura", "Selo o armazém da realização", "Com o tom Solar da intenção", "Eu sou guiado pelo poder da abundância"], // 87
  ["Aperfeiçoo com o fim de embelezar", "Produzindo a arte", "Selo o armazém da elegância", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder da inteligência"], // 88
  ["Dissolvo com o fim de purificar", "Libertando o fluxo", "Selo o processo da água universal", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado"], // 89
  ["Dedico-me com o fim de amar", "Universalizando a lealdade", "Selo o processo do coração", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder do espírito"], // 90
  ["Persevero com o fim de brincar", "Transcendendo a ilusão", "Selo o processo da magia", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder da visão"], // 91
  ["Unifico com o fim de influenciar", "Atraindo a sabedoria", "Selo o processo do livre-arbítrio", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 92
  ["Polarizo com o fim de explorar", "Estabilizando a vigilância", "Selo a saída do espaço", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder da força vital"], // 93
  ["Ativo com o fim de encantar", "Vinculando a receptividade", "Selo a saída da intemporalidade", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder do infinito"], // 94
  ["Defino com o fim de criar", "Medindo a mente", "Selo a saída da visão", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder da magia Sou um kin polar Converto o espectro galáctico azul"], // 95
  ["Potencializo com o fim de questionar", "Comandando a intrepidez", "Selo a saída da inteligência", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder do florescimento"], // 96
  ["Organizo com o fim de evoluir", "Equilibrando a sincronicidade", "Selo a matriz da navegação", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 97
  ["Canalizo com o fim de refletir", "Inspirando a ordem", "Selo a matriz do infinito", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder do coração"], // 98
  ["Harmonizo com o fim de catalisar", "Modelando a energia", "Selo a matriz da autogeração", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder da abundância"], // 99
  ["Pulso com o fim de iluminar", "Realizando a vida", "Selo a matriz do fogo universal", "Com o tom Solar da intenção", "Eu sou guiado pelo poder da inteligência"], // 100
  ["Aperfeiçoo com o fim de nutrir", "Produzindo o ser", "Selo a entrada do nascimento", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder da água universal"], // 101
  ["Dissolvo com o fim de comunicar", "Libertando o alento", "Selo a entrada do espírito", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado"], // 102
  ["Dedico-me com o fim de sonhar", "Universalizando a intuição", "Selo a entrada da abundância", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder da visão"], // 103
  ["Persevero com o fim de focalizar", "Transcendendo a percepção", "Selo a entrada do florescimento", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder da elegância"], // 104
  ["Unifico com o fim de sobreviver", "Atraindo o instinto", "Selo o armazém da força vital", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 105
  ["Polarizo com o fim de igualar", "Estabilizando a oportunidade", "Selo o armazém da morte", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder do infinito"], // 106
  ["Ativo com o fim de conhecer", "Vinculando a cura", "Selo o armazém da realização", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder da magia"], // 107
  ["Defino com o fim de embelezar", "Medindo a arte", "Selo o armazém da elegância", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder do florescimento"], // 108
  ["Potencializo com o fim de purificar", "Comandando o fluxo", "Selo o processo da água universal", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder da navegação"], // 109
  ["Organizo com o fim de amar", "Equilibrando a lealdade", "Selo o processo do coração", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 110
  ["Canalizo com o fim de brincar", "Inspirando a ilusão", "Selo o processo da magia", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder da abundância"], // 111
  ["Harmonizo com o fim de influenciar", "Modelando a sabedoria", "Selo o processo do livre-arbítrio", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder da inteligência"], // 112
  ["Pulso com o fim de explorar", "Realizando a vigilância", "Selo a saída do espaço", "Com o tom Solar da intenção", "Eu sou guiado pelo poder da água universal"], // 113
  ["Aperfeiçoo com o fim de encantar", "Produzindo a receptividade", "Selo a saída da intemporalidade", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder do espírito"], // 114
  ["Dissolvo com o fim de criar", "Libertando a mente", "Selo a saída da visão", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado"], // 115
  ["Dedico-me com o fim de questionar", "Universalizando a intrepidez", "Selo a saída da inteligência", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder da elegância"], // 116
  ["Persevero com o fim de evoluir", "Transcendendo a sincronicidade", "Selo a matriz da navegação", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder do nascimento"], // 117
  ["Unifico com o fim de refletir", "Atraindo a ordem", "Selo a matriz do infinito", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 118
  ["Polarizo com o fim de catalisar", "Estabilizando a energia", "Selo a matriz da autogeração", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder da magia"], // 119
  ["Ativo com o fim de iluminar", "Vinculando a vida", "Selo a matriz do fogo universal", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder do florescimento Sou um kin polar Estabeleço o espectro galáctico amarelo"], // 120
  ["Defino com o fim de nutrir", "Medindo o ser", "Selo a entrada do nascimento", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder da navegação"], // 121
  ["Potencializo com o fim de comunicar", "Comandando o alento", "Selo a entrada do espírito", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder do coração"], // 122
  ["Organizo com o fim de sonhar", "Equilibrando a intuição", "Selo a entrada da abundância", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 123
  ["Canalizo com o fim de focalizar", "Inspirando a percepção", "Selo a entrada do florescimento", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder da inteligência"], // 124
  ["Harmonizo com o fim de sobreviver", "Modelando o instinto", "Selo o armazém da força vital", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder da água universal"], // 125
  ["Pulso com o fim de igualar", "Realizando a oportunidade", "Selo o armazém da morte", "Com o tom Solar da intenção", "Eu sou guiado pelo poder do espírito"], // 126
  ["Aperfeiçoo com o fim de conhecer", "Produzindo a cura", "Selo o armazém da realização", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder da visão"], // 127
  ["Dissolvo com o fim de embelezar", "Libertando a arte", "Selo o armazém da elegância", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado"], // 128
  ["Dedico-me com o fim de purificar", "Universalizando o fluxo", "Selo o processo da água universal", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder do nascimento"], // 129
  ["Persevero com o fim de amar", "Transcendendo a lealdade", "Selo o processo do coração", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder da intemporalidade"], // 130
  ["Unifico com o fim de brincar", "Atraindo a ilusão", "Selo o processo da magia", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 131
  ["Polarizo com o fim de influenciar", "Estabilizando a sabedoria", "Selo o processo do livre-arbítrio", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder do florescimento"], // 132
  ["Ativo com o fim de explorar", "Vinculando a vigilância", "Selo a saída do espaço", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder da navegação"], // 133
  ["Defino com o fim de encantar", "Medindo a receptividade", "Selo a saída da intemporalidade", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder do coração"], // 134
  ["Potencializo com o fim de criar", "Comandando a mente", "Selo a saída da visão", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder da abundância"], // 135
  ["Organizo com o fim de questionar", "Equilibrando a intrepidez", "Selo a saída da inteligência", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 136
  ["Canalizo com o fim de evoluir", "Inspirando a sincronicidade", "Selo a matriz da navegação", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder da água universal"], // 137
  ["Harmonizo com o fim de refletir", "Modelando a ordem", "Selo a matriz do infinito", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder do espírito"], // 138
  ["Pulso com o fim de catalisar", "Realizando a energia", "Selo a matriz da autogeração", "Com o tom Solar da intenção", "Eu sou guiado pelo poder da visão"], // 139
  ["Aperfeiçoo com o fim de iluminar", "Produzindo a vida", "Selo a matriz do fogo universal", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder da elegância Sou um kin polar Estendo o espectro galáctico amarelo"], // 140
  ["Dissolvo com o fim de nutrir", "Libertando o ser", "Selo a entrada do nascimento", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado"], // 141
  ["Dedico-me com o fim de comunicar", "Universalizando o alento", "Selo a entrada do espírito", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder da intemporalidade"], // 142
  ["Persevero com o fim de sonhar", "Transcendendo a intuição", "Selo a entrada da abundância", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder da realização"], // 143
  ["Unifico com o fim de focalizar", "Atraindo a percepção", "Selo a entrada do florescimento", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 144
  ["Polarizo com o fim de sobreviver", "Estabilizando o instinto", "Selo o armazém da força vital", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder da navegação"], // 145
  ["Ativo com o fim de igualar", "Vinculando a oportunidade", "Selo o armazém da morte", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder do coração"], // 146
  ["Defino com o fim de conhecer", "Medindo a cura", "Selo o armazém da realização", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder da abundância"], // 147
  ["Potencializo com o fim de embelezar", "Comandando a arte", "Selo o armazém da elegância", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder da inteligência"], // 148
  ["Organizo com o fim de purificar", "Equilibrando o fluxo", "Selo o processo da água universal", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 149
  ["Canalizo com o fim de amar", "Inspirando a lealdade", "Selo o processo do coração", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder do espírito"], // 150
  ["Harmonizo com o fim de brincar", "Modelando a ilusão", "Selo o processo da magia", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder da visão"], // 151
  ["Pulso com o fim de influenciar", "Realizando a sabedoria", "Selo o processo do livre-arbítrio", "Com o tom Solar da intenção", "Eu sou guiado pelo poder da elegância"], // 152
  ["Aperfeiçoo com o fim de explorar", "Produzindo a vigilância", "Selo a saída do espaço", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder do nascimento"], // 153
  ["Dissolvo com o fim de encantar", "Libertando a receptividade", "Selo a saída da intemporalidade", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado"], // 154
  ["Dedico-me com o fim de criar", "Universalizando a mente", "Selo a saída da visão", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder da realização"], // 155
  ["Persevero com o fim de questionar", "Transcendendo a intrepidez", "Selo a saída da inteligência", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder do fogo universal"], // 156
  ["Unifico com o fim de evoluir", "Atraindo a sincronicidade", "Selo a matriz da navegação", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 157
  ["Polarizo com o fim de refletir", "Estabilizando a ordem", "Selo a matriz do infinito", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder do coração"], // 158
  ["Ativo com o fim de catalisar", "Vinculando a energia", "Selo a matriz da autogeração", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder da abundância"], // 159
  ["Defino com o fim de iluminar", "Medindo a vida", "Selo a matriz do fogo universal", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder da inteligência Sou um kin polar Converto o espectro galáctico amarelo"], // 160
  ["Potencializo com o fim de nutrir", "Comandando o ser", "Selo a entrada do nascimento", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder da água universal"], // 161
  ["Organizo com o fim de comunicar", "Equilibrando o alento", "Selo a entrada do espírito", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 162
  ["Canalizo com o fim de sonhar", "Inspirando a intuição", "Selo a entrada da abundância", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder da visão"], // 163
  ["Harmonizo com o fim de focalizar", "Modelando a percepção", "Selo a entrada do florescimento", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder da elegância"], // 164
  ["Pulso com o fim de sobreviver", "Realizando o instinto", "Selo o armazém da força vital", "Com o tom Solar da intenção", "Eu sou guiado pelo poder do nascimento"], // 165
  ["Aperfeiçoo com o fim de igualar", "Produzindo a oportunidade", "Selo o armazém da morte", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder da intemporalidade"], // 166
  ["Dissolvo com o fim de conhecer", "Libertando a cura", "Selo o armazém da realização", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado"], // 167
  ["Dedico-me com o fim de embelezar", "Universalizando a arte", "Selo o armazém da elegância", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder do fogo universal"], // 168
  ["Persevero com o fim de purificar", "Transcendendo o fluxo", "Selo o processo da água universal", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder do espaço"], // 169
  ["Unifico com o fim de amar", "Atraindo a lealdade", "Selo o processo do coração", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 170
  ["Polarizo com o fim de brincar", "Estabilizando a ilusão", "Selo o processo da magia", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder da abundância"], // 171
  ["Ativo com o fim de influenciar", "Vinculando a sabedoria", "Selo o processo do livre-arbítrio", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder da inteligência"], // 172
  ["Defino com o fim de explorar", "Medindo a vigilância", "Selo a saída do espaço", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder da água universal"], // 173
  ["Potencializo com o fim de encantar", "Comandando a receptividade", "Selo a saída da intemporalidade", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder do espírito"], // 174
  ["Organizo com o fim de criar", "Equilibrando a mente", "Selo a saída da visão", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 175
  ["Canalizo com o fim de questionar", "Inspirando a intrepidez", "Selo a saída da inteligência", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder da elegância"], // 176
  ["Harmonizo com o fim de evoluir", "Modelando a sincronicidade", "Selo a matriz da navegação", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder do nascimento"], // 177
  ["Pulso com o fim de refletir", "Realizando a ordem", "Selo a matriz do infinito", "Com o tom Solar da intenção", "Eu sou guiado pelo poder da intemporalidade"], // 178
  ["Aperfeiçoo com o fim de catalisar", "Produzindo a energia", "Selo a matriz da autogeração", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder da realização"], // 179
  ["Dissolvo com o fim de iluminar", "Libertando a vida", "Selo a matriz do fogo universal", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado Sou um kin polar Transporto o espectro galáctico amarelo"], // 180
  ["Dedico-me com o fim de nutrir", "Universalizando o ser", "Selo a entrada do nascimento", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder do espaço"], // 181
  ["Persevero com o fim de comunicar", "Transcendendo o alento", "Selo a entrada do espírito", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder da morte"], // 182
  ["Unifico com o fim de sonhar", "Atraindo a intuição", "Selo a entrada da abundância", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 183
  ["Polarizo com o fim de focalizar", "Estabilizando a percepção", "Selo a entrada do florescimento", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder da inteligência"], // 184
  ["Ativo com o fim de sobreviver", "Vinculando o instinto", "Selo o armazém da força vital", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder da água universal Sou um kin polar Estabeleço o espectro galáctico vermelho"], // 185
  ["Defino com o fim de igualar", "Medindo a oportunidade", "Selo o armazém da morte", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder do espírito"], // 186
  ["Potencializo com o fim de conhecer", "Comandando a cura", "Selo o armazém da realização", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder da visão"], // 187
  ["Organizo com o fim de embelezar", "Equilibrando a arte", "Selo o armazém da elegância", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 188
  ["Canalizo com o fim de purificar", "Inspirando o fluxo", "Selo o processo da água universal", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder do nascimento"], // 189
  ["Harmonizo com o fim de amar", "Modelando a lealdade", "Selo o processo do coração", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder da intemporalidade"], // 190
  ["Pulso com o fim de brincar", "Realizando a ilusão", "Selo o processo da magia", "Com o tom Solar da intenção", "Eu sou guiado pelo poder da realização"], // 191
  ["Aperfeiçoo com o fim de influenciar", "Produzindo a sabedoria", "Selo o processo do livre-arbítrio", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder do fogo universal"], // 192
  ["Dissolvo com o fim de explorar", "Libertando a vigilância", "Selo a saída do espaço", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado"], // 193
  ["Dedico-me com o fim de encantar", "Universalizando a receptividade", "Selo a saída da intemporalidade", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder da morte"], // 194
  ["Persevero com o fim de criar", "Transcendendo a mente", "Selo a saída da visão", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder da autogeração"], // 195
  ["Unifico com o fim de questionar", "Atraindo a intrepidez", "Selo a saída da inteligência", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 196
  ["Polarizo com o fim de evoluir", "Estabilizando a sincronicidade", "Selo a matriz da navegação", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder da água universal"], // 197
  ["Ativo com o fim de refletir", "Vinculando a ordem", "Selo a matriz do infinito", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder do espírito"], // 198
  ["Defino com o fim de catalisar", "Medindo a energia", "Selo a matriz da autogeração", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder da visão"], // 199
  ["Potencializo com o fim de iluminar", "Comandando a vida", "Selo a matriz do fogo universal", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder da elegância"], // 200
  ["Organizo com o fim de nutrir", "Equilibrando o ser", "Selo a entrada do nascimento", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 201
  ["Canalizo com o fim de comunicar", "Inspirando o alento", "Selo a entrada do espírito", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder da intemporalidade"], // 202
  ["Harmonizo com o fim de sonhar", "Modelando a intuição", "Selo a entrada da abundância", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder da realização"], // 203
  ["Pulso com o fim de focalizar", "Realizando a percepção", "Selo a entrada do florescimento", "Com o tom Solar da intenção", "Eu sou guiado pelo poder do fogo universal"], // 204
  ["Aperfeiçoo com o fim de sobreviver", "Produzindo o instinto", "Selo o armazém da força vital", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder do espaço Sou um kin polar Estendo o espectro galáctico vermelho"], // 205
  ["Dissolvo com o fim de igualar", "Libertando a oportunidade", "Selo o armazém da morte", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado"], // 206
  ["Dedico-me com o fim de conhecer", "Universalizando a cura", "Selo o armazém da realização", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder da autogeração"], // 207
  ["Persevero com o fim de embelezar", "Transcendendo a arte", "Selo o armazém da elegância", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder do livre-arbítrio"], // 208
  ["Unifico com o fim de purificar", "Atraindo o fluxo", "Selo o processo da água universal", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 209
  ["Polarizo com o fim de amar", "Estabilizando a lealdade", "Selo o processo do coração", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder do espírito"], // 210
  ["Ativo com o fim de brincar", "Vinculando a ilusão", "Selo o processo da magia", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder da visão"], // 211
  ["Defino com o fim de influenciar", "Medindo a sabedoria", "Selo o processo do livre-arbítrio", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder da elegância"], // 212
  ["Potencializo com o fim de explorar", "Comandando a vigilância", "Selo a saída do espaço", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder do nascimento"], // 213
  ["Organizo com o fim de encantar", "Equilibrando a receptividade", "Selo a saída da intemporalidade", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 214
  ["Canalizo com o fim de criar", "Inspirando a mente", "Selo a saída da visão", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder da realização"], // 215
  ["Harmonizo com o fim de questionar", "Modelando a intrepidez", "Selo a saída da inteligência", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder do fogo universal"], // 216
  ["Pulso com o fim de evoluir", "Realizando a sincronicidade", "Selo a matriz da navegação", "Com o tom Solar da intenção", "Eu sou guiado pelo poder do espaço"], // 217
  ["Aperfeiçoo com o fim de refletir", "Produzindo a ordem", "Selo a matriz do infinito", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder da morte"], // 218
  ["Dissolvo com o fim de catalisar", "Libertando a energia", "Selo a matriz da autogeração", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado"], // 219
  ["Dedico-me com o fim de iluminar", "Universalizando a vida", "Selo a matriz do fogo universal", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder do livre-arbítrio"], // 220
  ["Persevero com o fim de nutrir", "Transcendendo o ser", "Selo a entrada do nascimento", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder da força vital"], // 221
  ["Unifico com o fim de comunicar", "Atraindo o alento", "Selo a entrada do espírito", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 222
  ["Polarizo com o fim de sonhar", "Estabilizando a intuição", "Selo a entrada da abundância", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder da visão"], // 223
  ["Ativo com o fim de focalizar", "Vinculando a percepção", "Selo a entrada do florescimento", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder da elegância"], // 224
  ["Defino com o fim de sobreviver", "Medindo o instinto", "Selo o armazém da força vital", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder do nascimento Sou um kin polar Converto o espectro galáctico vermelho"], // 225
  ["Potencializo com o fim de igualar", "Comandando a oportunidade", "Selo o armazém da morte", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder da intemporalidade"], // 226
  ["Organizo com o fim de conhecer", "Equilibrando a cura", "Selo o armazém da realização", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 227
  ["Canalizo com o fim de embelezar", "Inspirando a arte", "Selo o armazém da elegância", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder do fogo universal"], // 228
  ["Harmonizo com o fim de purificar", "Modelando o fluxo", "Selo o processo da água universal", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder do espaço"], // 229
  ["Pulso com o fim de amar", "Realizando a lealdade", "Selo o processo do coração", "Com o tom Solar da intenção", "Eu sou guiado pelo poder da morte"], // 230
  ["Aperfeiçoo com o fim de brincar", "Produzindo a ilusão", "Selo o processo da magia", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder da autogeração"], // 231
  ["Dissolvo com o fim de influenciar", "Libertando a sabedoria", "Selo o processo do livre-arbítrio", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado"], // 232
  ["Dedico-me com o fim de explorar", "Universalizando a vigilância", "Selo a saída do espaço", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder da força vital"], // 233
  ["Persevero com o fim de encantar", "Transcendendo a receptividade", "Selo a saída da intemporalidade", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder do infinito"], // 234
  ["Unifico com o fim de criar", "Atraindo a mente", "Selo a saída da visão", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 235
  ["Polarizo com o fim de questionar", "Estabilizando a intrepidez", "Selo a saída da inteligência", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder da elegância"], // 236
  ["Ativo com o fim de evoluir", "Vinculando a sincronicidade", "Selo a matriz da navegação", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder do nascimento"], // 237
  ["Defino com o fim de refletir", "Medindo a ordem", "Selo a matriz do infinito", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder da intemporalidade"], // 238
  ["Potencializo com o fim de catalisar", "Comandando a energia", "Selo a matriz da autogeração", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder da realização"], // 239
  ["Organizo com o fim de iluminar", "Equilibrando a vida", "Selo a matriz do fogo universal", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 240
  ["Canalizo com o fim de nutrir", "Inspirando o ser", "Selo a entrada do nascimento", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder do espaço"], // 241
  ["Harmonizo com o fim de comunicar", "Modelando o alento", "Selo a entrada do espírito", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder da morte"], // 242
  ["Pulso com o fim de sonhar", "Realizando a intuição", "Selo a entrada da abundância", "Com o tom Solar da intenção", "Eu sou guiado pelo poder da autogeração"], // 243
  ["Aperfeiçoo com o fim de focalizar", "Produzindo a percepção", "Selo a entrada do florescimento", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder do livre-arbítrio"], // 244
  ["Dissolvo com o fim de sobreviver", "Libertando o instinto", "Selo o armazém da força vital", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado Sou um kin polar Transporto o espectro galáctico vermelho"], // 245
  ["Dedico-me com o fim de igualar", "Universalizando a oportunidade", "Selo o armazém da morte", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder do infinito"], // 246
  ["Persevero com o fim de conhecer", "Transcendendo a cura", "Selo o armazém da realização", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder da magia"], // 247
  ["Unifico com o fim de embelezar", "Atraindo a arte", "Selo o armazém da elegância", "Com o tom Magnético do propósito", "Eu sou guiado pelo meu próprio poder duplicado"], // 248
  ["Polarizo com o fim de purificar", "Estabilizando o fluxo", "Selo o processo da água universal", "Com o tom Lunar do desafio", "Eu sou guiado pelo poder do nascimento"], // 249
  ["Ativo com o fim de amar", "Vinculando a lealdade", "Selo o processo do coração", "Com o tom Elétrico do serviço", "Eu sou guiado pelo poder da intemporalidade Sou um kin polar Estabeleço o espectro galáctico branco"], // 250
  ["Defino com o fim de brincar", "Medindo a ilusão", "Selo o processo da magia", "Com o tom Autoexistente da forma", "Eu sou guiado pelo poder da realização"], // 251
  ["Potencializo com o fim de influenciar", "Comandando a sabedoria", "Selo o processo do livre-arbítrio", "Com o tom Harmônico da radiação", "Eu sou guiado pelo poder do fogo universal"], // 252
  ["Organizo com o fim de explorar", "Equilibrando a vigilância", "Selo a saída do espaço", "Com o tom Rítmico da igualdade", "Eu sou guiado pelo meu próprio poder duplicado"], // 253
  ["Canalizo com o fim de encantar", "Inspirando a receptividade", "Selo a saída da intemporalidade", "Com o tom Ressonante da harmonização", "Eu sou guiado pelo poder da morte"], // 254
  ["Harmonizo com o fim de criar", "Modelando a mente", "Selo a saída da visão", "Com o tom Galáctico da integridade", "Eu sou guiado pelo poder da autogeração"], // 255
  ["Pulso com o fim de questionar", "Realizando a intrepidez", "Selo a saída da inteligência", "Com o tom Solar da intenção", "Eu sou guiado pelo poder do livre-arbítrio"], // 256
  ["Aperfeiçoo com o fim de evoluir", "Produzindo a sincronicidade", "Selo a matriz da navegação", "Com o tom Planetário da manifestação", "Eu sou guiado pelo poder da força vital"], // 257
  ["Dissolvo com o fim de refletir", "Libertando a ordem", "Selo a matriz do infinito", "Com o tom Espectral da liberação", "Eu sou guiado pelo meu próprio poder duplicado"], // 258
  ["Dedico-me com o fim de catalisar", "Universalizando a energia", "Selo a matriz da autogeração", "Com o tom Cristal da cooperação", "Eu sou guiado pelo poder da magia"], // 259
  ["Persevero com o fim de iluminar", "Transcendendo a vida", "Selo a matriz do fogo universal", "Com o tom Cósmico da presença", "Eu sou guiado pelo poder do florescimento"] // 260
];

function buildAffirmation(seal: Seal, tone: Tone): string {
  // Ex.: "Eu ATRAIO com o fim de NUTRIR, unificando o NASCIMENTO.
  //       Selo a entrada do SER com o tom Magnético do PROPÓSITO.
  //       Eu sou guiado pelo meu próprio poder duplicado."
  const t = (s: string) => s.toLowerCase();
  return (
    `Eu ${t(tone.action)} com o fim de ${t(seal.action)}, ${t(tone.power)}ndo ${t(seal.power)}. ` +
    `Selo a entrada do ${t(seal.essence)} com o tom ${tone.name} do ${t(tone.essence)}. ` +
    `Eu sou guiado pela minha própria força.`
  );
}

export function getKinInfo(kin: number): KinInfo {
  const { toneIndex, sealIndex } = decomposeKin(kin);
  const seal = SEALS[sealIndex - 1];
  const tone = TONES[toneIndex - 1];
  const trecenaSealIndex = ((sealIndex - 1 - (toneIndex - 1)) % 20 + 20) % 20;
  const trecenaSeal = SEALS[trecenaSealIndex];
  const trecenaKinStart = ((kin - 1 - (toneIndex - 1)) % 260 + 260) % 260 + 1;
  const colorAdj: Record<SealColor, string> = {
    vermelho: "Vermelho",
    branco: "Branco",
    azul: "Azul",
    amarelo: "Amarelo",
  };
  const genderMap: Record<SealColor, string> = {
    vermelho: "Vermelho",
    branco: "Branco",
    azul: "Azul",
    amarelo: "Amarelo",
  };
  const castleIndex = Math.floor((kin - 1) / 52);
  return {
    kin,
    seal,
    tone,
    fullName: `${seal.name} ${tone.name} ${genderMap[seal.color] ?? colorAdj[seal.color]}`,
    affirmation: KIN_FRASE[kin - 1],
    mantra: KIN_MANTRA[kin - 1],
    trecena: { seal: trecenaSeal, kinStart: trecenaKinStart },
    castle: { ...CASTLES[castleIndex], index: castleIndex + 1 },
  };
}

/** Info completo do Kin do dia. */
export function getTodayKinInfo(date: Date = new Date()): KinInfo {
  return getKinInfo(kinFromDate(date));
}

export const COLOR_TOKEN: Record<SealColor, string> = {
  vermelho: "error",
  branco: "on-surface",
  azul: "primary",
  amarelo: "tertiary",
};

// ─── Oráculo Maia: relações entre Kins ──────────────────────────────

/**
 * Pares analógicos oficiais do Dreamspell (famílias harmônicas).
 * Dragão↔Sol, Vento↔Águia, Noite↔Guerreiro, Semente↔Terra, Serpente↔Espelho,
 * Enlaçador↔Tormenta, Mão↔Estrela, Lua↔Cão, Macaco↔Humano, Caminhante↔Mago.
 */
const ANALOG_SEAL: Record<number, number> = {
  1: 20, 20: 1,
  2: 15, 15: 2,
  3: 16, 16: 3,
  4: 17, 17: 4,
  5: 18, 18: 5,
  6: 19, 19: 6,
  7: 8, 8: 7,
  9: 10, 10: 9,
  11: 12, 12: 11,
  13: 14, 14: 13,
};

/** Analógico (irmão de tribo): mesmo tom, selo pareado pelas famílias harmônicas. */
export function analogKin(kin: number): number {
  const { toneIndex, sealIndex } = decomposeKin(kin);
  return kinFromToneAndSeal(toneIndex, ANALOG_SEAL[sealIndex]);
}

/** Antípoda (desafio): mesmo tom, selo oposto na roda. */
export function antipodeKin(kin: number): number {
  const { toneIndex, sealIndex } = decomposeKin(kin);
  const antipodeSeal = ((sealIndex - 1 + 10) % 20) + 1;
  return kinFromToneAndSeal(toneIndex, antipodeSeal);
}

/** Oculto (potência escondida): kin + oculto = 261. */
export function occultKin(kin: number): number {
  return 261 - kin;
}

/** Guia (força que orienta): mesmo selo, tom derivado da cor. */
export function guideKin(kin: number): number {
  const { toneIndex, sealIndex } = decomposeKin(kin);
  // fórmula clássica: guia tem o mesmo tom, selo derivado do módulo 5 da cor
  // Simplificação Dreamspell: guia = mesmo tom, avança 4 selos * (tone-1) mod 20
  const guideSeal = ((sealIndex - 1 + 4 * (toneIndex - 1)) % 20 + 20) % 20 + 1;
  return kinFromToneAndSeal(toneIndex, guideSeal);
}

function kinFromToneAndSeal(tone: number, seal: number): number {
  // resolve o único Kin em [1..260] com esse par (tom, selo)
  for (let k = 0; k < 260; k++) {
    if ((k % 13) + 1 === tone && (k % 20) + 1 === seal) return k + 1;
  }
  return 1;
}

/** Duas famílias de cor iguais (grupo elemental Maia). */
export function sameColorFamily(a: number, b: number): boolean {
  const sa = decomposeKin(a).sealIndex;
  const sb = decomposeKin(b).sealIndex;
  return (sa - 1) % 4 === (sb - 1) % 4;
}

export function sharedSeal(a: number, b: number): boolean {
  return decomposeKin(a).sealIndex === decomposeKin(b).sealIndex;
}

export function sharedTone(a: number, b: number): boolean {
  return decomposeKin(a).toneIndex === decomposeKin(b).toneIndex;
}

export type KinRelation = "self" | "guide" | "analog" | "antipode" | "occult" | "shared-seal" | "shared-tone" | "same-color" | "distant";

/** Classifica a relação de B em relação a A (do oráculo, na ordem de força). */
export function relationBetween(a: number, b: number): KinRelation {
  if (a === b) return "self";
  if (guideKin(a) === b) return "guide";
  if (analogKin(a) === b) return "analog";
  if (antipodeKin(a) === b) return "antipode";
  if (occultKin(a) === b) return "occult";
  if (sharedSeal(a, b)) return "shared-seal";
  if (sharedTone(a, b)) return "shared-tone";
  if (sameColorFamily(a, b)) return "same-color";
  return "distant";
}

export const RELATION_LABEL: Record<KinRelation, string> = {
  self: "O mesmo Kin",
  guide: "Guia · orienta o caminho",
  analog: "Analógico · irmão de tribo",
  antipode: "Antípoda · desafio criativo",
  occult: "Oculto · potência escondida",
  "shared-seal": "Mesmo selo · mesma missão",
  "shared-tone": "Mesmo tom · mesma pulsação",
  "same-color": "Mesma cor · mesma família elemental",
  distant: "Distante · aprendizado em contraste",
};

// ─── Plasmas Radiais (7 plasmas semanais do Sincronário 13:20) ─────
export interface Plasma {
  index: number;
  name: string;
  day: string;
  action: string;
  quality: string;
  chakra: string;
  chakraSanskrit?: string;
  chakraIdentity?: string;
  element?: string;
  ageCycle?: string;
  center?: string;
  balance?: string;
  governs?: string;
  mantra: string;
  mantraSolar?: string;
  frequency?: string;
  color: SealColor;
  essence?: string;
}

export const PLASMAS: Plasma[] = [
  {
    index: 1,
    name: "Dali",
    day: "Domingo",
    action: "Alvo",
    quality: "Iniciação, meta, propósito",
    chakra: "Coronário",
    chakraSanskrit: "Sahasrara",
    chakraIdentity: "Eu Compreendo",
    element: "Pensamento",
    ageCycle: "42+ anos",
    center: "Centro da consciência superior, iluminação espiritual e conexão com o divino.",
    balance: "Em equilíbrio gera despertar espiritual, clareza de propósito, sabedoria transcendente e unidade com o todo.",
    governs: "Rege cérebro, glândula pineal, sistema nervoso central e área coronária.",
    mantra: "Minha meta é realizar a ação.",
    mantraSolar: "OM",
    frequency: "Térmico",
    color: "amarelo",
    essence: "Início da semana radial e abertura do canal com a consciência superior.",
  },
  {
    index: 2,
    name: "Seli",
    day: "Segunda",
    action: "Flui",
    quality: "Fluxo",
    chakra: "Básico ou Raiz",
    chakraSanskrit: "Muladhara",
    chakraIdentity: "Eu Sou",
    element: "Terra",
    ageCycle: "0 a 7 anos",
    center: "Centro da vontade para viver e funcionar no mundo material, sobrevivência.",
    balance: "Em equilíbrio gera coragem, estabilidade, saúde física, fibra e garra.",
    governs: "Rege coluna espinhal, supra-renais, cólon, ânus, pernas e ossos.",
    mantra: "Minha luz é a consciência.",
    mantraSolar: "HRAM",
    frequency: "Lumínico",
    color: "vermelho",
    essence: "Fluxo da energia vital e estabilização.",
  },
  {
    index: 3,
    name: "Gamma",
    day: "Terça",
    action: "Pacifica",
    quality: "Paz",
    chakra: "Terceiro Olho",
    chakraSanskrit: "Ajna",
    chakraIdentity: "Eu Vejo",
    element: "Luz",
    ageCycle: "35 a 42 anos",
    center: "Centro da intuição, percepção sutil, visão interior e sabedoria.",
    balance: "Em equilíbrio gera clareza mental, discernimento, imaginação criadora e conexão com a consciência superior.",
    governs: "Rege a glândula pineal, olhos, cerebelo, ouvidos e sistema nervoso central.",
    mantra: "Minha linhagem é a união da consciência intrínseca e da consciência suprema.",
    mantraSolar: "HRAHA",
    frequency: "Térmico-Lumínico",
    color: "branco",
    essence: "Plasma da paz e da integração entre mente e espírito.",
  },
  {
    index: 4,
    name: "Kali",
    day: "Quarta",
    action: "Estabiliza",
    quality: "Estabelecimento",
    chakra: "Esplênico ou Sacral",
    chakraSanskrit: "Svadhisthana",
    chakraIdentity: "Eu Sinto",
    element: "Água",
    ageCycle: "7 a 14 anos",
    center: "Centro do desejo sexual, anseios, vida familiar e convívio social.",
    balance: "Em equilíbrio gera harmonia, tolerância, criatividade e ponto de equilíbrio.",
    governs: "Rege órgãos reprodutivos e bexiga.",
    mantra: "Meu nome é a gloriosa visão do lótus.",
    mantraSolar: "HRIM",
    frequency: "Distensão Estática",
    color: "azul",
    essence: "Purificação e despertar da energia vital.",
  },
  {
    index: 5,
    name: "Alpha",
    day: "Quinta",
    action: "Libera",
    quality: "Liberação",
    chakra: "Laríngeo",
    chakraSanskrit: "Vishuddha",
    chakraIdentity: "Eu Falo",
    element: "Éter",
    ageCycle: "28 a 35 anos",
    center: "Centro da comunicação, expressão pela palavra.",
    balance: "Em equilíbrio gera fala verdadeira, expressão de consciência.",
    governs: "Rege tireóide, garganta, boca e vias respiratórias.",
    mantra: "Minha paz é a galáxia em ação.",
    mantraSolar: "HRAUM",
    frequency: "Elétron Duplo Estendido",
    color: "amarelo",
    essence: "Vontade alinhada ao serviço planetário.",
  },
  {
    index: 6,
    name: "Limi",
    day: "Sexta",
    action: "Purifica",
    quality: "Refinamento",
    chakra: "Plexo Solar",
    chakraSanskrit: "Manipura",
    chakraIdentity: "Eu Faço",
    element: "Fogo",
    ageCycle: "14 a 21 anos",
    center: "Centro da força de vontade, poder pessoal.",
    balance: "Em equilíbrio gera autorrespeito, confiança, energia física e autocontrole.",
    governs: "Rege suprarrenais, estômago, fígado, músculos, sistema nervoso, aparelho digestivo e pâncreas.",
    mantra: "Consumo pensamentos duais como alimento. Purifico o elétron mental no Polo Norte.",
    mantraSolar: "HRUM",
    frequency: "Elétron Mental",
    color: "vermelho",
    essence: "Purificação do corpo mental e amor universal.",
  },
  {
    index: 7,
    name: "Silio",
    day: "Sábado",
    action: "Descarrega",
    quality: "Descarga",
    chakra: "Cardíaco",
    chakraSanskrit: "Anahata",
    chakraIdentity: "Eu Amo",
    element: "Ar",
    ageCycle: "21 a 28 anos",
    center: "Centro da compaixão, amor, expressão dos sentimentos.",
    balance: "Em equilíbrio gera altruísmo, perdão, aceitação e paz.",
    governs: "Rege o coração, sistema circulatório, braços, pulmões, sistema respiratório e glândula timo.",
    mantra: "Descargo o elétron mental no centro da Terra.",
    mantraSolar: "HRAIM",
    frequency: "Nêutron Elétron-Mental",
    color: "branco",
    essence: "Aterramento da energia recebida durante toda a semana.",
  },
];


/** Plasma do dia (Domingo=Dali ... Sábado=Silio). */
export function plasmaOfDay(date: Date = new Date()): Plasma {
  return PLASMAS[date.getDay()];
}

// ─── Sincronário 13 Luas × 28 dias ─────────────────────────────────
export const MOON_NAMES = [
  "Magnética Morcego",
  "Lunar Escorpião",
  "Elétrica Veado",
  "Auto-existente Coruja",
  "Entonada Pavão",
  "Rítmica Lagarto",
  "Ressonante Macaco",
  "Galáctica Falcão",
  "Solar Jaguar",
  "Planetária Cão",
  "Espectral Serpente",
  "Cristal Coelho",
  "Cósmica Tartaruga",
];

export interface SincronarioDate {
  moon: number; // 1..13 (0 se Dia Fora do Tempo)
  day: number;  // 1..28
  dayOutOfTime: boolean; // 25/jul
  moonName: string;
}

/** Retorna a posição Lua.Dia no Sincronário para uma data (26/jul = Lua 1, Dia 1). */
export function sincronarioDate(date: Date = new Date()): SincronarioDate {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth();
  const d = date.getUTCDate();

  if (m === 6 && d === 25) {
    return { moon: 0, day: 0, dayOutOfTime: true, moonName: "Dia Fora do Tempo" };
  }

  const yearStart = (m > 6 || (m === 6 && d >= 26)) ? y : y - 1;
  const start = Date.UTC(yearStart, 6, 26);
  const target = Date.UTC(y, m, d);
  let days = Math.round((target - start) / 86400000);
  days -= feb29sBetween(start, target);

  const moon = Math.floor(days / 28) + 1;
  const day = (days % 28) + 1;
  return { moon, day, dayOutOfTime: false, moonName: MOON_NAMES[moon - 1] ?? "" };
}

/** Portador do Ano (seal + tone + kin). Âncora: 1968-07-26 = Tormenta Lunar Azul (Kin 199). */
export function yearBearer(date: Date = new Date()): { seal: Seal; tone: Tone; kin: number; label: string } {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth();
  const d = date.getUTCDate();
  const yearStart = (m > 6 || (m === 6 && d >= 26)) ? y : y - 1;
  const n = yearStart - 1968;
  // Portadores do Ano: Tormenta → Semente → Lua → Mago
  const sealCycle = [19, 4, 9, 14];
  const sealIdx = sealCycle[((n % 4) + 4) % 4];
  const toneIdx = (((2 - 1 + n) % 13) + 13) % 13 + 1;
  const seal = SEALS[sealIdx - 1];
  const tone = TONES[toneIdx - 1];
  // Kin do portador via CRT: kin-1 ≡ toneIdx-1 (mod 13), kin-1 ≡ sealIdx-1 (mod 20)
  let kin = 1;
  for (let k = 1; k <= 260; k++) {
    if (((k - 1) % 13) + 1 === toneIdx && ((k - 1) % 20) + 1 === sealIdx) { kin = k; break; }
  }
  const colorPt = { vermelho: "Vermelha", branco: "Branco", azul: "Azul", amarelo: "Amarela" }[seal.color];
  return { seal, tone, kin, label: `${seal.name} ${tone.name} ${colorPt}` };
}

/** Coordenada da Bússola do Sincronário: "ano.lua.dia" (ex.: 199.1.5 para 30/07/1968). */
export function sincronarioCoordinate(date: Date = new Date()): string {
  const s = sincronarioDate(date);
  const y = yearBearer(date);
  if (s.dayOutOfTime) return `${y.kin}.0.0`;
  return `${y.kin}.${s.moon}.${s.day}`;
}



// ─── Pátron Cúbico Primário (Telektonon — 16 dias do Cubo) ────────
// Meditação dos dias 9–24 de cada Lua. Dias 9–16 constroem o
// "Cubo do Chumbo" (transmutação); 17–24 revelam o "Cubo do Ouro"
// (profecia). Cada dia carrega um códon-tema e uma face/direção.
export interface CubeDay {
  moonDay: number;       // 9..24
  index: number;         // 1..16 (posição no pátron)
  phase: "chumbo" | "ouro";
  face: string;          // direção/face do cubo
  codon: string;         // tema (códon)
  action: string;        // verbo do dia
  focus: string;         // frase de meditação
  color: SealColor;
}

export const CUBE_DAYS: CubeDay[] = [
  // Cubo do Chumbo — Transmutação
  { moonDay:  9, index: 1,  phase: "chumbo", face: "Base",         codon: "Vitalidade",           action: "Enraizar",   focus: "Enraizo minha vitalidade no presente.",            color: "vermelho" },
  { moonDay: 10, index: 2,  phase: "chumbo", face: "Frente",       codon: "Sagacidade",           action: "Discernir",  focus: "Vejo com clareza o que é e o que aparenta ser.",   color: "branco"   },
  { moonDay: 11, index: 3,  phase: "chumbo", face: "Direita",      codon: "Meditação",            action: "Silenciar",  focus: "No silêncio, meu ser recolhe-se e escuta.",        color: "azul"     },
  { moonDay: 12, index: 4,  phase: "chumbo", face: "Esquerda",     codon: "Pureza",               action: "Purificar",  focus: "Devolvo à Fonte tudo o que não é essência.",        color: "amarelo"  },
  { moonDay: 13, index: 5,  phase: "chumbo", face: "Atrás",        codon: "Ação da Fé",           action: "Confiar",    focus: "Confio no fluxo maior que me atravessa.",          color: "vermelho" },
  { moonDay: 14, index: 6,  phase: "chumbo", face: "Cima",         codon: "Amor",                 action: "Amar",       focus: "O amor é a lei que ordena a matéria.",             color: "branco"   },
  { moonDay: 15, index: 7,  phase: "chumbo", face: "Centro",       codon: "Sabedoria",            action: "Integrar",   focus: "Integro conhecimento e experiência em sabedoria.", color: "azul"     },
  { moonDay: 16, index: 8,  phase: "chumbo", face: "Núcleo",       codon: "Cubo do Destino",     action: "Selar",      focus: "Selo o cubo interior; meu destino está formado.",  color: "amarelo"  },
  // Cubo do Ouro — Profecia
  { moonDay: 17, index: 9,  phase: "ouro",   face: "Base",         codon: "Espírito",             action: "Alentar",    focus: "O espírito respira em mim como vento sutil.",      color: "vermelho" },
  { moonDay: 18, index: 10, phase: "ouro",   face: "Frente",       codon: "Fluxo",                action: "Fluir",      focus: "Fluo com o tempo natural, sem forçar nem reter.",  color: "branco"   },
  { moonDay: 19, index: 11, phase: "ouro",   face: "Direita",      codon: "Visão",                action: "Ver",        focus: "Vejo o padrão maior que unifica os fragmentos.",   color: "azul"     },
  { moonDay: 20, index: 12, phase: "ouro",   face: "Esquerda",     codon: "Intenção",             action: "Intencionar",focus: "Aponto minha intenção como flecha ao alvo.",       color: "amarelo"  },
  { moonDay: 21, index: 13, phase: "ouro",   face: "Atrás",        codon: "Cumprimento",          action: "Realizar",   focus: "O que foi prometido está sendo cumprido.",         color: "vermelho" },
  { moonDay: 22, index: 14, phase: "ouro",   face: "Cima",         codon: "Profecia",             action: "Anunciar",   focus: "Sou canal de uma palavra maior que a minha.",      color: "branco"   },
  { moonDay: 23, index: 15, phase: "ouro",   face: "Centro",       codon: "Perfeição",            action: "Refinar",    focus: "Refino as arestas — a obra tende à perfeição.",    color: "azul"     },
  { moonDay: 24, index: 16, phase: "ouro",   face: "Núcleo",       codon: "Vitória",              action: "Coroar",     focus: "Coroo o ciclo; a vitória é interior e silenciosa.", color: "amarelo"  },
];

/** Retorna o dia do Pátron Cúbico ativo hoje (ou null fora dos dias 9–24). */
export function cubeDayOfMoon(moonDay: number): CubeDay | null {
  return CUBE_DAYS.find((c) => c.moonDay === moonDay) ?? null;
}

/** Pátron Cúbico Pessoal: 16 kins derivados do Kin natal —
 *  para cada dia do cubo (1..16) toma-se natalKin + (index-1)*17 (mod 260).
 *  17 é o "salto helicoidal" do Tzolkin (5+13-1 tempero clássico do Cubo). */
export function personalCubicPattern(natalKin: number): { day: CubeDay; kin: number }[] {
  return CUBE_DAYS.map((day) => ({
    day,
    kin: (((natalKin - 1 + (day.index - 1) * 17) % 260) + 260) % 260 + 1,
  }));
}
