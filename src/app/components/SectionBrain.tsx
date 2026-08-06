import { useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { isPrerender } from "../../lib/prerender";

const FRAME_COUNT = 122;

function buildFramePath(index: number) {
  // WebP derivado no prebuild (os .jpg originais continuam no repo, ninguém os
  // serve). 4,8 MB → 2,7 MB no conjunto, e cada frame decodifica mais rápido —
  // que é o que trava o scroll no celular, não o download.
  return `/sequence/HD_BG_Menor_${String(index).padStart(5, "0")}.webp`;
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.max(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  // Ancora mais para o topo (≈0.15 em vez de 0.5): quando a imagem é mais alta
  // que o canvas, mantém a cabeça/linhas no quadro e corta o pescoço embaixo.
  ctx.drawImage(img, (cw - dw) / 2, (ch - dh) * 0.15, dw, dh);
}

function pronta(img: HTMLImageElement | undefined): img is HTMLImageElement {
  return !!img && img.complete && img.naturalWidth > 0;
}

// Antes, pedir um frame que ainda não tinha chegado simplesmente não pintava
// nada — o canvas ficava na imagem anterior. Em rede de escritório isso
// produzia o pior sintoma possível: o visitante atravessava as quatro telas da
// seção pinada vendo a MESMA foto parada, e lia como travamento ("tô descendo
// um monte e não tá vindo"). Medido em 3G: ao chegar na seção havia 1 frame
// dos 122, e o pin inteiro rolava com uma única imagem.
// Agora o frame que falta é substituído pelo carregado mais próximo: a
// animação fica mais grosseira enquanto a rede não alcança, mas ela ANDA — e
// andar mal é incomparavelmente melhor do que parecer quebrado.
function pegarFrameMaisProximo(frames: HTMLImageElement[], index: number) {
  if (pronta(frames[index])) return frames[index];
  for (let d = 1; d < frames.length; d++) {
    if (pronta(frames[index - d])) return frames[index - d];
    if (pronta(frames[index + d])) return frames[index + d];
  }
  return null;
}

export default function SectionBrain() {
  const { t } = useTranslation("home");
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = pegarFrameMaisProximo(framesRef.current, index);
    if (!img) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCover(ctx, img, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    // Snapshot de pré-render captura o DOM estático (sem pin-spacers/canvas).
    if (isPrerender()) return;
    const trigger = triggerRef.current;
    const canvas = canvasRef.current;
    if (!trigger || !canvas) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = Math.round(window.innerWidth * dpr);
      const h = Math.round(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      renderFrame(currentFrameRef.current);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const MOBILE_STEP = 4;
    const mobileFrameCount = Math.ceil(FRAME_COUNT / MOBILE_STEP);
    const totalFrames = isDesktop ? FRAME_COUNT : mobileFrameCount;

    // Os frames NÃO são baixados no load da página. Antes eram: 122 requests
    // (2,7 MB) disparavam junto com o first paint e competiam com as fotos e
    // os retratos do resto da home — em conexão de escritório o visitante
    // rolava e encontrava blocos ainda não pintados, que foi exatamente o que
    // o cliente filmou. O PageSpeed não pega isso porque a rajada acontece
    // DEPOIS do LCP.
    // Agora: o primeiro frame vem imediatamente (para o canvas nunca ficar
    // chapado) e o resto vem em duas ondas — ver o bloco DUAS ONDAS abaixo.
    const images: HTMLImageElement[] = [];
    const srcFor = (i: number) =>
      buildFramePath(isDesktop ? i : Math.min(i * MOBILE_STEP, FRAME_COUNT - 1));

    for (let i = 0; i < totalFrames; i++) images.push(new Image());
    framesRef.current = images;

    images[0].onload = () => renderFrame(0);
    images[0].src = srcFor(0);

    const pedir = (i: number) => {
      // Se o visitante estiver parado exatamente neste ponto da sequência,
      // repinta assim que a imagem certa chegar — senão ele fica olhando o
      // frame aproximado até mexer o scroll de novo.
      images[i].onload = () => {
        if (i === currentFrameRef.current) renderFrame(i);
      };
      images[i].src = srcFor(i);
    };

    // DUAS ONDAS, e a diferença entre elas é o que conserta o "travou".
    //
    // Onda esparsa: um frame a cada oito (~15 imagens, ~330 KB). É pouco peso e
    // já é o bastante para a sequência ANIMAR — aos saltos, mas andando, porque
    // o render pega o frame carregado mais próximo. Ela sai do forno depois do
    // `load`, no primeiro momento ocioso: não disputa nada com o first paint
    // (o pecado original, que derrubou o PageSpeed para 68), e chega muito
    // antes de o visitante rolar até a seção.
    //
    // Onda completa: os 2,7 MB restantes, só quando a seção se aproxima.
    //
    // O que havia antes era uma onda só, disparada a duas telas da seção. Em
    // rede de escritório o visitante chegava lá com UM frame na mão e
    // atravessava quatro telas de pin com a imagem parada.
    const PASSO_ESPARSO = 8;
    let esparsaFeita = false;
    const carregarEsparsa = () => {
      if (esparsaFeita) return;
      esparsaFeita = true;
      for (let i = PASSO_ESPARSO; i < totalFrames; i += PASSO_ESPARSO) pedir(i);
    };
    let carregou = false;
    const carregarResto = () => {
      carregarEsparsa();
      if (carregou) return;
      carregou = true;
      for (let i = 1; i < totalFrames; i++) if (i % PASSO_ESPARSO !== 0) pedir(i);
    };

    // O `load` dispara antes de a maior imagem terminar de pintar, então
    // agendar a onda esparsa nele a colocaria disputando banda com o LCP —
    // exatamente o erro que se quis corrigir. 1,5s depois do load a página já
    // pintou e ainda faltam muitos segundos de leitura até a seção.
    let esperaEsparsa = 0;
    const agendarEsparsa = () => {
      esperaEsparsa = window.setTimeout(() => {
        const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
          .requestIdleCallback;
        if (ric) ric(carregarEsparsa, { timeout: 2000 });
        else carregarEsparsa();
      }, 1500);
    };
    if (document.readyState === "complete") agendarEsparsa();
    else window.addEventListener("load", agendarEsparsa, { once: true });

    const io = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          carregarResto();
          io.disconnect();
        }
      },
      // Quatro telas de folga, não duas: em rede lenta o download da sequência
      // leva mais tempo do que o visitante leva para rolar até aqui.
      { rootMargin: "400% 0px" },
    );
    io.observe(trigger);
    // Rede de segurança: se por algum motivo o observer não disparar (layout
    // recalculado por pin, por exemplo), carrega quando o navegador estiver
    // ocioso — nunca deixa a sequência sem chegar.
    const ocioso = window.setTimeout(carregarResto, 6000);

    const textEls = trigger.querySelectorAll("[data-brain-text]");
    const overlayEl = trigger.querySelector("[data-brain-overlay]");

    const lastFrame = totalFrames - 1;

    const gsapCtx = gsap.context(() => {
      const frameObj = { value: 0 };
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top top",
          // A timeline fecha em 0.90 (o último texto entra em 0.75 e dura
          // 0.15): os 10% restantes eram pin rolando sem nada acontecer.
          // 360% termina o pin junto com a animação, e a próxima seção entra
          // logo — que é o que o cliente pediu.
          end: isDesktop ? "+=360%" : "+=225%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        frameObj,
        {
          value: lastFrame,
          ease: "none",
          duration: 0.6,
          onUpdate() {
            const idx = Math.round(frameObj.value);
            if (idx !== currentFrameRef.current) {
              currentFrameRef.current = idx;
              renderFrame(idx);
            }
          },
        },
        0,
      );

      if (overlayEl) {
        tl.fromTo(
          overlayEl,
          { opacity: 0 },
          { opacity: 1, ease: "none", duration: 0.15 },
          0.45,
        );
      }


      tl.fromTo(
        textEls[0] || [],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.15 },
        0.55,
      );
      tl.fromTo(
        textEls[1] || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.15 },
        0.65,
      );
      tl.fromTo(
        textEls[2] || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.15 },
        0.75,
      );
    }, trigger);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("load", agendarEsparsa);
      window.clearTimeout(esperaEsparsa);
      io.disconnect();
      window.clearTimeout(ocioso);
      gsapCtx.revert();
    };
  }, [renderFrame]);

  return (
    <div ref={triggerRef} className="relative w-full h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
        aria-hidden
      />

      {/* Gradient overlay for text readability */}
      <div
        data-brain-overlay
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          background:
            "linear-gradient(to top, rgba(18,33,54,0.85) 0%, rgba(18,33,54,0.4) 40%, transparent 70%)",
        }}
      />

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center justify-end w-full h-full px-6 pb-16 md:pb-24 lg:pb-28">
        <h2
          data-brain-text
          className="text-center font-['Arimo',sans-serif] font-normal text-cream leading-[1.18] tracking-[-0.02em] max-w-[612px] opacity-0"
          style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
        >
          {t("home.brain.heading")}
        </h2>

        <p
          data-brain-text
          className="mt-5 md:mt-6 text-center font-['Arimo',sans-serif] font-normal text-cream/70 leading-[1.32] max-w-[612px] opacity-0"
          style={{ fontSize: "clamp(16px, 1.6vw, 20px)" }}
        >
          {t("home.brain.paragraph")}
        </p>

        <a
          data-brain-text
          href="https://wa.me/5511971622777"
          target="_blank"
          rel="noopener noreferrer"
          // Padronizado com os outros botões de agendar do site: era o único em
          // Roboto (herança do Figma), com texto cream sobre o bege — a pior
          // combinação de contraste da página — e sem a camada de luz que os
          // demais têm. Agora é o mesmo objeto: pílula `.cta-luz`, Geist, texto
          // preto sobre o dourado.
          className="cta-luz mt-8 md:mt-10 inline-flex min-h-[56px] items-center gap-2.5 rounded-full px-7 font-['Geist',sans-serif] font-medium leading-none tracking-[-0.01em] opacity-0"
          style={{
            fontSize: "clamp(15px, 1.2vw, 17px)",
            color: "var(--color-on-gold)",
            background: "var(--color-accent-gold-light)",
          }}
        >
          {/* Glyph do WhatsApp (o CTA abre o wa.me). Substitui o antigo ícone
              de 5 paths do Figma, que renderizava um "sino" quebrado. */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.042zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          {t("home.brain.cta")}
        </a>
      </div>
    </div>
  );
}
