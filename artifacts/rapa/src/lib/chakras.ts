// ─── Módulo 7 Chakras — dados independentes da interface ────────────────────
//
// As correspondências entre Chakras e Plasmas Radiais seguem o sistema
// contemporâneo do Sincronário da Paz / Dreamspell (fonte: PLASMAS em
// tzolkin.ts). Correspondências adicionais (Selo, Tom, Kin, Onda) NÃO são
// fixas por chakra: elas são derivadas dinamicamente da data via o plasma
// do dia — e ficam marcadas com sua origem no Mapa de Correspondências.

import {
  PLASMAS,
  kinFromDate,
  getKinInfo,
  getCastleOfKin,
  sincronarioDate,
  type Plasma,
  type KinInfo,
  type SincronarioDate,
} from "./tzolkin";

export interface Chakra {
  id: string;
  numero: number; // 1 (Raiz) .. 7 (Coronário)
  nome: string;
  nomeSanskrito: string;
  identidade: string; // "Eu Sou", "Eu Sinto"...
  cor: string; // hex tradicional
  corNome: string;
  simbolo: string; // material symbol
  localizacao: string;
  /** posição vertical na figura humana, 0 = topo da cabeça, 1 = base */
  posY: number;
  elemento: string;
  palavraChave: string;
  funcaoEnergetica: string;
  orgaos: string;
  mantra: string; // mantra solar (bija)
  diaSemana: string;
  idadeCiclo: string;
  plasmaIndex: number; // 1..7 → PLASMAS
}

// Ordem corporal: 7 (topo) → 1 (base)
export const CHAKRAS: Chakra[] = [
  {
    id: "coronario", numero: 7, nome: "Coronário", nomeSanskrito: "Sahasrara",
    identidade: "Eu Compreendo", cor: "#b98ed6", corNome: "Violeta",
    simbolo: "flare", localizacao: "Topo da cabeça", posY: 0.03,
    elemento: "Pensamento", palavraChave: "Consciência",
    funcaoEnergetica: "Consciência superior, iluminação espiritual e conexão com o todo.",
    orgaos: "Cérebro, glândula pineal, sistema nervoso central.",
    mantra: "OM", diaSemana: "Domingo", idadeCiclo: "42+ anos", plasmaIndex: 1,
  },
  {
    id: "terceiro-olho", numero: 6, nome: "Terceiro Olho", nomeSanskrito: "Ajna",
    identidade: "Eu Vejo", cor: "#8489e0", corNome: "Índigo",
    simbolo: "visibility", localizacao: "Entre as sobrancelhas", posY: 0.115,
    elemento: "Luz", palavraChave: "Intuição",
    funcaoEnergetica: "Intuição, percepção sutil, visão interior e sabedoria.",
    orgaos: "Glândula pineal, olhos, cerebelo, ouvidos.",
    mantra: "HRAHA", diaSemana: "Terça", idadeCiclo: "35 a 42 anos", plasmaIndex: 3,
  },
  {
    id: "laringeo", numero: 5, nome: "Laríngeo", nomeSanskrito: "Vishuddha",
    identidade: "Eu Falo", cor: "#6FBEDA", corNome: "Azul",
    simbolo: "graphic_eq", localizacao: "Garganta", posY: 0.21,
    elemento: "Éter", palavraChave: "Expressão",
    funcaoEnergetica: "Comunicação e expressão da verdade pela palavra.",
    orgaos: "Tireoide, garganta, boca, vias respiratórias.",
    mantra: "HRAUM", diaSemana: "Quinta", idadeCiclo: "28 a 35 anos", plasmaIndex: 5,
  },
  {
    id: "cardiaco", numero: 4, nome: "Cardíaco", nomeSanskrito: "Anahata",
    identidade: "Eu Amo", cor: "#6fc98b", corNome: "Verde",
    simbolo: "favorite", localizacao: "Centro do peito", posY: 0.335,
    elemento: "Ar", palavraChave: "Amor",
    funcaoEnergetica: "Compaixão, amor e expressão dos sentimentos.",
    orgaos: "Coração, pulmões, sistema circulatório, timo.",
    mantra: "HRAIM", diaSemana: "Sábado", idadeCiclo: "21 a 28 anos", plasmaIndex: 7,
  },
  {
    id: "plexo-solar", numero: 3, nome: "Plexo Solar", nomeSanskrito: "Manipura",
    identidade: "Eu Faço", cor: "#e8c95a", corNome: "Amarelo",
    simbolo: "wb_sunny", localizacao: "Região do abdômen", posY: 0.46,
    elemento: "Fogo", palavraChave: "Vontade",
    funcaoEnergetica: "Força de vontade, poder pessoal e autoconfiança.",
    orgaos: "Estômago, fígado, pâncreas, suprarrenais, músculos.",
    mantra: "HRUM", diaSemana: "Sexta", idadeCiclo: "14 a 21 anos", plasmaIndex: 6,
  },
  {
    id: "sacral", numero: 2, nome: "Sacral", nomeSanskrito: "Svadhisthana",
    identidade: "Eu Sinto", cor: "#e58b4e", corNome: "Laranja",
    simbolo: "water_drop", localizacao: "Abaixo do umbigo", posY: 0.565,
    elemento: "Água", palavraChave: "Criatividade",
    funcaoEnergetica: "Criatividade, desejo, vida familiar e convívio social.",
    orgaos: "Órgãos reprodutivos e bexiga.",
    mantra: "HRIM", diaSemana: "Quarta", idadeCiclo: "7 a 14 anos", plasmaIndex: 4,
  },
  {
    id: "raiz", numero: 1, nome: "Raiz", nomeSanskrito: "Muladhara",
    identidade: "Eu Sou", cor: "#e0524d", corNome: "Vermelho",
    simbolo: "spa", localizacao: "Base da coluna", posY: 0.665,
    elemento: "Terra", palavraChave: "Enraizamento",
    funcaoEnergetica: "Sobrevivência, estabilidade e vontade de viver no mundo material.",
    orgaos: "Coluna, suprarrenais, cólon, pernas, ossos.",
    mantra: "HRAM", diaSemana: "Segunda", idadeCiclo: "0 a 7 anos", plasmaIndex: 2,
  },
];

/** Ordem energética ascendente: 1 (Raiz) → 7 (Coronário). */
export const CHAKRAS_ASCENDENTE = [...CHAKRAS].sort((a, b) => a.numero - b.numero);

export function chakraById(id: string): Chakra | undefined {
  return CHAKRAS.find((c) => c.id === id);
}

export function plasmaOfChakra(c: Chakra): Plasma {
  return PLASMAS[c.plasmaIndex - 1];
}

// ─── Mapa de Correspondências (configurável) ────────────────────────────────

export type CorrespondenceSource = "sincronario" | "projeto";

export interface CorrespondenceModel {
  id: string;
  nome: string;
  descricao: string;
  ativo: boolean;
  /** origem de cada tipo de associação exibida */
  fontes: Record<string, CorrespondenceSource>;
}

/**
 * Modelos de correspondência disponíveis. O modelo ativo define como o
 * chakra se liga ao restante do sistema. Chakra ↔ Plasma Radial é a única
 * associação fixa do Sincronário/Dreamspell; Selo, Tom, Kin, Onda, Castelo
 * e Lua são derivados da DATA (via plasma do dia), não do chakra em si.
 */
export const CORRESPONDENCE_MODELS: CorrespondenceModel[] = [
  {
    id: "sincronario-dreamspell",
    nome: "Sincronário da Paz / Dreamspell",
    descricao:
      "Chakra ↔ Plasma Radial conforme a semana radial de 7 dias do Sincronário. Selo, Tom, Kin, Onda, Castelo e Lua são calculados a partir da data.",
    ativo: true,
    fontes: {
      plasma: "sincronario",
      diaSemana: "sincronario",
      selo: "sincronario",
      tom: "sincronario",
      kin: "sincronario",
      onda: "sincronario",
      castelo: "sincronario",
      lua: "sincronario",
      cor: "projeto",
      simbolo: "projeto",
      elemento: "projeto",
    },
  },
];

export function activeModel(): CorrespondenceModel {
  return CORRESPONDENCE_MODELS.find((m) => m.ativo) ?? CORRESPONDENCE_MODELS[0];
}

// ─── Leitura do dia ─────────────────────────────────────────────────────────

export interface ChakraDayReading {
  date: Date;
  plasma: Plasma;
  chakra: Chakra;
  kin: number;
  kinInfo: KinInfo;
  castle: ReturnType<typeof getCastleOfKin>;
  sincronario: SincronarioDate;
  interpretacao: string;
}

/** Data → Kin → Plasma do dia → Chakra em sintonia. */
export function chakraDayReading(date: Date = new Date()): ChakraDayReading {
  // Normaliza para o dia civil local (meio-dia UTC) para que plasma (dia da
  // semana), kin e sincronário se refiram todos ao MESMO dia de calendário,
  // independentemente do fuso horário.
  const civil = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12));
  const plasma = PLASMAS[civil.getUTCDay()];
  const chakra =
    CHAKRAS.find((c) => c.plasmaIndex === plasma.index) ?? CHAKRAS[CHAKRAS.length - 1];
  const kin = kinFromDate(civil);
  const kinInfo = getKinInfo(kin);
  const castle = getCastleOfKin(kin);
  const sincronario = sincronarioDate(civil);
  const interpretacao =
    `${plasma.name} ${plasma.action.toLowerCase()} a energia do dia no chakra ${chakra.nome} (${chakra.identidade}). ` +
    `Com o Kin ${kin} — ${kinInfo.fullName} — a energia convida a ${kinInfo.seal.action.toLowerCase()} ` +
    `no tom ${kinInfo.tone.name.toLowerCase()}, energia de ${kinInfo.tone.essence.toLowerCase()}.`;
  return { date, plasma, chakra, kin, kinInfo, castle, sincronario, interpretacao };
}
