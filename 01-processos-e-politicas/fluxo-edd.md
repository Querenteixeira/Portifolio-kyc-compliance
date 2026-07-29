# Fluxo de EDD (Enhanced Due Diligence)

## O que é

EDD é o processo de **diligência reforçada**, aplicado a clientes classificados como de **risco médio/alto** durante o CDD, ou que se enquadram em critérios específicos que exigem análise aprofundada.

---

## Quando o EDD é acionado

- Cliente classificado como **PEP** (Pessoa Exposta Politicamente) ou familiar/relacionado a PEP
- Resultado positivo (ou parcial) em listas restritivas ou notícias negativas
- Estrutura societária complexa ou pouco transparente
- Cliente ou operação vinculada a **país de alto risco** (conforme listas GAFI/FATF)
- Volume ou natureza de operação incompatível com o perfil declarado
- Atividade econômica considerada de risco elevado (ex: cassinos, criptoativos, negócios com uso intensivo de dinheiro em espécie)

---

## Fluxo do processo

```
┌──────────────────────────┐
│ Cliente sinalizado no CDD│
│  como risco médio/alto   │
└─────────────┬─────────────┘
              ▼
┌──────────────────────────┐
│ 1. Aprofundamento         │
│   documental e cadastral  │
└─────────────┬─────────────┘
              ▼
┌──────────────────────────┐
│ 2. Identificação de UBO   │
│   (beneficiário final)    │
└─────────────┬─────────────┘
              ▼
┌──────────────────────────┐
│ 3. Origem de recursos e   │
│   patrimônio (quando      │
│   aplicável)              │
└─────────────┬─────────────┘
              ▼
┌──────────────────────────┐
│ 4. Pesquisa aprofundada   │
│   (adverse media, fontes  │
│   públicas, judiciais)    │
└─────────────┬─────────────┘
              ▼
┌──────────────────────────┐
│ 5. Parecer e decisão      │
│   (aprovar / recusar /    │
│   aprovar com monitoramento│
│   reforçado)              │
└─────────────┬─────────────┘
              ▼
┌──────────────────────────┐
│ 6. Aprovação em instância │
│   superior / comitê       │
│   (quando exigido)        │
└──────────────────────────┘
```

---

## Etapas detalhadas

### 1. Aprofundamento documental e cadastral
- Solicitação de documentos adicionais além do exigido no CDD padrão
- Validação cruzada de informações societárias e cadastrais

### 2. Identificação do beneficiário final (UBO — *Ultimate Beneficial Owner*)
- Mapeamento completo da cadeia societária
- Identificação de pessoas físicas que efetivamente controlam ou se beneficiam da estrutura, mesmo quando não aparecem formalmente

### 3. Origem de recursos e patrimônio
- Avaliação da compatibilidade entre patrimônio/renda declarados e a atividade exercida
- Solicitação de comprovação quando há incompatibilidade

### 4. Pesquisa aprofundada
- Busca em fontes públicas e processos judiciais
- Verificação de notícias negativas (*adverse media*) com análise de contexto e relevância
- Reavaliação de vínculos com PEPs e listas restritivas

### 5. Parecer técnico e decisão
Elaboração de parecer fundamentado, contendo:
- Resumo do caso e motivo do encaminhamento para EDD
- Achados relevantes (positivos e negativos)
- Recomendação: **aprovar**, **recusar** ou **aprovar com monitoramento reforçado**

### 6. Governança
- Casos de risco elevado costumam exigir aprovação de instância superior (gestor, comitê de compliance), conforme política interna

---

## Monitoramento pós-aprovação

Clientes que passam por EDD normalmente permanecem sob:
- **Revisão cadastral com periodicidade mais curta**
- **Monitoramento transacional reforçado**, com atenção a operações atípicas

---

## Documentos relacionados
- [`fluxo-cdd.md`](./fluxo-cdd.md)
- [`matriz-risco-cliente.md`](./matriz-risco-cliente.md)
- [`../02-casos-praticos/caso-03-pep-edd`](../02-casos-praticos)
