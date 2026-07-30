import React, { useState } from "react";
import {
  User, Building2, FileText, Upload, ChevronRight, ChevronLeft,
  CheckCircle2, XCircle, AlertTriangle, Clock, Search, ShieldAlert,
  ArrowLeft, Fingerprint
} from "lucide-react";

const RISK_COUNTRIES = ["Irã", "Coreia do Norte", "Mianmar", "Panamá", "Ilhas Cayman"];
const SECTORS = [
  { name: "Varejo", weight: 0 },
  { name: "Serviços profissionais", weight: 0 },
  { name: "Construção civil", weight: 10 },
  { name: "Casas de câmbio", weight: 25 },
  { name: "Ativos digitais / cripto", weight: 30 },
  { name: "Comércio de metais preciosos", weight: 20 },
  { name: "ONGs / organizações sem fins lucrativos", weight: 15 },
];

function computeRisk({ pep, country, sector, volume }) {
  let score = 0;
  if (pep === "sim") score += 40;
  if (RISK_COUNTRIES.includes(country)) score += 30;
  const sectorObj = SECTORS.find((s) => s.name === sector);
  if (sectorObj) score += sectorObj.weight;
  if (volume === "alto") score += 15;
  else if (volume === "medio") score += 5;

  let tier = "Baixo";
  if (score >= 60) tier = "Alto";
  else if (score >= 30) tier = "Médio";

  let status = "em_analise";
  if (tier === "Alto") status = "edd_necessario";

  return { score, tier, status };
}

function StatusStamp({ status }) {
  const map = {
    em_analise: { label: "Em análise", color: "#A9720A", bg: "#FBF3E2", icon: Clock },
    edd_necessario: { label: "EDD necessário", color: "#B54708", bg: "#FDECE1", icon: ShieldAlert },
    aprovado: { label: "Aprovado", color: "#2F6B45", bg: "#E7F2EA", icon: CheckCircle2 },
    reprovado: { label: "Reprovado", color: "#9B3131", bg: "#FBEAEA", icon: XCircle },
  };
  const s = map[status];
  const Icon = s.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold tracking-wide uppercase"
      style={{
        color: s.color,
        backgroundColor: s.bg,
        border: `1.5px solid ${s.color}55`,
        borderRadius: "3px",
        fontFamily: "'IBM Plex Mono', monospace",
      }}
    >
      <Icon size={13} strokeWidth={2.5} />
      {s.label}
    </span>
  );
}

function Field({ label, children, hint }) {
  return (
    <label className="block mb-5">
      <span
        className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
        style={{ color: "#6B6F76", fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {label}
      </span>
      {children}
      {hint && <span className="block text-xs mt-1" style={{ color: "#9A9DA3" }}>{hint}</span>}
    </label>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  fontSize: "14.5px",
  border: "1.5px solid #DEDAD0",
  borderRadius: "4px",
  backgroundColor: "#FFFFFF",
  color: "#20242B",
  outline: "none",
};

function Onboarding({ onSubmitCase, onCancel }) {
  const [step, setStep] = useState(0);
  const [type, setType] = useState("pf");
  const [form, setForm] = useState({
    name: "",
    doc: "",
    birth: "",
    country: "Brasil",
    docType: "RG",
    ubo: "",
    pep: "nao",
    riskCountry: "Nenhum",
    sector: "Varejo",
    volume: "baixo",
  });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const steps = [
    { title: "Identificação", icon: type === "pf" ? User : Building2 },
    { title: "Documentação", icon: FileText },
    { title: "Perfil de risco", icon: ShieldAlert },
    { title: "Revisão", icon: Fingerprint },
  ];

  const canAdvance = () => {
    if (step === 0) return form.name.trim().length > 2 && form.doc.trim().length > 5;
    return true;
  };

  const handleFinish = () => {
    const risk = computeRisk({
      pep: form.pep,
      country: form.riskCountry,
      sector: form.sector,
      volume: form.volume,
    });
    onSubmitCase({
      id: "KYC-" + Math.floor(1000 + Math.random() * 9000),
      type,
      ...form,
      ...risk,
      createdAt: new Date().toLocaleDateString("pt-BR"),
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onCancel}
        className="flex items-center gap-1.5 text-sm mb-6 hover:opacity-70"
        style={{ color: "#6B6F76" }}
      >
        <ArrowLeft size={15} /> Voltar para a fila
      </button>

      {/* Step indicator — perforated ticket style */}
      <div className="flex items-center mb-8">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const active = i === step;
          const done = i < step;
          return (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-1.5" style={{ width: 76 }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: done ? "#0E4F4A" : active ? "#FFFFFF" : "#FFFFFF",
                    border: `2px solid ${done || active ? "#0E4F4A" : "#DEDAD0"}`,
                    color: done ? "#fff" : active ? "#0E4F4A" : "#9A9DA3",
                  }}
                >
                  {done ? <CheckCircle2 size={16} /> : <Icon size={16} />}
                </div>
                <span
                  className="text-[10.5px] text-center leading-tight"
                  style={{
                    color: active ? "#20242B" : "#9A9DA3",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {s.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="flex-1 h-px mb-5"
                  style={{ backgroundColor: i < step ? "#0E4F4A" : "#DEDAD0" }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div
        className="p-8"
        style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #DEDAD0", borderRadius: "6px" }}
      >
        {step === 0 && (
          <div>
            <h2 className="text-xl mb-5" style={{ fontFamily: "'Source Serif 4', serif", color: "#20242B" }}>
              Identificação do cliente
            </h2>
            <div className="flex gap-2 mb-6">
              {[
                { key: "pf", label: "Pessoa Física" },
                { key: "pj", label: "Pessoa Jurídica" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setType(t.key)}
                  className="px-4 py-2 text-sm font-medium"
                  style={{
                    borderRadius: "4px",
                    border: `1.5px solid ${type === t.key ? "#0E4F4A" : "#DEDAD0"}`,
                    backgroundColor: type === t.key ? "#0E4F4A" : "#fff",
                    color: type === t.key ? "#fff" : "#6B6F76",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <Field label={type === "pf" ? "Nome completo" : "Razão social"}>
              <input
                style={inputStyle}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder={type === "pf" ? "Ex: Maria Fernanda Silva" : "Ex: Comércio ABC Ltda"}
              />
            </Field>
            <Field label={type === "pf" ? "CPF" : "CNPJ"}>
              <input
                style={inputStyle}
                value={form.doc}
                onChange={(e) => update("doc", e.target.value)}
                placeholder={type === "pf" ? "000.000.000-00" : "00.000.000/0001-00"}
              />
            </Field>
            <Field label={type === "pf" ? "Data de nascimento" : "Data de abertura"}>
              <input
                type="date"
                style={inputStyle}
                value={form.birth}
                onChange={(e) => update("birth", e.target.value)}
              />
            </Field>
            <Field label={type === "pf" ? "País de residência" : "País da sede"}>
              <input
                style={inputStyle}
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
              />
            </Field>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-xl mb-5" style={{ fontFamily: "'Source Serif 4', serif", color: "#20242B" }}>
              Documentação
            </h2>
            <Field label="Tipo de documento">
              <select style={inputStyle} value={form.docType} onChange={(e) => update("docType", e.target.value)}>
                <option>RG</option>
                <option>CNH</option>
                <option>Passaporte</option>
                <option>Contrato Social</option>
                <option>Cartão CNPJ</option>
              </select>
            </Field>
            <div
              className="flex flex-col items-center justify-center gap-2 py-10 mb-5"
              style={{
                border: "2px dashed #DEDAD0",
                borderRadius: "6px",
                backgroundColor: "#FAFAF7",
                color: "#9A9DA3",
              }}
            >
              <Upload size={22} />
              <span className="text-sm">Simulação de envio de arquivo — sem upload real</span>
            </div>
            {type === "pj" && (
              <Field label="% de participação do UBO informado" hint="Beneficiário final com maior participação">
                <input
                  style={inputStyle}
                  value={form.ubo}
                  onChange={(e) => update("ubo", e.target.value)}
                  placeholder="Ex: 62%"
                />
              </Field>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl mb-5" style={{ fontFamily: "'Source Serif 4', serif", color: "#20242B" }}>
              Perfil de risco
            </h2>
            <Field label="Pessoa exposta politicamente (PEP)?">
              <select style={inputStyle} value={form.pep} onChange={(e) => update("pep", e.target.value)}>
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
              </select>
            </Field>
            <Field label="País de alto risco associado">
              <select
                style={inputStyle}
                value={form.riskCountry}
                onChange={(e) => update("riskCountry", e.target.value)}
              >
                <option>Nenhum</option>
                {RISK_COUNTRIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Setor de atividade">
              <select style={inputStyle} value={form.sector} onChange={(e) => update("sector", e.target.value)}>
                {SECTORS.map((s) => (
                  <option key={s.name}>{s.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Volume mensal estimado">
              <select style={inputStyle} value={form.volume} onChange={(e) => update("volume", e.target.value)}>
                <option value="baixo">Até R$ 10 mil</option>
                <option value="medio">R$ 10 mil – R$ 100 mil</option>
                <option value="alto">Acima de R$ 100 mil</option>
              </select>
            </Field>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl mb-1" style={{ fontFamily: "'Source Serif 4', serif", color: "#20242B" }}>
              Revisão do cadastro
            </h2>
            <p className="text-sm mb-5" style={{ color: "#6B6F76" }}>
              Confira os dados antes de enviar para a fila de análise.
            </p>
            <div className="text-sm space-y-2 mb-6" style={{ color: "#20242B" }}>
              <div><b>Tipo:</b> {type === "pf" ? "Pessoa Física" : "Pessoa Jurídica"}</div>
              <div><b>Nome:</b> {form.name || "—"}</div>
              <div><b>Documento:</b> {form.doc || "—"}</div>
              <div><b>País:</b> {form.country}</div>
              <div><b>PEP:</b> {form.pep === "sim" ? "Sim" : "Não"}</div>
              <div><b>País de risco:</b> {form.riskCountry}</div>
              <div><b>Setor:</b> {form.sector}</div>
            </div>
            {(() => {
              const preview = computeRisk({
                pep: form.pep,
                country: form.riskCountry,
                sector: form.sector,
                volume: form.volume,
              });
              const tierColor =
                preview.tier === "Alto" ? "#B54708" : preview.tier === "Médio" ? "#A9720A" : "#2F6B45";
              return (
                <div
                  className="p-4 mb-2"
                  style={{ backgroundColor: "#FAFAF7", border: `1.5px solid ${tierColor}44`, borderRadius: "6px" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold" style={{ color: "#20242B" }}>
                      Score de risco calculado
                    </span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: tierColor, fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {preview.score} pts · {preview.tier}
                    </span>
                  </div>
                  {preview.tier === "Alto" && (
                    <p className="text-xs mt-2" style={{ color: "#B54708" }}>
                      Este caso será encaminhado automaticamente para EDD (Enhanced Due Diligence).
                    </p>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium"
            style={{ color: step === 0 ? "#DEDAD0" : "#6B6F76" }}
          >
            <ChevronLeft size={16} /> Anterior
          </button>
          {step < 3 ? (
            <button
              onClick={() => canAdvance() && setStep((s) => s + 1)}
              className="flex items-center gap-1 px-5 py-2.5 text-sm font-semibold"
              style={{
                backgroundColor: canAdvance() ? "#0E4F4A" : "#DEDAD0",
                color: "#fff",
                borderRadius: "4px",
              }}
            >
              Próximo <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "#0E4F4A", color: "#fff", borderRadius: "4px" }}
            >
              <Fingerprint size={16} /> Enviar para análise
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CaseDetail({ c, onDecide, onBack }) {
  const tierColor = c.tier === "Alto" ? "#B54708" : c.tier === "Médio" ? "#A9720A" : "#2F6B45";
  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm mb-6 hover:opacity-70"
        style={{ color: "#6B6F76" }}
      >
        <ArrowLeft size={15} /> Voltar para a fila
      </button>
      <div
        className="p-8"
        style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #DEDAD0", borderRadius: "6px" }}
      >
        <div className="flex items-start justify-between mb-1">
          <h2 className="text-xl" style={{ fontFamily: "'Source Serif 4', serif", color: "#20242B" }}>
            {c.name}
          </h2>
          <StatusStamp status={c.status} />
        </div>
        <p
          className="text-xs mb-6"
          style={{ color: "#9A9DA3", fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {c.id} · aberto em {c.createdAt}
        </p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm mb-6" style={{ color: "#20242B" }}>
          <div><span style={{ color: "#9A9DA3" }}>Tipo</span><br />{c.type === "pf" ? "Pessoa Física" : "Pessoa Jurídica"}</div>
          <div><span style={{ color: "#9A9DA3" }}>Documento</span><br />{c.doc}</div>
          <div><span style={{ color: "#9A9DA3" }}>País</span><br />{c.country}</div>
          <div><span style={{ color: "#9A9DA3" }}>Setor</span><br />{c.sector}</div>
          <div><span style={{ color: "#9A9DA3" }}>PEP</span><br />{c.pep === "sim" ? "Sim" : "Não"}</div>
          <div><span style={{ color: "#9A9DA3" }}>País de risco</span><br />{c.riskCountry}</div>
        </div>

        <div
          className="p-4 mb-6 flex items-center justify-between"
          style={{ backgroundColor: "#FAFAF7", border: `1.5px solid ${tierColor}44`, borderRadius: "6px" }}
        >
          <span className="text-sm font-semibold" style={{ color: "#20242B" }}>Score de risco</span>
          <span className="text-sm font-bold" style={{ color: tierColor, fontFamily: "'IBM Plex Mono', monospace" }}>
            {c.score} pts · {c.tier}
          </span>
        </div>

        {(c.status === "em_analise" || c.status === "edd_necessario") && (
          <div className="flex gap-3">
            <button
              onClick={() => onDecide(c.id, "aprovado")}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "#2F6B45", color: "#fff", borderRadius: "4px" }}
            >
              <CheckCircle2 size={16} /> Aprovar
            </button>
            <button
              onClick={() => onDecide(c.id, "reprovado")}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold"
              style={{ backgroundColor: "#9B3131", color: "#fff", borderRadius: "4px" }}
            >
              <XCircle size={16} /> Reprovar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function KYCOnboardingApp() {
  const [cases, setCases] = useState([
    {
      id: "KYC-4471", type: "pf", name: "Renato Ferreira Costa", doc: "123.456.789-00",
      country: "Brasil", pep: "nao", riskCountry: "Nenhum", sector: "Varejo",
      score: 0, tier: "Baixo", status: "aprovado", createdAt: "12/07/2026",
    },
    {
      id: "KYC-4488", type: "pj", name: "Metais Horizonte Ltda", doc: "12.345.678/0001-90",
      country: "Brasil", pep: "nao", riskCountry: "Nenhum", sector: "Comércio de metais preciosos",
      score: 20, tier: "Médio", status: "em_analise", createdAt: "18/07/2026",
    },
    {
      id: "KYC-4502", type: "pf", name: "Alexei Sorokin", doc: "987.654.321-00",
      country: "Rússia", pep: "sim", riskCountry: "Irã", sector: "Ativos digitais / cripto",
      score: 100, tier: "Alto", status: "edd_necessario", createdAt: "24/07/2026",
    },
  ]);
  const [view, setView] = useState("queue"); // queue | new | detail
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");

  const addCase = (c) => {
    setCases((prev) => [{ ...c, status: c.status }, ...prev]);
    setView("queue");
  };

  const decide = (id, status) => {
    setCases((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    setView("queue");
  };

  const filtered = cases.filter((c) =>
    (c.name + c.id).toLowerCase().includes(query.toLowerCase())
  );

  const counts = {
    em_analise: cases.filter((c) => c.status === "em_analise").length,
    edd_necessario: cases.filter((c) => c.status === "edd_necessario").length,
    aprovado: cases.filter((c) => c.status === "aprovado").length,
    reprovado: cases.filter((c) => c.status === "reprovado").length,
  };

  const selected = cases.find((c) => c.id === selectedId);

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: "#F6F4EE", fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@500;600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;600&display=swap');
      `}</style>

      <header
        className="px-8 py-5 flex items-center justify-between"
        style={{ borderBottom: "1.5px solid #DEDAD0" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 flex items-center justify-center"
            style={{ backgroundColor: "#0E4F4A", borderRadius: "4px" }}
          >
            <Fingerprint size={17} color="#fff" />
          </div>
          <div>
            <h1 className="text-base font-semibold" style={{ color: "#20242B" }}>
              Onboarding KYC
            </h1>
            <p className="text-xs" style={{ color: "#9A9DA3" }}>Cadastro e triagem de clientes</p>
          </div>
        </div>
        {view === "queue" && (
          <button
            onClick={() => setView("new")}
            className="px-4 py-2 text-sm font-semibold"
            style={{ backgroundColor: "#0E4F4A", color: "#fff", borderRadius: "4px" }}
          >
            + Novo cadastro
          </button>
        )}
      </header>

      <main className="px-8 py-8">
        {view === "new" && <Onboarding onSubmitCase={addCase} onCancel={() => setView("queue")} />}
        {view === "detail" && selected && (
          <CaseDetail c={selected} onDecide={decide} onBack={() => setView("queue")} />
        )}
        {view === "queue" && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label: "Em análise", value: counts.em_analise, color: "#A9720A" },
                { label: "EDD necessário", value: counts.edd_necessario, color: "#B54708" },
                { label: "Aprovados", value: counts.aprovado, color: "#2F6B45" },
                { label: "Reprovados", value: counts.reprovado, color: "#9B3131" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4"
                  style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #DEDAD0", borderRadius: "6px" }}
                >
                  <div
                    className="text-2xl font-bold"
                    style={{ color: stat.color, fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#6B6F76" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Search size={16} color="#9A9DA3" />
              <input
                placeholder="Buscar por nome ou número do caso..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ ...inputStyle, maxWidth: 340 }}
              />
            </div>

            <div style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #DEDAD0", borderRadius: "6px" }}>
              {filtered.map((c, i) => {
                const tierColor = c.tier === "Alto" ? "#B54708" : c.tier === "Médio" ? "#A9720A" : "#2F6B45";
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedId(c.id);
                      setView("detail");
                    }}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#FAFAF7]"
                    style={{
                      borderBottom: i < filtered.length - 1 ? "1.5px dashed #DEDAD0" : "none",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {c.type === "pf" ? <User size={16} color="#9A9DA3" /> : <Building2 size={16} color="#9A9DA3" />}
                      <div>
                        <div className="text-sm font-medium" style={{ color: "#20242B" }}>{c.name}</div>
                        <div
                          className="text-xs"
                          style={{ color: "#9A9DA3", fontFamily: "'IBM Plex Mono', monospace" }}
                        >
                          {c.id} · {c.createdAt}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-semibold"
                        style={{ color: tierColor, fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        {c.score} pts
                      </span>
                      <StatusStamp status={c.status} />
                    </div>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <div className="px-5 py-10 text-center text-sm" style={{ color: "#9A9DA3" }}>
                  Nenhum caso encontrado.
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
