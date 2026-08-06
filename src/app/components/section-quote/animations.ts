type Refs = {
  section: HTMLElement;
  group: HTMLElement;
  mark: HTMLElement;
  quote: HTMLElement;
  signature: SVGSVGElement;
  attribution: HTMLElement;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function initQuoteAnimation(_refs: Refs) {
  // A frase agora é ESTÁTICA em qualquer largura. No celular já era (sem pin, o
  // scrub fazia o bloco subir, revelar e sair enquanto o dedo rolava — texto
  // que foge da leitura); no desktop ela vivia pinada por 1600px só para se
  // montar e se desmontar, e é justamente esse tipo de entrada por scroll que
  // saiu da home inteira. A seção já nasce visível no HTML — inclusive a
  // assinatura, que agora aparece pronta em vez de se desenhar.
  // Para trazer o pin de volta, basta voltar a retornar cedo só fora do
  // desktop: `if (!window.matchMedia("(min-width: 1024px)").matches) return`.
  return () => {};
}
