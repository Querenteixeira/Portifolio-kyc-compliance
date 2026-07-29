# Fluxo de CDD (Customer Due Diligence)

## O que é

CDD é o processo **padrão** de verificação de identidade e avaliação de risco aplicado a todo cliente no momento do onboarding, antes de iniciar qualquer relação comercial.

---

## Objetivo

Garantir que a instituição conheça quem é o cliente, qual a natureza da relação pretendida e qual o nível de risco associado, cumprindo exigências regulatórias (ex: normas de PLD/FT — Prevenção à Lavagem de Dinheiro e Financiamento ao Terrorismo).

---

## Fluxo do processo

```
┌─────────────────────┐
│ 1. Coleta de dados   │
│   e documentos       │
└──────────┬───────────┘
           ▼
┌─────────────────────┐
│ 2. Validação         │
│   documental         │
└──────────┬───────────┘
           ▼
┌─────────────────────┐
│ 3. Verificação de    │
│   identidade         │
└──────────┬───────────┘
           ▼
┌─────────────────────┐
│ 4. Checagem em       │
│   listas restritivas │
│  (sanções, PEP, etc) │
└──────────┬───────────┘
           ▼
┌─────────────────────┐
│ 5. Classificação     │
│   de risco           │
└──────────┬───────────┘
           ▼
     ┌─────┴─────┐
     ▼           ▼
 Risco baixo   Risco médio/alto
 /médio        → encaminha para EDD
     ▼
┌─────────────────────┐
│ 6. Aprovação e       │
│   onboarding         │
└─────────────────────┘
```

---

## Etapas detalhadas

### 1. Coleta de dados e documentos
- **Pessoa Física:** documento de identidade, CPF, comprovante de residência, comprovante de renda (quando aplicável)
- **Pessoa Jurídica:** contrato social/estatuto, CNPJ, documentos dos sócios, comprovante de endereço da empresa

### 2. Validação documental
- Conferência de autenticidade e validade dos documentos
- Verificação de consistência entre os dados informados e os documentos apresentados

### 3. Verificação de identidade
- Confirmação de que a pessoa é quem diz ser (biometria, validação em bases oficiais, etc.)

### 4. Checagem em listas restritivas
- Listas de sanções nacionais e internacionais (OFAC, ONU, etc.)
- Lista de Pessoas Expostas Politicamente (PEP)
- Notícias negativas (*adverse media*)

### 5. Classificação de risco
Cliente é enquadrado em uma matriz de risco (baixo, médio, alto) considerando:
- Perfil e atividade econômica
- Localização geográfica
- Volume e natureza das operações esperadas
- Resultado das checagens em listas

### 6. Decisão
- **Risco baixo/médio:** segue para aprovação e conclusão do onboarding
- **Risco alto ou sinalização de PEP/red flag:** encaminhado para **EDD** (ver [`fluxo-edd.md`](./fluxo-edd.md))

---

## Periodicidade de revisão

O CDD não é um evento único — a reavaliação do cliente deve ocorrer:
- Em revisões cadastrais periódicas (conforme classificação de risco)
- Quando há mudança relevante no perfil ou comportamento do cliente
- Quando surgem alertas de monitoramento transacional

---

## Documentos relacionados
- [`fluxo-edd.md`](./fluxo-edd.md)
- [`matriz-risco-cliente.md`](./matriz-risco-cliente.md)
- [`politica-onboarding.md`](./politica-onboarding.md)
