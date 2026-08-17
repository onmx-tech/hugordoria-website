# Zona DNS de hugodoria.com.br — estado ANTES do cutover

Levantado em **2026-08-10**, por consulta pública (`dig` + `whois`), sem acesso ao painel.
Serve de rede de segurança: se a virada sair torta, é para cá que se volta.

## Titularidade (Registro.br)

    owner:    Hugo Leonardo Doria Netto   (CPF do próprio médico)
    created:  2021-10-22
    expires:  2035-10-22
    changed:  2026-04-28
    status:   ACTIVE

**O domínio já é do cliente.** Não existe transferência de titularidade a fazer — o que
está sob conta de terceiro é apenas a *gestão da zona*, porque os nameservers apontam
para a Hostinger.

## Zona REAL, lida no painel (2026-08-10)

A zona está na conta Hostinger **pedro@merinno.com**, onde `hugodoria.com.br` aparece como
"domínio externo com serviços conectados". São 11 registros — e a leitura por `dig` (mais
abaixo) **não mostra a metade deles**:

    ALIAS  @                          hugodoria.com.br.cdn.hstgr.net          300
    CNAME  www                        www.hugodoria.com.br.cdn.hstgr.net      300
    CNAME  autodiscover               autodiscover.mail.hostinger.com         300
    CNAME  autoconfig                 autoconfig.mail.hostinger.com           300
    CNAME  hostingermail-a._domainkey hostingermail-a.dkim.mail.hostinger.com 300
    CNAME  hostingermail-b._domainkey hostingermail-b.dkim.mail.hostinger.com 300
    CNAME  hostingermail-c._domainkey hostingermail-c.dkim.mail.hostinger.com 300
    TXT    @                          "v=spf1 include:_spf.mail.hostinger.com ~all"  3600
    TXT    _dmarc                     "v=DMARC1; p=none"                      3600
    MX     @   (5)                    mx1.hostinger.com                      14400
    MX     @  (10)                    mx2.hostinger.com                      14400

⚠️ **Não existe registro A nem AAAA nesta zona.** O apex é um **ALIAS** para a CDN da
Hostinger, e o `www` é CNAME para a mesma CDN — os IPs v4/v6 que o `dig` devolve são a CDN
resolvendo, não registros editáveis. Consequência prática: a virada **não é "editar o A"**;
é apagar o ALIAS e o CNAME e criar A + AAAA no lugar deles.

⚠️ **O `dig` não enxergou 5 registros** que só aparecem no painel: os três DKIM
(`hostingermail-{a,b,c}._domainkey`), o `autoconfig` e o `_dmarc`. Consulta pública só
devolve o que você sabe perguntar — para migrar zona de conta, ler o painel é obrigatório.

## Registros no ar antes da virada

    NS      byte.dns-parking.com. / pixel.dns-parking.com.        (Hostinger)
    SOA     pixel.dns-parking.com. dns.hostinger.com. 2026080601

    A       147.79.105.176 · 89.116.213.173                       (hospedagem compartilhada)
    AAAA    2a02:4780:2e:b847:ef52:dd99:53dd:8e7b
            2a02:4780:17:6a06:fbde:1670:9dab:d24c

    www     CNAME → www.hugodoria.com.br.cdn.hstgr.net.  (→ 77.37.42.80, CDN Hostinger)

    MX      5  mx1.hostinger.com.
            10 mx2.hostinger.com.
    TXT     "v=spf1 include:_spf.mail.hostinger.com ~all"
    autodiscover  CNAME → autodiscover.mail.hostinger.com.

    CAA     (nenhum)

⚠️ Os IPs do A **rotacionam** — numa medição feita 40 minutos antes, eram `89.116.213.84` e
`147.79.105.171`. É hospedagem compartilhada; não tratar esses números como fixos.

## O que a virada troca — e o que não pode encostar

TROCA (destino = VPS do cliente, Hostinger/Easypanel):

    A       @ e www  →  179.198.121.44
    AAAA    @ e www  →  2a02:4780:6e:40bd::1

⚠️ **O AAAA é a armadilha deste cutover.** O domínio publica IPv6 hoje. Trocando só o
registro A, todo visitante com IPv6 — o que inclui a maior parte dos celulares no Brasil —
continuaria caindo no WordPress antigo, enquanto o desktop já veria o site novo. O sintoma
seria "no meu computador funciona, no celular não", e ninguém procuraria a causa no DNS.
A VPS tem IPv6 próprio (confirmado: `2a02:4780:6e:40bd::1`) e o Traefik escuta em `[::]:80`
e `[::]:443`, então o AAAA aponta para lá.

O `www` hoje é CNAME para a CDN da Hostinger: **apagar o CNAME** antes de criar A/AAAA
(um host não pode ter CNAME junto com outros registros).

NÃO ENCOSTAR — o e-mail do consultório depende:

    MX, TXT (SPF), autodiscover, NS

## Depois que estabilizar

O WordPress antigo segue de pé mesmo sem tráfego, e está comprometido (Japanese Keyword
Hack: ~70 sitemaps de spam indexados). Tirar do ar depois de um backup, e remover os
sitemaps de spam no Search Console.
