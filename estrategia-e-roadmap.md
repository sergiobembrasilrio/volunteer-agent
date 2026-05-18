# 🗺️ Estratégia e Roadmap — Volunteer Agent

> **Data:** 2026-05-17
> **Status:** documento vivo. Editar conforme o projeto evolui.
> **Para que serve:** quando você (Sergio) ou o Claude abrir uma nova sessão, este arquivo dá o contexto completo do que estamos construindo, como, e por quê. Economiza tokens evitando recapitular toda a história.

---

## 🎯 Objetivo final

Construir um agente (estilo career-ops, mas com Playwright) que:

1. Busca oportunidades de voluntariado em plataformas gratuitas (Volunteers Base primeiro, depois NuMundo, GEN, HopperJobs, Free Volunteering, etc.)
2. Analisa cada oportunidade com o cérebro de análise já criado (`analisar_oportunidade.md` v3.1)
3. Gera mensagem personalizada para o host no idioma do anúncio
4. Eventualmente: também lê posts de grupos de Facebook (com muito cuidado — perfil pessoal único, não automatizar ações que possam queimar a conta)

**Cenário-alvo de voluntariado:** Europa, Sudeste Asiático, África. Até 3 meses. Idealmente com visa + acomodação + comida + algum pagamento.

**Timing real:** viagem prevista para julho/agosto 2026.

---

## ⚠️ Realidade temporal

Construir o agente completo automatizado leva mais tempo do que você tem antes de viajar. Por isso a estratégia é em **duas frentes paralelas**:

- **Frente A (urgente, manual):** você busca à mão nos sites abertos, eu (ou Claude.ai Sonnet) analiso, manda mensagens. Você fecha algo até julho.
- **Frente B (lenta, em paralelo):** construímos o agente Playwright. Quando estiver pronto, usa para a próxima viagem ou para escalar a busca.

---

## 📅 Roadmap em 4 fases

### FASE 0 — Esta semana (setup, sem código)

- [ ] Validar Python instalado: rodar `py --version` no PowerShell. Esperado: "Python 3.13.x" ou similar
- [ ] Confirmar VS Code instalado + instalar extensão "Python" da Microsoft
- [ ] Confirmar contas/acesso nas plataformas gratuitas: Volunteers Base (✅ já feita, verificada), NuMundo, GEN, HopperJobs, Free Volunteering
- [ ] Listar 5-10 grupos de Facebook relevantes que você já está ou quer entrar
- [ ] Pesquisar (com Perplexity ou Gemini, não comigo) plataformas similares a Volunteers Base para Sudeste Asiático e África

**Onde fazer:** sozinho, com Gemini ou ChatGPT te guiando. Token cost comigo: zero.

### FASE 1 — Semanas 1-3 (busca manual + análise assistida)

- [ ] Navegar Volunteers Base, NuMundo, GEN, HopperJobs manualmente, ~1h/dia
- [ ] Copiar texto de oportunidades interessantes
- [ ] Colar no Claude.ai web (Sonnet 4.6, não Opus) com o template `analisar_oportunidade.md`
- [ ] Salvar análises em `analyses/AAAA-MM-DD-titulo.md`
- [ ] Mandar 5-10 mensagens reais para hosts bem selecionados
- [ ] Anotar respostas e padrões (o que funciona, o que não)

**Onde fazer:** Claude.ai web em Sonnet 4.6. Token cost comigo (Opus): zero — não me chame para isso.

### FASE 2 — Semanas 3-6 (primeiro script Playwright)

- [ ] Eu escrevo um script Python que:
  - Abre Volunteers Base via Playwright
  - Lista as oportunidades novas do dia
  - Salva o texto de cada uma em `oportunidades-coletadas/AAAA-MM-DD/<id>.md`
- [ ] Você roda o script (com instrução passo a passo)
- [ ] Depois cola o texto no Claude.ai Sonnet para análise (ou eu rodo análise local sem chamar API)

**Onde fazer:** comigo aqui em Cowork, em sessões curtas e objetivas. Aqui sim Opus vale o token.

### FASE 3 — Mês 2+ (expansão)

- [ ] Adicionar scraper para NuMundo, GEN, HopperJobs, Free Volunteering
- [ ] Adicionar leitura de grupos de Facebook (passiva, devagar, sem interação automatizada)
- [ ] Integrar análise direto no fluxo: script → texto → análise → mensagem pronta em arquivo
- [ ] (Opcional) Sistema de tracking de quais hosts você já contatou e suas respostas

---

## 💰 Estratégia de tokens

| Tarefa | Onde fazer | Por quê |
|---|---|---|
| Decisões de arquitetura, código novo Playwright, debugging difícil | **Claude Opus (aqui no Cowork)** | É onde Opus vale o token |
| Revisão de tom final de mensagem importante para host | **Claude Opus (aqui)** | Tom natural em vários idiomas é forte |
| Analisar oportunidade com template `analisar_oportunidade.md` | **Claude.ai web em Sonnet 4.6** | Tarefa repetitiva — Sonnet faz quase igual, gasta 5x menos |
| Aprender o que é Playwright, venv, npm, Python | **Gemini ou ChatGPT-5 gratuito** | Material abundante, sem custo |
| Buscar grupos FB / plataformas / reviews de hosts | **Perplexity.ai gratuito** | Search nativo bom |
| Traduzir mensagens prontas para italiano/francês | **DeepL.com gratuito** | Melhor que IA generalista |
| Explicar erro genérico de código | **ChatGPT-5 gratuito primeiro** | Se não resolver, então trazer pra cá |
| Brainstorm vago ("será que dá para fazer X?") | **Gemini ou ChatGPT** | Não me gaste com exploração aberta |

**Regra de ouro:** antes de me perguntar algo, pergunte-se "isso é uma decisão única e crítica, ou é tarefa repetitiva/exploratória?" Se repetitiva ou exploratória → ferramenta externa. Se única e crítica → eu.

---

## 🔒 Restrições importantes

1. **Facebook:** você tem só o perfil pessoal. **Não automatizar ações que possam queimar a conta.** Leitura passiva no máximo, e mesmo isso com comportamento humano e volume baixo. Sempre dá pra fazer manual.

2. **Plataformas pagas (Workaway, Worldpackers):** não tem como o agente acessar conteúdo de membros sem você pagar. Foco em fontes gratuitas.

3. **Sites com bot detection forte:** podem detectar Playwright. Solução é usar `playwright-stealth` ou similares. Vamos lidar caso a caso.

---

## 📂 Estado atual do projeto

**Pasta:** `C:\Users\sergi\volunteer-agent`

**Arquivos existentes:**
- `README.md` — descrição alta do projeto
- `profile.md` — perfil completo do Sergio
- `ideas.md` — ideias e regiões alvo
- `fontes-gratuitas.md` — mapa de plataformas, ranqueadas por relevância
- `analisar_oportunidade.md` v3.1 — cérebro de análise (template a usar com Claude.ai)
- `analyses/` — análises já feitas (Worldpackers Itália, comparativo 3 oportunidades)
- `conversa-step-1.txt` — log da primeira sessão
- `estrategia-e-roadmap.md` — **este arquivo**

**Ainda não existe:**
- Nenhum código Python
- Nenhum script Playwright
- Nenhuma integração com sites
- Lista de plataformas para Sudeste Asiático / África (pesquisa pendente)

---

## ✅ Próximo passo concreto (esta semana)

Veja seção "Próximo passo acionável" no final da conversa com o Claude. Resumo:

1. Validar Python: rodar `py --version` no PowerShell e me trazer o resultado
2. Pesquisar (no Perplexity, gratuito) "free volunteer platforms similar to Volunteers Base for Southeast Asia and Africa, no membership fee, direct contact with hosts"
3. Listar 5-10 grupos de Facebook que você já está ou quer entrar
4. Voltar pra cá com os resultados — aí montamos a Fase 1 com calma
