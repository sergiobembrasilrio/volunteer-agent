# Modo APPLY — Candidatura a Voluntariado

## Quando usar
Quando o utilizador diz "candidatar", "apply", "enviar candidatura", "preencher formulário", ou quando uma oportunidade foi avaliada como BOA ou PROMISSORA e o utilizador quer avançar.

## Regra crítica
**NUNCA submeter sem o utilizador rever e confirmar explicitamente.**
Preencher todos os campos → mostrar preview completo → PARAR → dizer "Posso submeter?"
O utilizador escolhe quando clicar em enviar.

---

## Fluxo completo de candidatura

### Passo 1 — Gerar conteúdo personalizado

Antes de abrir qualquer formulário, gerar:

1. **Ler** `profile.md` e `analisar_oportunidade.md` — cruzar perfil com a oportunidade
2. **Gerar** as respostas para cada campo típico:
   - Personal Introduction / Who are you
   - Why do you want to volunteer here
   - What skills/experience do you bring
   - Availability (exact dates)
   - References
   - Questions for the host

3. **Gerar PDF da carta apenas se o formulário pedir** um ficheiro de apresentação/CV/cover letter para upload. Não gerar por defeito.
   - Se pedido: ler `templates/volunteer-letter.html`, substituir `{{VARS}}`, salvar HTML, correr `node generate-volunteer-pdf.mjs`, PDF fica em `output/letter-{slug}-{data}.pdf`

4. Mostrar ao utilizador o rascunho completo da mensagem
5. **PARAR** — só avançar para o formulário depois da aprovação do utilizador

---

### Passo 2 — Navegar ao formulário

**Detectar o tipo de plataforma e escolher abordagem:**

| Plataforma | Abordagem | Browser |
|---|---|---|
| Volunteers Base | Playwright MCP (sem login necessário para contactar) | Playwright MCP padrão |
| Worldpackers | Playwright MCP com login (sessão guardada) | Chrome CDP se login necessário |
| Workaway | Playwright MCP com login | Chrome CDP se login necessário |
| NGO / site próprio | Playwright MCP — formulário HTML standard | Playwright MCP padrão |
| Facebook Messenger | Chrome CDP — Facebook já logado | Chrome CDP (:9222) |
| Email directo | Gerar rascunho + indicar ao utilizador | — |

**Para plataformas que precisam de login (Chrome CDP):**
```
node launch-chrome-facebook.mjs   ← usa o mesmo perfil logado
```
Depois usar Playwright MCP via `browser_navigate` — o Chrome já tem sessão ativa.

**Recomendação de browser por situação:**
- **Chrome** (via Playwright MCP ou CDP) — melhor para a maioria das plataformas
- **Firefox** — sugerir se Chrome for bloqueado por bot detection (raras plataformas fazem isso)
- **Chrome com perfil pessoal** (CDP) — obrigatório para Facebook e plataformas com login

---

### Passo 3 — Preencher o formulário

```
browser_navigate → URL do formulário
browser_snapshot → ler estrutura dos campos
```

Para cada campo:
1. Identificar o campo (label, placeholder, aria-label)
2. Preencher com o conteúdo gerado no Passo 1
3. Verificar se o campo aceitou o conteúdo
4. Adaptar comprimento se necessário (alguns campos têm limite de caracteres)

**Campos comuns em plataformas de voluntariado:**

| Campo | Conteúdo a usar |
|---|---|
| "Personal Introduction" / "Who are you" | Parágrafo pessoal adaptado — Rio, Mendoza, hospitality |
| "Why do you want to volunteer here" | Específico ao projeto — mencionar detalhe do anúncio |
| "Skills" / "What can you offer" | Skills relevantes para AQUELE host |
| "When can you start" / "Availability" | Datas exactas do roteiro |
| "How long can you stay" | Duração preferida (2-6 semanas) |
| "Languages" | PT (native) · ES (fluent) · EN (fluent) · IT (basic) |
| "References" | CouchSurfing: @castroser · LinkedIn |
| "Message to host" | Mensagem completa gerada |

**Ao encontrar campos de upload de ficheiro:**

| O formulário pede | O que fazer |
|---|---|
| Carta de apresentação / Cover letter / CV (PDF) | Gerar PDF com `generate-volunteer-pdf.mjs` → `browser_file_upload` |
| Foto de perfil / Profile photo | Ver pasta `assets/photos/` — se tiver foto, usar. Se não, pedir ao utilizador ou indicar que pode usar `assets/photos/profile.jpg` |
| Qualquer outro documento | Perguntar ao utilizador o caminho do ficheiro antes de avançar |

**Pasta de assets do utilizador:**
```
volunteer-agent/
  assets/
    photos/        ← fotos de perfil para upload em formulários
      profile.jpg  ← foto principal recomendada
    cv/            ← CV em PDF se necessário (pouco comum em voluntariados)
```
Se a pasta `assets/` não existir e o formulário pedir foto, avisar o utilizador:
> "O formulário pede uma foto de perfil. Crie a pasta `assets/photos/` e coloque lá a sua foto como `profile.jpg`, ou indique o caminho."

**Não tentar encontrar fotos automaticamente via web** — usar apenas o que o utilizador colocou explicitamente em `assets/photos/`.

---

### Passo 4 — Review e submissão

Depois de preencher todos os campos:
1. `browser_snapshot` — capturar estado final do formulário
2. Mostrar ao utilizador o que está preenchido em cada campo
3. Verificar se algum campo ficou vazio ou com conteúdo cortado
4. **PARAR E PERGUNTAR:** "Formulário preenchido. Posso submeter?"
5. Só executar `browser_click` no botão de submit após confirmação explícita

---

### Passo 5 — Registar no tracker

Após submissão confirmada:
1. Abrir `data/contacts.md`
2. Adicionar linha com: data, plataforma, projeto, localização, URL, status "Enviado"
3. Guardar PDF e HTML em `output/`
4. Marcar item em `data/pipeline.md` como `- [x]` com nota "Applied YYYY-MM-DD"

---

## Geração da carta de apresentação — variáveis do template

Ao preencher `templates/volunteer-letter.html`, substituir:

| Variável | Valor |
|---|---|
| `{{LANG}}` | `en` / `es` / `pt` / `it` / `fr` |
| `{{VOLUNTEER_NAME}}` | Sérgio Castro |
| `{{VOLUNTEER_EMAIL}}` | sergio.bembrasilrio@gmail.com |
| `{{VOLUNTEER_LINKEDIN}}` | https://www.linkedin.com/in/castroser |
| `{{VOLUNTEER_COUCHSURFING}}` | https://www.couchsurfing.com/c/users/castroser |
| `{{VOLUNTEER_INSTAGRAM}}` | https://www.instagram.com/castro.ser/ |
| `{{DATE}}` | Data actual (ex: 18 May 2026) |
| `{{HOST_NAME}}` | Nome do host / família / organização |
| `{{PROJECT_NAME}}` | Título do projecto |
| `{{PROJECT_LOCATION}}` | Cidade, País |
| `{{SALUTATION}}` | "Dear Tim and Caroline," / "Caro..." / "Estimados..." |
| `{{PERSONAL_INTRO}}` | Parágrafo de introdução |
| `{{WHY_THIS_PROJECT_QUOTE}}` | Frase curta em itálico — gancho emocional |
| `{{WHY_THIS_PROJECT}}` | Parágrafo de porquê ESTE projecto |
| `{{WHAT_I_OFFER_INTRO}}` | Frase intro dos skills |
| `{{SKILLS_LABEL}}` | "Skills & Experience" / "Habilidades" / "Competenze" |
| `{{SKILLS_TAGS}}` | `<span class="skill-tag">Front Desk</span>` etc. |
| `{{AVAILABLE_FROM_LABEL}}` | "Available from" / "Disponible desde" |
| `{{AVAILABLE_UNTIL_LABEL}}` | "Until" / "Hasta" |
| `{{DURATION_LABEL}}` | "Duration" / "Duración" |
| `{{AVAILABILITY_FROM}}` | "August 15, 2026" |
| `{{AVAILABILITY_TO}}` | "October 15, 2026" |
| `{{AVAILABILITY_DURATION}}` | "2–6 weeks, flexible" |
| `{{QUESTION_FOR_HOST}}` | Parágrafo com pergunta genuína |
| `{{REFERENCES_LABEL}}` | "References" / "Referencias" |
| `{{REFERENCES_ITEMS}}` | `<div class="ref-item">...</div>` para cada ref |
| `{{CLOSING}}` | Frase de fecho |

---

## Ficheiro de output — convenção de nomes

```
output/
  letter-{slug-do-projecto}-{YYYY-MM-DD}.html
  letter-{slug-do-projecto}-{YYYY-MM-DD}.pdf
```

Exemplos:
```
output/letter-tara-nature-todi-2026-08-15.html
output/letter-tara-nature-todi-2026-08-15.pdf
output/letter-bansko-hostel-dream-2026-11-01.html
```
