# Matriz de Risco de Cliente

## Objetivo

Padronizar a classificação de risco de clientes (pessoa física e jurídica) durante o processo de CDD, definindo critérios objetivos que orientam a necessidade — ou não — de encaminhamento para EDD.

---

## Fatores considerados

A classificação de risco resulta da combinação de múltiplos fatores, não de um critério isolado:

| Fator | O que é avaliado |
|---|---|
| **Perfil do cliente** | PF ou PJ, atividade/profissão, tempo de constituição (para PJ) |
| **Localização geográfica** | País/região de residência ou atuação, exposição a jurisdições de alto risco |
| **Natureza da atividade econômica** | Setores com maior exposição a risco (ex: cassinos, criptoativos, uso intensivo de espécie) |
| **Volume e natureza das operações esperadas** | Compatibilidade entre o declarado e o perfil |
| **Resultado de checagens** | Listas de sanções, PEP, notícias negativas |
| **Estrutura societária** (PJ) | Transparência e complexidade da cadeia societária |

---

## Níveis de risco

### 🟢 Risco Baixo
- Nenhuma ocorrência em checagens (sanções, PEP, adverse media)
- Perfil, atividade e volume de operação plenamente compatíveis
- Estrutura simples (PJ) ou perfil individual sem particularidades (PF)

**Tratamento:** CDD padrão, revisão cadastral em periodicidade regular (ex: a cada 3-5 anos, conforme política).

---

### 🟡 Risco Médio
- Um fator de atenção isolado, sem gravidade (ex: setor de atividade com exposição moderada, ou pequena divergência documental já esclarecida)
- Nenhuma ocorrência crítica em listas restritivas

**Tratamento:** CDD com verificação adicional pontual. Revisão cadastral em periodicidade intermediária (ex: a cada 1-2 anos).

---

### 🔴 Risco Alto
Qualquer um dos itens abaixo já classifica o cliente como alto risco:
- Enquadramento como PEP (titular ou relacionado)
- Ocorrência (mesmo parcial) em listas de sanções
- Notícia negativa relevante confirmada
- Estrutura societária complexa com opacidade não esclarecida
- Vínculo com jurisdição de alto risco (GAFI/FATF)
- Atividade econômica de risco elevado

**Tratamento:** Encaminhamento obrigatório para **EDD**. Revisão cadastral em periodicidade curta (ex: anual) e monitoramento transacional reforçado.

---

## Observação importante

A matriz de risco é uma **ferramenta de apoio à decisão**, não um substituto do julgamento técnico do analista. Um cliente pode apresentar um único fator de risco elevado, mas contexto e documentação podem justificar aprovação com monitoramento — assim como a ausência de red flags óbvios não impede uma recusa fundamentada em outros elementos do caso.

---

## Documentos relacionados
- [`fluxo-cdd.md`](./fluxo-cdd.md)
- [`fluxo-edd.md`](./fluxo-edd.md)
- [`politica-onboarding.md`](./politica-onboarding.md)
