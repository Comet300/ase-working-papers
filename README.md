# Working Papers — Facultatea de Marketing, ASE București

Frontend static (doar HTML), fără backend. CSS și JavaScript sunt incluse în
fiecare fișier — fără dependențe externe, fără build. Fonturi via Google Fonts,
icoane SVG inline. Imaginile sunt găzduite (preluate din designul original).

## Pornire

Ai nevoie de **Node.js 22+** — o singură dată, de la <https://nodejs.org>
(versiunea „LTS”). Apoi:

```bash
git clone https://github.com/Comet300/ase-working-papers.git
cd ase-working-papers
npm start
```

Atât: nu se instalează nimic (`npm install` nu are ce face — proiectul nu are
dependențe) și nu se construiește nimic. Site-ul se deschide la
**<http://localhost:8000>**.

Dacă portul e ocupat: `PORT=8080 npm start`.

### Fără terminal

Site-ul este numai HTML, iar legăturile dintre pagini sunt fișiere obișnuite:
**dublu clic pe `acasa.html`** îl deschide în browser, fără Node și fără nimic
altceva. Singura diferență față de `npm start` este că adresele arată
`acasa.html` în loc de `/acasa`, ca în producție.

### Cu Docker

Aceeași imagine ca în producție — nginx cu regulile din `nginx.conf`:

```bash
docker build -t ase-working-papers .
docker run --rm -p 8000:80 ase-working-papers
```

## Pagini

| Fișier | Pagină |
|---|---|
| `acasa.html` | Acasă — misiune, proces de publicare, anunțuri |
| `guidelines.html` | Ghidul Autorului — standarde, tabele/figuri, politica AI, citare Harvard |
| `arhiva.html` | Arhivă — lucrări publicate, filtre, paginare |
| `recenzori.html` | Recenzori — redactor-șef și consiliul de recenzori |
| `inscriere.html` | Înscriere Lucrare — formular pe 4 pași |

## Wiring backend

Fiecare buton/link apelează o funcție placeholder (ex. `saveDraft()`,
`downloadPaper()`, `filterLevel()`) marcată cu `// TODO backend`, pregătită
pentru conectarea logicii reale.
