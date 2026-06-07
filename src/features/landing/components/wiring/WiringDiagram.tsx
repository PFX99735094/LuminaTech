import type { ProjectDetails } from '../../types';

interface Props {
  projectId: string;
  details?: ProjectDetails;
}

export function WiringDiagram({ projectId, details }: Props) {
  const src = details?.wiringImage;
  const alt =
    details?.wiringImageAlt ??
    `Foto real da montagem do projeto ${projectId}.`;
  const caption = details?.wiringCaption ?? 'Esquema de ligação';

  if (!src) {
    return <Placeholder name={projectId} />;
  }

  return (
    <figure className="flex h-full w-full flex-col items-center justify-center gap-3 p-4">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="max-h-full max-w-full rounded-md object-contain"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
      <figcaption className="text-center font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-900/60">
        {caption}
      </figcaption>
    </figure>
  );
}

function Placeholder({ name }: { name: string }) {
  return (
    <div className="grid h-full w-full place-items-center bg-paper-100/40 p-8 font-mono text-sm text-ink-900/55">
      Foto do esquema de ligação para "{name}" em desenvolvimento.
    </div>
  );
}

export function PinLegend() {
  const items: { color: string; label: string }[] = [
    { color: '#E63946', label: '5V' },
    { color: '#070B14', label: 'GND' },
    { color: '#F4B400', label: 'Sinal' },
    { color: '#3FA34D', label: 'I2C SDA' },
    { color: '#2563EB', label: 'I2C SCL' },
    { color: '#F97316', label: 'Servo' },
  ];
  return (
    <div className="flex flex-wrap items-center gap-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-900/65">
      {items.map((it) => (
        <span key={it.label} className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-6 rounded-full" style={{ background: it.color }} />
          {it.label}
        </span>
      ))}
    </div>
  );
}

export type WiringProject = ProjectDetails;
