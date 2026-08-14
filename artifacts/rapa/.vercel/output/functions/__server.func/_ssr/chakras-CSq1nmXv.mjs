import { T as sincronarioDate, g as getKinInfo, i as PLASMAS, m as getCastleOfKin, y as kinFromDate } from "./tzolkin-CeuRSgpU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chakras-CSq1nmXv.js
var CHAKRAS = [
	{
		id: "coronario",
		numero: 7,
		nome: "Coronário",
		nomeSanskrito: "Sahasrara",
		identidade: "Eu Compreendo",
		cor: "#b98ed6",
		corNome: "Violeta",
		simbolo: "flare",
		localizacao: "Topo da cabeça",
		posY: .04,
		elemento: "Pensamento",
		palavraChave: "Consciência",
		funcaoEnergetica: "Consciência superior, iluminação espiritual e conexão com o todo.",
		orgaos: "Cérebro, glândula pineal, sistema nervoso central.",
		mantra: "OM",
		diaSemana: "Domingo",
		idadeCiclo: "42+ anos",
		plasmaIndex: 1
	},
	{
		id: "terceiro-olho",
		numero: 6,
		nome: "Terceiro Olho",
		nomeSanskrito: "Ajna",
		identidade: "Eu Vejo",
		cor: "#8489e0",
		corNome: "Índigo",
		simbolo: "visibility",
		localizacao: "Entre as sobrancelhas",
		posY: .18,
		elemento: "Luz",
		palavraChave: "Intuição",
		funcaoEnergetica: "Intuição, percepção sutil, visão interior e sabedoria.",
		orgaos: "Glândula pineal, olhos, cerebelo, ouvidos.",
		mantra: "HRAHA",
		diaSemana: "Terça",
		idadeCiclo: "35 a 42 anos",
		plasmaIndex: 3
	},
	{
		id: "laringeo",
		numero: 5,
		nome: "Laríngeo",
		nomeSanskrito: "Vishuddha",
		identidade: "Eu Falo",
		cor: "#6FBEDA",
		corNome: "Azul",
		simbolo: "graphic_eq",
		localizacao: "Garganta",
		posY: .3,
		elemento: "Éter",
		palavraChave: "Expressão",
		funcaoEnergetica: "Comunicação e expressão da verdade pela palavra.",
		orgaos: "Tireoide, garganta, boca, vias respiratórias.",
		mantra: "HRAUM",
		diaSemana: "Quinta",
		idadeCiclo: "28 a 35 anos",
		plasmaIndex: 5
	},
	{
		id: "cardiaco",
		numero: 4,
		nome: "Cardíaco",
		nomeSanskrito: "Anahata",
		identidade: "Eu Amo",
		cor: "#6fc98b",
		corNome: "Verde",
		simbolo: "favorite",
		localizacao: "Centro do peito",
		posY: .43,
		elemento: "Ar",
		palavraChave: "Amor",
		funcaoEnergetica: "Compaixão, amor e expressão dos sentimentos.",
		orgaos: "Coração, pulmões, sistema circulatório, timo.",
		mantra: "HRAIM",
		diaSemana: "Sábado",
		idadeCiclo: "21 a 28 anos",
		plasmaIndex: 7
	},
	{
		id: "plexo-solar",
		numero: 3,
		nome: "Plexo Solar",
		nomeSanskrito: "Manipura",
		identidade: "Eu Faço",
		cor: "#e8c95a",
		corNome: "Amarelo",
		simbolo: "wb_sunny",
		localizacao: "Região do abdômen",
		posY: .55,
		elemento: "Fogo",
		palavraChave: "Vontade",
		funcaoEnergetica: "Força de vontade, poder pessoal e autoconfiança.",
		orgaos: "Estômago, fígado, pâncreas, suprarrenais, músculos.",
		mantra: "HRUM",
		diaSemana: "Sexta",
		idadeCiclo: "14 a 21 anos",
		plasmaIndex: 6
	},
	{
		id: "sacral",
		numero: 2,
		nome: "Sacral",
		nomeSanskrito: "Svadhisthana",
		identidade: "Eu Sinto",
		cor: "#e58b4e",
		corNome: "Laranja",
		simbolo: "water_drop",
		localizacao: "Abaixo do umbigo",
		posY: .65,
		elemento: "Água",
		palavraChave: "Criatividade",
		funcaoEnergetica: "Criatividade, desejo, vida familiar e convívio social.",
		orgaos: "Órgãos reprodutivos e bexiga.",
		mantra: "HRIM",
		diaSemana: "Quarta",
		idadeCiclo: "7 a 14 anos",
		plasmaIndex: 4
	},
	{
		id: "raiz",
		numero: 1,
		nome: "Raiz",
		nomeSanskrito: "Muladhara",
		identidade: "Eu Sou",
		cor: "#e0524d",
		corNome: "Vermelho",
		simbolo: "spa",
		localizacao: "Base da coluna",
		posY: .76,
		elemento: "Terra",
		palavraChave: "Enraizamento",
		funcaoEnergetica: "Sobrevivência, estabilidade e vontade de viver no mundo material.",
		orgaos: "Coluna, suprarrenais, cólon, pernas, ossos.",
		mantra: "HRAM",
		diaSemana: "Segunda",
		idadeCiclo: "0 a 7 anos",
		plasmaIndex: 2
	}
];
/** Ordem energética ascendente: 1 (Raiz) → 7 (Coronário). */
var CHAKRAS_ASCENDENTE = [...CHAKRAS].sort((a, b) => a.numero - b.numero);
function plasmaOfChakra(c) {
	return PLASMAS[c.plasmaIndex - 1];
}
/**
* Modelos de correspondência disponíveis. O modelo ativo define como o
* chakra se liga ao restante do sistema. Chakra ↔ Plasma Radial é a única
* associação fixa do Sincronário/Dreamspell; Selo, Tom, Kin, Onda, Castelo
* e Lua são derivados da DATA (via plasma do dia), não do chakra em si.
*/
var CORRESPONDENCE_MODELS = [{
	id: "sincronario-dreamspell",
	nome: "Sincronário da Paz / Dreamspell",
	descricao: "Chakra ↔ Plasma Radial conforme a semana radial de 7 dias do Sincronário. Selo, Tom, Kin, Onda, Castelo e Lua são calculados a partir da data.",
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
		elemento: "projeto"
	}
}];
function activeModel() {
	return CORRESPONDENCE_MODELS.find((m) => m.ativo) ?? CORRESPONDENCE_MODELS[0];
}
/** Data → Kin → Plasma do dia → Chakra em sintonia. */
function chakraDayReading(date = /* @__PURE__ */ new Date()) {
	const civil = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12));
	const plasma = PLASMAS[civil.getUTCDay()];
	const chakra = CHAKRAS.find((c) => c.plasmaIndex === plasma.index) ?? CHAKRAS[CHAKRAS.length - 1];
	const kin = kinFromDate(civil);
	const kinInfo = getKinInfo(kin);
	return {
		date,
		plasma,
		chakra,
		kin,
		kinInfo,
		castle: getCastleOfKin(kin),
		sincronario: sincronarioDate(civil),
		interpretacao: `${plasma.name} ${plasma.action.toLowerCase()} a energia do dia no chakra ${chakra.nome} (${chakra.identidade}). Com o Kin ${kin} — ${kinInfo.fullName} — a energia convida a ${kinInfo.seal.action.toLowerCase()} no tom ${kinInfo.tone.name.toLowerCase()}, energia de ${kinInfo.tone.essence.toLowerCase()}.`
	};
}
//#endregion
export { plasmaOfChakra as a, chakraDayReading as i, CHAKRAS_ASCENDENTE as n, activeModel as r, CHAKRAS as t };
