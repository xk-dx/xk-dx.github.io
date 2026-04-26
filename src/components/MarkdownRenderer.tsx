export default function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCode = false;
  let codeLines: string[] = [];

  const flushCode = (key: string) => {
    if (codeLines.length > 0) {
      elements.push(
        <pre key={key} className="bg-gray-100 dark:bg-gray-800 dark:bg-gray-800 rounded-xl p-5 my-6 overflow-x-auto text-sm leading-relaxed dark:text-gray-200">
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      codeLines = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith("```")) {
      if (inCode) {
        flushCode(`code-${i}`);
        inCode = false;
      } else {
        inCode = true;
      }
      return;
    }
    if (inCode) {
      codeLines.push(line);
      return;
    }

    const trimmed = line.trim();
    if (!trimmed) return;

    // Headings
    if (trimmed.startsWith("# ") && !trimmed.startsWith("## ")) {
      elements.push(<h1 key={i} className="text-3xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mt-14 mb-6">{trimmed.replace("# ", "")}</h1>);
      return;
    }
    if (trimmed.startsWith("### ")) {
      elements.push(<h3 key={i} className="text-lg font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mt-10 mb-4">{trimmed.replace("### ", "")}</h3>);
      return;
    }
    if (trimmed.startsWith("## ")) {
      elements.push(<h2 key={i} className="text-2xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mt-12 mb-5">{trimmed.replace("## ", "")}</h2>);
      return;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      elements.push(
        <blockquote key={i} className="border-l-2 border-[#EFD3D7] pl-5 my-6 text-[#8E9AAF] italic text-sm leading-relaxed">
          {parseInline(trimmed.replace("> ", ""))}
        </blockquote>
      );
      return;
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
                <tr>{cells.map((h, ci) => <th key={ci} className="text-left py-2 px-3 font-medium text-gray-900 dark:text-gray-100 bg-[#EFD3D7]/20 dark:bg-[#EFD3D7]/10 border-b border-[#CBC0D3]/30">{h}</th>)}</tr>
              </thead>
              <tbody id={`tbody-${i}`} />
            </table>
          </div>
        );
      } else {
        // Data row — find nearest table and append
        elements.push(
          <div key={i} className="hidden" data-table-row={cells.join("||")} />
        );
      }
      return;
    }

    // Separator
    if (trimmed === "---" || trimmed === "***") {
      elements.push(<hr key={i} className="my-10 border-[#CBC0D3]/20" />);
      return;
    }

    // List
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      elements.push(<li key={i} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed ml-5 list-disc mb-1.5">{parseInline(trimmed.slice(2))}</li>);
      return;
    }
    if (/^\d+\.\s/.test(trimmed)) {
      elements.push(<li key={i} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed ml-5 list-decimal mb-1.5">{parseInline(trimmed.replace(/^\d+\.\s/, ""))}</li>);
      return;
    }

    // Paragraph
    elements.push(<p key={i} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{parseInline(trimmed)}</p>);
  });

  flushCode("code-end");
  return <>{elements}</>;
}

function parseInline(text: string): React.ReactNode {
  // Handle images ![alt](src)
  const imgRegex = /!\[(.*?)\]\((.*?)\)/;
  const imgMatch = text.match(imgRegex);
  if (imgMatch) {
    const [full, alt, src] = imgMatch;
    const before = text.slice(0, imgMatch.index);
    const after = text.slice(imgMatch.index! + full.length);
    return (
      <>
        {before}
        <img
          src={src}
          alt={alt}
          className="w-full rounded-xl my-6 shadow-md"
          loading="lazy"
        />
        {parseInline(after)}
      </>
    );
  }

  // Handle inline HTML tags like <strong>, <em>, etc.
  const htmlTagRegex = /<(strong|em|code|b|i)>(.*?)<\/\1>/g;
  const splitByHtml = text.split(htmlTagRegex);
  if (splitByHtml.length > 1) {
    const parts: React.ReactNode[] = [];
    let idx = 0;
    let match;
    htmlTagRegex.lastIndex = 0;
    while ((match = htmlTagRegex.exec(text)) !== null) {
      if (match.index > idx) {
        parts.push(parseInline(text.slice(idx, match.index)));
      }
      const tag = match[1];
      if (tag === "strong" || tag === "b") {
        parts.push(<strong key={idx} className="font-bold text-gray-900 dark:text-gray-100">{match[2]}</strong>);
      } else if (tag === "em" || tag === "i") {
        parts.push(<em key={idx} className="italic">{match[2]}</em>);
      } else if (tag === "code") {
        parts.push(<code key={idx} className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm text-pink-500 dark:text-pink-300">{match[2]}</code>);
      }
      idx = match.index + match[0].length;
    }
    if (idx < text.length) {
      parts.push(parseInline(text.slice(idx)));
    }
    return parts;
  }

  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-bold text-gray-900 dark:text-gray-100">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm text-pink-500 dark:text-pink-300">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}
