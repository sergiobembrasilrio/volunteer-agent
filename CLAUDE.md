# Volunteer-Ops — AI Volunteer Search System

## O que é este sistema

Sistema para encontrar, analisar e candidatar a oportunidades de voluntariado e work exchange ao redor do mundo. Funciona com Claude Code + Playwright MCP. Sem código, sem scripts — o Claude lê os ficheiros, navega nos sites e gera mensagens.

**Separação de responsabilidades:**
- `C:\Users\sergi\career-ops` → busca de emprego formal
- `C:\Users\sergi\volunteer-agent` → busca de voluntariados e work exchange

## Facebook scan — Chrome CDP (com login)

Para vasculhar grupos de Facebook com o utilizador logado, usa-se o mesmo padrão do career-ops para o LinkedIn: Chrome com debugging port 9222.

**Setup (uma única vez):**
```
node launch-chrome-facebook.mjs
```
Chrome abre com o perfil `C:\chrome-scan-profile`. Navega até facebook.com e faz login manualmente. Sessão fica guardada no perfil para sempre.

**Uso regular:**
```
node launch-chrome-facebook.mjs   ← lançar Chrome (fechar instâncias abertas)
node facebook-scan.mjs            ← scan de 4 grupos aleatórios
node facebook-scan.mjs --all      ← todos os grupos configurados
node facebook-scan.mjs --dry-run  ← preview sem escrever ficheiros
```

**O que o scanner faz:**
- Conecta ao Chrome via CDP (port 9222)
- Navega cada grupo de Facebook da lista `facebook_public_groups` em `portais.yml`
- Extrai posts com keywords de voluntariado (PT/ES/EN/IT/FR)
- Filtra posts dos últimos 30 dias
- Adiciona os relevantes a `data/pipeline.md` para análise
- Pauses de 15–35s entre grupos (comportamento humano)

**Grupos configurados:** ver `portais.yml → facebook_public_groups` e `grupos-facebook.md`

**Regra crítica:** o script NUNCA clica em Join, Like, Comment, Share — só lê. O perfil de Facebook é pessoal e único.

---

## Ficheiros principais

| Ficheiro | Função |
|---|---|
| `profile.md` | Perfil do voluntário — quem é, skills, idiomas, preferências |
| `analisar_oportunidade.md` | Template v3.1 para análise completa de oportunidades |
| `portais.yml` | Lista de portais e URLs a vasculhar por região |
| `fontes-gratuitas.md` | Mapa completo de plataformas, ranqueadas por relevância |
| `fontes-extras-pesquisa-2026-05-17.md` | Plataformas para Sudeste Asiático e África |
| `fontes-extras-sudeste-asia-africa.md` | Fontes adicionais por região |
| `grupos-facebook.md` | Grupos de Facebook relevantes |
| `data/pipeline.md` | Inbox de oportunidades pendentes para analisar |
| `data/contacts.md` | Tracker de mensagens enviadas a hosts |
| `data/scan-history.tsv` | Histórico de URLs já vistas (dedup) |
| `analyses/` | Análises completas geradas (formato: `AAAA-MM-DD-titulo.md`) |
| `messages/` | Mensagens geradas para hosts |

## Modos de uso

| Se o utilizador... | Modo |
|---|---|
| Diz `scan` ou `scan [região]` | **scan** — vasculha portais com Playwright, adiciona ao pipeline |
| Cola URL ou texto de oportunidade | **analyze** — análise completa + mensagem se aprovada |
| Diz `pipeline` | **pipeline** — processa URLs pendentes em `data/pipeline.md` |
| Diz `contacts` ou `tracker` | **contacts** — mostra histórico de contatos enviados |
| Diz `message` + URL/texto | **message** — gera só a mensagem (oportunidade já analisada) |
| Diz `apply` ou `candidatar` + oportunidade | **apply** — gera PDF, preenche formulário, regista no tracker (ver `modes/apply.md`) |
| Diz `enrich` ou `enriquecer perfil` | **enrich** — rastreia Gmail + web para enriquecer o perfil (ver `modes/enrich-profile.md`) |

## Modo SCAN — como funciona

O scan usa Playwright MCP para navegar nos portais listados em `portais.yml`. Sem código — é o Claude a navegar como um humano faria.

**Comandos de scan e filtros de região:**

| Comando | Comportamento |
|---|---|
| `scan` | Varre apenas as regiões marcadas `true` em `active_regions` de `portais.yml` |
| `scan eu` / `scan europe` / `scan schengen` | Força scan só de `europe_schengen` |
| `scan balkans` / `scan east europe` | Força scan só de `europe_east_balkans` |
| `scan georgia` / `scan caucasus` | Força scan só de `europe_caucasus` |
| `scan japan` / `scan asia east` | Força scan só de `asia_east` |
| `scan sea` / `scan southeast asia` | Força scan só de `asia_southeast` |
| `scan africa` | Força scan só das regiões Africa |
| `scan americas` | Força scan das regiões Americas |
| `scan oceania` | Força scan só de `oceania` |
| `scan all` | Ignora config, varre todas as regiões |
| `scan facebook` | Varre grupos públicos de Facebook listados em `portais.yml` |

**Quando o scan é executado:**

1. Ler `portais.yml` — identificar região(ões) a vasculhar
2. Ler `data/scan-history.tsv` — não adicionar URLs já vistas
3. Para cada portal/URL na região:
   - `browser_navigate` → URL da listagem
   - `browser_snapshot` → ler títulos e links das oportunidades listadas
   - Navegar página a página se houver paginação (clicar "next" / "página 2")
   - Extrair: título, localização, URL, plataforma
4. Filtrar contra negativos (ver secção abaixo) e contra histórico dedup
5. Adicionar novas oportunidades a `data/pipeline.md` na secção correcta por fase
6. Actualizar `data/scan-history.tsv` com novas URLs vistas
7. Reportar: portais visitados, oportunidades encontradas, adicionadas ao pipeline

**Filtros negativos de título (não adicionar ao pipeline):**
- Volunturismo pago ("program fee", "placement fee", "registration fee")
- Apenas baseado em país sem possibilidade de viajantes ("local volunteers only", "must be resident")
- Posições que exigem certificação específica ("certified nurse", "licensed teacher", "medical degree")
- Posições em zonas de guerra / alto risco
- Posições com menos de 1 semana de duração

**Nota sobre Facebook:** NÃO automatizar acções no Facebook. Só leitura passiva em grupos onde o utilizador já está, e sempre com comportamento humano (sem scroll automático). O utilizador faz essa parte manualmente e cola o texto aqui para análise.

## Modo ANALYZE — como funciona

Quando o utilizador cola uma URL ou texto de oportunidade:

1. Se for URL: `browser_navigate` + `browser_snapshot` para ler o conteúdo completo
2. Ler `profile.md` para ter o perfil actualizado
3. **Verificar compatibilidade de fase** antes da análise completa: se as datas do host conflituam com o roteiro activo (ex: precisam de voluntário Jan–Jul 2026 sem flexibilidade) → veredicto imediato DESCARTADA por fase, não processar mais
4. **Short-circuit INCERTA:** se após leitura inicial houver 3+ bandeiras médias ou fonte 🔴 + trust score <5, gerar veredicto curto (3–5 linhas) sem correr o template completo — poupar contexto para oportunidades promissoras
5. **Flag Japão:** se a oportunidade for no Japão, assinalar logo `🇯🇵 JAPAN — OPORTUNIDADE PRIORITÁRIA` no topo da análise e usar a variante de mensagem Japan
6. Aplicar o template completo de `analisar_oportunidade.md` v4.0 — inclui quick discard check, scoring 0–10 com pesos, bandeiras volunteer-tourism-specific, trust signals
7. **Verificação cross-platform** (obrigatória para EXCELENTE ou BOA): 2 min pesquisa — Google Maps + Instagram + Reddit/Trustpilot + reverse image search nas fotos do anúncio. Anotar resultado na análise.
8. Se veredicto for BOA ou PROMISSORA: gerar mensagem personalizada seguindo as diretrizes do template
9. Salvar análise em `analyses/AAAA-MM-DD-slug.md`
10. Salvar mensagem gerada em `messages/AAAA-MM-DD-slug.md`
11. **Loop de aprendizagem:** se o utilizador der feedback ("score alto demais", "eu não me candidataria aqui", "faltou X"), anotar o ajuste de calibração em `data/learnings.md` — o agente lê este ficheiro nas análises seguintes

### Bypass de paywall / contacto directo

**Quando uma plataforma esconde o contacto do host por não estar logado (Volunteers Base, Workaway, Worldpackers):**

1. Ler toda a informação pública do anúncio: nome do projecto, nome do host/organização, localização exacta, descrição das actividades
2. Fazer WebSearch com os dados do anúncio:
   - `"[nome do projecto]" [cidade] voluntariado site`
   - `"[nome da organização]" [país] volunteer contact`
   - `"[nome do host]" [localização] [tipo de projecto]`
3. Identificar o site oficial ou página directa da organização
4. `browser_navigate` ao site encontrado → ler a página de voluntariado/contacto
5. Extrair: email directo, formulário de contacto, página de candidatura
6. Incluir na análise: URL da plataforma + URL directo encontrado
7. Na mensagem/candidatura: usar o canal directo se disponível (maior chance de resposta)

**Quando NÃO fazer bypass:** plataformas pagas como Workaway e Worldpackers têm sistemas de mensagem interno que os hosts preferem — só usar canal directo se não estiver logado e o projecto for muito forte.

**Exemplo prático:**
- Anúncio: `volunteersbase.com/europe/spain/centro-budista-teruel`
- Informação pública: "Centro Budista Sangha Norbuling, Teruel, Espanha"
- WebSearch → encontrar: `sangchennorbuling.org/voluntariado/`
- Candidatar directamente no site da organização

## Modo PIPELINE — como funciona

Processa os itens pendentes em `data/pipeline.md` um por um:

1. Ler `data/pipeline.md`, identificar itens `- [ ]` não processados
2. Para cada item: fazer análise completa (modo ANALYZE)
3. Marcar como `- [x]` com resultado: APROVADA, DESCARTADA, ou UNCLEAR
4. Adicionar nota com veredicto e score

## Modo ENRICH — Enriquecer Perfil

Ver `modes/enrich-profile.md` para o fluxo completo.

Resumo:
1. Usar Gmail MCP (`mcp__claude_ai_Gmail__search_threads`) para encontrar emails de confirmação de plataformas de voluntariado, redes sociais, e travel — confirmando quais contas o utilizador tem activas
2. Fazer WebSearch com usernames conhecidos (`castroser`, `castro.ser`) para encontrar perfis públicos não documentados
3. Apresentar resultado ao utilizador → confirmar → actualizar `profile.md`

**Plataformas pesquisadas no Gmail:** Volunteers Base, Worldpackers, Workaway, HelpStay, HelpX, WWOOF, CouchSurfing, LinkedIn, Instagram, Facebook, GitHub, Hostelworld, Airbnb, Booking.com

**Nota:** Gmail MCP requer autenticação — carregar com `ToolSearch "select:mcp__claude_ai_Gmail__search_threads"` antes de usar.

---

## Regras de mensagem — OBRIGATÓRIAS

Toda mensagem gerada deve responder a estas 6 perguntas:
1. **Quem és?** — apresentação pessoal autêntica
2. **Por que escolheste ESTE projecto?** — específico, mostra que leste o anúncio
3. **Quando exatamente podes voluntariar?** — datas concretas
4. **Que skills e experiência tens?** — directo ao que o host precisa
5. **Podes dar referências?** — CouchSurfing (5 refs verificadas), ex-employers, ex-hosts
6. **Tens alguma pergunta para o host?** — mostra interesse genuíno, abre diálogo

**Tom:** natural, humano, não corporativo. Ver diretrizes detalhadas em `analisar_oportunidade.md`.

**NUNCA mencionar** visa sponsorship, paid work, ou intenção de ficar mais de 90 dias nas mensagens iniciais — as plataformas bloqueiam automaticamente.

## Perfil do utilizador

Ver `profile.md` para o perfil completo. Resumo para contexto rápido:
- **Sérgio**, brasileiro, 35 anos, base em Mendoza (9 anos), a partir de junho 2026 nómade
- **Idiomas:** PT nativo, ES fluente, EN fluente, IT básico, JP básico
- **Background:** turismo (DMC luxury), front desk (Art Hostel Rio, Rio Backpackers), marketing digital, OTA management
- **CouchSurfing:** @castroser — verificado, 5 referências, host activo
- **Redes:** Instagram @castro.ser · LinkedIn /in/castroser · Facebook sergio.bembrasilrio

## Roteiro e fases de busca

| Fase | Período | Regiões prioritárias | Tipo de voluntariado |
|---|---|---|---|
| 1 | Ago–Out 2026 | Schengen: Itália (Toscana), Espanha, Portugal, França | Vendemmia, agriturismo, hostel, enoturismo |
| 2 | Nov–Dez 2026 | Fora Schengen: Bulgária (Bansko), Sérvia, Bósnia, Geórgia | Ski season, hostel front desk, temporada inverno |
| 3 | 2027 | Tailândia, Indonésia, Vietnã, Camboja | Hostel, eco projects, turismo local |
| 4 | 2027 | Japão (PRIORIDADE MÁXIMA) | Hostel, cultura japonesa, turismo, anime events |

## Destinos de baixo custo preferidos

Bansko (Bulgaria), Tbilisi/Gudauri (Georgia — 365 dias sem visto para brasileiros), Kopaonik (Serbia), Sarajevo (Bósnia), zonas rurais Itália/Espanha/Portugal. Evitar: Barcelona, Roma, grandes cidades caras (aceitável mas não preferencial).

## Objectivo estratégico a longo prazo

Encontrar uma oportunidade que evolua naturalmente para trabalho remunerado ou sponsorship de visto. Não é o objectivo inicial — é uma consequência possível após estabelecer relação de confiança. Nunca mencionar isto nos contactos iniciais.

## Ética

- **NUNCA submeter mensagem sem o utilizador rever primeiro.** Gerar, mostrar, parar — o utilizador envia.
- Qualidade sobre quantidade — 5 candidaturas excelentes > 50 genéricas.
- Respeitar os hosts — só contactar quando há fit real.
