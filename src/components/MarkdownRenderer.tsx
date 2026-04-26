export default function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCode = false;
  let codeLines: string[] = [];

  const flushCode = (key: string) => {
    if (codeLines.length > 0) {
      elements.push(
        <pre key={key} className="bg-gray-100 dark:bg-dark-card rounded-xl p-5 my-6 overflow-x-auto text-sm leading-relaxed dark:text-dark-text">
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      codeLines = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("```")) {
      if (inCode) {
        flushCode(`code-${i}`);
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeLines.push(line);
      continue;
    }

    const trimmed = line.trim();
    if (!trimmed) continue;

    // Headings
    if (trimmed.startsWith("# ") && !trimmed.startsWith("## ")) {
      elements.push(<h1 key={i} className="text-3xl font-bold text-gray-900 dark:text-dark-text mt-14 mb-6">{trimmed.replace("# ", "")}</h1>);
      continue;
    }
    if (trimmed.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-lg font-bold text-gray-900 dark:text-dark-text mt-10 mb-4">{trimmed.replace("### ", "")}</h3>);
      continue;
    }
    if (trimmed.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-2xl font-bold text-gray-900 dark:text-dark-text mt-12 mb-5">{trimmed.replace("## ", "")}</h2>);
      continue;
    }

    // Blockquote — merge consecutive lines into one block
    if (trimmed.startsWith("> ")) {
      const quoteLines: string[] = [trimmed.replace("> ", "")];
      let j = i + 1;
      while (j < lines.length && lines[j].trim().startsWith("> ")) {
        quoteLines.push(lines[j].trim().replace("> ", ""));
        j++;
      }
      elements.push(
        <blockquote key={i} className="border-l-2 border-[#EFD3D7] pl-5 my-6 text-[#8E9AAF] italic text-sm leading-relaxed">
          {quoteLines.map((ql, qi) => (
            <span key={qi}>
              {qi > 0 && <br />}
              {parseInline(ql)}
            </span>
          ))}
        </blockquote>
      );
      i = j - 1;
      continue;
    }

    // Table
    if (trimmed.startsWith("|")) {
      const cells = trimmed.split("|").filter(Boolean).map((c) => c.trim());
      const isHeader = i + 1 < lines.length && lines[i + 1].trim().match(/^[\|\s:-]+$/);
      if (isHeader) {
        elements.push(
          <div key={i} className="overflow-x-auto my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>{cells.map((h, ci) => <th key={ci} className="text-left py-2 px-3 font-medium text-gray-900 dark:text-dark-text bg-[#EFD3D7]/20 dark:bg-[#EFD3D7]/10 border-b border-[#CBC0D3]/30">{h}</th>)}</tr>
              </thead>
              <tbody id={`tbody-${i}`} />
            </table>
          </div>
        );
      } else {
        elements.push(
          <div key={i} className="hidden" data-table-row={cells.join("||")} />
        );
      }
      continue;
    }

    // Separator
    if (trimmed === "---" || trimmed === "***") {
      elements.push(<hr key={i} className="my-10 border-[#CBC0D3]/20" />);
      continue;
    }

    // List
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      elements.push(<li key={i} className="text-sm text-gray-600 dark:text-dark-muted leading-relaxed ml-5 list-disc mb-1.5">{parseInline(trimmed.slice(2))}</li>);
      continue;
    }
    if (/^\d+\.\s/.test(trimmed)) {
      elements.push(<li key={i} className="text-sm text-gray-600 dark:text-dark-muted leading-relaxed ml-5 list-decimal mb-1.5">{parseInline(trimmed.replace(/^\d+\.\s/, ""))}</li>);
      continue;
    }

    // Paragraph
    elements.push(<p key={i} className="text-sm text-gray-600 dark:text-dark-muted leading-relaxed mb-4">{parseInline(trimmed)}</p>);
  }

  flushCode("code-end");
  return <>{elements}</>;
}
