# Grupos de Facebook — Voluntariado e Work Exchange

> **Regra de ouro:** Leitura passiva apenas. NÃO automatizar acções (join, post, comment).
> O utilizador navega manualmente ou o Claude lê passivamente com Playwright.
> Facebook é hostil a bots — o perfil pessoal é único e não pode ser queimado.

---

## 🌍 Globais — Voluntariado e Work Exchange

| Grupo | URL | Tipo | Notas |
|---|---|---|---|
| Volunteer Abroad For Free | https://www.facebook.com/groups/volunteerabroadforfree/ | Global | Muito activo, algum spam — usar filtro |
| Work Exchange & Volunteering | https://www.facebook.com/groups/workexchangeandvolunteering/ | Global | Mix de plataformas e contacto directo |
| WWOOF Community | https://www.facebook.com/groups/wwoofcommunity/ | Fazendas orgânicas | Posts de hosts e voluntários |
| Hostel Jobs and Volunteering | https://www.facebook.com/groups/hosteljobsandvolunteering/ | Hostels global | Bom para front desk — perfil directo |
| Organic Farming Volunteers Worldwide | https://www.facebook.com/groups/organicfarmingvolunteers/ | Fazendas global | Hosts postam directamente |

---

## 🇪🇺 Europa — Schengen

| Grupo | URL | Tipo | Notas |
|---|---|---|---|
| Work Exchange Europe | https://www.facebook.com/groups/workexchangeeurope/ | Europa geral | Activo, variedade |
| Seasonal Work Europe | https://www.facebook.com/groups/seasonalworkeurope/ | Temporada | Colheitas, ski, eventos |
| Volunteer in Italy / Volontariato | https://www.facebook.com/groups/volunteerinitaly/ | Itália | Agriturismo, fazendas, projetos |
| Farm Work and Volunteering Italy | https://www.facebook.com/groups/farmworkitaly/ | Itália fazendas | Bom para vendemmia Toscana |
| Agriturismo Volontari Italia | Pesquisar no FB | Itália agriturismo | Grupos em italiano — mais locais |
| Volunteer in Spain | https://www.facebook.com/groups/volunteerinspain/ | Espanha | |
| Volunteer in Portugal | https://www.facebook.com/groups/volunteerinportugal/ | Portugal | |
| Work Exchange France | Pesquisar no FB | França | Vindima, fazendas |

---

## 🏔️ Balcãs / Europa Leste / Cáucaso

| Grupo | URL | Tipo | Notas |
|---|---|---|---|
| Volunteer in Bulgaria | https://www.facebook.com/groups/volunteerbulgaria/ | Bulgária | |
| Digital Nomads Bansko | https://www.facebook.com/groups/digitalnomadsbansko/ | Bansko | Nómades, temporada ski |
| Seasonal Work Ski Resorts Europe | https://www.facebook.com/groups/skiresortjobseurope/ | Ski sazonal | Bansko, Kopaonik, Jahorina |
| Expats in Georgia (Country) | Pesquisar no FB | Geórgia | Tbilisi — comunidade grande |
| Digital Nomads Georgia | Pesquisar no FB | Geórgia | Gudauri ski + Tbilisi |
| Work in Serbia | Pesquisar no FB | Sérvia | Kopaonik |

---

## 🇯🇵 Japão (Prioridade Máxima)

| Grupo | URL | Tipo | Notas |
|---|---|---|---|
| Volunteer in Japan | https://www.facebook.com/groups/volunteerjapan/ | Japão geral | Verificar se activo |
| Teaching and Volunteering in Japan | Pesquisar no FB | Japão | Ensino + troca |
| Japan Work Exchange | Pesquisar no FB | Japão | Work exchange específico |
| Backpackers Japan | Pesquisar no FB | Japão | Hostel connections |

---

## 🌏 Sudeste Asiático

| Grupo | URL | Tipo | Notas |
|---|---|---|---|
| Volunteer Southeast Asia | https://www.facebook.com/groups/volunteersoutheastasia/ | SEA geral | |
| Work Exchange Thailand | https://www.facebook.com/groups/workexchangethailand/ | Tailândia | |
| Volunteer in Bali | Pesquisar no FB | Indonésia / Bali | Eco, yoga, hostels |
| Volunteer Vietnam | Pesquisar no FB | Vietnã | Hostels, projetos locais |
| Volunteer Cambodia | Pesquisar no FB | Camboja | |

---

## 🔍 Como encontrar grupos locais relevantes

Pesquisar no Facebook com termos como:
- `volunteer [país/cidade]`
- `work exchange [país]`
- `wwoof [país]`
- `hostel volunteer [cidade]`
- `farm work [país]`
- `seasonal work [cidade/região]`
- `digital nomads [cidade]`
- `expats in [país]`
- Termos locais: `volontariato` (IT), `voluntariado` (ES/PT), `bénévolat` (FR)

---

## ⚠️ Protocolo de uso com Playwright

1. Claude navega para a URL do grupo
2. `browser_snapshot` para ler posts recentes visíveis sem login
3. Se grupo for público e visível: extrair posts com oportunidades de voluntariado
4. Colar conteúdo relevante no template `analisar_oportunidade.md` para análise
5. **NUNCA** usar `browser_click` em "Join Group", "Like", "Comment"
6. Se o grupo exigir login para ver conteúdo: marcar como "manual only" e pular
