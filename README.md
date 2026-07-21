# Working Papers — Facultatea de Marketing, ASE București

Frontend static (doar HTML), fără backend. CSS și JavaScript sunt incluse în
fiecare fișier — fără dependențe externe, fără build. Fonturi via Google Fonts,
icoane SVG inline. Imaginile sunt găzduite (preluate din designul original).

## Pagini

| Fișier | Pagină |
|---|---|
| `acasa.html` | Acasă — misiune, proces de publicare, anunțuri |
| `guidelines.html` | Ghidul Autorului — standarde, tabele/figuri, politica AI, citare Harvard |
| `arhiva.html` | Arhivă — lucrări publicate, filtre, paginare |
| `recenzori.html` | Recenzori — redactor-șef și consiliul de recenzori |
| `inscriere.html` | Înscriere Lucrare — formular pe 4 pași |

## Rulare

Orice server static, ex:

```bash
python3 -m http.server 8000
# apoi deschide http://localhost:8000/acasa.html
```

## Wiring backend

Fiecare buton/link apelează o funcție placeholder (ex. `saveDraft()`,
`downloadPaper()`, `filterLevel()`) marcată cu `// TODO backend`, pregătită
pentru conectarea logicii reale.
