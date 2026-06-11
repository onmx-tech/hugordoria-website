// Conteúdo editorial completo das subpáginas de especialidade,
// migrado 1:1 do site original hugodoria.com.br (docs/site-original/).
export type ArticleSection = {
  id: string; // âncora kebab-case, ex. "apresentacao-clinica"
  heading: string; // ex. "Apresentação Clínica"
  paragraphs: string[];
};

export type ArticleContent = {
  slug: string; // slug da rota /especialidade/:slug
  sections: ArticleSection[];
};
