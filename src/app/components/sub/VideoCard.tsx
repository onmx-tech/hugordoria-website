import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Card de vídeo do YouTube no padrão "facade": mostra a thumbnail do vídeo com
 * um play dourado (estética navy + gold da marca) e só monta o iframe ao clicar.
 *
 * Por que não usar 9 <iframe> direto: cada embed carrega o player completo do
 * YouTube (pesado), o lazy-load fica inconsistente (uns aparecem, outros não) e
 * a UI vermelha do YouTube — título, "Watch on YouTube", logos de canal — quebra
 * o visual premium do site. A thumbnail resolve consistência, performance e
 * estética de uma vez; o player só entra quando o usuário decide assistir.
 */
export function VideoCard({ id, title }: { id: string; title?: string }) {
  const [playing, setPlaying] = useState(false);
  // maxresdefault (1280×720, 16:9) é o mais nítido, mas só existe se o vídeo foi
  // enviado em HD. Quando falta, o YouTube responde 200 com um placeholder cinza
  // de ~120px (não 404), então o onError não dispara — daí também checamos a
  // largura natural no onLoad. hqdefault (480×360) sempre tem o frame real; com
  // object-cover o letterbox 4:3 é cortado e sobra o 16:9 limpo.
  const fallback = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  const useFallback = () => setThumb((t) => (t === fallback ? t : fallback));

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-navy-900">
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title ?? `Vídeo ${id}`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={title ? `Reproduzir vídeo: ${title}` : "Reproduzir vídeo"}
      className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-navy-900 text-left transition-colors duration-300 hover:border-gold-600/40"
    >
      <img
        src={thumb}
        alt=""
        aria-hidden
        loading="lazy"
        onError={useFallback}
        onLoad={(e) => {
          // placeholder cinza do YouTube tem ~120px de largura
          if (e.currentTarget.naturalWidth <= 121) useFallback();
        }}
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/15 to-navy-900/30" />
      <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold-600 shadow-lg shadow-navy-900/40 transition-transform duration-300 group-hover:scale-105">
        <Play className="size-6 translate-x-0.5 text-navy-900" strokeWidth={2} fill="currentColor" />
      </span>
    </button>
  );
}
