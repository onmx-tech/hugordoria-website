// Conteúdo editorial das subpáginas de especialidade.
// Texto migrado 1:1 do site original hugodoria.com.br (docs/site-original/),
// reestruturado no molde do Design System v3 (navy/cream editorial).

export type ArticleSection = {
  id: string; // âncora kebab-case, ex. "o-que-e"
  heading: string; // ex. "Uma dilatação na parede de uma artéria cerebral."
  paragraphs: string[];

  // ── Enriquecimento v3 (tudo opcional) ──────────────────────────
  /** Rótulo curto do índice/sumário; default = heading. ex. "O que é" */
  tocLabel?: string;
  /** Kicker mono acima do h2; default = "0N — {tocLabel}". */
  kicker?: string;
  /** Trecho do heading destacado em dourado (substring exata do heading). */
  emphasis?: string;
  /** Legenda da figura 16:9 que segue os parágrafos (placeholder se sem imagem). */
  figureCaption?: string;
  /**
   * Nome do arquivo em `public/v4/figuras/` (sem extensão) da figura desta seção.
   *
   * Existe porque até 11/08/2026 a figura era escolhida por REGEX sobre a
   * legenda, sobre um pool de 3 imagens genéricas. O resultado: uma única
   * `angiografia.jpg` ilustrava 9 das 10 páginas, cada vez com uma legenda
   * clínica diferente afirmando o que a imagem não mostrava — e os três idiomas
   * discordavam entre si, porque as regras casavam palavras em português (a
   * página inglesa do aneurisma exibia a ilustração de RESSONÂNCIA sob a legenda
   * "Digital subtraction angiography").
   *
   * A ligação agora é explícita: cada seção diz qual figura é a sua. É este o
   * campo que recebe a arte própria de cada condição quando ela for gerada —
   * basta apontar para o novo arquivo.
   */
  figureSrc?: string;
  /** Lista com marcadores em letra (A, B, C…) — usada em "Sinais de alerta". */
  bullets?: string[];
  /** Lista numerada com título + descrição — usada em opções de tratamento. */
  options?: { title: string; description: string }[];
};

export type ArticleContent = {
  slug: string; // slug da rota /especialidade/:slug
  sections: ArticleSection[];

  // ── Enriquecimento v3 (tudo opcional) ──────────────────────────
  /** Categoria exibida no hero/cards relacionados. ex. "Vascular". */
  category?: string;
  /** Tempo de leitura estimado. ex. "6 min". */
  readingTime?: string;
  /** Lead do hero (1–2 frases); default = card.description. */
  lead?: string;
  /** Colunas de metadado abaixo do hero. */
  heroMeta?: { label: string; value: string }[];
  /** Pull-quote editorial inserido após a seção indicada (por id). */
  quote?: { text: string; emphasis?: string; afterSectionId?: string };
};
