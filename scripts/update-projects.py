#!/usr/bin/env python3
"""Mise à jour massive des projets : nouvelles traces, AC, catégories normalisées."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "projects.json"

with open(DATA, encoding="utf-8") as f:
    data = json.load(f)

# ─── 1. Normaliser categories — palette de 5 catégories cibles ────────────────
# all (implicite) | web | uxui | visuels | ar-vr-3d
# track (séparé) : pro / school
#   - "professional" / "entrepreneurship" → track pro
#   - "school" → track school
# Note : un projet peut être dans 2 categories (web + visuels, etc.)
CAT_MAP = {
    "web": "web",
    "uxui": "uxui",
    "design": "visuels",
    "communication": "visuels",
    "content": "visuels",
    "seo": "visuels",
    "research": "visuels",
    "data": "visuels",  # data viz = production visuelle
    "innovation": "ar-vr-3d",
    "game": "ar-vr-3d",
    "system": "web",          # infra = dev web
    "tech": "web",
    "education": "visuels",
    "engagement": "visuels",
    "development": "web",
    "hackathon": "web",      # un hackathon a aussi sa catégorie principale
    "community": "visuels",
}

def remap_cats(p):
    """Reclasse les categories d'un projet. Garde professional/entrepreneurship/school."""
    raw = p.get("categories") or ([p["category"]] if p.get("category") else [])
    new = set()
    track = []
    for c in raw:
        if c in ("professional", "entrepreneurship", "school"):
            track.append(c)
            continue
        if c in CAT_MAP:
            new.add(CAT_MAP[c])
    # if no display category, fallback to web (default)
    if not new:
        new.add("web")
    return sorted(new) + sorted(set(track))

for p in data:
    p["categories"] = remap_cats(p)
    if "category" in p:
        del p["category"]

# ─── 2. Mise à jour des butSkills selon l'année (BUT3 = dev + entreprendre uniquement)
#       et ajout du champ "year" pour permettre une affichage chronologique
# La règle BUT3 ne s'applique QU'aux traces produites en MMI3 (l'année courante).
# Pour les autres, on garde tel quel.

BUT3_SLUGS = {
    "alternance", "visio-conference-app", "ai-eprocurement-seo-article",
    "rahnya-studio", "snoozly", "pitch", "vr-ar", "engagement-bde",
    "infra-cyber", "conception", "tank-game-ui-unity",
    "seo-content-strategy", "mmi-lan-event",
    # nouvelles traces MMI3
    "aurora-sola", "magicien-escape", "snoozly-business-plan",
    "babylon-airport-game", "snoozly-maquettes", "snoozly-app-dev",
}
BUT2_SLUGS = {
    "internship-management-app", "ai-agents-workflow", "laravel-blog-platform",
    "flightfootprint", "code-ton-territoire", "collective-intelligence-report",
    "epitech-coding-club", "ampa-animal-adoption", "inflation-dataviz",
    "crossy-road-ux-powerups", "weather-app-design", "scrum-learning-platform",
    "logo-jingle-animation", "website-competitive-audit", "communication-plan-project",
    "mmi-30-years-communication", "personal-portfolio",
}
BUT1_SLUGS = {
    "mmi-decouvertes", "1ris-agency-website", "porquerolles-digital-watch",
    "merry-cashmas-reportage", "virtual-travel-chair",
}

YEAR = {}
for s in BUT3_SLUGS: YEAR[s] = "BUT3"
for s in BUT2_SLUGS: YEAR[s] = "BUT2"
for s in BUT1_SLUGS: YEAR[s] = "BUT1"

# ─── 3. Construction d'un index pour les nouvelles/enrichies traces ─────────────
# Format : on patch existing or insert new at index.
# pour BUT3 : butSkills allowed = {développer, entreprendre} only
def filter_skills_for_year(slug, skills):
    y = YEAR.get(slug)
    if y == "BUT3":
        return [s for s in skills if s in ("développer", "entreprendre")]
    return skills

# ─── 4. AC catalog (référence depuis le PDF officiel) ─────────────────────────
AC_LIB = {
    # BUT 1
    "AC11.01": "Présenter une organisation, ses activités et son environnement",
    "AC11.02": "Évaluer un site web, un produit multimédia ou un dispositif interactif",
    "AC11.03": "Produire des analyses statistiques descriptives",
    "AC11.04": "Analyser des formes médiatiques et leur sémiotique",
    "AC11.05": "Identifier les cibles",
    "AC11.06": "Réaliser des entretiens utilisateurs pour construire personae et user stories",
    "AC12.01": "Concevoir un produit ou un service en terme d'usage et de fonctionnalité",
    "AC12.02": "Construire la proposition de valeur d'un produit ou d'un service",
    "AC12.03": "Proposer une recommandation marketing",
    "AC12.04": "Proposer une stratégie de communication",
    "AC13.01": "Écrire pour les médias numériques",
    "AC13.02": "Produire des pistes graphiques et planches d'inspiration",
    "AC13.03": "Créer, composer et retoucher des visuels",
    "AC13.04": "Tourner et monter une vidéo",
    "AC13.05": "Designer une interface web (wireframes, UI)",
    "AC13.06": "Optimiser les médias en fonction de leurs usages",
    "AC14.01": "Exploiter de manière autonome un environnement de développement",
    "AC14.02": "Produire des pages Web fluides incluant un balisage sémantique",
    "AC14.03": "Générer des pages Web à partir de données structurées",
    "AC14.04": "Mettre en ligne une application Web (hébergement standard)",
    "AC14.05": "Modéliser les données d'une application Web",
    "AC14.06": "Déployer et personnaliser une application Web (CMS / framework MVC)",
    "AC15.01": "Gérer un projet avec une méthode classique",
    "AC15.02": "Budgéter un projet et suivre sa rentabilité",
    "AC15.03": "Découvrir les écosystèmes d'innovation numérique",
    "AC15.04": "Analyser un produit ou un service innovant",
    "AC15.05": "Construire une présence en ligne professionnelle (personal branding)",
    "AC15.06": "Interagir au sein des organisations",
    "AC15.07": "Produire un message écrit ou oral professionnel",
    # BUT 2 — Parcours Dev Web et Dispositifs interactifs
    "AC21.01": "Analyser la stratégie de communication ou marketing d'un acteur",
    "AC21.02": "Auditer un site web, une marque ou un service (trafic, référencement)",
    "AC21.03": "Traiter des données avec des outils statistiques",
    "AC21.04": "Identifier et décrire les parcours client à partir d'enquêtes",
    "AC21.05": "Cartographier les expériences utilisateur",
    "AC22.01": "Co-concevoir un produit ou un service",
    "AC22.02": "Produire une recommandation ergonomique à partir des tests utilisateurs",
    "AC22.03": "Co-construire une recommandation stratégique",
    "AC22.04": "Optimiser le référencement d'un site web, d'un produit ou d'un service",
    "AC22.05": "Mettre en place une présence sur les réseaux sociaux",
    "AC23.01": "Produire un écrit journalistique sourcé et documenté",
    "AC23.02": "Définir une iconographie",
    "AC23.03": "Créer et décliner une identité visuelle (charte graphique)",
    "AC23.04": "Imaginer, écrire et scénariser pour une communication multimédia ou transmédia",
    "AC23.05": "Réaliser, composer et produire pour une communication plurimédia",
    "AC23.06": "Élaborer animations, design sonore, effets spéciaux, dataviz, 3D",
    "AC24.01": "Produire des pages et applications Web responsives",
    "AC24.02": "Mettre en place ou développer un back office",
    "AC24.03": "Intégrer, produire ou développer interactions riches / dispositifs interactifs",
    "AC24.04": "Modéliser les traitements d'une application Web",
    "AC24.05": "Optimiser une application web (référencement et temps de chargement)",
    "AC24.06": "Configurer une solution d'hébergement adaptée",
    "AC25.01": "Gérer un projet avec une méthode d'amélioration continue (agile)",
    "AC25.02": "Cartographier un écosystème",
    "AC25.03": "Initier la constitution d'un réseau professionnel",
    "AC25.04": "Collaborer au sein des organisations",
    "AC25.05": "Maîtriser les codes des productions écrites et orales professionnelles",
    "AC25.06": "Prendre en compte les contraintes juridiques",
    # BUT 3 — Parcours Dev Web et Dispositifs interactifs
    "AC34.01": "Développer à l'aide d'un framework côté client",
    "AC34.02": "Développer à l'aide d'un framework côté serveur",
    "AC34.03": "Développer des dispositifs interactifs sophistiqués",
    "AC34.04": "Concevoir et développer des composants logiciels, plugins ou extensions",
    "AC34.05": "Maitriser l'hébergement et le déploiement d'applications",
    "AC35.01": "Piloter un produit, un service ou une équipe",
    "AC35.02": "Maîtriser la qualité en projet Web ou multimédia",
    "AC35.03": "Concevoir un projet d'entreprise innovante (nom, identité, forme juridique, ton)",
    "AC35.04": "Défendre un projet de manière convaincante",
}

# ─── 5. Mapping AC pour chaque projet existant ───────────────────────────────
EXISTING_AC = {
    # BUT 3
    "alternance": ["AC34.01","AC34.02","AC34.05","AC35.01","AC35.02","AC35.04",
                   "AC24.05","AC22.04","AC22.05","AC23.03","AC23.05","AC25.04","AC25.05"],
    "visio-conference-app": ["AC34.01","AC34.02","AC34.03","AC34.04","AC34.05","AC35.01","AC35.02"],
    "ai-eprocurement-seo-article": ["AC23.01","AC22.04","AC25.05"],
    "rahnya-studio": ["AC35.01","AC35.03","AC35.04","AC34.01","AC34.05","AC23.03","AC15.05"],
    "snoozly": ["AC35.01","AC35.03","AC35.04","AC25.02","AC25.03","AC15.04","AC15.05"],
    "pitch": ["AC35.04","AC25.05","AC15.07"],
    "vr-ar": ["AC34.03","AC34.04","AC24.03","AC22.01"],
    "engagement-bde": ["AC15.02","AC15.06","AC25.04","AC25.05","AC35.01"],
    "infra-cyber": ["AC34.05","AC24.06","AC14.04"],
    "conception": ["AC34.04","AC22.01","AC25.02"],
    "tank-game-ui-unity": ["AC34.03","AC34.04","AC22.01","AC23.06"],
    "seo-content-strategy": ["AC22.04","AC23.01","AC22.05","AC25.05"],
    "mmi-lan-event": ["AC15.01","AC15.06","AC25.04","AC23.03"],

    # BUT 2 — Parcours Dev Web
    "internship-management-app": ["AC24.01","AC24.02","AC24.04","AC22.01","AC22.02"],
    "ai-agents-workflow": ["AC24.01","AC24.02","AC24.03","AC22.01"],
    "laravel-blog-platform": ["AC24.01","AC24.02","AC24.04","AC24.06"],
    "flightfootprint": ["AC24.01","AC24.03","AC24.04","AC21.03","AC23.06"],
    "code-ton-territoire": ["AC24.01","AC24.03","AC22.01","AC23.04","AC25.04"],
    "collective-intelligence-report": ["AC23.01","AC21.01","AC21.04","AC23.04"],
    "epitech-coding-club": ["AC25.03","AC25.04","AC15.06"],
    "ampa-animal-adoption": ["AC24.01","AC24.02","AC24.06","AC23.03"],
    "inflation-dataviz": ["AC21.03","AC23.06","AC23.04"],
    "crossy-road-ux-powerups": ["AC21.01","AC21.05","AC22.02"],
    "weather-app-design": ["AC22.01","AC22.02","AC23.05"],
    "scrum-learning-platform": ["AC25.01","AC22.01","AC23.04"],
    "logo-jingle-animation": ["AC23.03","AC23.05","AC23.06"],
    "website-competitive-audit": ["AC21.01","AC21.02","AC22.04"],
    "communication-plan-project": ["AC21.01","AC22.03","AC22.05","AC25.05"],
    "mmi-30-years-communication": ["AC23.01","AC23.04","AC23.05"],
    "personal-portfolio": ["AC24.01","AC24.06","AC15.05","AC23.03","AC23.05"],

    # BUT 1
    "mmi-decouvertes": ["AC14.01","AC14.02","AC14.03","AC14.04"],
    "1ris-agency-website": ["AC14.01","AC14.02","AC14.04","AC14.05","AC23.03"],
    "porquerolles-digital-watch": ["AC12.01","AC12.02","AC12.04","AC11.05"],
    "merry-cashmas-reportage": ["AC13.01","AC13.03","AC13.04","AC13.06"],
    "virtual-travel-chair": ["AC12.01","AC12.02","AC12.03","AC12.04","AC15.02"],
}

# ─── 6. Patch existing projects: add `acs`, `year`, filter butSkills, fix categories ───
for p in data:
    slug = p["slug"]
    p["year"] = YEAR.get(slug, "BUT3")
    p["acs"] = EXISTING_AC.get(slug, [])
    p["butSkills"] = filter_skills_for_year(slug, p.get("butSkills", []))

# ─── 7. Enrichissement de la trace ALTERNANCE (volet merch No Finish Line) ─────
for p in data:
    if p["slug"] == "alternance":
        # ajout au selfEvaluation et features
        extra_fr = (
            "\n\nEn parallèle de la chaîne contenu/SEO, j'ai aussi piloté un volet "
            "communication interne et externe plus humain. J'ai monté l'organisation "
            "de la participation Weproc à la No Finish Line Nice — recrutement de "
            "l'équipe interne (les sportifs de la team), démarche, post LinkedIn de "
            "fin d'événement plus incarné que d'habitude. Dans la foulée, j'ai aussi "
            "pris en main la conception d'une ligne de merch (t-shirts de sport pour "
            "la course + t-shirts coton qualité pour le bureau) : design, démarchage "
            "et comparaison de plusieurs imprimeurs, propositions chiffrées à Steven, "
            "adaptation au budget. Toute la communication LinkedIn passe aussi par moi "
            "(rédaction, planning éditorial, visuels Figma)."
        )
        extra_en = (
            "\n\nAlongside the SEO/content track I also ran a softer internal-and-external "
            "communication leg. I organised Weproc's participation in the Nice No Finish "
            "Line race — assembling the runners, on-the-day logistics, post-event LinkedIn "
            "piece (a more human-toned story than usual). In parallel I led a merch line "
            "(sports tees for the race + thicker cotton tees for the office): visual design, "
            "shortlisting printers, costed proposals to Steven, budget arbitration. LinkedIn "
            "editorial overall goes through me too — copy, schedule, Figma visuals."
        )
        p["fr"]["selfEvaluation"] = p["fr"].get("selfEvaluation", "") + extra_fr
        p["en"]["selfEvaluation"] = p["en"].get("selfEvaluation", "") + extra_en
        # Add features
        new_features_fr = [
            "Organisation de la participation Weproc à la No Finish Line Nice 2025 (équipe interne, communication, post LinkedIn humain)",
            "Conception d'une ligne de merch (t-shirts sport + coton qualité bureau) : design Figma, démarchage imprimeurs, propositions budgétaires",
            "Pilotage éditorial LinkedIn (rédaction posts, calendrier, visuels Figma)",
        ]
        new_features_en = [
            "Organised Weproc's participation in the Nice No Finish Line 2025 race (internal team, communications, human-toned LinkedIn post)",
            "Designed a merch line (sports tees + premium cotton office tees): Figma design, printer outreach, budget proposals",
            "LinkedIn editorial ownership (copywriting, schedule, Figma visuals)",
        ]
        p["fr"]["features"] = p["fr"].get("features", []) + new_features_fr
        p["en"]["features"] = p["en"].get("features", []) + new_features_en

# ─── 8. Enrichissement de VISIO-CONFERENCE-APP ────────────────────────────────
for p in data:
    if p["slug"] == "visio-conference-app":
        p["fr"]["liveUrl"] = "http://visioconf.xyz/"
        p["en"]["liveUrl"] = "http://visioconf.xyz/"
        spec_fr = (
            "\n\nUn pan déterminant de cette SAÉ — et plus largement de mon BUT3 — "
            "a été la rédaction de spécifications. Avant chaque morceau de code, je "
            "rédigeais des specs : classes, attributs, méthodes, interactions entre "
            "composants, conditions de réussite. La règle du jeu : si une IA pouvait "
            "implémenter le composant en partant de mes specs sans poser de question, "
            "c'est que les specs étaient bonnes ; sinon, c'est qu'il manquait quelque "
            "chose. Cette discipline (appliquée aussi à des mini-projets type bataille "
            "navale, jeu de course) a structuré ma manière d'aborder le code."
        )
        spec_en = (
            "\n\nA decisive part of this project — and of my BUT3 year in general — "
            "was specification writing. Before any piece of code I'd write specs: "
            "classes, attributes, methods, interactions between components, success "
            "criteria. The rule was: if an AI could implement the component from my "
            "specs without asking a question, the specs were good; otherwise, something "
            "was missing. This discipline (also applied to side-projects like battleship "
            "or a car-race game) structured the way I approach code from now on."
        )
        p["fr"]["selfEvaluation"] = p["fr"].get("selfEvaluation", "") + spec_fr
        p["en"]["selfEvaluation"] = p["en"].get("selfEvaluation", "") + spec_en

# ─── 9. AJOUT DES NOUVELLES TRACES ─────────────────────────────────────────────

# AURORA SOLA — hackathon programme spatial
aurora = {
    "slug": "aurora-sola",
    "year": "BUT3",
    "color": "#7B638A",
    "categories": ["web", "visuels", "professional"],
    "butSkills": ["développer", "entreprendre"],
    "acs": ["AC34.01","AC34.04","AC34.05","AC35.01","AC35.04","AC23.04","AC25.04"],
    "fr": {
        "title": "Hackathon AURORA — Cellule SOLA",
        "shortDescription": "Site narratif sci-fi pour le programme spatial Aurora, équipe de 3, sprint hackathon avec multiples livrables (site, vidéos, visuels, rédaction).",
        "context": (
            "AURORA est un hackathon MMI 2026 organisé en équipe de 3, sur un format "
            "intense de sprint. Le brief : produire l'écosystème de communication d'une "
            "cellule fictive d'un programme spatial appelée SOLA, en lien avec une mission "
            "narrative (CONTACT-A, incidents EVT02-B / EVT09-D, message de la Terre). "
            "Au-delà du site, il fallait livrer un dossier complet : vidéos, supports visuels, "
            "narration, archives, identité graphique cohérente (DA « SOLA » : palette lavande, "
            "marine, doré ; typographies Cinzel + Montserrat)."
        ),
        "role": (
            "Je me suis chargée principalement du développement (site GitHub Pages, "
            "architecture HTML/CSS/JS modulaire, intégration responsive, scrollspy, "
            "navigation mobile, accessibilité, mini-jeu interactif « Le Message de la "
            "Terre ») et de tous les rendus support rédactionnels (archives, dossiers "
            "narratifs, vocabulaire). L'une des coéquipières a porté les visuels demandés, "
            "l'autre s'est chargé des vidéos. Chacun·e s'est aussi entraîné·e sur les "
            "missions des autres pour permettre l'avancée parallèle."
        ),
        "selfEvaluation": (
            "C'est sans doute la trace la plus représentative de ma capacité à "
            "fonctionner sous contrainte de temps et avec une équipe pluri-profils. "
            "Le format hackathon m'a obligée à faire des choix d'architecture rapides, "
            "à concevoir des composants logiciels réutilisables et à arbitrer entre "
            "ambition narrative et faisabilité. Avec le recul, le mini-jeu et la "
            "navigation mobile sont les morceaux dont je suis la plus fière côté code ; "
            "côté coordination, le découpage clair par profil dès le départ et le fait "
            "qu'on ait monté un vocabulaire partagé propre à la mission ont énormément "
            "aidé. Une trace utile aussi pour défendre la dimension « entreprendre » : "
            "piloter une équipe sur un délai contraint, c'est ça aussi."
        ),
        "technologies": ["HTML5","CSS3","JavaScript","GitHub Pages","Figma"],
        "features": [
            "Architecture HTML/CSS/JS modulaire déployée sur GitHub Pages",
            "Design system « DA SOLA » (palette lavande/marine/doré, typographies Cinzel + Montserrat)",
            "Page « Le Message de la Terre » : mini-jeu interactif (puzzle narratif mission CONTACT-A)",
            "Sections narratives évolutives : journal d'incident EVT02-B, découverte EVT09-D, archives",
            "Navigation mobile complète, scrollspy, accessibilité (focus visibles, ARIA)",
            "Production des supports rédactionnels du dossier (archives, vocabulaire mission)",
        ],
        "liveUrl": "https://rahnya.github.io/aurora-sola/",
        "githubUrl": "https://github.com/rahnya/aurora-sola",
        "screenshots": [],
    },
    "en": {
        "title": "AURORA Hackathon — SOLA Cell",
        "shortDescription": "Sci-fi narrative site for the fictional Aurora space programme, team of 3, hackathon sprint with multiple deliverables (site, videos, visuals, writing).",
        "context": (
            "AURORA is a 2026 MMI hackathon organised in teams of 3, in an intense "
            "sprint format. Brief: produce the full communication ecosystem of a "
            "fictional cell inside a space programme called SOLA, tied to a narrative "
            "mission (CONTACT-A, incidents EVT02-B / EVT09-D, the Message of the Earth). "
            "Beyond the website we had to ship a full dossier: videos, visual supports, "
            "narrative writing, archives, and a coherent visual identity (\"SOLA\" art "
            "direction: lavender/navy/gold palette, Cinzel + Montserrat typography)."
        ),
        "role": (
            "I took the development lead (GitHub Pages site, modular HTML/CSS/JS "
            "architecture, responsive integration, scrollspy, mobile nav, accessibility, "
            "interactive \"Message of the Earth\" mini-game) and ownership of all "
            "writing-based deliverables (archives, narrative dossiers, vocabulary). "
            "One teammate took the visuals lead, the other took the videos. Everyone "
            "trained on the others' areas to keep the project moving in parallel."
        ),
        "selfEvaluation": (
            "Probably the most representative trace of my ability to deliver under "
            "time pressure with a multi-profile team. The hackathon format forced fast "
            "architecture choices, reusable component design, and constant arbitration "
            "between narrative ambition and feasibility. Looking back, the mini-game and "
            "the mobile navigation are the parts I'm proudest of on the code side; on "
            "coordination, the clear role split from day one and the shared mission-specific "
            "vocabulary we built made everything easier. Also a useful trace for the "
            "entrepreneurship side: leading a team against a tight deadline counts."
        ),
        "technologies": ["HTML5","CSS3","JavaScript","GitHub Pages","Figma"],
        "features": [
            "Modular HTML/CSS/JS architecture deployed on GitHub Pages",
            "\"SOLA\" design system (lavender/navy/gold palette, Cinzel + Montserrat type)",
            "\"Message of the Earth\" page: interactive puzzle mini-game (CONTACT-A mission)",
            "Evolving narrative sections: incident log EVT02-B, EVT09-D discovery, archives",
            "Full mobile nav, scrollspy, accessibility (focus rings, ARIA)",
            "Wrote all dossier deliverables (archives, mission vocabulary)",
        ],
        "liveUrl": "https://rahnya.github.io/aurora-sola/",
        "githubUrl": "https://github.com/rahnya/aurora-sola",
        "screenshots": [],
    },
}

# MAGICIEN ESCAPE — VR
magicien = {
    "slug": "magicien-escape",
    "year": "BUT3",
    "color": "#C9A9DC",
    "categories": ["ar-vr-3d", "school"],
    "butSkills": ["développer"],
    "acs": ["AC34.03","AC34.04","AC22.01","AC22.02"],
    "fr": {
        "title": "Magicien Escape — projet VR",
        "shortDescription": "Mini escape game en réalité virtuelle conçu en équipe en BUT3 : interactions immersives et énigmes scénarisées.",
        "context": (
            "Dans le module Dispositifs interactifs du BUT3, nous avons conçu un escape "
            "game en VR sur le thème du magicien. L'objectif pédagogique : sortir des "
            "interfaces 2D classiques pour penser des interactions spatiales — gestes, "
            "déplacement dans la pièce, manipulation d'objets virtuels, déclencheurs."
        ),
        "role": (
            "J'ai participé à la conception du scénario d'énigmes et au développement "
            "des interactions VR (déclencheurs, déplacement, manipulation d'objets). "
            "Travail sur les boucles d'usage et les tests itératifs pour ajuster la "
            "difficulté et la lisibilité des indices dans l'espace 3D."
        ),
        "selfEvaluation": (
            "Cette trace m'a permis de découvrir la conception en environnement "
            "immersif : les règles UX classiques ne suffisent pas, il faut penser "
            "feedback haptique, signalisation visuelle volumétrique, fatigue oculaire. "
            "Avec le recul, j'aurais creusé davantage les playtests externes pour "
            "ajuster le rythme, et je pousserais la lisibilité des indices."
        ),
        "technologies": ["Unity","C#","Meta Quest","Blender"],
        "features": [
            "Scénario d'escape avec 3 énigmes physiques en VR",
            "Système de déclencheurs et de manipulation d'objets",
            "Tests utilisateurs itératifs pour ajuster la difficulté",
        ],
        "screenshots": [],
    },
    "en": {
        "title": "Magicien Escape — VR project",
        "shortDescription": "VR escape game built as a team in BUT3: immersive interactions and scripted puzzles.",
        "context": (
            "In the BUT3 Interactive Devices module, we built a magician-themed VR "
            "escape game. Pedagogical goal: step out of classic 2D interfaces and "
            "design spatial interactions — gestures, room-scale movement, virtual "
            "object manipulation, triggers."
        ),
        "role": (
            "I took part in the puzzle scenario design and VR interaction development "
            "(triggers, locomotion, object manipulation). Iterative testing to adjust "
            "difficulty and how readable hints felt in 3D space."
        ),
        "selfEvaluation": (
            "This trace got me into immersive-environment design: classic UX rules "
            "aren't enough — you have to think about haptic feedback, volumetric "
            "wayfinding, eye fatigue. Looking back, I'd run more external playtests "
            "to tune pacing, and push the hint readability further."
        ),
        "technologies": ["Unity","C#","Meta Quest","Blender"],
        "features": [
            "Escape scenario with 3 in-VR physical puzzles",
            "Trigger and object-manipulation system",
            "Iterative user testing to balance difficulty",
        ],
        "screenshots": [],
    },
}

# BABYLON AIRPORT GAME
babylon = {
    "slug": "babylon-airport-game",
    "year": "BUT3",
    "color": "#FF8A65",
    "categories": ["ar-vr-3d", "school"],
    "butSkills": ["développer"],
    "acs": ["AC34.03","AC34.04","AC22.01"],
    "fr": {
        "title": "Mini-jeu d'atterrissage Babylon.js",
        "shortDescription": "Petit dispositif interactif 3D : autoriser les avions à atterrir dans le bon ordre pour éviter les crashs.",
        "context": (
            "Découverte de Babylon.js en BUT3 sur un TP étalé sur quelques séances. "
            "L'objectif : produire un mini-jeu 3D fonctionnel répondant à un cahier "
            "des attendus précis (modélisation, contrôles, conditions de victoire / "
            "défaite). On a choisi un scénario aéroportuaire : le joueur dispose de "
            "boutons pour autoriser ou non l'atterrissage des avions ; si l'ordre est "
            "mauvais, deux appareils peuvent se croiser et se crasher en approche ou "
            "sur la piste."
        ),
        "role": (
            "Conception du gameplay (séquence d'apparition des appareils, fenêtres "
            "d'atterrissage, état de la piste), modélisation simple, intégration des "
            "contrôles et logique de collision/erreur."
        ),
        "selfEvaluation": (
            "Première vraie prise en main d'un moteur 3D web. Le plus instructif "
            "n'a pas été l'API Babylon en soi, mais l'écriture des règles : il a "
            "fallu spécifier précisément l'état de chaque appareil et les transitions "
            "possibles, sans quoi le jeu devenait soit injouable soit trivial. Trace "
            "utile pour montrer comment je passe du brief au gameplay."
        ),
        "technologies": ["Babylon.js","JavaScript","HTML5","Blender"],
        "features": [
            "Plusieurs avions en approche simultanée avec fenêtres d'atterrissage",
            "Boutons d'autorisation par appareil",
            "Conditions de crash (mauvais ordre, piste occupée, collision en roulage)",
        ],
        "screenshots": [],
    },
    "en": {
        "title": "Babylon.js airport mini-game",
        "shortDescription": "Small 3D interactive piece: clear planes to land in the right order to avoid crashes.",
        "context": (
            "First contact with Babylon.js in BUT3 over a few-session TP. Goal: ship "
            "a working 3D mini-game meeting a clear brief (modeling, controls, win/lose "
            "conditions). We picked an airport scenario: the player has buttons to "
            "allow planes to land or not; with the wrong ordering, two aircraft can "
            "cross paths and crash either in approach or while taxiing."
        ),
        "role": (
            "Gameplay design (plane spawn cadence, landing windows, runway state), "
            "lightweight modeling, controls integration and collision/error logic."
        ),
        "selfEvaluation": (
            "First proper hands-on with a web 3D engine. The big learning wasn't the "
            "Babylon API itself but writing the rules: each aircraft state and its "
            "valid transitions had to be spelled out, otherwise the game went unplayable "
            "or trivial. Useful to show how I go from a brief to actual gameplay."
        ),
        "technologies": ["Babylon.js","JavaScript","HTML5","Blender"],
        "features": [
            "Several planes inbound simultaneously with landing windows",
            "Per-aircraft authorisation buttons",
            "Crash conditions (wrong order, occupied runway, taxiing collision)",
        ],
        "screenshots": [],
    },
}

# SNOOZLY BUSINESS PLAN — projet scolaire Entrepreneuriat
snoozly_bp = {
    "slug": "snoozly-business-plan",
    "year": "BUT3",
    "color": "#FF96B3",
    "categories": ["visuels", "school"],
    "butSkills": ["entreprendre"],
    "acs": ["AC35.01","AC35.03","AC15.02","AC15.04"],
    "fr": {
        "title": "Business plan Snoozly — cours Entrepreneuriat",
        "shortDescription": "Production d'un business plan complet dans le cadre du module Entrepreneuriat BUT3 : nous avons choisi de l'appliquer à Snoozly.",
        "context": (
            "Dans le cours d'Entrepreneuriat du semestre 5, l'attendu était de produire "
            "un business plan complet pour une activité/entreprise au choix. En trio, "
            "nous avons choisi d'utiliser Snoozly comme support pédagogique — c'était "
            "pratique pour moi vu mon projet Pépite, mais le travail rendu ici est "
            "strictement un livrable scolaire, distinct du dossier Pépitizy réel. "
            "Certains chiffres sont volontairement projectifs et ont depuis été affinés "
            "côté projet réel."
        ),
        "role": (
            "Je m'étais déjà occupée de la définition du concept, de l'identification "
            "de la cible et de l'analyse de marché. Sur ce cours, j'ai surtout contribué "
            "à la construction du business model et à la rédaction du business plan "
            "lui-même : proposition de valeur, stratégie de développement, projections "
            "financières."
        ),
        "selfEvaluation": (
            "Ce projet m'a fait gagner une vision plus globale des projets numériques, "
            "au-delà de la pure technique : structurer une idée, réfléchir à sa "
            "viabilité, articuler proposition de valeur et stratégie. Par rapport aux "
            "projets de BUT2, j'ai bien plus pris en compte les enjeux économiques. "
            "Avec le recul, j'aurais approfondi l'étude de marché et l'analyse "
            "concurrentielle pour gagner en crédibilité — ce que je fais désormais sur "
            "le projet Pépite réel. Trace utile car elle marque clairement la frontière "
            "« exercice scolaire » vs « projet entrepreneurial vivant »."
        ),
        "technologies": ["Notion","Canva","Google Docs"],
        "features": [
            "Business plan complet (proposition de valeur, marché, stratégie, finances)",
            "Modèle économique projeté (LLD + tarif solidaire campus)",
            "Analyse cibles et personae",
            "Premières projections chiffrées (depuis affinées hors cours)",
        ],
        "screenshots": [],
    },
    "en": {
        "title": "Snoozly business plan — Entrepreneurship class",
        "shortDescription": "Full business plan produced for the BUT3 Entrepreneurship module: we chose Snoozly as the case.",
        "context": (
            "In the semester-5 Entrepreneurship class, the assignment was to write a "
            "full business plan for any business of our choice. In a trio we picked "
            "Snoozly as the case — convenient for me given my own Pépite project, but "
            "the deliverable here is strictly a school output, distinct from the real "
            "Pépitizy application. Some numbers are intentionally projected and have "
            "since been refined on the real project."
        ),
        "role": (
            "I had already handled concept definition, target identification and "
            "market analysis. On this class I mostly contributed to building the "
            "business model and writing the business plan itself: value proposition, "
            "growth strategy, financial projections."
        ),
        "selfEvaluation": (
            "Gave me a broader view of digital projects beyond pure technical work: "
            "structuring an idea, thinking about viability, articulating value "
            "proposition vs strategy. Compared to BUT2 projects I weighed economics "
            "much more. Looking back, I would have pushed the market study and "
            "competitive analysis further for credibility — which I now do on the real "
            "Pépite track. Useful trace because it clearly draws the line between "
            "\"school exercise\" and \"live entrepreneurial project\"."
        ),
        "technologies": ["Notion","Canva","Google Docs"],
        "features": [
            "Full business plan (value, market, strategy, financials)",
            "Projected economic model (long-term lease + solidarity campus rate)",
            "Target and persona analysis",
            "First financial projections (since refined outside the class)",
        ],
        "screenshots": [],
    },
}

# SNOOZLY MAQUETTES (pro)
snoozly_mq = {
    "slug": "snoozly-maquettes",
    "year": "BUT3",
    "color": "#FF96B3",
    "categories": ["uxui", "visuels", "professional", "entrepreneurship"],
    "butSkills": ["entreprendre"],
    "acs": ["AC22.01","AC22.02","AC23.03","AC15.05"],
    "fr": {
        "title": "Maquettes Snoozly — design produit",
        "shortDescription": "Conception des maquettes de l'application Snoozly, accélérées pour un entretien d'admission en master CODUX (Limoges).",
        "context": (
            "Volet design produit du projet Snoozly. Les maquettes ont d'abord été "
            "esquissées dans le cadre de la définition du produit, puis accélérées "
            "et présentées finalisées pour un entretien d'admission en master CODUX "
            "à Limoges. C'est un effort qui appartient à ma pratique freelance / "
            "entrepreneuriale plutôt qu'à l'académique."
        ),
        "role": (
            "Direction artistique, conception UX (trois personas : urgence / découverte / "
            "rituel ; règle des « deux tapotements pour réserver »), wireframes, "
            "maquettes haute fidélité Figma, design système (palette, typographies, "
            "composants, états)."
        ),
        "selfEvaluation": (
            "Trace forte sur la facette UX/UI : c'est en formalisant les maquettes "
            "que beaucoup des choix produit Snoozly se sont arrêtés (parcours "
            "rapide, hiérarchie d'écran, personnalisation d'ambiance). L'usage "
            "secondaire — support d'entretien CODUX — a accéléré le travail et "
            "obligé à raconter le projet visuellement en quelques écrans, exercice "
            "très formateur. Liée à la trace dev de l'app et au projet Pépite."
        ),
        "technologies": ["Figma","FigJam","Notion"],
        "features": [
            "Trois personas produits Snoozly (Sofia, Théo, Camille) avec parcours dédiés",
            "Wireframes basse-fidélité puis maquettes haute-fidélité Figma",
            "Design system minimal (palette, typo, composants, états)",
            "Storyboard d'entretien CODUX synthétisant le projet en quelques écrans clés",
        ],
        "screenshots": [],
    },
    "en": {
        "title": "Snoozly mockups — product design",
        "shortDescription": "Snoozly app mockups, accelerated for a master CODUX (Limoges) admission interview.",
        "context": (
            "Product-design side of the Snoozly project. The mockups first emerged "
            "during product definition and were then accelerated and presented "
            "finalised for a CODUX master admission interview in Limoges. This effort "
            "belongs to my freelance/entrepreneurial practice rather than the academic "
            "track."
        ),
        "role": (
            "Art direction, UX design (three personas: urgent / discovery / ritual; "
            "the \"two taps to book\" rule), wireframes, high-fidelity Figma mockups, "
            "design system (palette, typography, components, states)."
        ),
        "selfEvaluation": (
            "Strong trace on the UX/UI side: many Snoozly product choices were locked "
            "in by formalising the mockups (fast paths, screen hierarchy, ambiance "
            "personalisation). The secondary use — CODUX interview support — sped up "
            "the work and forced me to tell the project visually in a few screens, "
            "which was very formative. Connected to the app-dev trace and the Pépite "
            "project page."
        ),
        "technologies": ["Figma","FigJam","Notion"],
        "features": [
            "Three Snoozly product personas (Sofia, Théo, Camille) with dedicated flows",
            "Low-fi wireframes then high-fi Figma mockups",
            "Minimal design system (palette, type, components, states)",
            "CODUX interview storyboard distilling the project into a few key screens",
        ],
        "screenshots": [],
    },
}

# SNOOZLY APP DEV
snoozly_app = {
    "slug": "snoozly-app-dev",
    "year": "BUT3",
    "color": "#FF96B3",
    "categories": ["web", "professional", "entrepreneurship"],
    "butSkills": ["développer", "entreprendre"],
    "acs": ["AC34.01","AC34.02","AC34.04","AC34.05","AC35.01"],
    "fr": {
        "title": "Développement de l'application Snoozly",
        "shortDescription": "App mobile React Native / Expo + backend Node.js / MongoDB pour la réservation, l'accès et la personnalisation des capsules Snoozly. MVP V1 en local fonctionnel.",
        "context": (
            "Volet développement du projet Snoozly. L'objectif : avoir un MVP "
            "fonctionnel — réservation, authentification, accès via QR code, "
            "personnalisation d'ambiance — pour démontrer le concept à des pilotes "
            "potentiels (entreprises, campus, mutuelles). Lié au projet Pépite et "
            "aux maquettes Snoozly (voir traces correspondantes)."
        ),
        "role": (
            "Architecture full-stack : application mobile React Native / Expo côté "
            "client, backend Node.js / Express / MongoDB côté serveur. Travail sur "
            "l'authentification, la persistance, le flux de réservation, "
            "l'environnement de développement local, le debug (connexion MongoDB, "
            "index dupliqués, bundling Expo web)."
        ),
        "selfEvaluation": (
            "C'est la trace dev la plus complète de mon BUT3, parce qu'elle traverse "
            "les cinq AC du bloc Développer (front, back, dispositif interactif "
            "mobile, composants modulaires, déploiement local). Elle complète bien "
            "l'alternance et la visioconférence : ici, c'est *mon* code de bout en "
            "bout, *mon* archi, *mon* projet. Avec le recul, ce qui m'a le plus fait "
            "progresser c'est la résolution de bugs d'environnement, pas le code "
            "métier — les heures perdues à débuguer MongoDB ou Expo m'ont appris "
            "autant que les features."
        ),
        "technologies": ["React Native","Expo","Node.js","Express","MongoDB","Mongoose","JWT"],
        "features": [
            "App mobile React Native / Expo : auth, réservation, personnalisation",
            "Backend Node.js / Express : routes REST, validation, JWT",
            "Persistance MongoDB / Mongoose : modèles utilisateur, capsule, session",
            "Flux de réservation complet (création, accès QR code, fin de session)",
            "Environnement de développement local stable (debug bundling web Expo, index Mongo)",
        ],
        "screenshots": [],
    },
    "en": {
        "title": "Snoozly app development",
        "shortDescription": "Mobile app (React Native / Expo) + Node.js / MongoDB backend for capsule booking, access and ambiance personalisation. Working local MVP V1.",
        "context": (
            "Development side of Snoozly. Goal: a working MVP — booking, auth, QR-code "
            "access, ambiance personalisation — to demo the concept to potential "
            "pilots (companies, campuses, mutuals). Connected to the Pépite project "
            "and the Snoozly mockups (see related traces)."
        ),
        "role": (
            "Full-stack architecture: React Native / Expo on the client side, "
            "Node.js / Express / MongoDB on the server side. Authentication, "
            "persistence, booking flow, local dev environment, debugging (Mongo "
            "connection, duplicate indexes, Expo web bundling)."
        ),
        "selfEvaluation": (
            "The most complete dev trace of my BUT3 because it spans the five AC of "
            "the Develop block (front, back, mobile interactive device, modular "
            "components, deployment). Nicely complements the apprenticeship and the "
            "videoconf project: here it's *my* code end to end, *my* architecture, "
            "*my* project. Looking back, what taught me the most wasn't the feature "
            "code but the environment debugging — the hours lost to MongoDB and Expo "
            "issues taught me as much as the features did."
        ),
        "technologies": ["React Native","Expo","Node.js","Express","MongoDB","Mongoose","JWT"],
        "features": [
            "React Native / Expo mobile app: auth, booking, personalisation",
            "Node.js / Express backend: REST routes, validation, JWT",
            "MongoDB / Mongoose persistence: user, capsule and session models",
            "Full booking flow (create, QR-code access, end of session)",
            "Stable local dev environment (Expo web bundling and Mongo index fixes)",
        ],
        "screenshots": [],
    },
}

# Mark conception as a "specs writing" trace
for p in data:
    if p["slug"] == "conception":
        p["fr"]["title"] = "Rédaction de spécifications techniques"
        p["en"]["title"] = "Technical specifications writing"
        p["fr"]["shortDescription"] = (
            "Pratique transversale du BUT3 : écrire les spécifications (classes, méthodes, "
            "interactions) avant tout code — bataille navale, course de voitures, projets mini-jeux."
        )
        p["en"]["shortDescription"] = (
            "Cross-cutting BUT3 practice: writing specifications (classes, methods, interactions) "
            "before any code — battleship, car race, mini-game projects."
        )
        p["fr"]["context"] = (
            "Au-delà du gros projet visioconférence, le BUT3 a beaucoup tourné autour "
            "de la rédaction de spécifications avant développement. Sur plusieurs "
            "mini-projets (bataille navale, jeu de course de voitures, autres mini-jeux), "
            "la consigne tournait toujours autour du même principe : écrire des specs "
            "suffisamment précises pour que quelqu'un (ou une IA) puisse implémenter le "
            "projet sans poser de questions. Si l'implémentation ne tenait pas, les specs "
            "n'étaient pas bonnes."
        )
        p["en"]["context"] = (
            "Beyond the videoconf SAE, much of BUT3 was about writing specifications "
            "before any code. Across several mini-projects (battleship, car race, "
            "various mini-games), the rule was always the same: write specs precise "
            "enough that someone — or an AI — could implement the project without "
            "asking questions. If the implementation didn't hold up, the specs weren't "
            "good."
        )
        p["fr"]["role"] = (
            "Sur chaque projet : identification des entités du système, attributs et "
            "méthodes, interactions entre composants, conditions de réussite, cas "
            "limites. Formalisation parfois par diagrammes simples, parfois en prose "
            "structurée."
        )
        p["en"]["role"] = (
            "On each project: identifying system entities, attributes and methods, "
            "component interactions, success criteria, edge cases. Sometimes formalised "
            "as simple diagrams, sometimes as structured prose."
        )
        p["fr"]["selfEvaluation"] = (
            "Cette discipline a transformé ma manière d'aborder le code. Avant, je "
            "codais et j'ajustais ; maintenant, j'écris d'abord, je vérifie que mon écrit "
            "tient debout, et seulement après j'implémente. C'est aussi ce qui a rendu la "
            "collaboration avec l'IA réellement utile : une bonne spec = un bon prompt. "
            "Avec le recul, je pourrais aller plus loin avec des diagrammes UML formels "
            "et une documentation plus structurée."
        )
        p["en"]["selfEvaluation"] = (
            "This discipline changed the way I approach code. Before, I'd code and "
            "adjust; now I write first, check that the writing holds up, and only then "
            "implement. It's also what made working with AI genuinely useful: a good "
            "spec = a good prompt. Looking back, I could push further with formal UML "
            "diagrams and more structured documentation."
        )
        p["fr"]["technologies"] = p["fr"].get("technologies") or ["Notion","Mermaid","Markdown"]
        p["en"]["technologies"] = p["en"].get("technologies") or ["Notion","Mermaid","Markdown"]

# ─── 10. Insert new traces in order ─────────────────────────────────────────────
new_traces = [snoozly_app, snoozly_mq, snoozly_bp, aurora, magicien, babylon]

# Insert them at the top of the list to be visible
existing_slugs = {p["slug"] for p in data}
for nt in new_traces:
    if nt["slug"] not in existing_slugs:
        data.insert(0, nt)
        existing_slugs.add(nt["slug"])

# ─── 11. Save ─────────────────────────────────────────────────────────────────
with open(DATA, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# Also export the AC library for cross-referencing
AC_OUT = ROOT / "data" / "ac-library.json"
with open(AC_OUT, "w", encoding="utf-8") as f:
    json.dump(AC_LIB, f, ensure_ascii=False, indent=2)

print(f"Total projets après mise à jour : {len(data)}")
print(f"AC catalogués : {len(AC_LIB)}")
print()
# Coverage check
all_ac_used = set()
for p in data:
    for ac in p.get("acs", []):
        all_ac_used.add(ac)
all_ac_defined = set(AC_LIB.keys())
missing_in_traces = all_ac_defined - all_ac_used
print(f"AC référencés dans au moins une trace : {len(all_ac_used)} / {len(all_ac_defined)}")
if missing_in_traces:
    print(f"AC non couverts par une trace pour l'instant :")
    for ac in sorted(missing_in_traces):
        print(f"  {ac} : {AC_LIB[ac]}")
