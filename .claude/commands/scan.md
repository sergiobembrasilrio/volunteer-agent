Entra no modo SCAN. Lê o ficheiro `portais.yml` para identificar as regiões com `active_regions: true`. Para cada portal activo nessas regiões, navega com `browser_navigate` + `browser_snapshot`, extrai oportunidades novas (filtrando contra `data/scan-history.tsv`), e adiciona ao `data/pipeline.md`. No final reporta: portais visitados, oportunidades encontradas, adicionadas ao pipeline.

Se o utilizador passou um argumento (ex: `/scan eu` ou `/scan japan`), ignorar o `active_regions` e forçar scan apenas dessa região.
