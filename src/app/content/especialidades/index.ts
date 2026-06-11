import type { ArticleContent } from "./types";
import { article as aneurismaCerebral } from "./aneurisma-cerebral";
import { article as cavernomas } from "./cavernomas";
import { article as doencaDeMoyamoya } from "./doenca-de-moyamoya";
import { article as espasmoHemifacial } from "./espasmo-hemifacial";
import { article as mavs } from "./mavs";
import { article as neuralgiaDoTrigemeo } from "./neuralgia-do-trigemeo";
import { article as schwannomaVestibular } from "./schwannoma-vestibular";
import { article as tumoresCerebrais } from "./tumores-cerebrais";
import { article as tumoresHipofisarios } from "./tumores-hipofisarios";
import { article as tumoresMedulares } from "./tumores-medulares";

export type { ArticleContent, ArticleSection } from "./types";

const articles: ArticleContent[] = [
  aneurismaCerebral,
  cavernomas,
  doencaDeMoyamoya,
  espasmoHemifacial,
  mavs,
  neuralgiaDoTrigemeo,
  schwannomaVestibular,
  tumoresCerebrais,
  tumoresHipofisarios,
  tumoresMedulares,
];

export function findArticleBySlug(slug: string): ArticleContent | undefined {
  return articles.find((a) => a.slug === slug);
}
