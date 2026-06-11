import type { IllustrationKey } from '../../types';

const stroke = '#070B14';

export function ProjectIllustration({ name }: { name: IllustrationKey }) {
  switch (name) {
    case 'lixeira':
      return <Lixeira />;
    case 'carrinho':
      return <Carrinho />;
    case 'sensor':
      return <Sensor />;
    case 'semaforo':
      return <Semaforo />;
    case 'jardim':
      return <Jardim />;
    case 'piano':
      return <Piano />;
  }
}

function Lixeira() {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" fill="none" aria-hidden>
      <g>
        <path d="M 70 70 L 175 70 L 165 175 L 80 175 Z" fill="#22D3EE" stroke={stroke} strokeWidth="2.5" />
        <path d="M 70 70 L 175 70" stroke={stroke} strokeWidth="2.5" />
        <ellipse cx="122" cy="70" rx="52" ry="6" fill="#0E1424" />
        <ellipse cx="122" cy="70" rx="46" ry="3.5" fill="#26221B" />
        <path d="M 90 90 L 90 170 M 122 90 L 122 170 M 154 90 L 154 170" stroke={stroke} strokeOpacity="0.45" strokeWidth="1.5" />
        <rect x="98" y="40" width="14" height="14" rx="2" fill="#0E1424" />
        <circle cx="105" cy="47" r="2" fill="#A3E635">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
        </circle>
        <g transform="translate(150 35)">
          <circle cx="0" cy="0" r="9" fill="#0E1424" />
          <circle cx="-3" cy="-2" r="2" fill="#FB923C" />
          <circle cx="3" cy="-2" r="2" fill="#FB923C" />
        </g>
        <path d="M 112 54 L 98 54 M 95 56 Q 91 56 91 60" stroke={stroke} strokeWidth="1.4" />
        <g fontFamily="monospace" fontSize="7" fill={stroke} opacity="0.7">
          <text x="98" y="32">HC-SR04</text>
        </g>
        <g fontFamily="monospace" fontSize="7" fill={stroke} opacity="0.7">
          <text x="155" y="30">Arduino</text>
        </g>
      </g>
    </svg>
  );
}

function Carrinho() {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" fill="none" aria-hidden>
      <g>
        <rect x="55" y="100" width="130" height="40" rx="5" fill="#0E1424" />
        <rect x="60" y="80" width="120" height="22" rx="3" fill="#26221B" />
        <circle cx="78" cy="150" r="14" fill="#0E1424" />
        <circle cx="78" cy="150" r="6" fill="#22D3EE" />
        <circle cx="162" cy="150" r="14" fill="#0E1424" />
        <circle cx="162" cy="150" r="6" fill="#22D3EE" />
        <path d="M 65 90 L 65 70 L 80 70 L 80 90" stroke={stroke} strokeWidth="2" fill="none" />
        <circle cx="72" cy="55" r="6" fill="#FB923C" />
        <path d="M 72 61 L 72 70" stroke={stroke} strokeWidth="1.4" />
        <rect x="105" y="50" width="55" height="18" rx="2" fill="#A3E635" stroke={stroke} strokeWidth="1.5" />
        <text x="132" y="62" textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="700" fill={stroke}>
          BT
        </text>
        <path d="M 88 110 L 88 130 M 152 110 L 152 130" stroke="#22D3EE" strokeWidth="1.5" />
        <g fontFamily="monospace" fontSize="7" fill={stroke} opacity="0.7">
          <text x="56" y="180">L298N</text>
          <text x="148" y="180">HC-05</text>
        </g>
      </g>
    </svg>
  );
}

function Sensor() {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" fill="none" aria-hidden>
      <g>
        <rect x="95" y="60" width="50" height="90" rx="3" fill="#0E1424" stroke={stroke} strokeWidth="2" />
        <rect x="100" y="70" width="40" height="22" fill="#A3E635" />
        <text x="120" y="85" textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="700" fill={stroke}>
          23.5°C
        </text>
          <text x="120" y="105" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#22D3EE">
          68%
        </text>
        <circle cx="120" cy="125" r="4" fill="#FB923C" />
        <line x1="116" y1="125" x2="124" y2="125" stroke={stroke} strokeWidth="1.5" />
        <line x1="120" y1="121" x2="120" y2="129" stroke={stroke} strokeWidth="1.5" />
        <g>
          <path d="M 80 150 L 100 130" stroke={stroke} strokeWidth="1.5" />
          <path d="M 160 150 L 140 130" stroke={stroke} strokeWidth="1.5" />
          <line x1="80" y1="150" x2="160" y2="150" stroke={stroke} strokeWidth="1.5" />
        </g>
        <g fontFamily="monospace" fontSize="7" fill={stroke} opacity="0.7">
          <text x="78" y="55">DHT22</text>
          <text x="100" y="170">LCD 16×2</text>
        </g>
      </g>
    </svg>
  );
}

function Semaforo() {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" fill="none" aria-hidden>
      <g>
        <rect x="60" y="30" width="40" height="140" rx="6" fill="#0E1424" stroke={stroke} strokeWidth="2" />
        <circle cx="80" cy="55" r="12" fill="#FB7185" />
        <circle cx="80" cy="55" r="6" fill="#BE123C">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="80" cy="100" r="12" fill="#26221B" />
        <circle cx="80" cy="100" r="6" fill="#FBBF24">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="80" cy="145" r="12" fill="#26221B" />
        <circle cx="80" cy="145" r="6" fill="#A3E635" />
        <line x1="80" y1="170" x2="80" y2="185" stroke={stroke} strokeWidth="2.5" />
        <rect x="60" y="180" width="40" height="8" fill="#26221B" stroke={stroke} strokeWidth="1.5" />
        <g transform="translate(140 50)">
          <rect x="0" y="0" width="50" height="35" rx="3" fill="#0E1424" stroke={stroke} strokeWidth="1.5" />
          <circle cx="10" cy="10" r="3" fill="#FB7185" />
          <circle cx="20" cy="10" r="3" fill="#FBBF24" />
          <circle cx="30" cy="10" r="3" fill="#A3E635" />
          <text x="14" y="27" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#A3E635">PIR</text>
          <line x1="42" y1="17" x2="60" y2="17" stroke={stroke} strokeWidth="1.2" strokeDasharray="2 2" />
          <path d="M 55 12 L 62 17 L 55 22" stroke={stroke} strokeWidth="1.2" fill="none" />
        </g>
        <g fontFamily="monospace" fontSize="7" fill={stroke} opacity="0.7">
          <text x="55" y="25">R G Y</text>
          <text x="140" y="100">ARDUINO</text>
        </g>
      </g>
    </svg>
  );
}

function Jardim() {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" fill="none" aria-hidden>
      <g>
        <rect x="40" y="140" width="160" height="40" rx="3" fill="#0E1424" stroke={stroke} strokeWidth="2" />
        <path d="M 40 140 L 200 140" stroke={stroke} strokeWidth="2" />
        <line x1="60" y1="150" x2="60" y2="170" stroke={stroke} strokeWidth="1.2" strokeDasharray="2 2" opacity="0.4" />
        <line x1="100" y1="150" x2="100" y2="170" stroke={stroke} strokeWidth="1.2" strokeDasharray="2 2" opacity="0.4" />
        <line x1="140" y1="150" x2="140" y2="170" stroke={stroke} strokeWidth="1.2" strokeDasharray="2 2" opacity="0.4" />
        <line x1="180" y1="150" x2="180" y2="170" stroke={stroke} strokeWidth="1.2" strokeDasharray="2 2" opacity="0.4" />
        <g fill="#2DD4BF" stroke={stroke} strokeWidth="1.4">
          <path d="M 55 140 L 55 110 L 50 120 L 55 115 L 60 120 L 55 110 Z" />
          <path d="M 95 140 L 95 105 L 90 118 L 95 112 L 100 118 L 95 105 Z" />
          <path d="M 135 140 L 135 100 L 130 115 L 135 108 L 140 115 L 135 100 Z" />
        </g>
        <g transform="translate(170 90)">
          <rect x="0" y="0" width="40" height="50" rx="3" fill="#26221B" stroke={stroke} strokeWidth="1.5" />
          <circle cx="20" cy="20" r="9" fill="#0F766E" />
          <line x1="20" y1="29" x2="20" y2="40" stroke={stroke} strokeWidth="1.4" />
          <line x1="40" y1="40" x2="200" y2="40" stroke={stroke} strokeWidth="1.5" />
          <path d="M 200 35 Q 210 40 200 45" fill="none" stroke={stroke} strokeWidth="1.4" />
        </g>
        <g fontFamily="monospace" fontSize="7" fill={stroke} opacity="0.7">
          <text x="50" y="195">SOIL</text>
          <text x="170" y="80">RELE</text>
        </g>
      </g>
    </svg>
  );
}

function Piano() {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" fill="none" aria-hidden>
      <g>
        <rect x="30" y="60" width="180" height="90" rx="3" fill="#0E1424" stroke={stroke} strokeWidth="2" />
        {['#FB923C', '#FB7185', '#2DD4BF', '#A3E635', '#A78BFA', '#FBBF24', '#22D3EE', '#FB923C'].map(
          (color, i) => (
            <rect
              key={i}
              x={35 + i * 21.5}
              y={65}
              width={19}
              height={80}
              rx={2}
              fill={color}
              stroke={stroke}
              strokeWidth="1.4"
            />
          ),
        )}
        {[1, 2, 4, 5, 6].map((i) => (
          <rect key={i} x={35 + i * 21.5 + 8} y={65} width={10} height={50} fill="#070B14" />
        ))}
        <rect x="30" y="40" width="180" height="20" rx="3" fill="#26221B" stroke={stroke} strokeWidth="1.5" />
        <circle cx="60" cy="50" r="3" fill="#22D3EE" />
        <circle cx="80" cy="50" r="3" fill="#FB7185" />
        <circle cx="100" cy="50" r="3" fill="#A3E635" />
        <text x="190" y="53" textAnchor="end" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#A3E635">
          8 KEYS
        </text>
        <g fontFamily="monospace" fontSize="7" fill={stroke} opacity="0.7">
          <text x="35" y="170">C D E F G A B C</text>
        </g>
      </g>
    </svg>
  );
}


