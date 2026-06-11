import { useEffect, useState } from 'react';
import { Check, ImagePlus, Plus, Sparkles, X } from 'lucide-react';
import type { Difficulty, BnccArea, AccentKey, IllustrationKey } from '../../landing/types';
import { insertAdminProject, fetchAdminProjects, uploadWiringImage, uploadCardImage } from '../data/projectsRepo';
import { useAuth } from '../../auth';
import { useNavigate } from 'react-router-dom';

const DIFFICULTIES: Difficulty[] = ['Iniciante', 'Intermediário', 'Avançado'];
const BNCC_AREAS: BnccArea[] = [
  'Matemática', 'Ciências', 'Física', 'Geografia', 'Artes',
  'Língua Portuguesa', 'História', 'Tecnologia', 'Robótica',
];
const ACCENTS: AccentKey[] = ['amber', 'lime', 'cyan', 'rose', 'violet', 'teal', 'orange', 'fuchsia'];
const ILLUSTRATIONS: IllustrationKey[] = ['lixeira', 'carrinho', 'sensor', 'semaforo', 'jardim', 'piano'];

const accentColors: Record<AccentKey, string> = {
  amber: 'bg-amber-glow',
  lime: 'bg-lime-spark',
  cyan: 'bg-cyan-spark',
  rose: 'bg-rose-pulse',
  violet: 'bg-violet-spark',
  teal: 'bg-teal-spark',
  orange: 'bg-orange-spark',
  fuchsia: 'bg-fuchsia-spark',
};

interface ProjetoForm {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: Difficulty;
  duration: string;
  materials: string[];
  bncc: BnccArea[];
  bnccCode: string;
  bnccCompetencies: string[];
  illustration: IllustrationKey;
  accent: AccentKey;
  kind: 'arduino' | 'mecanica';
  summary: string;
  code: string;
  inoFilename: string;
  setupSteps: string[];
  wiringImage: string;
  wiringImageAlt: string;
  wiringCaption: string;
  cardImageUrl: string;
  cardImageAlt: string;
}

const emptyForm: ProjetoForm = {
  id: '',
  title: '',
  subtitle: '',
  description: '',
  difficulty: 'Iniciante',
  duration: '',
  materials: [],
  bncc: [],
  bnccCode: '',
  bnccCompetencies: [],
  illustration: 'lixeira',
  accent: 'amber',
  kind: 'arduino',
  summary: '',
  code: '',
  inoFilename: '',
  setupSteps: [],
  wiringImage: '',
  wiringImageAlt: '',
  wiringCaption: '',
  cardImageUrl: '',
  cardImageAlt: '',
};

interface CadastroProjetoProps {
  onSuccess: () => void;
}

export function CadastroProjeto({ onSuccess }: CadastroProjetoProps) {
  const [form, setForm] = useState<ProjetoForm>({ ...emptyForm });
  const [materialInput, setMaterialInput] = useState('');
  const [competencyInput, setCompetencyInput] = useState('');
  const [stepInput, setStepInput] = useState('');
  const [saved, setSaved] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [cardImageFile, setCardImageFile] = useState<File | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  function slugify(text: string) {
    return text
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 2 MB.');
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setForm({ ...form, wiringImage: dataUrl });
    };
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setImageFile(null);
    setForm({ ...form, wiringImage: '' });
    const input = document.getElementById('wiring-image-input') as HTMLInputElement;
    if (input) input.value = '';
  }

  function handleCardImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 2 MB.');
      return;
    }
    setCardImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setForm({ ...form, cardImageUrl: dataUrl });
    };
    reader.readAsDataURL(file);
  }

  function removeCardImage() {
    setCardImageFile(null);
    setForm({ ...form, cardImageUrl: '' });
    const input = document.getElementById('card-image-input') as HTMLInputElement;
    if (input) input.value = '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.description) return;
    // Requer sessão autenticada do Supabase para cumprir políticas de Storage
    if (!user) {
      alert('Você precisa estar logado (Supabase) para cadastrar projetos. Faça login e tente novamente.');
      navigate('/login');
      return;
    }
    // Card image é recomendada, mas opcional na criação

    const projectId = form.id || slugify(form.title);

    // Se houver imagem selecionada, envia para o Storage e usa a URL pública
    let wiringImageUrl: string | null = null;
    if (imageFile) {
      const { url, error: uploadErr } = await uploadWiringImage(imageFile, projectId);
      if (uploadErr) {
        const isRls = /row-level security/i.test(uploadErr) || /rls/i.test(uploadErr);
        if (isRls && form.wiringImage) {
          wiringImageUrl = form.wiringImage; // data URL (base64)
        } else {
          alert(`Falha ao enviar imagem para o Supabase Storage: ${uploadErr}`);
          return;
        }
      } else {
        wiringImageUrl = url;
      }
    }

    // Upload da imagem do card (opcional)
    let cardImageUrl: string | null = form.cardImageUrl || null;
    if (cardImageFile) {
      const { url, error: cardErr } = await uploadCardImage(cardImageFile, projectId);
      if (cardErr) {
        const isRls = /row-level security/i.test(cardErr) || /rls/i.test(cardErr);
        if (isRls && form.cardImageUrl) {
          // Fallback: persiste a data URL no próprio banco
          cardImageUrl = form.cardImageUrl;
        } else {
          alert(`Falha ao enviar imagem do card: ${cardErr}`);
          return;
        }
      } else {
        cardImageUrl = url;
      }
    }

    // Map to a payload mais amigável ao Postgres (snake_case para colunas)
    const payload = {
      id: projectId,
      title: form.title,
      subtitle: form.subtitle,
      description: form.description,
      difficulty: form.difficulty,
      duration: form.duration,
      materials: form.materials,
      bncc: form.bncc,
      bncc_code: form.bnccCode,
      bncc_competencies: form.bnccCompetencies,
      illustration: form.illustration,
      accent: form.accent,
      kind: form.kind,
      summary: form.summary,
      code: form.code,
      ino_filename: form.inoFilename,
      setup_steps: form.setupSteps,
      wiring_image_url: wiringImageUrl,
      wiring_image_alt: form.wiringImageAlt,
      wiring_caption: form.wiringCaption,
      card_image_url: cardImageUrl,
      card_image_alt: form.cardImageAlt,
      hidden: false,
    };

    const { error } = await insertAdminProject(payload);
    if (error) {
      alert(`Falha ao salvar no Supabase: ${error}`);
      return;
    }

    // Reset form state
    setForm({ ...emptyForm });
    setMaterialInput('');
    setCompetencyInput('');
    setStepInput('');
    setImageFile(null);
    setCardImageFile(null);
    const input = document.getElementById('wiring-image-input') as HTMLInputElement;
    if (input) input.value = '';
    const inputCard = document.getElementById('card-image-input') as HTMLInputElement;
    if (inputCard) inputCard.value = '';
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    onSuccess();
  }

  function addMaterial() {
    const m = materialInput.trim();
    if (m && !form.materials.includes(m)) {
      setForm({ ...form, materials: [...form.materials, m] });
      setMaterialInput('');
    }
  }

  function removeMaterial(m: string) {
    setForm({ ...form, materials: form.materials.filter((x) => x !== m) });
  }

  function addCompetency() {
    const c = competencyInput.trim().toUpperCase();
    if (c && !form.bnccCompetencies.includes(c)) {
      setForm({ ...form, bnccCompetencies: [...form.bnccCompetencies, c] });
      setCompetencyInput('');
    }
  }

  function removeCompetency(c: string) {
    setForm({ ...form, bnccCompetencies: form.bnccCompetencies.filter((x) => x !== c) });
  }

  function addStep() {
    const s = stepInput.trim();
    if (s && !form.setupSteps.includes(s)) {
      setForm({ ...form, setupSteps: [...form.setupSteps, s] });
      setStepInput('');
    }
  }

  function removeStep(s: string) {
    setForm({ ...form, setupSteps: form.setupSteps.filter((x) => x !== s) });
  }

  function toggleBncc(area: BnccArea) {
    setForm({
      ...form,
      bncc: form.bncc.includes(area)
        ? form.bncc.filter((a) => a !== area)
        : [...form.bncc, area],
    });
  }

  const [adminCount, setAdminCount] = useState<number | null>(null);
  const [adminCountError, setAdminCountError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { data, error } = await fetchAdminProjects();
        if (cancelled) return;
        if (error) {
          setAdminCountError(true);
          setAdminCount(0);
        } else {
          setAdminCount(data.length);
        }
      } catch {
        if (!cancelled) {
          setAdminCountError(true);
          setAdminCount(0);
        }
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const totalProjects = (adminCount ?? 0);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900">Cadastrar Projeto</h2>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-900/55">
            {totalProjects} projetos no total
          </p>
        </div>
        {saved && (
          <span className="inline-flex items-center gap-1.5 rounded-md border-2 border-lime-deep bg-lime-spark/20 px-3 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-lime-deep">
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            Projeto salvo!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Título do projeto">
            <input
              type="text"
              value={form.title}
              onChange={(e) => {
                setForm({ ...form, title: e.target.value, id: slugify(e.target.value) });
              }}
              className="w-full rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2.5 font-body text-[15px] text-ink-900 placeholder:text-ink-900/45 focus:shadow-[2px_2px_0_0_#4C1D95] focus:outline-none"
              placeholder="Ex: Robô Seguidor de Linha"
              required
            />
          </Field>
          <Field label="Slug (ID)">
            <input
              type="text"
              value={form.id}
              onChange={(e) => setForm({ ...form, id: e.target.value })}
              className="w-full rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2.5 font-mono text-[13px] text-ink-900 placeholder:text-ink-900/45 focus:shadow-[2px_2px_0_0_#4C1D95] focus:outline-none"
              placeholder="robo-seguidor-de-linha"
            />
          </Field>
          <Field label="Subtítulo">
            <input
              type="text"
              value={form.subtitle}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              className="w-full rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2.5 font-body text-[15px] text-ink-900 placeholder:text-ink-900/45 focus:shadow-[2px_2px_0_0_#4C1D95] focus:outline-none"
              placeholder="Ex: Sensores IR e lógica de decisão"
            />
          </Field>
          <Field label="Duração">
            <input
              type="text"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              className="w-full rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2.5 font-body text-[15px] text-ink-900 placeholder:text-ink-900/45 focus:shadow-[2px_2px_0_0_#4C1D95] focus:outline-none"
              placeholder="Ex: 3 aulas (90min)"
            />
          </Field>
        </div>

        <Field label="Descrição (usada nos cards)">
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2.5 font-body text-[15px] text-ink-900 placeholder:text-ink-900/45 focus:shadow-[2px_2px_0_0_#4C1D95] focus:outline-none"
            placeholder="Descrição curta do projeto"
            required
          />
        </Field>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Field label="Dificuldade">
            <div className="flex gap-1.5">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setForm({ ...form, difficulty: d })}
                  className={`flex-1 rounded-md border-2 px-2.5 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] transition-all ${
                    form.difficulty === d
                      ? 'border-ink-900 bg-violet-deep text-paper-50 shadow-[2px_2px_0_0_#4C1D95]'
                      : 'border-ink-900/20 bg-paper-50 text-ink-900/70 hover:border-ink-900'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Ilustração SVG">
            <select
              value={form.illustration}
              onChange={(e) => setForm({ ...form, illustration: e.target.value as IllustrationKey })}
              className="w-full rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2.5 font-mono text-[13px] text-ink-900 focus:shadow-[2px_2px_0_0_#4C1D95] focus:outline-none"
            >
              {ILLUSTRATIONS.map((ill) => (
                <option key={ill} value={ill}>{ill}</option>
              ))}
            </select>
          </Field>
          <Field label="Cor de destaque">
            <div className="flex gap-1.5">
              {ACCENTS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setForm({ ...form, accent: a })}
                  className={`h-8 w-8 rounded-md border-2 transition-all ${
                    form.accent === a
                      ? 'border-ink-900 scale-110 shadow-[2px_2px_0_0_#4C1D95]'
                      : 'border-ink-900/30'
                  } ${accentColors[a]}`}
                  title={a}
                />
              ))}
            </div>
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Áreas BNCC">
            <div className="flex flex-wrap gap-1.5">
              {BNCC_AREAS.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => toggleBncc(area)}
                  className={`rounded-md border-2 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-all ${
                    form.bncc.includes(area)
                      ? 'border-ink-900 bg-cyan-spark text-ink-900'
                      : 'border-ink-900/20 bg-paper-50 text-ink-900/60 hover:border-ink-900'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Código BNCC (ex: EF07ROB02 · EF06MA12)">
            <input
              type="text"
              value={form.bnccCode}
              onChange={(e) => setForm({ ...form, bnccCode: e.target.value })}
              className="w-full rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2.5 font-mono text-[13px] text-ink-900 placeholder:text-ink-900/45 focus:shadow-[2px_2px_0_0_#4C1D95] focus:outline-none"
              placeholder="EF07ROB02 · EF06MA12"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Materiais">
            <div className="flex gap-2">
              <input
                type="text"
                value={materialInput}
                onChange={(e) => setMaterialInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addMaterial())}
                className="flex-1 rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2 font-mono text-[12px] text-ink-900 placeholder:text-ink-900/45 focus:shadow-[2px_2px_0_0_#4C1D95] focus:outline-none"
                placeholder="Digite um material e Enter"
              />
              <button
                type="button"
                onClick={addMaterial}
                className="grid w-9 place-items-center rounded-md border-2 border-ink-900 bg-violet-deep text-paper-50 hover:bg-cyan-spark hover:text-ink-900"
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
            {form.materials.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {form.materials.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-1 rounded-md border border-ink-900/20 bg-paper-100 px-2 py-1 font-mono text-[10px] text-ink-900/80"
                  >
                    {m}
                    <button type="button" onClick={() => removeMaterial(m)} className="text-ink-900/40 hover:text-rose-deep">
                      <X className="h-3 w-3" strokeWidth={2.5} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </Field>
          <Field label="Competências BNCC (códigos)">
            <div className="flex gap-2">
              <input
                type="text"
                value={competencyInput}
                onChange={(e) => setCompetencyInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCompetency())}
                className="flex-1 rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2 font-mono text-[12px] text-ink-900 placeholder:text-ink-900/45 focus:shadow-[2px_2px_0_0_#4C1D95] focus:outline-none"
                placeholder="Ex: EF07ROB02 e Enter"
              />
              <button
                type="button"
                onClick={addCompetency}
                className="grid w-9 place-items-center rounded-md border-2 border-ink-900 bg-violet-deep text-paper-50 hover:bg-cyan-spark hover:text-ink-900"
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
            {form.bnccCompetencies.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {form.bnccCompetencies.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1 rounded-md border border-ink-900/20 bg-cyan-spark/15 px-2 py-1 font-mono text-[10px] font-bold text-ink-900"
                  >
                    {c}
                    <button type="button" onClick={() => removeCompetency(c)} className="text-ink-900/40 hover:text-rose-deep">
                      <X className="h-3 w-3" strokeWidth={2.5} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </Field>
        </div>

        <div className="rounded-xl border-2 border-dashed border-ink-900/30 bg-paper-100/50 p-5">
          <h3 className="flex items-center gap-2 font-display text-[16px] font-semibold text-ink-900">
            <ImagePlus className="h-4 w-4 text-cyan-spark" strokeWidth={2.25} />
            Imagem do Card (Catálogo)
          </h3>
          <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-900/50">
            PNG/JPEG exibida no card do catálogo
          </p>

          <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Upload (opcional, máx 2 MB)">
              <div className="flex items-center gap-3">
                <label className="flex cursor-pointer items-center gap-2 rounded-md border-2 border-ink-900 bg-paper-50 px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-900 transition-all hover:bg-violet-deep hover:text-paper-50">
                  <ImagePlus className="h-4 w-4" strokeWidth={2.25} />
                  {cardImageFile ? 'Trocar imagem' : 'Selecionar imagem'}
                  <input
                    id="card-image-input"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleCardImageUpload}
                    className="hidden"
                  />
                </label>
                {form.cardImageUrl && (
                  <button type="button" onClick={removeCardImage} className="font-mono text-[10px] uppercase tracking-[0.16em] text-rose-deep hover:text-rose-pulse">
                    Remover
                  </button>
                )}
              </div>
              {form.cardImageUrl && (
                <div className="relative mt-3 overflow-hidden rounded-lg border-2 border-ink-900">
                  <img
                    src={form.cardImageUrl}
                    alt={form.cardImageAlt || 'Preview imagem do card'}
                    className="aspect-[5/4] w-full object-cover"
                  />
                </div>
              )}
            </Field>
            <Field label="Texto alternativo (alt)">
              <input
                type="text"
                value={form.cardImageAlt}
                onChange={(e) => setForm({ ...form, cardImageAlt: e.target.value })}
                className="w-full rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2.5 font-mono text-[12px] text-ink-900 placeholder:text-ink-900/45 focus:shadow-[2px_2px_0_0_#4C1D95] focus:outline-none"
                placeholder="Foto/ilustração do projeto para o card"
              />
            </Field>
          </div>
        </div>

        <div className="rounded-xl border-2 border-dashed border-ink-900/30 bg-paper-100/50 p-5">
          <h3 className="flex items-center gap-2 font-display text-[16px] font-semibold text-ink-900">
            <ImagePlus className="h-4 w-4 text-cyan-spark" strokeWidth={2.25} />
            Esquema de Ligação (Wiring)
          </h3>
          <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-900/50">
            Foto do circuito montado — aparece na página de detalhes do projeto
          </p>

          <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Tipo de Projeto">
              <div className="flex gap-2">
                {(['arduino', 'mecanica'] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setForm({ ...form, kind: k })}
                    className={`flex-1 rounded-md border-2 px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition-all ${
                      form.kind === k
                        ? 'border-ink-900 bg-violet-deep text-paper-50'
                        : 'border-ink-900/20 bg-paper-50 text-ink-900/70 hover:border-ink-900'
                    }`}
                  >
                    {k === 'arduino' ? 'Arduino' : 'Mecânica'}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Nome do arquivo .ino">
              <input
                type="text"
                value={form.inoFilename}
                onChange={(e) => setForm({ ...form, inoFilename: e.target.value })}
                className="w-full rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2.5 font-mono text-[13px] text-ink-900 placeholder:text-ink-900/45 focus:shadow-[2px_2px_0_0_#4C1D95] focus:outline-none"
                placeholder="robo_seguidor.ino"
              />
            </Field>
          </div>

          <Field label="Resumo (aparece no topo da página de detalhes)">
            <textarea
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              rows={2}
              className="mt-4 w-full rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2.5 font-body text-[15px] text-ink-900 placeholder:text-ink-900/45 focus:shadow-[2px_2px_0_0_#4C1D95] focus:outline-none"
              placeholder="Ex: Robô que segue uma linha preta usando sensores IR e lógica de decisão..."
            />
          </Field>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Upload da foto do esquema (máx 2 MB)">
              <div className="flex items-center gap-3">
                <label className="flex cursor-pointer items-center gap-2 rounded-md border-2 border-ink-900 bg-paper-50 px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink-900 transition-all hover:bg-violet-deep hover:text-paper-50">
                  <ImagePlus className="h-4 w-4" strokeWidth={2.25} />
                  {imageFile ? 'Trocar imagem' : 'Selecionar imagem'}
                  <input
                    id="wiring-image-input"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {form.wiringImage && (
                  <button type="button" onClick={removeImage} className="font-mono text-[10px] uppercase tracking-[0.16em] text-rose-deep hover:text-rose-pulse">
                    Remover
                  </button>
                )}
              </div>
              {form.wiringImage && (
                <div className="relative mt-3 overflow-hidden rounded-lg border-2 border-ink-900">
                  <img
                    src={form.wiringImage}
                    alt={form.wiringImageAlt || 'Preview do esquema'}
                    className="max-h-48 w-full object-contain bg-paper-50"
                  />
                  <span className="absolute bottom-1 right-1 rounded-md bg-ink-900/70 px-2 py-0.5 font-mono text-[9px] text-paper-50">
                    {(imageFile ? (imageFile.size / 1024).toFixed(0) : '—')} KB
                  </span>
                </div>
              )}
            </Field>
            <div className="flex flex-col gap-4">
              <Field label="Texto alternativo (alt)">
                <input
                  type="text"
                  value={form.wiringImageAlt}
                  onChange={(e) => setForm({ ...form, wiringImageAlt: e.target.value })}
                  className="w-full rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2.5 font-mono text-[12px] text-ink-900 placeholder:text-ink-900/45 focus:shadow-[2px_2px_0_0_#4C1D95] focus:outline-none"
                  placeholder="Arduino Uno + sensor X ligados por jumpers"
                />
              </Field>
              <Field label="Legenda (exibida abaixo da imagem)">
                <input
                  type="text"
                  value={form.wiringCaption}
                  onChange={(e) => setForm({ ...form, wiringCaption: e.target.value })}
                  className="w-full rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2.5 font-mono text-[12px] text-ink-900 placeholder:text-ink-900/45 focus:shadow-[2px_2px_0_0_#4C1D95] focus:outline-none"
                  placeholder="Arduino Uno + Sensor HC-SR04 + Servo SG90"
                />
              </Field>
            </div>
          </div>
        </div>

        <div className="rounded-xl border-2 border-dashed border-ink-900/30 bg-paper-100/50 p-5">
          <h3 className="font-display text-[16px] font-semibold text-ink-900">
            Código Arduino
          </h3>
          <Field label="Código-fonte">
            <textarea
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              rows={8}
              className="mt-3 w-full rounded-md border-2 border-ink-900 bg-ink-800 px-3 py-2.5 font-mono text-[13px] leading-[1.6] text-cyan-spark placeholder:text-paper-50/30 focus:shadow-[2px_2px_0_0_#4C1D95] focus:outline-none"
              placeholder="// Código Arduino aqui..."
              spellCheck={false}
            />
          </Field>
        </div>

        <div className="rounded-xl border-2 border-dashed border-ink-900/30 bg-paper-100/50 p-5">
          <h3 className="font-display text-[16px] font-semibold text-ink-900">
            Passo a passo em sala
          </h3>
          <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-900/50">
            Etapas para aplicar o projeto com a turma
          </p>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={stepInput}
              onChange={(e) => setStepInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addStep())}
              className="flex-1 rounded-md border-2 border-ink-900 bg-paper-50 px-3 py-2 font-mono text-[12px] text-ink-900 placeholder:text-ink-900/45 focus:shadow-[2px_2px_0_0_#4C1D95] focus:outline-none"
              placeholder="Digite o passo e Enter"
            />
            <button
              type="button"
              onClick={addStep}
              className="grid w-9 place-items-center rounded-md border-2 border-ink-900 bg-violet-deep text-paper-50 hover:bg-cyan-spark hover:text-ink-900"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>

          {form.setupSteps.length > 0 && (
            <ol className="mt-4 space-y-2">
              {form.setupSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 rounded-lg border-2 border-ink-900 bg-paper-50 px-3 py-2.5">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 border-ink-900 bg-amber-glow font-mono text-[10px] font-bold text-ink-900">
                    {i + 1}
                  </span>
                  <span className="flex-1 font-body text-[14px] leading-[1.5] text-ink-900/80">{step}</span>
                  <button type="button" onClick={() => removeStep(step)} className="mt-0.5 text-ink-900/40 hover:text-rose-deep">
                    <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex items-center gap-3 border-t-2 border-dashed border-ink-900/15 pt-6">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md border-2 border-ink-900 bg-violet-deep px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-paper-50 shadow-[3px_3px_0_0_#4C1D95] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-cyan-spark hover:text-ink-900 hover:shadow-[1px_1px_0_0_#4C1D95]"
          >
            <Sparkles className="h-4 w-4" strokeWidth={2.25} />
            Salvar Projeto
          </button>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-900/45">
            {adminCountError ? 'Supabase não configurado' : 'Os dados são salvos no Supabase'}
          </span>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-900/70">{label}</span>
      {children}
    </label>
  );
}
