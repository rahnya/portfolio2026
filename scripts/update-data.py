#!/usr/bin/env python3
"""Update projects.json : nouvelles traces + AC + colors."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "projects.json"

with open(DATA, encoding="utf-8") as f:
    data = json.load(f)

# ── Palette studio (6 teintes) ────────────────────────────────────────────
STUDIO = {"pink":"#FF96B3","orange":"#FFA755","yellow":"#FFC72C",
          "purple":"#7B638A","lavender":"#C9A9DC","peach":"#FF8A65"}

def hue(h):
    s = h.lstrip('#')
    if len(s) < 6: return 0
    r,g,b = [int(s[i:i+2],16)/255 for i in (0,2,4)]
    mx, mn = max(r,g,b), min(r,g,b)
    d = mx-mn
    if d==0: return 0
    if mx==r: H = ((g-b)/d) % 6
    elif mx==g: H = (b-r)/d + 2
    else: H = (r-g)/d + 4
    return H*60

def map_color(hex_in):
    if not hex_in: return STUDIO["lavender"]
    h = hue(hex_in)
    if h >= 330 or h < 12: return STUDIO["pink"]
    if h < 25: return STUDIO["peach"]
    if h < 50: return STUDIO["orange"]
    if h < 65: return STUDIO["yellow"]
    if h < 250: return STUDIO["lavender"]
    if h < 330: return STUDIO["purple"]
    return STUDIO["pink"]

for p in data:
    p["color"] = map_color(p.get("color", ""))

OVERRIDES = {"snoozly": "#FF96B3", "rahnya-studio": "#FFA755",
             "alternance": "#FFC72C", "seo-content-strategy": "#FFC72C"}
for p in data:
    if p["slug"] in OVERRIDES:
        p["color"] = OVERRIDES[p["slug"]]

# ── Categories normalisées ────────────────────────────────────────────────
CAT_MAP = {"web":"web","uxui":"uxui","design":"visuels","communication":"visuels",
    "content":"visuels","seo":"visuels","research":"visuels","data":"visuels",
    "innovation":"ar-vr-3d","game":"ar-vr-3d","system":"web","tech":"web",
    "education":"visuels","engagement":"visuels","development":"web",
    "hackathon":"web","community":"visuels"}

def remap_cats(p):
    raw = p.get("categories") or ([p["category"]] if p.get("category") else [])
    new = set()
    track = []
    for c in raw:
        if c in ("professional","entrepreneurship","school"):
            track.append(c); continue
        if c in CAT_MAP: new.add(CAT_MAP[c])
    if not new: new.add("web")
    return sorted(new) + sorted(set(track))

for p in data:
    p["categories"] = remap_cats(p)
    p.pop("category", None)

# ── Year + skills filter ──────────────────────────────────────────────────
BUT3 = {"alternance","visio-conference-app","ai-eprocurement-seo-article","rahnya-studio",
        "snoozly","pitch","vr-ar","engagement-bde","infra-cyber","conception",
        "tank-game-ui-unity","seo-content-strategy","mmi-lan-event","aurora-sola",
        "magicien-escape","snoozly-business-plan","babylon-airport-game",
        "snoozly-maquettes","snoozly-app-dev"}
BUT2 = {"internship-management-app","ai-agents-workflow","laravel-blog-platform",
        "flightfootprint","code-ton-territoire","collective-intelligence-report",
        "epitech-coding-club","ampa-animal-adoption","inflation-dataviz",
        "crossy-road-ux-powerups","weather-app-design","scrum-learning-platform",
        "logo-jingle-animation","website-competitive-audit","communication-plan-project",
        "mmi-30-years-communication","personal-portfolio"}
BUT1 = {"mmi-decouvertes","1ris-agency-website","porquerolles-digital-watch",
        "merry-cashmas-reportage","virtual-travel-chair"}

YEAR = {s:"BUT3" for s in BUT3}
YEAR.update({s:"BUT2" for s in BUT2})
YEAR.update({s:"BUT1" for s in BUT1})

def filter_skills(slug, sk):
    return [x for x in sk if x in ("développer","entreprendre")] if YEAR.get(slug)=="BUT3" else sk

# ── AC library ────────────────────────────────────────────────────────────
AC_LIB = {
    "AC11.01":"Présenter une organisation, ses activités et son environnement",
    "AC11.02":"Évaluer un site web, un produit multimédia ou un dispositif interactif",
    "AC11.03":"Produire des analyses statistiques descriptives",
    "AC11.04":"Analyser des formes médiatiques et leur sémiotique",
    "AC11.05":"Identifier les cibles",
    "AC11.06":"Réaliser des entretiens utilisateurs pour construire personae et user stories",
    "AC12.01":"Concevoir un produit ou un service en terme d'usage et de fonctionnalité",
    "AC12.02":"Construire la proposition de valeur d'un produit ou d'un service",
    "AC12.03":"Proposer une recommandation marketing",
    "AC12.04":"Proposer une stratégie de communication",
    "AC13.01":"Écrire pour les médias numériques",
    "AC13.02":"Produire des pistes graphiques et planches d'inspiration",
    "AC13.03":"Créer, composer et retoucher des visuels",
    "AC13.04":"Tourner et monter une vidéo",
    "AC13.05":"Designer une interface web (wireframes, UI)",
    "AC13.06":"Optimiser les médias en fonction de leurs usages",
    "AC14.01":"Exploiter un environnement de développement",
    "AC14.02":"Produire des pages Web fluides incluant un balisage sémantique",
    "AC14.03":"Générer des pages Web à partir de données structurées",
    "AC14.04":"Mettre en ligne une application Web (hébergement standard)",
    "AC14.05":"Modéliser les données d'une application Web",
    "AC14.06":"Déployer et personnaliser une application Web (CMS / framework MVC)",
    "AC15.01":"Gérer un projet avec une méthode classique",
    "AC15.02":"Budgéter un projet et suivre sa rentabilité",
    "AC15.03":"Découvrir les écosystèmes d'innovation numérique",
    "AC15.04":"Analyser un produit ou un service innovant",
    "AC15.05":"Construire une présence en ligne professionnelle",
    "AC15.06":"Interagir au sein des organisations",
    "AC15.07":"Produire un message écrit ou oral professionnel",
    "AC21.01":"Analyser la stratégie de communication ou marketing",
    "AC21.02":"Auditer un site web, une marque ou un service",
    "AC21.03":"Traiter des données avec des outils statistiques",
    "AC21.04":"Identifier les parcours client à partir d'enquêtes",
    "AC21.05":"Cartographier les expériences utilisateur",
    "AC22.01":"Co-concevoir un produit ou un service",
    "AC22.02":"Produire une recommandation ergonomique",
    "AC22.03":"Co-construire une recommandation stratégique",
    "AC22.04":"Optimiser le référencement",
    "AC22.05":"Mettre en place une présence sur les réseaux sociaux",
    "AC23.01":"Produire un écrit journalistique sourcé et documenté",
    "AC23.02":"Définir une iconographie",
    "AC23.03":"Créer et décliner une identité visuelle (charte graphique)",
    "AC23.04":"Imaginer, écrire et scénariser pour une communication multimédia",
    "AC23.05":"Réaliser, composer et produire pour une communication plurimédia",
    "AC23.06":"Élaborer animations, design sonore, dataviz, 3D",
    "AC24.01":"Produire des pages et applications Web responsives",
    "AC24.02":"Mettre en place ou développer un back office",
    "AC24.03":"Intégrer ou développer interactions riches / dispositifs interactifs",
    "AC24.04":"Modéliser les traitements d'une application Web",
    "AC24.05":"Optimiser une application web (référencement et chargement)",
    "AC24.06":"Configurer une solution d'hébergement adaptée",
    "AC25.01":"Gérer un projet avec une méthode agile",
    "AC25.02":"Cartographier un écosystème",
    "AC25.03":"Initier la constitution d'un réseau professionnel",
    "AC25.04":"Collaborer au sein des organisations",
    "AC25.05":"Maîtriser les codes des productions écrites et orales pro",
    "AC25.06":"Prendre en compte les contraintes juridiques",
    "AC34.01":"Développer à l'aide d'un framework côté client",
    "AC34.02":"Développer à l'aide d'un framework côté serveur",
    "AC34.03":"Développer des dispositifs interactifs sophistiqués",
    "AC34.04":"Concevoir et développer des composants logiciels",
    "AC34.05":"Maîtriser l'hébergement et le déploiement d'applications",
    "AC35.01":"Piloter un produit, un service ou une équipe",
    "AC35.02":"Maîtriser la qualité en projet Web ou multimédia",
    "AC35.03":"Concevoir un projet d'entreprise innovante",
    "AC35.04":"Défendre un projet de manière convaincante",
}

ACS = {
    "alternance":["AC34.01","AC34.02","AC34.05","AC35.01","AC35.02","AC35.04","AC24.05","AC22.04","AC22.05","AC23.03","AC23.05","AC25.04","AC25.05","AC14.06"],
    "visio-conference-app":["AC34.01","AC34.02","AC34.03","AC34.04","AC34.05","AC35.01","AC35.02"],
    "ai-eprocurement-seo-article":["AC23.01","AC22.04","AC25.05"],
    "rahnya-studio":["AC35.01","AC35.03","AC35.04","AC34.01","AC34.05","AC23.03","AC15.05"],
    "snoozly":["AC35.01","AC35.03","AC35.04","AC25.02","AC25.03","AC15.04","AC15.05","AC15.03"],
    "pitch":["AC35.04","AC25.05","AC15.07"],
    "vr-ar":["AC34.03","AC34.04","AC24.03","AC22.01"],
    "engagement-bde":["AC15.02","AC15.06","AC25.04","AC25.05","AC35.01","AC15.03"],
    "infra-cyber":["AC34.05","AC24.06","AC14.04"],
    "conception":["AC34.04","AC22.01","AC25.02"],
    "tank-game-ui-unity":["AC34.03","AC34.04","AC22.01","AC23.06"],
    "seo-content-strategy":["AC22.04","AC23.01","AC22.05","AC25.05"],
    "mmi-lan-event":["AC15.01","AC15.06","AC25.04","AC23.03"],
    "internship-management-app":["AC24.01","AC24.02","AC24.04","AC22.01","AC22.02"],
    "ai-agents-workflow":["AC24.01","AC24.02","AC24.03","AC22.01"],
    "laravel-blog-platform":["AC24.01","AC24.02","AC24.04","AC24.06","AC14.06"],
    "flightfootprint":["AC24.01","AC24.03","AC24.04","AC21.03","AC23.06","AC11.03"],
    "code-ton-territoire":["AC24.01","AC24.03","AC22.01","AC23.04","AC25.04"],
    "collective-intelligence-report":["AC23.01","AC21.01","AC21.04","AC23.04","AC11.04"],
    "epitech-coding-club":["AC25.03","AC25.04","AC15.06"],
    "ampa-animal-adoption":["AC24.01","AC24.02","AC24.06","AC23.03","AC14.06"],
    "inflation-dataviz":["AC21.03","AC23.06","AC23.04","AC11.03"],
    "crossy-road-ux-powerups":["AC21.01","AC21.05","AC22.02","AC11.02","AC11.06"],
    "weather-app-design":["AC22.01","AC22.02","AC23.05","AC13.05"],
    "scrum-learning-platform":["AC25.01","AC22.01","AC23.04"],
    "logo-jingle-animation":["AC23.03","AC23.05","AC23.06"],
    "website-competitive-audit":["AC21.01","AC21.02","AC22.04","AC11.02"],
    "communication-plan-project":["AC21.01","AC22.03","AC22.05","AC25.05"],
    "mmi-30-years-communication":["AC23.01","AC23.04","AC23.05","AC11.04"],
    "personal-portfolio":["AC24.01","AC24.06","AC15.05","AC23.03","AC23.05"],
    "mmi-decouvertes":["AC14.01","AC14.02","AC14.03","AC14.04","AC11.01"],
    "1ris-agency-website":["AC14.01","AC14.02","AC14.04","AC14.05","AC23.03","AC11.01","AC13.02","AC23.02","AC14.06"],
    "porquerolles-digital-watch":["AC12.01","AC12.02","AC12.04","AC11.05"],
    "merry-cashmas-reportage":["AC13.01","AC13.03","AC13.04","AC13.06"],
    "virtual-travel-chair":["AC12.01","AC12.02","AC12.03","AC12.04","AC15.02"],
    "aurora-sola":["AC34.01","AC34.04","AC34.05","AC35.01","AC35.04","AC23.04","AC25.04","AC13.02","AC23.02"],
    "magicien-escape":["AC34.03","AC34.04","AC22.01","AC22.02"],
    "snoozly-business-plan":["AC35.01","AC35.03","AC15.02","AC15.04","AC15.03","AC25.06"],
    "snoozly-maquettes":["AC22.01","AC22.02","AC23.03","AC15.05","AC11.06","AC13.05"],
    "snoozly-app-dev":["AC34.01","AC34.02","AC34.04","AC34.05","AC35.01"],
}

for p in data:
    slug = p["slug"]
    p["year"] = YEAR.get(slug, "BUT3")
    p["acs"] = ACS.get(slug, [])
    p["butSkills"] = filter_skills(slug, p.get("butSkills", []))

# ── Alternance & Visioconf enrichissements ────────────────────────────────
for p in data:
    if p["slug"] == "alternance":
        p["fr"]["title"] = "Alternance Weproc — Webmaster éditorial & Content Manager SEO"
        p["en"]["title"] = "Weproc Apprenticeship — Editorial Webmaster & SEO Content Manager"
        p["fr"]["shortDescription"] = "Refonte SEO, internationalisation et stratégie éditoriale du site d'un SaaS B2B (e-procurement) — 8 mois d'alternance."
        p["en"]["shortDescription"] = "SEO overhaul, internationalisation and editorial strategy for a B2B SaaS — 8 months of apprenticeship."
        p["fr"]["technologies"] = ["WordPress","Elementor Pro","WPML","Yoast","Semrush","Search Console","Analytics 4","Ahrefs","Schema.org","Notion","Figma","Reddit Pro","n8n"]
        p["en"]["technologies"] = p["fr"]["technologies"]
        p["fr"]["liveUrl"] = "https://www.weproc.com"
        p["en"]["liveUrl"] = "https://www.weproc.com"
        p["fr"]["screenshots"] = ["/projects/article_weproc.png"]
        p["en"]["screenshots"] = ["/projects/article_weproc.png"]
    if p["slug"] == "visio-conference-app":
        p["fr"]["liveUrl"] = "http://visioconf.xyz/"
        p["en"]["liveUrl"] = "http://visioconf.xyz/"
    if p["slug"] == "conception":
        p["fr"]["title"] = "Rédaction de spécifications techniques"
        p["en"]["title"] = "Technical specifications writing"

# ── Nouvelles traces ──────────────────────────────────────────────────────
NEW_TRACES = [
  {"slug":"snoozly-app-dev","year":"BUT3","color":"#FF96B3","categories":["web","entrepreneurship","professional"],
   "butSkills":["développer","entreprendre"],"acs":["AC34.01","AC34.02","AC34.04","AC34.05","AC35.01"],
   "fr":{"title":"Développement de l'application Snoozly",
     "shortDescription":"App mobile React Native / Expo + backend Node.js / MongoDB pour la réservation, l'accès et la personnalisation des capsules Snoozly.",
     "context":"Volet développement du projet Snoozly : MVP fonctionnel — réservation, authentification, accès via QR code, personnalisation d'ambiance.",
     "role":"Architecture full-stack : mobile React Native / Expo, backend Node.js / Express / MongoDB.",
     "selfEvaluation":"La trace dev la plus complète de mon BUT3.",
     "technologies":["React Native","Expo","Node.js","Express","MongoDB","Mongoose","JWT"],
     "features":["App mobile React Native / Expo","Backend REST Node.js / Express","Persistance MongoDB / Mongoose","Flux de réservation complet","Dev local stable"],"screenshots":[]},
   "en":{"title":"Snoozly app development","shortDescription":"React Native / Expo mobile app + Node.js / MongoDB backend for capsule booking, access and ambiance personalisation.",
     "context":"Development side of Snoozly.","role":"Full-stack architecture.","selfEvaluation":"Most complete dev trace of BUT3.",
     "technologies":["React Native","Expo","Node.js","Express","MongoDB","Mongoose","JWT"],
     "features":["React Native / Expo mobile app","Node.js / Express backend","MongoDB / Mongoose persistence","Full booking flow","Stable local dev"],"screenshots":[]}},
  {"slug":"snoozly-maquettes","year":"BUT3","color":"#FF96B3","categories":["uxui","visuels","entrepreneurship","professional"],
   "butSkills":["entreprendre"],"acs":["AC22.01","AC22.02","AC23.03","AC15.05","AC11.06","AC13.05"],
   "fr":{"title":"Maquettes Snoozly — design produit",
     "shortDescription":"Conception des maquettes de l'application Snoozly, accélérées pour un entretien d'admission en master CODUX à Limoges.",
     "context":"Volet design produit du projet Snoozly.","role":"DA, UX, wireframes, maquettes Figma, design system.",
     "selfEvaluation":"Trace forte sur la facette UX/UI.",
     "technologies":["Figma","FigJam","Notion"],
     "features":["Trois personas","Wireframes puis maquettes HD","Design system minimal","Storyboard d'entretien CODUX"],"screenshots":[]},
   "en":{"title":"Snoozly mockups — product design","shortDescription":"Snoozly app mockups.","context":"Product-design side of Snoozly.",
     "role":"AD, UX, wireframes, HD mockups, design system.","selfEvaluation":"Strong UX/UI trace.",
     "technologies":["Figma","FigJam","Notion"],"features":["Three personas","Wireframes then HD mockups","Minimal design system","CODUX interview storyboard"],"screenshots":[]}},
  {"slug":"snoozly-business-plan","year":"BUT3","color":"#FF96B3","categories":["visuels","school"],
   "butSkills":["entreprendre"],"acs":["AC35.01","AC35.03","AC15.02","AC15.04","AC15.03","AC25.06"],
   "fr":{"title":"Business plan Snoozly — cours Entrepreneuriat",
     "shortDescription":"Production d'un business plan complet dans le cadre du module Entrepreneuriat BUT3 — Snoozly comme cas.",
     "context":"Cours d'Entrepreneuriat semestre 5.","role":"Construction du business model et rédaction du business plan.",
     "selfEvaluation":"Vision plus globale des projets numériques.","technologies":["Notion","Canva","Google Docs"],
     "features":["Business plan complet","Modèle économique projeté","Analyse cibles et personae","Premières projections chiffrées"],"screenshots":[]},
   "en":{"title":"Snoozly business plan — Entrepreneurship class","shortDescription":"Full business plan produced for the BUT3 Entrepreneurship module.",
     "context":"Semester-5 Entrepreneurship class.","role":"Business model and plan writing.","selfEvaluation":"Broader view of digital projects.",
     "technologies":["Notion","Canva","Google Docs"],"features":["Full business plan","Projected economic model","Target and persona analysis","First financial projections"],"screenshots":[]}},
  {"slug":"aurora-sola","year":"BUT3","color":"#7B638A","categories":["web","visuels","professional"],
   "butSkills":["développer","entreprendre"],"acs":["AC34.01","AC34.04","AC34.05","AC35.01","AC35.04","AC23.04","AC25.04","AC13.02","AC23.02"],
   "fr":{"title":"Hackathon AURORA — Cellule SOLA",
     "shortDescription":"Site narratif sci-fi pour le programme spatial fictif Aurora, équipe de 3, sprint hackathon.",
     "context":"AURORA est un hackathon MMI 2026 en équipe de 3.",
     "role":"Développement principal (site GitHub Pages) et rendus rédactionnels.",
     "selfEvaluation":"Sans doute la trace la plus représentative de ma capacité à fonctionner sous contrainte de temps.",
     "technologies":["HTML5","CSS3","JavaScript","GitHub Pages","Figma"],
     "features":["Architecture HTML/CSS/JS modulaire","Design system SOLA","Page interactive Message de la Terre","Sections narratives évolutives","Navigation mobile complète"],
     "liveUrl":"https://rahnya.github.io/aurora-sola/","githubUrl":"https://github.com/rahnya/aurora-sola","screenshots":[]},
   "en":{"title":"AURORA Hackathon — SOLA Cell","shortDescription":"Sci-fi narrative site for fictional Aurora space programme.",
     "context":"AURORA is a 2026 MMI hackathon in teams of 3.","role":"Development lead + all writing deliverables.",
     "selfEvaluation":"Most representative trace of my ability to deliver under time pressure.",
     "technologies":["HTML5","CSS3","JavaScript","GitHub Pages","Figma"],
     "features":["Modular HTML/CSS/JS architecture","SOLA design system","Interactive Message of the Earth","Evolving narrative sections","Full mobile nav"],
     "liveUrl":"https://rahnya.github.io/aurora-sola/","githubUrl":"https://github.com/rahnya/aurora-sola","screenshots":[]}},
  {"slug":"magicien-escape","year":"BUT3","color":"#C9A9DC","categories":["ar-vr-3d","school"],
   "butSkills":["développer"],"acs":["AC34.03","AC34.04","AC22.01","AC22.02"],
   "fr":{"title":"Magicien Escape — projet VR",
     "shortDescription":"Mini escape game en réalité virtuelle conçu en équipe en BUT3.",
     "context":"Module Dispositifs interactifs du BUT3.","role":"Conception du scénario d'énigmes et développement des interactions VR.",
     "selfEvaluation":"Découverte de la conception en environnement immersif.",
     "technologies":["Unity","C#","Meta Quest","Blender"],
     "features":["Scénario d'escape avec 3 énigmes VR","Système de déclencheurs","Tests utilisateurs itératifs"],"screenshots":[]},
   "en":{"title":"Magicien Escape — VR project","shortDescription":"VR escape game built as a team in BUT3.",
     "context":"BUT3 Interactive Devices module.","role":"Puzzle scenario design and VR interaction development.","selfEvaluation":"Got into immersive-environment design.",
     "technologies":["Unity","C#","Meta Quest","Blender"],
     "features":["3 in-VR physical puzzles","Trigger and object system","Iterative user testing"],"screenshots":[]}},
  {"slug":"babylon-airport-game","year":"BUT3","color":"#FF8A65","categories":["ar-vr-3d","school"],
   "butSkills":["développer"],"acs":["AC34.03","AC34.04","AC22.01"],
   "fr":{"title":"Mini-jeu d'atterrissage Babylon.js",
     "shortDescription":"Petit dispositif interactif 3D : autoriser les avions à atterrir dans le bon ordre.",
     "context":"Découverte de Babylon.js en BUT3.","role":"Conception du gameplay, modélisation simple, contrôles et logique de collision.",
     "selfEvaluation":"Première vraie prise en main d'un moteur 3D web.",
     "technologies":["Babylon.js","JavaScript","HTML5","Blender"],
     "features":["Plusieurs avions en approche","Boutons d'autorisation","Conditions de crash"],"screenshots":[]},
   "en":{"title":"Babylon.js airport mini-game","shortDescription":"Small 3D interactive piece.",
     "context":"First contact with Babylon.js in BUT3.","role":"Gameplay design, lightweight modeling, controls and collision logic.",
     "selfEvaluation":"First proper hands-on with a web 3D engine.",
     "technologies":["Babylon.js","JavaScript","HTML5","Blender"],
     "features":["Several planes inbound","Per-aircraft authorisation","Crash conditions"],"screenshots":[]}},
]

existing = {p["slug"] for p in data}
for t in NEW_TRACES:
    if t["slug"] not in existing:
        data.insert(0, t); existing.add(t["slug"])

# ── Save ──────────────────────────────────────────────────────────────────
with open(DATA, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

with open(ROOT / "data" / "ac-library.json", "w", encoding="utf-8") as f:
    json.dump(AC_LIB, f, ensure_ascii=False, indent=2)

used = set()
for p in data:
    used.update(p.get("acs", []))
print(f"Projets: {len(data)} · AC couverts: {len(used)}/{len(AC_LIB)}")
