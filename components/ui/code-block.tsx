import { CopyButton } from "@/components/ui/copy-button";

interface CodeBlockProps {
  code: string;
  label?: string;
}

/** Always-dark terminal block with a copy button. */
export function CodeBlock({ code, label = "Terminal" }: CodeBlockProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-[oklch(0.17_0_0)] text-[oklch(0.94_0_0)]">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/65">{label}</span>
        <CopyButton value={code} className="border-white/20 bg-transparent text-white hover:bg-white/10" />
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
