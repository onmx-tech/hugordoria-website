type Refs = {
  section: HTMLElement;
  group: HTMLElement;
  mark: HTMLElement;
  quote: HTMLElement;
  signature: SVGSVGElement;
  attribution: HTMLElement;
};

/**
 * A frase do Dr. é ESTÁTICA, em qualquer largura.
 *
 * No celular já era desde 508a50e: sem pin, o scrub fazia o bloco subir,
 * revelar e sair enquanto o dedo rolava, e isso lê como texto que foge da
 * leitura. No desktop a seção ficava pinada por 1600px só para se escrever e
 * se apagar — e o que ela tem a dizer é uma frase do médico, assinada por ele.
 * Palavra que se monta e se desmonta pede que a pessoa acompanhe a montagem;
 * aqui ela só precisa ler.
 *
 * Efeito colateral assumido: a assinatura aparece pronta em vez de se
 * desenhar. O resto da home mantém suas entradas — esta seção é a exceção.
 *
 * O timeline anterior (SplitText por linhas, mark em back.out, traço da
 * assinatura por strokeDashoffset, ida e volta do fundo azul→escuro→azul e
 * saída por cima) está no histórico: `git show 5b803ba~1 -- ` este arquivo.
 */
export function initQuoteAnimation(_refs: Refs) {
  return () => {};
}
