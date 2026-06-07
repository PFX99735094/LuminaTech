import { useState } from 'react';
import { Check, Copy, Download, FileCode2 } from 'lucide-react';

interface Props {
  code: string;
  filename: string;
  language?: 'arduino' | 'cpp';
}

export function CodeBlock({ code, filename, language = 'arduino' }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="overflow-hidden rounded-xl border-2 border-ink-900 bg-gradient-to-r from-violet-deep to-ink-900 shadow-[5px_5px_0_0_#4C1D95]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink-900 bg-paper-50 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-rose-pulse" />
          <span className="h-2 w-2 rounded-full bg-amber-glow" />
          <span className="h-2 w-2 rounded-full bg-lime-spark" />
          <span className="ml-2 inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-ink-900">
            <FileCode2 className="h-3.5 w-3.5" strokeWidth={2.5} />
            {filename}
          </span>
          <span className="rounded-sm border border-ink-900/20 px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink-900/55">
            {language}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-md border-2 border-ink-900 bg-paper-50 px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-900 transition-all hover:bg-ink-900 hover:text-paper-50"
            aria-label="Copiar código"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" strokeWidth={2.5} /> Copiado
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" strokeWidth={2.5} /> Copiar
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 rounded-md border-2 border-ink-900 bg-amber-glow px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-900 transition-all hover:bg-amber-deep"
            aria-label="Baixar arquivo .ino"
          >
            <Download className="h-3 w-3" strokeWidth={2.5} /> .ino
          </button>
        </div>
      </div>

      <pre className="max-h-[520px] overflow-auto bg-ink-900 p-5 font-mono text-[12.5px] leading-[1.65] text-paper-50/95">
        <code>{code}</code>
      </pre>
    </div>
  );
}
