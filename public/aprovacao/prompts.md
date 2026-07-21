# Prompts — imagens de especialidade (método do guia anatômico)

Motor: **Seedream 4.5** (`seedream-4-5`) · 1:1 · **2K** (4K queima ~2× o crédito e é overkill: no site as imagens saem a ~600–800px) · `count: 3–4` por peça.

O prompt tem sempre **4 blocos na mesma ordem**. Só o bloco 2 muda por peça.

---

## Bloco 1 — Método (fixo, abre o prompt)

> Reinterpret the reference diagram as a photorealistic professional 3D medical visualization. CRITICAL: follow the reference's LAYOUT and ANATOMY EXACTLY — keep the position, proportion, angle and spatial relationship of every element exactly where the diagram puts them. Do not move, add or remove structures, and do not add a whole brain.

Vai acompanhado do **guia** em `references: [{type:"image", identifier:"…"}]`.

## Bloco 3 — Cor e luz (fixo)

> COLOUR AND LIGHT: PURE BLACK background, deep and empty — NO large glowing halo, NO amber wash filling the frame. Dark, dramatic, high-contrast studio lighting with only a tight warm golden rim light tracing the edges of the structures; the artery is the most saturated element, a deep luminous red. Cinema-grade physically-based render, subsurface scattering, ultra-sharp micro-detail, shallow depth of field, award-winning pharmaceutical advertising quality, clean and premium.

## Bloco 4 — Negativos (fixo, fecha o prompt)

> NOT a flat diagram, NOT cartoon, NOT plastic toy, NOT beige cadaver tissue, NOT a surgical field, NOT gore. ABSOLUTELY NO TEXT, NO letters, NO labels, NO words, NO leader lines, NO annotations, NO callouts anywhere in the image.

⚠️ Os negativos **não são opcionais**: sem "beige cadaver" volta o corte bege que o cliente odeia; sem o bloco de texto o modelo crava label — e erra a grafia ("VESITULCOCHILLAR", "CERBBELUM").

---

## Bloco 2 — Tradução forma → tecido (muda por peça)

### Neuralgia do trigêmeo

> What each shape must become: the vertical column is the BRAINSTEM, with the round bulge at its middle being the PONS, rendered as living neural tissue, smooth, softly translucent pearl-grey with delicate surface vasculature; the mass at lower left is the CEREBELLUM with its fine folia; the thick band leaving the side of the pons is the TRIGEMINAL NERVE ROOT — a stout fibrous nerve with visible longitudinal fascicles under a glossy sheath, thicker at the brainstem and widening slightly at its far end; the tube arching over it is an ARTERY — a glossy deep red vessel with a smooth muscular wall — and where it crosses the nerve it visibly presses into it, indenting and flattening the nerve at that exact spot.

### Espasmo hemifacial

> TIGHT CLOSE-UP on the brainstem only: NO cerebral cortex, NO whole brain, NO brain hemispheres anywhere in frame or in the background. The vertical column is the BRAINSTEM: the round bulge high on it is the PONS, the narrower part below is the MEDULLA, living neural tissue, smooth, translucent pearl-grey with delicate surface vasculature; the faint horizontal groove between them is the pontomedullary sulcus; the mass at lower left is the CEREBELLUM with fine folia. Leaving that low groove, exactly TWO nerves — the FACIAL NERVE and the VESTIBULOCOCHLEAR NERVE — run outward side by side as a close pair. CRITICAL: each nerve is a SMOOTH, SOLID, CYLINDRICAL CORD with a glossy continuous sheath and a rounded tip — like a slender polished cable. They must NOT be frayed, NOT splayed, NOT a bundle of loose fibres, NOT paintbrush bristles, NOT a broom. Only two cords, nothing else. The tube curving up from below is an ARTERY, a glossy deep red vessel with a smooth muscular wall, pressing up into the pair of nerves right at their exit from the brainstem, indenting them there.

### Tumores hipofisários

> Close-up of the SELLAR REGION at the skull base. The round mass at the centre is a PITUITARY ADENOMA: a solid opaque subtly lobulated tumour with a soft living surface, sitting INSIDE the dark saddle-shaped hollow beneath it — the SELLA TURCICA — filling and expanding it. A slender PITUITARY STALK rises from the top of the tumour. Lying across the top of that stalk is the OPTIC CHIASM. CRITICAL: the chiasm is a COMPACT, SHORT, THICK X formed by two soft translucent nerve bundles crossing each other, with the optic nerves continuing as two short tapering cords to each side — it is chunky, fleshy and close to the tumour. It must NOT look like wings, NOT like a dragonfly or insect, NOT like spheres or beads on sticks, NOT like a delicate ornament — it is thick living nerve tissue. Below the tumour, the dark air cavity of the sphenoid sinus. At the left, an ARTERY: a glossy deep red vessel. Bone rendered as DARK translucent smoked glass, never pale beige.

### MAV (única sem guia desenhado — a referência é a imagem antiga, que já tinha o nidus certo)

> Subject: a brain ARTERIOVENOUS MALFORMATION (AVM). Composition and anatomy must follow the reference image exactly: a COMPACT TANGLED NIDUS at the centre — a dense coiled knot of abnormal interconnected vessels, like a tight ball of tangled worms — fed by two or three enlarged bright red ARTERIAL FEEDERS entering from ONE side, and drained by large dilated DRAINING VEINS leaving from the OPPOSITE side. Clear directional flow through the nidus, one side in, other side out. CRITICAL: this is NOT a radial starburst and NOT vessels radiating symmetrically outward in all directions like a medusa head or a sea anemone — the vessels converge into one compact focal tangle.

---

## Os guias (SVG)

Renderizados a 1000×1000 num HTML com `background:#000`, capturados com puppeteer. Formas primitivas — **`<path d>` não aceita comentário inline `/* */`, corrompe o path**.

```html
<defs>
  <radialGradient id="stem" cx="38%" cy="32%">
    <stop offset="0%" stop-color="#b9bac2"/><stop offset="100%" stop-color="#6f7079"/>
  </radialGradient>
  <radialGradient id="cere" cx="40%" cy="30%">
    <stop offset="0%" stop-color="#8b8c95"/><stop offset="100%" stop-color="#54555e"/>
  </radialGradient>
  <linearGradient id="nrv" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#f2ecdd"/><stop offset="100%" stop-color="#d8cfb8"/>
  </linearGradient>
  <linearGradient id="art" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#e03038"/><stop offset="100%" stop-color="#9c151d"/>
  </linearGradient>
</defs>
```

**Trigêmeo** — raiz ÚNICA e GROSSA saindo do bojo da ponte (alto), artéria em alça POR CIMA:

```html
<ellipse cx="250" cy="690" rx="215" ry="160" fill="url(#cere)"/>
<rect x="196" y="110" width="150" height="800" rx="70" fill="url(#stem)"/>
<ellipse cx="336" cy="392" rx="130" ry="118" fill="url(#stem)"/>
<path d="M300 90 C 452 104 566 158 606 248 C 640 326 604 392 520 410"
      fill="none" stroke="url(#art)" stroke-width="38" stroke-linecap="round"/>
<path d="M452 372 C 566 358 700 356 800 366 C 848 371 866 392 862 416
         C 858 444 828 456 792 452 C 690 442 556 428 452 414 Z" fill="url(#nrv)"/>
<path d="M520 410 C 566 420 596 470 588 540"
      fill="none" stroke="url(#art)" stroke-width="34" stroke-linecap="round"/>
<ellipse cx="516" cy="386" rx="42" ry="24" fill="#b81d26" transform="rotate(-8 516 386)"/>
```

**Espasmo hemifacial** — PAR fino saindo BAIXO (sulco bulbopontino), artéria subindo POR BAIXO:

```html
<ellipse cx="250" cy="742" rx="205" ry="150" fill="url(#cere)"/>
<rect x="196" y="110" width="150" height="800" rx="70" fill="url(#stem)"/>
<ellipse cx="330" cy="330" rx="128" ry="120" fill="url(#stem)"/>
<path d="M212 470 C 268 486 318 486 372 474" fill="none" stroke="#4a4b53"
      stroke-width="9" stroke-linecap="round" opacity=".85"/>
<path d="M372 486 C 500 470 654 452 786 442 C 826 439 842 452 842 468
         C 842 486 824 496 788 498 C 656 504 500 506 372 512 Z" fill="url(#nrv)"/>
<path d="M376 526 C 502 520 646 512 776 512 C 812 512 826 524 826 538
         C 826 554 806 562 774 562 C 646 566 500 560 376 550 Z" fill="url(#nrv)" opacity=".9"/>
<path d="M286 900 C 386 828 470 700 452 566 C 444 512 424 490 400 480"
      fill="none" stroke="url(#art)" stroke-width="36" stroke-linecap="round"/>
<ellipse cx="424" cy="500" rx="40" ry="24" fill="#b81d26" transform="rotate(20 424 500)"/>
```

**Hipófise** — adenoma DENTRO da sela, haste subindo, quiasma por cima, seio esfenoidal abaixo:

```html
<path d="M120 300 C 300 190 700 190 880 320 C 940 366 940 430 900 452
         L 660 452 L 640 470 L 420 470 L 400 452 L 120 452 Z" fill="url(#stem)" opacity=".55"/>
<path d="M700 470 C 760 500 800 580 790 700 C 784 790 750 860 700 900
         L 900 900 L 900 470 Z" fill="url(#cere)" opacity=".5"/>
<path d="M300 560 C 300 500 380 476 470 476 L 610 476 C 690 476 740 508 740 566
         C 740 620 700 640 640 640 L 400 640 C 340 640 300 616 300 560 Z"
      fill="#3b3c44" opacity=".9"/>
<ellipse cx="518" cy="556" rx="150" ry="128" fill="#d9a58a"/>
<rect x="502" y="404" width="30" height="120" rx="15" fill="url(#nrv)"/>
<path d="M330 392 C 420 372 470 396 518 404 C 566 396 616 372 706 392
         C 726 396 730 424 706 430 C 616 448 566 424 518 434
         C 470 424 420 448 330 430 C 306 424 310 396 330 392 Z" fill="url(#nrv)"/>
<path d="M360 700 C 420 676 620 676 680 700 C 700 708 700 800 680 812
         C 620 836 420 836 360 812 C 340 800 340 708 360 700 Z" fill="#101018"/>
<path d="M170 470 C 240 500 300 520 300 560" fill="none" stroke="#8e1b22"
      stroke-width="16" stroke-linecap="round" opacity=".9"/>
```

---

## Para as 7 peças restantes

O trabalho é desenhar o guia (a anatomia da pesquisa da 7ª rodada já está levantada) e reusar os blocos 1, 3 e 4 sem tocar. Assinaturas que não podem se misturar:

| Peça | O que o guia precisa mostrar |
|---|---|
| Aneurisma | 1 saco na **bifurcação** (não vaso reto = fusiforme) |
| Moyamoya | névoa fina **bilateral** ("puff of smoke"), não nidus grosso |
| Revascularização | STA → **1** ramo cortical, em **1** cérebro |
| Cavernoma | pipoca + anel de hemossiderina |
| Schwannoma | massa no conduto auditivo projetando no ângulo ponto-cerebelar — vista **axial**, lateral (não linha média) |
| Tumor cerebral | massa sólida intra-axial + edema (≠ meningioma extra-axial) |
| Tumor medular | intramedular, alargando a medula |
