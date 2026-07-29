// Service worker MÍNIMO — de propósito.
//
// Ele existe por um motivo só: o Chrome no Android exige um service worker com
// listener de `fetch` para oferecer "instalar aplicativo". No iPhone (a maior
// parte dos pacientes) o "Adicionar à Tela de Início" já funciona só com o
// manifest — este arquivo é o que estende a mesma experiência ao Android.
//
// O QUE ELE NÃO FAZ, e não deve passar a fazer sem uma decisão consciente:
// não guarda nada em cache. O site é pré-renderizado e servido pela CDN da
// Vercel, e foi assim que chegou a 100 no PageSpeed. Um cache aqui passaria a
// competir com esse fluxo e, pior, poderia servir uma versão velha do site
// depois de uma publicação — num site médico, texto clínico desatualizado
// voltando à tela é risco, não otimização.
//
// O listener de fetch abaixo é intencionalmente vazio: sem `respondWith`, o
// navegador segue para a rede normalmente.

const VERSAO = "1";

self.addEventListener("install", () => {
  // Assume o controle na primeira visita, sem esperar a aba antiga fechar.
  self.skipWaiting();
});

self.addEventListener("activate", (evento) => {
  // Limpa qualquer cache que uma versão futura (ou um engano) tenha deixado
  // para trás, e assume as abas já abertas.
  evento.waitUntil(
    (async () => {
      const nomes = await caches.keys();
      await Promise.all(nomes.map((nome) => caches.delete(nome)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", () => {
  // Intencionalmente vazio. Ver o cabeçalho deste arquivo. VERSAO=${VERSAO}
});
