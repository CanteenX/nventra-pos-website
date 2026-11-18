/**
 * Inline SVG of the real stack from docker-compose.yml: devices on the LAN
 * reach the web container on :1995, which proxies /api to the backend,
 * which talks to PostgreSQL. Only the web port is published to the host.
 * Colours come from CSS tokens so it follows light/dark.
 */
const BOX = { rx: 14, strokeWidth: 1.5 };

interface NodeProps {
  x: number;
  y: number;
  w: number;
  title: string;
  sub: string;
  accent?: boolean;
}

function Node({ x, y, w, title, sub, accent }: NodeProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={76}
        rx={BOX.rx}
        fill={accent ? "var(--brand)" : "var(--card)"}
        stroke={accent ? "var(--brand)" : "var(--line-strong)"}
        strokeWidth={BOX.strokeWidth}
      />
      <text
        x={x + w / 2}
        y={y + 33}
        textAnchor="middle"
        fontSize="16"
        fontWeight="600"
        fill={accent ? "var(--brand-fg)" : "var(--fg)"}
      >
        {title}
      </text>
      <text
        x={x + w / 2}
        y={y + 55}
        textAnchor="middle"
        fontSize="12.5"
        fill={accent ? "var(--brand-fg)" : "var(--fg-muted)"}
        fontFamily="var(--font-mono)"
      >
        {sub}
      </text>
    </g>
  );
}

function Arrow({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2 - 8} y2={y} stroke="var(--fg-muted)" strokeWidth={1.5} markerEnd="url(#arrow)" />
      <text x={(x1 + x2) / 2} y={y - 10} textAnchor="middle" fontSize="11.5" fill="var(--fg-muted)" fontFamily="var(--font-mono)">
        {label}
      </text>
    </g>
  );
}

export function ArchitectureDiagram() {
  return (
    <figure className="rounded-3xl border border-line bg-card p-4 sm:p-8">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 960 300"
          role="img"
          aria-labelledby="arch-title arch-desc"
          className="mx-auto h-auto w-full min-w-[640px] max-w-5xl"
        >
          <title id="arch-title">Nventra POS architecture</title>
          <desc id="arch-desc">
            Tills, tablets, kitchen screens and phones open a web browser to the web app on port 1995. The web app
            forwards API calls to the backend, which stores data in PostgreSQL. All three run in Docker on one machine;
            only port 1995 is exposed on the network.
          </desc>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 10 5 0 10z" fill="var(--fg-muted)" />
            </marker>
          </defs>

          <Node x={10} y={112} w={170} title="Any browser" sub="till · tablet · KDS" />

          <rect
            x={240}
            y={40}
            width={710}
            height={220}
            rx={22}
            fill="var(--bg-subtle)"
            stroke="var(--line-strong)"
            strokeDasharray="6 6"
          />
          <text x={262} y={70} fontSize="12" fill="var(--fg-muted)" fontFamily="var(--font-mono)" letterSpacing="2">
            ONE MACHINE · DOCKER COMPOSE
          </text>

          <Node x={280} y={112} w={180} title="Web app" sub=":1995 (published)" accent />
          <Node x={520} y={112} w={180} title="API" sub="REST + realtime" />
          <Node x={760} y={112} w={170} title="PostgreSQL" sub="your data" />

          <Arrow x1={180} x2={280} y={150} label="LAN / Wi-Fi" />
          <Arrow x1={460} x2={520} y={150} label="/api" />
          <Arrow x1={700} x2={760} y={150} label="SQL" />

          <text x={595} y={232} textAnchor="middle" fontSize="12" fill="var(--fg-muted)">
            API and database are not exposed to the network
          </text>
        </svg>
      </div>
      <figcaption className="mt-4 text-center text-sm text-fg-muted">
        The whole stack runs on one box in your restaurant. Internet is optional.
      </figcaption>
    </figure>
  );
}
