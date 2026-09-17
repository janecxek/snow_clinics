/* ==========================================================================
   Snow Clinics — language switching (EN ⇄ DE)
   English lives in the markup, so the page is correct with JS disabled and
   for any crawler that does not execute scripts. German is applied here.
   ========================================================================== */
(function () {
  'use strict';

  var DE = {
    'meta.title': 'Snow Clinics — Ästhetische Medizin in Zürich, Konstanz, Paris & Marbella',
    'meta.description': 'Ärztlich geführte ästhetische Medizin von Dr. Snow. Botulinumtoxin, Lippenkonturierung, Vektorlifting, Mesotherapie und Skinbooster in Zürich, Konstanz, Paris und Marbella. Zurückhaltende Dosierung, natürliche Resultate.',
    'meta.ogTitle': 'Snow Clinics — Ästhetische Medizin',

    'a11y.skip': 'Zum Inhalt springen',
    'a11y.menu': 'Menü öffnen',
    'a11y.prev': 'Vorherige Bewertung',
    'a11y.next': 'Nächste Bewertung',
    'a11y.reviews': 'Bewertungen von Patientinnen und Patienten',
    'a11y.topics': 'Themen der Fragen',
    'a11y.dock': 'Schnellzugriff',
    'a11y.top': 'Nach oben',

    'brand.tag': 'Ästhetische Medizin',
    'nav.treatments': 'Behandlungen',
    'nav.why': 'Warum wir',
    'nav.physician': 'Dr. Snow',
    'nav.clinics': 'Standorte',
    'nav.faq': 'Fragen',

    'cta.book': 'Beratung vereinbaren',
    'cta.whatsapp': 'Über WhatsApp buchen',
    'cta.instagram': 'Auf Instagram schreiben',
    'cta.treatments': 'Behandlungen ansehen',
    'cta.ask': 'Dazu fragen',
    'cta.bookWith': 'Termin bei Dr. Snow',
    'dock.call': 'Anrufen',

    'hero.eyebrow': 'Ästhetische Medizin<span class="hero__cities"> · Zürich · Konstanz · Paris · Marbella</span>',
    'hero.h1': 'Natürliche Resultate sind der ganze Punkt.',
    'hero.lede': 'Ärztlich geführte Behandlungen, zurückhaltend dosiert und nach zwei Wochen kontrolliert. Eine Ärztin führt jede einzelne davon durch.',
    'hero.badge': 'Antwort meist innerhalb weniger Stunden',

    'treatments.eyebrow': 'Behandlungen',
    'treatments.h': 'Beginnen Sie bei dem, was Sie stört.',
    'treatments.lede': 'Vier Bereiche. Öffnen Sie einen und Sie sehen nur, was dazugehört.',
    'slab.note': 'Die Kosten stehen nach der Beratung in Ihrem schriftlichen Plan.',

    'area.lines.n': 'Mimikfalten',
    'area.lines.d': 'Zornesfalte, Krähenfüsse und eine Braue, die schwer geworden ist.',
    'fit.lines.1': 'Linien, die bleiben, wenn mein Gesicht entspannt ist',
    'fit.lines.2': 'Ich wirke auf Fotos müde',
    'area.contour.n': 'Volumen & Kontur',
    'area.contour.d': 'Lippen, Wangen, Kieferlinie und abgesunkenes Gewebe.',
    'fit.contour.1': 'Meine Lippen haben ihre Kontur verloren',
    'fit.contour.2': 'Meine Kieferlinie ist weicher geworden',
    'area.skin.n': 'Hautqualität',
    'area.skin.d': 'Textur, Fahlheit, Pigmentierung und beginnende Erschlaffung.',
    'fit.skin.1': 'Meine Haut wirkt auf Fotos flach',
    'fit.skin.2': 'Make-up überdeckt es, korrigiert aber nichts',
    'area.body.n': 'Körper & Haar',
    'area.body.d': 'Lokale Konturierung und nachlassende Dichte.',
    'fit.body.1': 'Areale, die Diät und Training nicht erreichen',
    'fit.body.2': 'Mehr sichtbare Kopfhaut als vor einem Jahr',

    'p.botox.n': 'Botulinumtoxin',
    'p.botox.d': 'Mildert die Linien, die Ihre Mimik hinterlässt — während die Mimik Ihre bleibt.',
    'p.botox.t': '15 Min. · hält 3–4 Monate',
    'p.men.n': 'Protokolle für Männer',
    'p.men.d': 'Männliche Brauen und Kieferpartien brauchen andere Dosierung und Platzierung. Bewusst diskret.',
    'p.men.t': '20–45 Min. · hält 6–12 Monate',
    'p.lips.n': 'Lippenkonturierung',
    'p.lips.d': 'Form, Kontur und Feuchtigkeit über zwei bis drei Sitzungen aufgebaut statt in einer.',
    'p.lips.t': '30 Min. · hält 6–12 Monate',
    'p.threads.n': 'Vektorlifting',
    'p.threads.d': 'Resorbierbare Fäden entlang der Vektoren, die das Gesicht genommen hat. Reponiert, statt Volumen zu ergänzen.',
    'p.threads.t': '45–60 Min. · hält 12–18 Monate',
    'p.meso.n': 'Mesotherapie',
    'p.meso.d': 'Mikroinjektionen mit Hyaluronsäure, Vitaminen und Aminosäuren dicht unter der Oberfläche.',
    'p.meso.t': '30 Min. · Kur mit 4 Sitzungen',
    'p.boosters.n': 'Skinbooster & Polynukleotide',
    'p.boosters.d': 'Regenerative Injektionen, die Ihr eigenes Kollagen anregen. Sie verändern, wie die Haut das Licht hält.',
    'p.boosters.t': '30 Min. · hält 6–9 Monate',
    'p.cleansing.n': 'Medizinische Gesichtsreinigung',
    'p.cleansing.d': 'Tiefenreinigung unter klinischen Bedingungen, danach ein Wirkstoffprotokoll für Ihre Haut.',
    'p.cleansing.t': '60 Min. · alle 6 Wochen',
    'p.body.n': 'Körperkonturierung',
    'p.body.d': 'Lokale Behandlung für die Areale, die Diät und Training nicht erreichen. Ehrlich beurteilt.',
    'p.body.t': '45 Min. · Kur mit 3 Sitzungen',
    'p.hair.n': 'Haarmesotherapie',
    'p.hair.d': 'Wachstumsfaktoren in Follikeltiefe, nach dem Haarzyklus getaktet.',
    'p.hair.t': '30 Min. · Kur mit 6 Sitzungen',

    'why.eyebrow': 'Warum Menschen uns wählen',
    'why.h': 'Vier Gründe, für die Menschen anreisen.',
    'why.p': 'Keiner davon ist ein Gerät oder ein Produktname. Es sind Entscheidungen, die eine Klinik treffen muss — und meist anders trifft.',
    'why.cta': 'Dr. Snow kennenlernen <span aria-hidden="true">→</span>',
    'why.1.t': 'Eine Ärztin, jede Behandlung',
    'why.1.d': 'Wer Sie beurteilt, behandelt Sie auch. Nach der Beratung wird nichts an Pflegekräfte oder Kosmetik delegiert.',
    'why.2.t': 'Bewusst unterdosiert',
    'why.2.d': 'Wir setzen weniger, als Ihr Gesicht verträgt, schauen nach zwei Wochen erneut und ergänzen nur, was das Resultat verlangt. Zu viel ist schnell gesetzt und langsam wieder weg.',
    'why.3.t': 'Ein schriftlicher Plan, bevor Sie sich festlegen',
    'why.3.d': 'Reihenfolge, Intervalle und Gesamtkosten, schriftlich, nach der Beratung. Beim ersten Termin wird nichts injiziert.',
    'why.4.t': 'Vier Kliniken, ein Standard',
    'why.4.d': 'Zürich, Konstanz, Paris und Marbella, nach festem Turnus. Dieselben Hände, dasselbe Protokoll — auf Deutsch, Englisch, Spanisch oder Polnisch.',

    'physician.eyebrow': 'Die Ärztin',
    'physician.h': 'Dr. Snow',
    'physician.p': 'Ärztin für ästhetische Medizin und Gründerin. Ihr Ruf beruht auf Zurückhaltung: Patientinnen kommen mit dem Wunsch nach einem Eingriff und gehen häufig mit einem kleineren — oder mit einem Pflegeprotokoll und einem Termin in sechs Monaten.',
    'physician.c1': 'Jede Behandlung persönlich durchgeführt, nie delegiert',
    'physician.c2': 'Ausschliesslich CE-zertifizierte Injektionsprodukte mit Chargenrückverfolgung in jeder Akte',
    'physician.c3': 'Komplikationsprotokoll und direkter Notfallkontakt für jede Patientin',
    'physician.c4': 'Beratung auf Deutsch, Englisch, Spanisch und Polnisch',

    'clinics.eyebrow': 'Standorte',
    'clinics.h': 'Vier Städte, ein Standard.',
    'clinics.lede': 'Die Termine für die nächsten drei Monate werden bestätigt, sobald Sie schreiben.',
    'loc.ch': 'Schweiz',
    'loc.de': 'Deutschland',
    'loc.fr': 'Frankreich',
    'loc.es': 'Spanien',
    'loc.zurich.r': 'Montag bis Freitag',
    'loc.zurich': 'Der Hauptstandort. Injektionen, regenerative Behandlungen und Fadenlifting.',
    'loc.konstanz.r': 'Wöchentliche Kliniktage',
    'loc.konstanz': 'Zwanzig Minuten von Zürich. Das vollständige Angebot inklusive Haut- und Haarprotokollen.',
    'loc.paris.r': 'Monatliche Kliniktage',
    'loc.paris': 'Die Termine werden zu Beginn jedes Quartals freigegeben und sind schnell vergeben.',
    'loc.marbella.r': 'Saisonale Klinik',
    'loc.marbella': 'Hautregeneration nach dem Sommer, Pigmentierung und regenerative Protokolle.',

    'proof.eyebrow': 'Beruhigend zu wissen',
    'proof.h': 'Von Patientinnen, die mit Ihrer Frage kamen.',
    'proof.lede': 'Mit Einverständnis bei der Kontrolle nach zwei Wochen erhoben.',
    'meta.treat': 'Behandlung',
    'meta.clinic': 'Standort',
    'meta.since': 'Patientin seit',
    'q1.t': '„Ich kam wegen Filler und ging mit einem Plan, der bei der Haut anfing. Sechs Monate später hat mich niemand gefragt, was ich habe machen lassen — genau darum ging es."',
    'q1.m': 'Skinbooster',
    'q2.t': '„Sie hat mir die Hälfte von dem ausgeredet, wonach ich gefragt habe. Das hat noch nie eine Ärztin getan, und deshalb bin ich seit vier Jahren hier."',
    'q2.m': 'Botulinumtoxin',
    'q3.t': '„Die Kontrolle nach zwei Wochen hat für mich alles verändert. Kleine Korrektur, völlig anderes Resultat — und kein Druck, noch etwas zu buchen."',
    'q3.m': 'Lippenkonturierung',
    'q4.t': '„Zum ersten Mal wurde ich von der Ärztin behandelt, die auch beraten hat, von Anfang bis Ende. Dafür allein hat sich die Fahrt aus Konstanz gelohnt."',
    'q4.m': 'Protokoll für Männer',

    'faq.eyebrow': 'Klare Antworten',
    'faq.h': 'Was gefragt wird, sobald die Tür zu ist.',
    'faq.lede': 'Dr. Snow beantwortet diese Fragen selbst. Fehlt Ihre, schicken Sie sie über WhatsApp.',
    'faq.g1': 'Schmerz & Komfort',
    'faq.g2': 'Kosten & Planung',
    'faq.g3': 'Termine & Zugang',
    'faq.q1': 'Ich habe Angst, dass es mehr weh tut, als ich aushalte.',
    'faq.a1': 'Die meisten beschreiben Injektionen als unangenehm, nicht als schmerzhaft. Oberflächenanästhesie wird standardmässig aufgetragen und zwanzig Minuten belassen, Filler enthalten Lidocain, Fadenlifting erfolgt in Lokalanästhesie. Sie dürfen jederzeit stoppen.',
    'faq.q2': 'Ich möchte am Ende nicht gemacht aussehen.',
    'faq.a2': 'Wir auch nicht — genau darauf ist diese Praxis ausgerichtet. Jeder Plan beginnt bewusst unterdosiert und wird nach zwei Wochen kontrolliert. Würde Ihr Wunsch Ihre Züge verändern statt sie wiederherzustellen, sagt Dr. Snow das und schlägt etwas Kleineres vor — oder lehnt ab.',
    'faq.q3': 'Mit wie viel Ausfallzeit muss ich wirklich rechnen?',
    'faq.a3': 'Botulinumtoxin und Mesotherapie: nichts über eine Stunde Rötung hinaus. Lippen: zwei bis drei Tage Schwellung. Fäden: drei bis fünf Tage Druckempfindlichkeit und mögliche Blutergüsse. Welche Woche Sie freihalten sollten, erfahren Sie vor der Terminwahl.',
    'faq.q4': 'Warum nennen Sie mir am Telefon keinen Preis?',
    'faq.a4': 'Weil die ehrliche Antwort von Ihrer Anatomie abhängt und eine Zahl, bevor jemand Ihr Gesicht gesehen hat, geraten wäre. Nach der Beratung erhalten Sie einen schriftlichen Plan mit Reihenfolge, Intervallen und Gesamtkosten.',
    'faq.q5': 'Was, wenn ich nur eine Kleinigkeit möchte?',
    'faq.a5': 'Dann bekommen Sie genau das. Eine Beratung ist kein Verkaufsgespräch, und viele gehen mit einem Pflegeprotokoll und einem Termin in sechs Monaten statt mit einer Behandlung.',
    'faq.q6': 'Wie lange, bis ich das wieder machen muss?',
    'faq.a6': 'Botulinumtoxin hält drei bis vier Monate, Lippen sechs bis zwölf, Fäden zwölf bis achtzehn. Regenerative Behandlungen laufen als Kur, danach ein- bis zweimal jährlich als Auffrischung. Der Plan nennt die Intervalle, damit die Jahreskosten vorher sichtbar sind.',
    'faq.q7': 'Was passiert beim ersten Termin tatsächlich?',
    'faq.a7': 'Fünfundvierzig Minuten Beratung: Anamnese, Gesichtsanalyse in Ruhe und in Bewegung, standardisierte Fotos und ein schriftlicher Plan. Am selben Tag wird nichts injiziert.',
    'faq.q8': 'In welcher Sprache findet mein Termin statt?',
    'faq.a8': 'Deutsch, Englisch, Spanisch oder Polnisch — was Sie beim Schreiben angeben. Einwilligungen und Ihr schriftlicher Plan kommen in derselben Sprache.',
    'faq.q9': 'Kann ich kostenfrei verschieben oder absagen?',
    'faq.a9': 'Ja, mit 48 Stunden Vorlauf, und Sie müssen keinen Grund nennen. Die Kliniktage in Paris und Marbella sind begrenzt — früher abgesagt heisst, jemand anders bekommt den Platz.',

    'a11y.close': 'Schliessen',
    'modal.eyebrow': 'Termin',
    'modal.h': 'Wie möchten Sie uns erreichen?',
    'modal.p': 'Nennen Sie die Stadt und was Sie stört. Sie bekommen freie Termine zurück, meist noch am selben Tag.',
    'modal.note': 'Der erste Termin ist eine Beratung. An diesem Tag wird nichts injiziert, und Sie können mit 48 Stunden Vorlauf kostenfrei verschieben oder absagen.',
    'book.eyebrow': 'Termin',
    'book.h': 'Ein Satz genügt. Das ist der ganze erste Schritt.',
    'book.p': 'Keine Formulare. Nennen Sie die Stadt und was Sie stört — Sie bekommen freie Termine zurück, meist noch am selben Tag.',
    'route.wa.t': 'WhatsApp',
    'route.wa.d': '+34 637 479 715 · schnellste Antwort',
    'route.ig.t': 'Instagram',
    'route.ig.d': '@snow_clinics · Direktnachricht senden',
    'route.tel.t': 'Telefon',
    'route.tel.d': '+34 637 479 715 · Montag bis Freitag',
    'assure.1': 'Der erste Termin ist eine Beratung. <strong>An diesem Tag wird nichts injiziert.</strong>',
    'assure.2': 'Sie erhalten einen <strong>schriftlichen Plan mit den Gesamtkosten</strong>, bevor Sie sich festlegen.',
    'assure.3': 'Verschieben oder absagen <strong>kostenfrei</strong> mit 48 Stunden Vorlauf.',

    'footer.cta': 'Gewachsen aus Zweitmeinungen, kleinen Dosen und Patientinnen, die wiederkamen.',
    'footer.blurb': 'Ärztlich geführte ästhetische Medizin in Zürich, Konstanz, Paris und Marbella. Natürliche Resultate, medizinische Expertise.',
    'footer.explore': 'Entdecken',
    'footer.contact': 'Kontakt',
    'footer.hours': 'Beratungszeiten',
    'footer.h1': 'Montag – Freitag',
    'footer.h2': 'Samstag',
    'footer.h2v': 'Nach Vereinbarung',
    'footer.h3': 'Paris & Marbella',
    'footer.h3v': 'Kliniktage, quartalsweise freigegeben',
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.imprint': 'Impressum',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'AGB'
  };

  var EN = {};
  var current = 'en';

  function nodes() {
    return Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
  }

  function captureEnglish() {
    nodes().forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var attr = el.getAttribute('data-i18n-attr');
      if (EN[key] === undefined) { EN[key] = attr ? el.getAttribute(attr) : el.innerHTML; }
    });
  }

  function apply(lang) {
    var dict = lang === 'de' ? DE : EN;
    nodes().forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var value = dict[key];
      if (value === undefined) return;
      var attr = el.getAttribute('data-i18n-attr');
      if (attr) { el.setAttribute(attr, value); } else { el.innerHTML = value; }
    });

    current = lang;
    document.documentElement.lang = lang;

    Array.prototype.forEach.call(document.querySelectorAll('[data-lang]'), function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });

    try { localStorage.setItem('snow-lang', lang); } catch (err) { /* private mode */ }

    var url = new URL(window.location.href);
    if (lang === 'de') { url.searchParams.set('lang', 'de'); } else { url.searchParams.delete('lang'); }
    if (history.replaceState) { history.replaceState(null, '', url.toString()); }

    // German runs longer; anything sized from its content must re-measure.
    document.dispatchEvent(new CustomEvent('snow:languagechange', { detail: { lang: lang } }));
  }

  function preferred() {
    var fromUrl = new URL(window.location.href).searchParams.get('lang');
    if (fromUrl === 'de' || fromUrl === 'en') return fromUrl;
    try {
      var stored = localStorage.getItem('snow-lang');
      if (stored === 'de' || stored === 'en') return stored;
    } catch (err) { /* private mode */ }
    return (navigator.language || 'en').toLowerCase().indexOf('de') === 0 ? 'de' : 'en';
  }

  function init() {
    captureEnglish();
    Array.prototype.forEach.call(document.querySelectorAll('[data-lang]'), function (btn) {
      btn.addEventListener('click', function () { apply(btn.getAttribute('data-lang')); });
    });
    var lang = preferred();
    if (lang !== 'en') apply(lang);
  }

  window.SnowI18n = {
    t: function (key, fallback) {
      var dict = current === 'de' ? DE : EN;
      return dict[key] !== undefined ? dict[key] : fallback;
    },
    get lang() { return current; }
  };

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); }
  else { init(); }
})();
