# RAPA — Convenções de Documentação

**Versão:** 1.0
**Status:** Norma
**Data:** Julho de 2026

---

A documentação da RAPA é parte do produto. Estas convenções valem para todo `docs/`, `prompts/` e `README.md` do repositório.

## 1. Estrutura de versionamento

Todo documento oficial usa cabeçalho:

```markdown
# RAPA — <Nome do Documento> vX.Y

**Versão:** X.Y
**Status:** Draft | Em Revisão | Aprovado | Norma | A escrever
**Data:** Mês de AAAA
```

E rodapé com changelog:

```markdown
## Changelog
- v1.0 (Jul/2026) — Versão inicial.
```

Incrementos: **X** para mudança estrutural, **Y** para revisões incrementais.

## 2. Escrita por sprints

Documentos longos (>30 páginas) são escritos por **sprints**, um capítulo (ou pequeno grupo) por rodada. Cada capítulo é entregue completo antes de passar ao próximo.

O índice do documento marca `[Sprint N]` ao lado de cada capítulo para tornar visível o estado.

## 3. Template Apple-style para funcionalidades

Toda funcionalidade da Functional Specification (e demais docs que descrevem features) usa **exatamente** este template:

```markdown
### <Nome da Funcionalidade>

**Objetivo.** ...
**Problema.** ...
**Descrição.** ...

**Fluxo.**
1. ...
2. ...

**Regras.**
- ...

**Estados.**
- Vazio: ...
- Carregando: ...
- Sucesso: ...
- Erro: ...

**Banco.** Tabelas / colunas envolvidas.
**APIs.** Endpoints / server functions.
**Eventos.** Analytics disparados.
**UX.** Notas de interface, textos, tom.
**Critérios de Aceite.**
- [ ] ...
**Futuras Evoluções.** ...
```

Nenhuma seção é opcional. Quando não se aplica, escrever "N/A" explicitamente.

## 4. Nomenclatura de releases

A RAPA **não** usa "MVP" como nome oficial do produto. Usamos:

```text
Foundation Release   (v1) — a fundação
Journey Release      (v2) — diário e memória expandidos
Community Release    (v3) — comunidade e compartilhamento
Knowledge Release    (v4) — cursos e biblioteca profunda
Consciousness Platform (v5) — IA plena de longo prazo
```

O termo "MVP" pode aparecer em textos técnicos como conceito de indústria; a versão 1 do produto chama-se **Foundation Release**.

## 5. Tom da documentação

Segue o Brand Book: claro, calmo, objetivo, elegante, respeitoso. Sem sensacionalismo. Sem promessas de previsão. Sem substituir cuidado médico/psicológico.

## 6. Idioma

Documentos em português do Brasil. Termos técnicos (endpoint, RLS, embedding) podem ficar em inglês. Nomes de módulos e telas em português.

## 7. Diagramas

Preferir blocos ```text``` ASCII para diagramas simples, para manter o repositório legível em qualquer viewer.

## 8. Referências cruzadas

Sempre linkar documentos relacionados por caminho relativo:

```markdown
Ver `docs/02_Product/Personas_v1.0.md`.
```

## Changelog
- v1.0 (Jul/2026) — Convenções iniciais.
