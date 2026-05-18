# 🌍 Analisador de Oportunidades de Voluntariado — STEP 1 (v4.0)

> **Versão crítica, realista e calibrada ao roteiro do Sérgio (2026–2027).**
> Voltada a fontes gratuitas e diretas (Facebook, Volunteers Base, NuMundo, sites de projetos), com forte detecção de golpe, análise do perfil de quem postou, detecção de uso comercial oculto, e — novo — **scoring quantitativo por fase do roteiro e potencial de evolução**.

> **Mudanças da v3.1 → v4.0:**
> - **Quick discard check** logo no topo — 8 hard nos que poupam tempo antes da análise completa
> - **Scoring 0–10 com pesos explícitos** alinhados às prioridades do Sérgio (Japão > hospitality > idiomas > fase > flexibilidade > evolução)
> - **Bandeiras específicas de volunteer tourism** separadas das genéricas (ex: "cause-washing", "save-the-children syndrome", "esquema de retreat workshop com voluntários-staff")
> - **Detecção de Japan-specific opportunities** com bandeiras verdes próprias (workcamps NICE, ryokan, anime/manga, traditional crafts)
> - **Potencial de evolução** como dimensão própria: voluntariado → trabalho remunerado → sponsorship → visa
> - **6 perguntas obrigatórias** na mensagem inicial (alinhadas a CLAUDE.md)
> - **Anti-patterns na mensagem** consolidados — o que NUNCA mencionar
> - **Cross-platform reputation check** — quando vale gastar 2 minutos a verificar

---

## 📋 COMO USAR

1. Encontre um post de oportunidade (Facebook, Volunteers Base, NuMundo, site direto, etc.)
2. Cole o texto da oportunidade no campo **[TEXTO DA OPORTUNIDADE]** lá no final
3. Preencha também a seção **[INFO DA FONTE]** com tudo que conseguir descobrir sobre quem postou
4. Mande este arquivo inteiro para o Claude e diga: **"Analise seguindo o template"**
5. Receba: análise crítica detalhada, scoring quantitativo, veredicto em 6 níveis, e (apenas se a oportunidade for BOA/PROMISSORA) a mensagem pronta para o host

---

## ⚠️ PRINCÍPIO GERAL — VIÉS PARA O CETICISMO

A análise é **cética por padrão**. Toda oportunidade começa em **UNCLEAR** e só sobe para **PROMISSORA** ou **EXCELENTE/BOA** com evidência positiva concreta. **Bandeiras vermelhas pesam mais que verdes.** Falta de informação não é neutra — é negativa.

Em fontes gratuitas/diretas (Facebook, classificados, sites próprios) **não há curadoria de plataforma**. Toda a verificação é responsabilidade sua. Este template é mais rígido que seria com Workaway/Worldpackers.

---

## 🚦 QUICK DISCARD CHECK — fazer antes de qualquer análise

> Se UM destes for verdadeiro, marcar **DESCARTADA** imediatamente e parar. Não gastar tokens em análise completa.

1. **Cobra qualquer taxa** — "program fee", "placement fee", "registration fee", "admin fee", "training fee", "background-check fee". Voluntariado de verdade não cobra do voluntário.
2. **Aceita apenas residentes locais** — "local volunteers only", "EU residents only", "must have right to work in [country]", "Australian citizens only".
3. **Duração mínima inferior a 1 semana** — não dá para imersão real; geralmente sinal de operação extractiva de turismo.
4. **Zona de guerra / alto risco operacional** — Ucrânia leste, Síria, Iêmen, Sahel ativo, Mianmar interior. (ONGs humanitárias com staff treinado são exceção, mas não é o perfil do Sérgio.)
5. **Requer certificação que o Sérgio não tem** — RN/CNA, professor licenciado, médico, dentista, enfermeiro, terapeuta certificado, engenheiro com licença local.
6. **Inclui cuidado solo de crianças vulneráveis** — orfanatos, "save the children", crianças em risco. (Bandeira ética: voluntários rotativos em torno de crianças traumatizadas é prática hoje desencorajada por UNICEF/Save the Children.)
7. **Compromisso 6+ meses sem flexibilidade** — incompatível com roteiro multi-fase do Sérgio (3 meses Schengen + Balcãs + SE Asia + Japão).
8. **Pede dados financeiros / passaporte ANTES de qualquer relação** — banco, swift, cópia de passaporte para "reservar". Golpe.

> **Se passou os 8, prosseguir para análise completa.**

---

## 👤 PERFIL DO SÉRGIO — resumido (versão completa em `profile.md`)

- **Quem:** Sergio Castro, brasileiro, 35 anos, 9 anos em Mendoza/Argentina, profissional de turismo (DMC luxury) + hostel front desk (Art Hostel Rio, Rio Backpackers) + marketing digital + OTA management
- **CouchSurfing:** @castroser — perfil verificado, 5 referências, host ativo
- **Objetivo nômade:** a partir de junho 2026
- **Idiomas:** PT/ES nativos, EN fluente, IT básico (a aprender), JP básico (a aprender)
- **Roteiro:**
  - **Fase 1 (Ago–Out 2026)** — Schengen: Itália (Toscana, vendemmia), Espanha, Portugal, França. Tipo: agriturismo, vendemmia, hostel, enoturismo.
  - **Fase 2 (Nov–Dez 2026)** — Fora Schengen: Bulgária (Bansko), Sérvia (Kopaonik), Bósnia (Sarajevo/Jahorina), Geórgia (Gudauri/Tbilisi). Tipo: ski season front desk, hostel temporada inverno.
  - **Fase 3 (2027)** — Sudeste Asiático: Tailândia, Indonésia, Vietnã, Camboja. Tipo: hostel, eco projects, turismo local.
  - **Fase 4 (2027) — PRIORIDADE MÁXIMA** — Japão. Tipo: hostel, ryokan, workcamps NICE, traditional crafts, anime/manga, cultura japonesa.
- **Destinos baratos preferidos:** Bansko, Tbilisi/Gudauri (365 dias sem visto p/ BR), Kopaonik, Sarajevo, zonas rurais Itália/Espanha/Portugal.
- **Anti-perfil:** grandes cidades caras (Barcelona, Roma), resorts massivos, voluntariado pago, off-grid sem internet, posições "save children" tipo orfanato.
- **Requisito não-negociável:** WiFi estável + 2–4h livres/dia para trabalho remoto leve em paralelo.
- **Estratégia long-term:** chegar como voluntário genuíno → construir confiança → sponsorship / paid work como **consequência natural** (nunca mencionar nos contactos iniciais — plataformas bloqueiam automaticamente).

---

## 🚨 SINAIS DE GOLPE — bandeiras CRÍTICAS

> **Regra:** 1 bandeira crítica = veredicto **RED FLAG**. 2+ = **GOLPE confirmado**, sem exceção.

1. **Pede dinheiro em qualquer forma** — taxa, depósito, seguro, "verificação de antecedentes", "processamento de visto"
2. **Pede cópia de passaporte/documentos** antes de qualquer relação concreta
3. **Quer mover a conversa imediatamente** para WhatsApp/Telegram/e-mail particular no primeiro contato
4. **Pressão de tempo artificial** — "última vaga", "preciso confirmar hoje", "outro voluntário desistiu agora"
5. **Promete remuneração além de comida + acomodação** sem contrato e visto — é trabalho, não troca
6. **História emocional pesada** desproporcional (doença grave, viuvez, "Deus me mandou ajudar viajantes")
7. **Romance / sedução** fora de contexto (clássico com viajantes solo — especialmente alvos masculinos brasileiros em SE Asia)
8. **Oferece comprar passagem** através de "agente parceiro" / "agência de confiança"
9. **Texto genérico copiado** — googlar uma frase específica entre aspas; se aparece em 10 grupos, é spam
10. **Foto de perfil parece estoque/roubada** — reverse image search no Google Images
11. **Inconsistência geográfica/linguística** — diz que é em país X mas idioma/contexto é de Y
12. **Pede assinar contrato/termo** antes de qualquer interação real
13. **Esquema piramidal/MLM disfarçado** — "rede", "oportunidade de negócio", "ajude e ganhe"
14. **Promessas transformacionais exageradas** ("vai mudar quem você é", "despertar espiritual garantido")
15. **Pede dados financeiros** (banco, cartão, swift, "para reservar")
16. **Pede comprar coisas em loja específica** ou enviar produtos
17. **Discrepância entre qualificação pedida e trabalho** ("experiência em finanças" para "ajudar na fazenda")
18. **Recruta agressivamente em DM** depois que você curte/comenta um post inocente

---

## 🚩 SINAIS DE BAIXA QUALIDADE — bandeiras MÉDIAS

> **Regra:** 3+ bandeiras médias = **INCERTA** ou **DESCARTADA**, dependendo do conjunto.

1. Texto curto e vago — sem detalhes de tarefas
2. Não diz exatamente o que oferece (quarto privado? compartilhado? comida inclusa?)
3. Não diz horas/dia ou dias/semana
4. Sem fotos do lugar
5. Localização vaga ("sul da Itália", "interior", "próximo de praia")
6. Não menciona idioma falado pelos hosts
7. Tom puramente comercial — parece anúncio de hotel
8. Perfil de quem postou < 6 meses de existência
9. Perfil com poucas fotos pessoais ou pouca atividade pública prévia
10. Sem fonte externa para verificar (Google não acha, sem Instagram, sem Maps)
11. Pede para você "se vender" antes de dar detalhes
12. Tom impessoal — "looking for volunteers" sem nada que mostre quem é
13. Idioma do post errado para a região (inglês perfeito em fazenda rural sem turismo internacional)
14. Adiciona condições "extras" depois de você demonstrar interesse
15. Resposta automática ou idêntica a vários candidatos
16. Anúncio repostado em muitos grupos simultaneamente
17. **Promete "experiência única" sem dizer o que é o dia-a-dia**
18. **Linguagem inflacionada** ("amazing", "life-changing", "magical") sem nada concreto

---

## ⚠️ BANDEIRAS ESPECÍFICAS DO VOLUNTEER TOURISM

> Volunteer tourism (voluntourism) tem patologias próprias que não cabem só em "golpe" ou "baixa qualidade". Estas merecem secção própria.

### 1. Cause-washing
Projeto invoca causa social/ambiental forte ("salvamos tartarugas", "ensinamos crianças", "protegemos floresta") mas **não tem evidência operacional** — sem relatório anual, sem fotos do trabalho real, sem parcerias verificáveis, sem ONG registada. A causa é só marketing.

### 2. Save-the-Children syndrome
Projetos com crianças vulneráveis (orfanato, escola de favela, "rescue") que **aceitam voluntários sem screening sério** e os **rotacionam constantemente**. UNICEF e Save the Children desencorajam ativamente este modelo. **Bandeira crítica para o Sérgio:** nunca aplicar.

### 3. Retreat / yoga / wellness com voluntários-staff
"Eco-retreat" / "ashram" / "yoga centro" onde voluntários fazem **trabalho operacional não-remunerado** (cozinha, limpeza, recepção de clientes pagantes), enquanto o "owner" cobra €1500/semana de retreat. Volunteer = staff disfarçado.

### 4. "Building school in Africa/Asia" packages
Construção amadora de escolas/casas onde voluntários **substituem mão de obra local paga** e fazem obra pior. Comunidade local fica sem trabalho e com obra mal feita. Tipo de projeto que **rouba emprego local**.

### 5. Wildlife "sanctuaries" comerciais
"Santuário de leões" / "elefantes" / "tigres" que na verdade são **operações turísticas pagas** (visitantes interagem com animais drogados/treinados). Voluntários alimentam a fraude com a presença + redes sociais. Exemplo: Tiger Temple Thailand antes do fechamento.

### 6. "Family farm" que é resort
"Pequena fazenda familiar" que tem **20 quartos, recepção formal, hóspedes pagantes diários, Booking.com**. Voluntário paga a "experiência rural" com trabalho enquanto o dono opera um hotel rural lucrativo.

### 7. Hostel "comunitário" que é hotel
"Hostel comunitário" / "community hostel" com 50+ camas, gerência profissional, voluntário cobre **turnos de noite ou recepção 8h/dia**. Isto é trabalho de hostel staff, não troca cultural.

### 8. "Awareness building" sem operação real
ONG cuja atividade principal é **postar nas redes sociais** sobre uma causa, sem trabalho de campo verificável. Voluntário acaba de social media manager grátis.

### 9. Visa-bait fraudulenta
Promete "ajudamos com visto de trabalho depois de 3 meses" / "podemos arranjar visa sponsorship" — mas **nunca o fez na prática**. É isca para retenção barata. **Para o Sérgio:** se aparecer, é red flag de que estão a vender promessa falsa. Estratégia real é o oposto: chegar como voluntário, construir relação, deixar a oferta vir do host.

### 10. Multi-property "volunteer empire"
Pessoa que tem **5–10 propriedades** todas a recrutar voluntários simultaneamente. Não é troca cultural — é operação de aluguer/agritourism que escala em mão de obra grátis.

---

## ✅ SINAIS DE BOA OPORTUNIDADE — bandeiras VERDES

1. **Tarefas detalhadas e realistas** — "vamos pintar o galpão", "regar a horta de manhã"
2. **Carga horária explícita** — idealmente 4–5h/dia, 5 dias/semana
3. **Benefícios precisos** — quarto privado/compartilhado, n refeições/dia, com a família ou cozinha própria
4. **Primeira pessoa, voz humana** — "moramos aqui há 12 anos", "minha esposa e eu"
5. **Fotos reais variadas** do lugar, das pessoas, do dia-a-dia
6. **Localização específica** — cidade, região, ponto de referência
7. **História do lugar / projeto** — quem fundou, por quê, o que faz
8. **Aceita perguntas com calma**, sem pressionar a fechar rápido
9. **Idioma do post bate com a região**
10. **Outras pessoas comentaram positivamente** no post
11. **Perfil de quem postou é antigo, ativo, com fotos reais e amigos reais**
12. **Presença consistente em outras redes** (site + Instagram + Maps + reviews)
13. **Avaliações verificáveis** de voluntários anteriores
14. **Reciprocidade** — perguntam quem você é, em vez de só ditar termos
15. **Menciona nominal voluntários anteriores** ("Last year Marie from France helped with...")
16. **WiFi mencionado proativamente** ou foto de espaço de trabalho com laptop
17. **Tamanho da operação coerente** com discurso (família pequena → fazenda pequena; não 5 prédios)

---

## 🎌 BANDEIRAS VERDES ESPECÍFICAS DO JAPÃO (Fase 4 — PRIORIDADE)

> Quando aparecer oportunidade no Japão, estas bandeiras verdes pesam **dobro**. Match com Japão é objetivo estratégico declarado.

1. **Workcamp NICE / NVDA / SCI** — rede oficial de workcamps japoneses, gratuita, com track record desde anos 90
2. **Ryokan ou minshuku tradicional** — hospitalidade japonesa clássica, baseada em troca cultural
3. **WWOOF Japan farm verificada** — pago (~JPY 5500/ano) mas curadoria séria, hosts antigos
4. **Projeto rural revitalization** (akiya / mura-okoshi) — governo japonês incentiva, alta receptividade a estrangeiros
5. **Hostel pequeno em zona não-turística** — Tohoku, Shikoku, Kyushu interior, Hokkaido rural
6. **Templo / shukubo** que aceita voluntários para tarefas de manutenção
7. **Anime / manga / pop culture** — convention staff, café temático, museu (alinhado com interesse do Sérgio)
8. **Traditional craft workshop** — washi, pottery, indigo dyeing, kintsugi — host aceita trocar trabalho por aprendizado
9. **Festival / matsuri** com necessidade de staff multilíngue
10. **Host fala inglês razoável OU aceita JP básico + ES/EN como ponte**
11. **Mencionar "long-term welcome"** ou "OK with 2–3 month stays" — janela de visto turístico (90 dias) totalmente usada

---

## 🌐 ANÁLISE DA FONTE

| Tipo de fonte | Risco base | Por quê |
|---|---|---|
| **WWOOF (após pagar país)** | 🟢 baixo | Curadoria por país, hosts verificados |
| **NICE Japan / SCI / Alliance** | 🟢 baixo | ONGs históricas, workcamps estruturados |
| **NuMundo / IC.org / GEN** | 🟡 médio-baixo | Diretórios sérios, contato direto |
| **Volunteers Base** | 🟡 médio-baixo | Verificação de identidade básica |
| **HelpStay / HippoHelp** | 🟡 médio | Modelo misto, alguns hosts pagam para listar |
| **Site próprio do projeto** | 🟡 médio | Depende — verificar Maps, reviews, redes |
| **Workaway / Worldpackers** | 🟡 médio | Plataforma paga = filtra spam mas não golpe |
| **Reddit (r/wwoof, r/digitalnomad)** | 🟠 médio-alto | Sem moderação séria |
| **HopperJobs / Free Volunteering** | 🟠 médio-alto | Sem verificação real |
| **Grupo de Facebook** | 🔴 alto | Maior densidade de golpes |
| **Craigslist / OLX / Gumtree** | 🔴 alto | Classificados sem moderação |
| **DM não solicitada** | ⛔ crítico | Praticamente sempre golpe |

---

## 👤 TRUST SIGNALS DE QUEM POSTOU (0–10)

**Adiciona pontos:**
- Perfil ativo há **mais de 3 anos** (+2)
- **Muitas fotos pessoais variadas** (+1)
- **Fotos com outras pessoas marcadas**, em eventos reais (+1)
- **Histórico de posts pessoais** ao longo dos anos (+1)
- **Localização declarada bate** com a oportunidade (+1)
- Está em **grupos coerentes** com o que oferece (+1)
- É **admin/moderador** do grupo onde postou (+1)
- **Amigos em comum** no Facebook (+1)
- **Perfil verificado** (+1)
- **Reviews verificáveis** de voluntários anteriores em outros sites (+2)
- **Presença consistente** em 3+ redes (Instagram + site + Maps) (+1)

**Tira pontos:**
- Perfil **criado < 6 meses** (-3)
- **Quase sem fotos** ou só genéricas (-2)
- **Sem história de posts** ou só posts recentes (-2)
- Foto **parece estoque/roubada** (-3)
- **Idioma do perfil** não bate com região (-1)
- **"Página"/business**, não pessoa (-1, neutralizar se projeto sério)
- **Sem amigos visíveis** ou número absurdo (-2)
- **Mesmo post em vários grupos** colado (-2)
- **Comentários públicos negativos** em posts anteriores (-3)

**Score:**
- **8–10** = perfil sólido, alta confiança
- **5–7** = aceitável, validar via outros canais
- **3–4** = duvidoso, não comprometer
- **0–2** = não interagir

---

## 💼 RISCO DE USO COMERCIAL OCULTO

> Projetos que parecem comunidades/famílias mas operam **negócio comercial pago em paralelo** — voluntário acaba a sustentar uma operação lucrativa.

### Sinais
1. Projeto **tem componente comercial declarado** (retiros, oficinas, hospedagem comercial, vacation rental)
2. Tarefas dos voluntários **indiretamente sustentam clientes pagantes**
3. **Fronteira vaga** entre voluntariado e operação comercial
4. **Operação comercial não faria sentido financeiro** sem trabalho voluntário
5. **Voluntário descrito como "co-creator", "team member"** sem contrato
6. **Eventos pagos** acontecem na propriedade
7. **Pede personalidade comercial** ("outgoing", "great with guests") quando trabalho declarado não é com hóspedes
8. **"Skilled craftsperson"** isenta alguns voluntários — hierarquia que beneficia operação

### Pontuação

| Nível | Critério | Impacto no veredicto |
|---|---|---|
| 🟢 LOW | Família/comunitário, sem operação comercial declarada | Nenhum |
| 🟡 MEDIUM | Tem operação comercial mas declarada e separada | Rebaixa BOA → PROMISSORA; perguntar |
| 🟠 HIGH | Fronteiras turvas, voluntário sustenta infraestrutura paga | Rebaixa para PROMISSORA ou INCERTA |
| 🔴 CRITICAL | Operação comercial disfarçada de comunidade | DESCARTADA |

> **Exceção importante para o Sérgio:** hostel pequeno / B&B / agriturismo com **operação comercial declarada e transparente** + Sérgio sendo posicionado **profissionalmente** (front desk multilíngue, OTA management) é um **encaixe legítimo**, não risco oculto. A bandeira é a **falta de clareza**, não a comercialização per se.

---

## 🎯 SCORING QUANTITATIVO — match com perfil do Sérgio (0–10)

> Pesos refletem prioridades estratégicas. Score final = média ponderada. **8.5+ = EXCELENTE**, **7.0–8.4 = BOA**, **5.5–6.9 = PROMISSORA**, **4.0–5.4 = INCERTA**, **<4.0 = DESCARTADA**.

| Dimensão | Peso | Critério ALTO (8–10) | Critério MÉDIO (5–7) | Critério BAIXO (0–4) |
|---|---|---|---|---|
| **A. Skills match (hospitality / turismo)** | 20% | Recepção, OTA, multilíngue front desk, anfitrião pequeno hostel/B&B/ryokan | Tarefas mistas com algum uso de skills | Construção pesada, manual sem skill match |
| **B. Idioma operacional** | 10% | PT/ES/EN/IT/JP básico cobrem comunicação | Idioma menor (FR/DE) mas EN como ponte | Idioma exclusivo (alemão fluente obrigatório, etc.) |
| **C. Localização vs fase do roteiro** | 15% | Fit perfeito com fase ativa (Itália Ago–Out 2026, Bansko Nov 2026, Japão 2027) | Fit OK com fase ativa ou alvo secundário | Fora de qualquer fase do roteiro |
| **D. Duração e flexibilidade** | 10% | 2–8 semanas com flexibilidade | <2 semanas (raso) ou >3 meses rígido | 6+ meses rígido |
| **E. Compatibilidade com trabalho remoto** | 15% | WiFi explícito + 2–4h livres/dia | WiFi não mencionado mas zona OK | Off-grid declarado |
| **F. Bandeira Japão (PRIORIDADE)** | 10% | Oportunidade no Japão com fit operacional | Japão mas fit fraco; ou outro destino prioritário | Não-Japão (peso vira neutro) |
| **G. Visa / long-term potential** | 10% | Host menciona aceitar estadias longas / track record de sponsorship / país fácil de visto (Geórgia 365d) | Possível na teoria mas não claro | Sem janela (turistas estritamente 30d, host nunca patrocinou ninguém) |
| **H. Trust + qualidade do post** | 10% | Trust score 8+, post detalhado, fotos reais | Trust 5–7, post razoável | Trust <5 ou bandeiras médias 3+ |

### Como aplicar
1. Para cada dimensão, dar score 0–10
2. Multiplicar por peso (em decimal — ex: 20% = 0.20)
3. Somar tudo → score final 0–10
4. **Override:** se quick discard check falha OU bandeira crítica de golpe presente, score = 0 automaticamente
5. **Bonus Japão:** se for Japão **E** dimensão F = 8+, adicionar +0.5 ao score final (até cap de 10)

### Exemplo de cálculo
> Hostel pequeno em Bansko (Bulgária), front desk, 4h/dia, WiFi, 4 semanas Nov 2026, host com 20 reviews verificadas.
- A=9 (front desk skill match) × 0.20 = 1.80
- B=9 (EN/ES cobrem) × 0.10 = 0.90
- C=10 (Bansko = fase 2 perfeito) × 0.15 = 1.50
- D=9 (4 semanas flexível) × 0.10 = 0.90
- E=8 (WiFi mencionado) × 0.15 = 1.20
- F=0 (não-Japão, neutro)
- G=6 (Bulgária turismo, sem sponsorship track) × 0.10 = 0.60
- H=9 (trust alto) × 0.10 = 0.90
- **Total = 7.80 → BOA**

---

## 📊 SISTEMA DE VEREDICTO (6 níveis)

| Veredicto | Score | Critério | Ação |
|---|---|---|---|
| 🟢 **EXCELENTE** | 8.5–10 | Fit altíssimo (Japão + hospitality + WiFi + host sólido) | Mandar mensagem prioritária; reservar tempo para personalização premium |
| 🟢 **BOA** | 7.0–8.4 | Múltiplos sinais verdes, zero bandeiras críticas, fonte confiável, alinhado com objetivo | Mandar mensagem com confiança |
| 🟡 **PROMISSORA** | 5.5–6.9 | Parece OK mas faltam infos importantes, ou 1–2 bandeiras médias, ou commercial use MEDIUM | Mandar mensagem com perguntas claras |
| 🟠 **INCERTA** | 4.0–5.4 | Vago demais para julgar; 3+ bandeiras médias; ou fonte alta de risco com poucos verdes | Pedir mais info ou descartar |
| 🔵 **DESCARTADA** | <4.0 sem red flag | Não tem nada de errado, mas não atende ao objetivo (zona errada, tipo errado, fase errada, posição puramente administrativa) | Não é mensagem. Registrar como aprendizado de filtro |
| 🔴 **RED FLAG** | qualquer score com 1+ bandeira crítica OU 2+ críticas = golpe | Risco real ou golpe confirmado | NÃO mandar mensagem. Considerar denunciar |

> **Diferença importante:**
> - **INCERTA** = pode ser boa, falta info. Pedir mais.
> - **DESCARTADA** = não é problema, simplesmente fora do alvo.
> - **RED FLAG** = problema real (golpe, risco, comercial-uso crítico).

---

## 📋 FORMATO DE RESPOSTA QUE EU QUERO

Quando analisar uma oportunidade, organize a resposta exatamente assim:

### 🔍 Resumo
(2–3 linhas: onde, que tipo de lugar, o que pedem, o que oferecem)

### 🚦 Quick discard check
- Passou? sim/não
- Se não, qual item falhou e por quê

### 💰 Pagamento mencionado
> Preencher só se o post mencionar valor monetário. Senão, "Não mencionado."
- Valor original:
- Conversão USD:
- Frequência:
- Comentário:

### 🌐 Análise da fonte
- Tipo:
- Risco base: 🟢/🟡/🟠/🔴
- Comentário:

### 👤 Trust signals
- Score: X/10
- Pontos a favor:
- Pontos contra:
- Verificações sugeridas:

### 🚨 Análise de risco de golpe
- Bandeiras críticas:
- Bandeiras médias:
- Bandeiras de volunteer-tourism (cause-washing, retreat-staff, save-the-children, etc.):
- Risco final: LOW / MEDIUM / HIGH / CRITICAL

### 📐 Qualidade do post
- Clareza tarefas: X/10
- Clareza benefícios: X/10
- Tom:
- Bandeiras encontradas:

### 💼 Risco de uso comercial oculto
- Nível: LOW / MEDIUM / HIGH / CRITICAL
- Sinais:
- Comentário:

### 🎯 Scoring quantitativo (0–10 por dimensão)
- A. Skills match: X/10
- B. Idioma operacional: X/10
- C. Localização vs fase: X/10
- D. Duração / flexibilidade: X/10
- E. Trabalho remoto: X/10
- F. Bandeira Japão: X/10 (ou N/A)
- G. Visa / long-term: X/10
- H. Trust + qualidade post: X/10
- **Score final ponderado: X.X/10**

### 📊 VEREDICTO: EXCELENTE / BOA / PROMISSORA / INCERTA / DESCARTADA / RED FLAG
**(uma linha clara, com a justificativa central em uma frase)**

### ❓ Verificações e perguntas para o host
- Verificações que VOCÊ deve fazer antes de mandar (Maps, Instagram, reviews, googlar nome)
- Perguntas a fazer ao host na primeira mensagem

### ✉️ MENSAGEM PARA O HOST
> **Só gerar se veredicto for EXCELENTE, BOA ou PROMISSORA.**
> Se INCERTA: sugerir como pedir mais informação (template curto)
> Se DESCARTADA: não gerar. Explicar por que está fora do alvo.
> Se RED FLAG: não gerar. Explicar por quê.

---

## ✉️ DIRETRIZES PARA A MENSAGEM AO HOST

### 6 perguntas obrigatórias (toda mensagem deve responder)

1. **Quem és?** — apresentação pessoal autêntica (brasileiro, 35, Rio→Mendoza→nômade)
2. **Por que ESTE projeto?** — específico, mostra que leste o anúncio (citar 1 detalhe concreto)
3. **Quando exatamente?** — datas concretas da fase relevante do roteiro
4. **Que skills tens?** — direto ao que o host precisa, não auto-elogio genérico
5. **Que referências podes dar?** — CouchSurfing @castroser (5 refs verificadas), ex-hosts, ex-employers
6. **Pergunta genuína para o host?** — abre diálogo, mostra interesse real

### Estrutura
- **Curta** (120–180 palavras — mais curta é melhor)
- **No idioma do anúncio** (italiano, espanhol, inglês, português, japonês básico se aplicável)
- **Abertura com detalhe específico** do anúncio
- **Apresentação em 1–2 frases** — turismo + Rio hostel + Mendoza
- **1 skill operacional** relevante para AQUELE host
- **1 pergunta específica** que esclareça ponto vago
- **Fechamento humano**, sem auto-elogio

### Tom — natural, não formal

**Use:**
- Contrações ("I'm", "don't", "we're"); "che", "voi" em italiano; "vocês", "tô" se cabe em PT
- Frases curtas, ritmo direto
- "Saw your post" / "Vi tu post" / "Ho visto il vostro annuncio" — em vez de "I came across"
- "Quick context on me" / "Em poucas palavras" — em vez de "A bit about me"
- Travessões e fragmentos quando soam naturais

### ❌ ANTI-PATTERNS — o que NUNCA fazer na mensagem

1. ❌ **Mencionar visa sponsorship** — plataformas bloqueiam, hosts assustam
2. ❌ **Mencionar paid work / salário** na primeira mensagem
3. ❌ **Mencionar intenção de ficar >90 dias** — soa como migração disfarçada
4. ❌ **"I appreciate" / "It would be a pleasure"** — soa carta formal
5. ❌ **"I am writing to express my interest"** — fórmula corporativa
6. ❌ **"Sou apaixonado por viajar / amo conhecer culturas"** — clichê vazio
7. ❌ **"Vou ajudar no que for preciso"** — promessa vazia, sem skill
8. ❌ **Auto-elogios genéricos** ("muito proativo", "trabalho em equipe")
9. ❌ **Pedidos imediatos de confirmação** ("aceitam de tal data?") na primeira mensagem
10. ❌ **Dados pessoais demais** (passaporte, telefone, foto pessoal) — só depois de relação estabelecida
11. ❌ **Compromisso firme** antes de host responder perguntas
12. ❌ **Copy-paste genérico** — uma frase deve ser impossível de aplicar a outra oportunidade
13. ❌ **Tom de "venha me salvar"** — não pedir hospitalidade, oferecer troca
14. ❌ **Mencionar que está aplicando para outros simultaneamente** — soa transacional
15. ❌ **Mencionar career-ops / projeto de busca de emprego** — confunde, mistura objetivos

### Calibragem por relação
- **Primeira mensagem a desconhecido:** curta, 1 pergunta. Não mostrar o jogo todo.
- **Resposta a quem respondeu:** mais longa, mais aberta, mais detalhes pessoais.
- **Conversa estabelecida:** pode pedir confirmações concretas.

### Variante: oferta profissional (hostel / B&B / retreat / agriturismo / ryokan)

> Quando o lugar tem componente comercial e demanda hospitalidade (recepção, atendimento, idiomas, check-in), usar variante **mais profissional** — 9 anos gerenciando hostel no Rio é diferencial real.

**Diferenças:**
- **Abertura posiciona experiência operacional** — "I've spent 9 years running hostels in Rio de Janeiro" / "Vengo de 9 años gestionando hostels en Rio" / "Sono stato 9 anni a gestire ostelli a Rio"
- **Idiomas como ferramenta** — "trilingual front desk" / "ricezione trilingue" / "recepción trilingüe (PT/ES/EN + italiano básico)"
- **Abrir espaço para arranjo natural** — "happy to talk about whatever arrangement works on your side — straight exchange, percentage of bookings, whatever fits how you operate" (NÃO mencionar paid work explicitamente; só deixar a porta aberta)
- **Tom continua natural** (contrações, frases curtas, sem auto-elogio)

**Quando usar:** hostel pequeno/médio, B&B familiar, retreat com hospedagem, agriturismo turístico, pousada, ryokan, minshuku.
**Quando NÃO usar:** fazenda puramente familiar, ecovila/comunidade, projeto educativo/social sem turismo, casa de família clássica.

### Variante: Japão (PRIORIDADE)

> Para hosts no Japão, adaptar tom:
- **Cumprimento mínimo em japonês** ("Hajimemashite, [name] desu" / "Yoroshiku onegaishimasu" no fecho) — mostra esforço sem fingir fluência
- **Posicionar interesse cultural genuíno**, não turístico — anime/manga, traditional crafts, hospitality omotenashi
- **Reconhecer humildade** ("My Japanese is basic — I'm learning. Happy to communicate in English / through Google Translate during the stay")
- **Mencionar referências verificáveis** — CouchSurfing é particularmente forte no Japão pela cultura de confiança
- **Não pressionar com datas** — flexibilidade pesa mais que precisão na cultura japonesa
- **Evitar self-promotion ocidental** — em vez de "I'm proactive and skilled", dizer "I've worked in hospitality and would like to learn from how you do it here"

---

## 🔎 CROSS-PLATFORM REPUTATION CHECK — quando vale gastar 2 minutos

Antes de mandar mensagem em oportunidade PROMISSORA ou BOA, verificar:

1. **Google:** nome do projeto + "review" / "scam" / "experience" / "voluntário" (em PT/ES/EN)
2. **Google Maps:** se há endereço, ver fotos públicas + reviews
3. **Instagram:** procurar handle, ver últimas postagens, comentários
4. **TripAdvisor / Booking:** se for hostel/B&B/ryokan/agriturismo comercial
5. **Reddit:** `site:reddit.com "[nome do projeto]"`
6. **Workaway / Worldpackers / HelpStay:** se aparecer em múltiplas com reviews, cross-check
7. **Reverse image search** na foto principal — se aparecer noutro contexto, é estoque ou roubada

**Skip o check se:** veredicto já é INCERTA/DESCARTADA/RED FLAG (não vale o tempo).
**Fazer obrigatoriamente se:** EXCELENTE ou BOA (vale 2 min antes de comprometer 4 semanas).

---

## 📝 [INFO DA FONTE]

> Preencher **antes** de mandar. Se um campo não se aplica, escrever "n/a" — isso também é informação.

```
TIPO DE FONTE:
LINK / NOME DO GRUPO / SITE:
DATA DO POST:
IDIOMA DO POST:

[Se Facebook ou rede social — perfil de quem postou]
NOME / HANDLE:
IDADE APROXIMADA DO PERFIL (anos):
NÚMERO DE AMIGOS / SEGUIDORES:
TEM FOTOS REAIS VARIADAS? (sim/não/estranho):
ATIVIDADE PÚBLICA ANTERIOR? (muita / pouca / nenhuma):
É ADMIN/MODERADOR DO GRUPO? (sim/não/não sei):
PERFIL PESSOAL OU PÁGINA (BUSINESS)?:
AMIGOS EM COMUM?:
CIDADE/PAÍS DECLARADO BATE COM A OPORTUNIDADE?:
COMENTÁRIOS DE OUTRAS PESSOAS NO POST?:

[Se site direto — info do site]
HTTPS VÁLIDO?:
TEM FOTOS DO LUGAR (não estoque)?:
INFO SOBRE O TIME / DONO (nomes, fotos, história)?:
PRESENÇA EM OUTRAS REDES (Instagram, Google Maps, etc.)?:
DOMÍNIO ANTIGO OU RECENTE?:

[Cross-platform check, se já feito]
GOOGLE / REVIEWS:
MAPS:
INSTAGRAM:
REDDIT / FÓRUNS:

[Outros sinais que você notou]
OBSERVAÇÕES:
```

---

## 📝 [TEXTO DA OPORTUNIDADE]

```
COLE O TEXTO DO POST AQUI ENTRE AS LINHAS.

Inclua tudo: título, localização declarada, descrição do host,
descrição das tarefas, o que oferecem, requisitos, idiomas,
qualquer informação visível.

Se o post tem comentários públicos relevantes, cole-os também
(separados por --- ).
```

---

**Fim do template.** Após preencher [INFO DA FONTE] e [TEXTO DA OPORTUNIDADE], peça ao Claude:

> "Analise esta oportunidade seguindo o formato acima."
