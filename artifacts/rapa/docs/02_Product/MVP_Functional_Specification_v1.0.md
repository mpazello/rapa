# RAPA — Functional Specification — Foundation Release v1.0

**Versão:** 1.0 (em construção por sprints)
**Status:** Sprint 1 entregue — capítulos 1 a 4
**Data:** Julho de 2026

> Este é o documento operacional da **Foundation Release**. É escrito por sprints, um bloco de capítulos por rodada, seguindo as convenções em `docs/CONVENTIONS.md`. Todo capítulo de funcionalidade a partir do capítulo 5 usa o template Apple-style: **Nome · Objetivo · Problema · Descrição · Fluxo · Regras · Estados · Banco · APIs · Eventos · UX · Critérios de Aceite · Futuras Evoluções**.

---

## Índice geral

```text
[Sprint 1]  1. Objetivos
[Sprint 1]  2. Escopo
[Sprint 1]  3. Arquitetura funcional
[Sprint 1]  4. Personas (aplicação)
[Sprint 2]  5. Jornada aplicada
[Sprint 2]  6. Fluxos
[Sprint 2]  7. Mapa de Telas
[Sprint 2]  8. Componentes
[Sprint 3]  9. Modelo de dados
[Sprint 3] 10. APIs e Server Functions
[Sprint 3] 11. IA — KAI
[Sprint 4] 12. Biblioteca
[Sprint 4] 13. Diário
[Sprint 4] 14. Linha da Vida
[Sprint 4]     · Memórias
[Sprint 5] 15. Tzolkin
[Sprint 5] 16. Sincronário
[Sprint 6] 17. Perfil
[Sprint 6] 18. Configurações
[Sprint 6] 19. Segurança
[Sprint 6] 20. Analytics
[Sprint 6] 21. Roadmap Foundation
```

---

# 1. Objetivos

## 1.1 Promessa em uma frase

> **A Foundation Release ajuda o usuário a iniciar uma jornada de autoconhecimento por meio de registros pessoais, ciclos e reflexões assistidas por IA.**

## 1.2 A hipótese que estamos testando

A Foundation Release **não** existe para validar o Tzolkin, nem para provar que sistemas simbólicos "funcionam". Ela existe para testar uma hipótese anterior:

> _As pessoas desejam registrar sua jornada e compreender seus próprios padrões com a ajuda de IA e de sistemas simbólicos._

Se essa hipótese for corroborada, os próximos releases podem adicionar módulos (comunidade, cursos, novos sistemas) sem perder a essência.

## 1.3 Pergunta única de sucesso

Quando alguém usar a RAPA durante 30 dias, o que queremos que aconteça?

> _"Agora consigo perceber melhor meus padrões e tenho vontade de continuar registrando minha jornada."_

Se essa frase for verdadeira para uma parcela significativa dos usuários ativos, a Foundation cumpriu seu papel.

## 1.4 A métrica-mãe

A métrica principal da Foundation **não** é número de telas, quantidade de conteúdo ou Kins calculados. É:

> _O usuário criou uma relação contínua com sua própria jornada?_

## 1.5 Grupos de métricas

**Ativação.**
- Criou conta.
- Completou perfil (Kin natal calculado, apelido definido).
- Fez primeiro registro em até 24h após cadastro.

**Engajamento.**
- Registros por semana.
- Dias ativos por semana.
- Conversas com KAI por semana.
- Leituras concluídas na Biblioteca.

**Retenção.**
- D+1, D+7, D+30.
- Existência de histórico com 4+ semanas contínuas.
- Interação com Memórias.

**Valor percebido.**
- Pesquisa in-app periódica: _"A RAPA ajudou você a compreender algo sobre si mesmo?"_ (escala 1–5 + campo opcional).

## 1.6 Alvos numéricos iniciais (a calibrar após primeiros 500 usuários)

| Métrica | Alvo Foundation |
|---|---|
| Ativação (registro em D0) | ≥ 55% |
| Retorno D+1 | ≥ 45% |
| Retorno D+7 | ≥ 30% |
| Retorno D+30 | ≥ 18% |
| Registros/semana em usuários ativos | ≥ 3 |
| NPS relacional após 30 dias | ≥ 40 |

Números provisórios. Serão revistos com dados reais.

## 1.7 Anti-objetivos

A Foundation **não** busca:

- Maximizar tempo de tela.
- Maximizar sessões por dia.
- Crescer viralmente a qualquer custo.
- Otimizar para monetização precoce.
- Impressionar com quantidade de features.

---

# 2. Escopo

## 2.1 O que entra na Foundation

- Autenticação (e-mail + senha, ao menos um provedor social).
- Perfil pessoal (nome/apelido, data de nascimento, Kin natal, privacidade).
- Home viva ("Bom dia, X. Como você está hoje?" + 5 emojis + módulos-chave).
- Diário pessoal (texto, humor, tags leves).
- Linha da Vida (marcos manuais com data, título, descrição, imagem opcional).
- Feature **Memórias** (reapresentação afetiva de registros passados).
- Calendário diário e Kin do dia (Tzolkin).
- Módulo Ciclos (Tzolkin + Sincronário da Paz, estudo e consulta).
- Biblioteca inicial (número reduzido de textos curados, com marcador de leitura).
- KAI — assistente de IA contextual, com abertura _"O que você gostaria de compreender hoje?"_.
- Notificações diárias opcionais, uma por dia, curtas.
- Exportação de dados pelo usuário.

## 2.2 O que fica **fora** da Foundation

| Funcionalidade | Motivo |
|---|---|
| Comunidade | Complexidade alta e depende de massa crítica. Vem na Community Release. |
| Cursos | Depende da Biblioteca madura. Vem na Knowledge Release. |
| Marketplace | Não é essencial para validar a proposta de valor. |
| Astrologia | Expande escopo simbólico cedo demais. |
| Human Design | Módulo futuro, depois de arquitetura de conteúdo pronta. |
| Gene Keys | Idem. |
| Integração com wearables | Interessante, mas não essencial para aprender com os registros do usuário. |
| Compartilhamento social | Foco inicial é a jornada individual. |
| Gamificação avançada (streaks agressivos, ranks, badges) | Precisamos entender o que realmente motiva o usuário antes. |
| App mobile nativo (iOS/Android) | Web-first responsivo. Nativo vem na Journey Release ou depois. |
| Voz / áudio para KAI | Fora do escopo inicial. |
| Modo colaborativo (dois usuários compartilhando registros) | Fora. |

## 2.3 Regras de decisão para incluir algo novo

Uma feature só entra na Foundation se:

1. Contribui diretamente para **criar hábito de retorno**, ou
2. É pré-requisito técnico ou legal do que já entrou, ou
3. Remove uma fricção crítica em uma das seis etapas da jornada.

Nenhum dos três → adiar para o release apropriado.

---

# 3. Arquitetura funcional

## 3.1 Os quatro pilares operacionais

Na Foundation, os quatro pilares do produto aparecem como quatro **verbos aplicados ao usuário**:

1. **Registrar** — o usuário registra sua vida. Diário, humor, Linha da Vida, sonhos (leves).
2. **Conhecer** — o usuário aprende. Tzolkin, Sincronário, Biblioteca.
3. **Refletir** — o usuário reflete com KAI, que faz perguntas em vez de dar respostas.
4. **Evoluir** — o usuário vê padrões, continuidade, evolução pessoal. Nunca "pontuação espiritual".

Todo módulo da Foundation se declara pertencente a um pilar principal (e no máximo um secundário).

## 3.2 Mapa de módulos da Foundation

```text
Foundation Release
├── Identidade         (auth, sessão)
├── Perfil             (dados, Kin natal, privacidade)
├── Home / Hoje        (pilar Registrar + Refletir)
├── Diário             (pilar Registrar)
├── Linha da Vida      (pilar Registrar)
├── Memórias           (pilar Evoluir)
├── Ciclos             (pilar Conhecer — Tzolkin + Sincronário)
├── Biblioteca         (pilar Conhecer)
├── KAI                (pilar Refletir)
├── Notificações       (transversal)
├── Analytics          (transversal, interno)
└── Configurações      (transversal — privacidade, exportação)
```

Módulos fora da Foundation (comunidade, cursos, meditações, estudos guiados, APIs públicas) permanecem no mapa conceitual do Core Engine, mas **não** têm superfície nesta versão.

## 3.3 Menu inferior (bottom nav)

Cinco abas. Nada mais.

```text
🏠 Hoje   📖 Jornada   🌀 Ciclos   🤖 KAI   👤 Perfil
```

- **Hoje** — Home viva.
- **Jornada** — Linha da Vida + Diário + Memórias.
- **Ciclos** — Tzolkin, Sincronário, consulta e estudo.
- **KAI** — reflexões guiadas.
- **Perfil** — dados, Linha da Vida resumida, configurações, exportação.

## 3.4 Home — decisões estruturais

A Home começa **pela pessoa**, não pelo Kin. Ordem visual obrigatória:

```text
RAPA
Bom dia, {apelido}.
Como você está hoje?
😊 😄 😐 😔 😴

[ Registrar hoje ]
[ Minha Jornada ]
[ Ciclo do Dia ]
[ Biblioteca ]
[ Conversar com KAI ]
```

Regras:

- Nenhum Kin aparece antes do bloco de humor.
- Nenhum número (streak, pontos, pontuação) na Home.
- A Home muda todo dia (evento de um ano atrás, sugestão contextual, reflexão do dia).

## 3.5 KAI — decisões estruturais

- Abre com: _"O que você gostaria de compreender hoje?"_ (nunca "Em que posso ajudar?").
- É **mentor**, não chatbot. Faz perguntas antes de dar respostas.
- Tem acesso contextual a: perfil, últimos registros (com consentimento), Kin natal, Kin do dia.
- Nunca oferece previsão. Nunca julga. Nunca prescreve.
- Detalhamento completo no capítulo 11.

## 3.6 Memórias — decisão de identidade

**Memórias** é a feature-âncora do vínculo afetivo. Estilo Google Fotos, aplicado à vida:

> _"Há exatamente dois anos você registrou esta reflexão. Quer reler?"_

Aparece na Home quando existe material relevante. Detalhamento no capítulo 14.

## 3.7 Web-first responsivo

A Foundation é entregue como web app responsivo (mobile-first, mas totalmente utilizável em desktop). Apps nativos ficam para a Journey Release ou posterior.

## 3.8 Backend

Backend em Lovable Cloud (Supabase gerenciado): PostgreSQL, Auth, Storage, Edge Functions/Server Functions. Detalhamento em `docs/04_Technology/Architecture_v1.0.md` e no capítulo 9.

---

# 4. Personas (aplicação à Foundation)

Referência completa: `docs/02_Product/Personas_v1.0.md`.

Aqui registramos apenas **como cada persona usa a Foundation** e **quais decisões de produto elas justificam**.

## 4.1 Persona 1 — O Explorador

**Uso típico na Foundation.** Marca humor na Home, faz registros curtos, conversa com KAI, lê aos poucos na Biblioteca.
**Decisões que ele justifica.**
- Onboarding mínimo com uma tela de descoberta pessoal (Kin natal explicado em 3 parágrafos).
- Convite explícito ao KAI ainda na sessão 1.
- Textos curtos e acolhedores em toda a interface.

## 4.2 Persona 2 — O Estudioso

**Uso típico.** Sessões longas em Ciclos e Biblioteca. Anotações em cima de conteúdo. Consulta rápida do Kin.
**Decisões que ele justifica.**
- Atalho para pular a introdução ao Tzolkin.
- Ciclos com nível de profundidade real, não superficial.
- Exportação plena de anotações (Foundation).

## 4.3 Persona 3 — O Profissional em Transformação

**Uso típico.** Registro diário curto, retrospectiva semanal, KAI ajudando a formular perguntas para a terapia.
**Decisões que ele justifica.**
- Notificações opcionais, jamais culpabilizantes.
- KAI que faz perguntas, nunca prescreve.
- Privacidade e controle de dados como pilar visível.

## 4.4 Persona 4 — O Guardião da Memória

**Uso típico.** Sessão longa semanal na Linha da Vida, diário curto diário, revisita frequente às Memórias.
**Decisões que ele justifica.**
- Linha da Vida robusta desde o dia 1 (não é feature "para v2").
- Exportação plena garantida na Foundation (não trancar dados atrás de assinatura).
- Estética sóbria e adulta, sem infantilização.

## 4.5 Matriz persona × módulo (Foundation)

| Módulo | Explorador | Estudioso | Em Transformação | Guardião |
|---|---|---|---|---|
| Home / Hoje | ●●● | ● | ●●● | ●●● |
| Diário | ●●● | ●● | ●●● | ●●● |
| Linha da Vida | ● | ●● | ●● | ●●● |
| Memórias | ●● | ● | ●●● | ●●● |
| Ciclos | ●● | ●●● | ● | ●● |
| Biblioteca | ●● | ●●● | ● | ●● |
| KAI | ●●● | ●● | ●●● | ● |

_(● baixo · ●● médio · ●●● central)_

---

## Próximo sprint

**Sprint 2 — Jornada aplicada, Fluxos, Mapa de Telas (Home, Hoje, Jornada, Ciclos, KAI, Perfil) e Componentes base.**

## Changelog
- v1.0 — Sprint 1 (Jul/2026): capítulos 1–4 entregues.
