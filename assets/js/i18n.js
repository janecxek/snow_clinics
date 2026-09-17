/* ==========================================================================
   Snow Clinics — language switching (EN ⇄ DE)
   English lives in the markup, so the page is correct with JS disabled and
   for any crawler that does not execute scripts. German is applied here.
   ========================================================================== */
(function () {
  'use strict';

  var DE = {
    'a11y.areas': 'Behandlungsbereiche',
    'a11y.dock': 'Schnellzugriff',

    'treatments.h': 'Beginnen Sie beim Anliegen, nicht beim Produkt.',
    'treatments.lede': 'Die meisten kommen mit dem Namen eines Präparats. Hilfreicher ist es zu benennen, was stört — über den Rest entscheidet die Anatomie.',

    'cat.lines.n': 'Mimikfalten',
    'cat.lines.d': 'Zornesfalte, Krähenfüsse, eine schwer gewordene Braue',
    'cat.lines.c': 'Zwei Behandlungen',
    'cat.contour.n': 'Volumen & Kontur',
    'cat.contour.d': 'Lippen, Wangen, Kieferlinie und abgesunkenes Gewebe',
    'cat.contour.c': 'Zwei Behandlungen',
    'cat.skin.n': 'Hautqualität',
    'cat.skin.d': 'Textur, Fahlheit, Pigmentierung, beginnende Erschlaffung',
    'cat.skin.c': 'Drei Behandlungen',
    'cat.body.n': 'Körper & Haar',
    'cat.body.d': 'Lokale Konturierung und nachlassende Dichte',
    'cat.body.c': 'Zwei Behandlungen',

    'fact.appt': 'Termin',
    'fact.down': 'Ausfallzeit',
    'fact.holds': 'Hält',
    'panel.note': 'Die Kosten stehen nach der Beratung in Ihrem schriftlichen Plan — nie davor.',
    'cta.discuss': 'Dazu beraten lassen <span aria-hidden="true">→</span>',

    'p.botox.n': 'Botulinumtoxin',
    'p.botox.d': 'Mildert die Linien, die Ihre Mimik hinterlässt, während die Mimik Ihre bleibt. Niedrig dosiert, nach zwei Wochen kontrolliert, nur dort ergänzt, wo das Resultat es verlangt.',
    'p.botox.f1': '15 Minuten',
    'p.botox.f2': 'Keine',
    'p.botox.f3': '3–4 Monate',

    'p.men.n': 'Protokolle für Männer',
    'p.men.d': 'Männliche Brauen und Kieferpartien brauchen andere Dosierung und andere Platzierung. Strukturelle, pflegeleichte Arbeit, die im Büro niemandem auffallen soll.',
    'p.men.f1': '20–45 Minuten',
    'p.men.f2': 'Minimal',
    'p.men.f3': '6–12 Monate',

    'p.lips.n': 'Lippenkonturierung',
    'p.lips.d': 'Form, Kontur und Feuchtigkeit über zwei bis drei Sitzungen aufgebaut statt in einer. Ziel ist eine Lippe, die im entspannten Gesicht als Ihre eigene gelesen wird.',
    'p.lips.f1': '30 Minuten',
    'p.lips.f2': '2–3 Tage',
    'p.lips.f3': '6–12 Monate',

    'p.threads.n': 'Vektorlifting',
    'p.threads.d': 'Resorbierbare Fäden entlang der Vektoren, die das Gesicht tatsächlich genommen hat — um Gewebe zu reponieren statt Volumen hinzuzufügen.',
    'p.threads.f1': '45–60 Minuten',
    'p.threads.f2': '3–5 Tage',
    'p.threads.f3': '12–18 Monate',

    'p.meso.n': 'Mesotherapie',
    'p.meso.d': 'Mikroinjektionen mit Hyaluronsäure, Vitaminen und Aminosäuren dicht unter der Oberfläche. Eine Kur mit vier Sitzungen, im Rhythmus der Hauterneuerung.',
    'p.meso.f1': '30 Minuten',
    'p.meso.f2': 'Rötung, Stunden',
    'p.meso.f3': 'Kur mit 4 Sitzungen',

    'p.boosters.n': 'Skinbooster & Polynukleotide',
    'p.boosters.d': 'Regenerative Injektionen, die Ihr eigenes Kollagen anregen. Sie verändern, wie die Haut das Licht hält — und die Form von nichts.',
    'p.boosters.f1': '30 Minuten',
    'p.boosters.f2': '1 Tag',
    'p.boosters.f3': '6–9 Monate',

    'p.cleansing.n': 'Medizinische Gesichtsreinigung',
    'p.cleansing.d': 'Tiefenreinigung unter klinischen Bedingungen, danach ein Wirkstoffprotokoll für die Haut, die vor uns sitzt — nicht nach Schema.',
    'p.cleansing.f1': '60 Minuten',
    'p.cleansing.f2': 'Keine',
    'p.cleansing.f3': 'Alle 6 Wochen',

    'p.body.n': 'Körperkonturierung',
    'p.body.d': 'Lokale Behandlung für die Areale, die Diät und Training nicht erreichen. Ehrlich beurteilt — wenn es bei Ihnen nicht wirkt, erfahren Sie das in der Beratung.',
    'p.body.f1': '45 Minuten',
    'p.body.f2': '2–4 Tage',
    'p.body.f3': 'Kur mit 3 Sitzungen',

    'p.hair.n': 'Haarmesotherapie',
    'p.hair.d': 'Bei nachlassender Dichte und erschöpfter Kopfhaut. Wachstumsfaktoren in Follikeltiefe, nach dem Haarzyklus getaktet statt nach dem Kalender.',
    'p.hair.f1': '30 Minuten',
    'p.hair.f2': 'Keine',
    'p.hair.f3': 'Kur mit 6 Sitzungen',

    'facts.k1': 'Durchgeführt von',
    'facts.v1': 'Dr. Snow, persönlich',
    'facts.k2': 'Produkte',
    'facts.v2': 'CE-zertifiziert, rückverfolgbar',
    'facts.k3': 'Immer inbegriffen',
    'facts.v3': 'Kontrolle nach zwei Wochen',
    'facts.k4': 'Beratung auf',

    'loc.zurich.r': 'Beratung Montag bis Freitag',
    'loc.konstanz.r': 'Wöchentliche Kliniktage',
    'loc.paris.r': 'Monatliche Kliniktage',
    'loc.marbella.r': 'Saisonale Klinik',
    'loc.zurich': 'Der Hauptstandort. Injektionen, regenerative Behandlungen und Fadenlifting.',
    'loc.konstanz': 'Zwanzig Minuten von Zürich. Das vollständige Angebot inklusive Haut- und Haarprotokollen.',
    'loc.paris': 'Die Termine werden zu Beginn jedes Quartals freigegeben und sind schnell vergeben.',
    'loc.marbella': 'Hautregeneration nach dem Sommer, Pigmentierung und regenerative Protokolle.',

    'assure.1': 'Der erste Termin ist eine Beratung. <strong>An diesem Tag wird nichts injiziert.</strong>',
    'assure.2': 'Sie erhalten einen <strong>schriftlichen Plan mit den Gesamtkosten</strong>, bevor Sie sich festlegen.',
    'assure.3': 'Verschieben oder absagen <strong>kostenfrei</strong> mit 48 Stunden Vorlauf.',
    'vouch.t': '„Sie hat mir die Hälfte von dem ausgeredet, wonach ich gefragt habe. Das hat noch nie eine Ärztin getan, und deshalb bin ich seit vier Jahren hier."',
    'vouch.b': 'Marie · Patientin seit 2022 · Paris',

    'dock.call': 'Anrufen',

    'meta.title': 'Snow Clinics — Ästhetische Medizin in Zürich, Konstanz, Paris & Marbella',
    'meta.description': 'Ärztlich geführte ästhetische Medizin von Dr. Snow. Botulinumtoxin, Filler, Mesotherapie, Skinbooster und Fadenlifting in Zürich, Konstanz, Paris und Marbella. Zurückhaltende Dosierung, natürliche Resultate.',
    'meta.ogTitle': 'Snow Clinics — Ästhetische Medizin',

    'a11y.skip': 'Zum Inhalt springen',
    'a11y.menu': 'Menü öffnen',
    'a11y.prev': 'Vorherige Bewertung',
    'a11y.next': 'Nächste Bewertung',
    'a11y.reviews': 'Bewertungen von Patientinnen und Patienten',
    'a11y.top': 'Nach oben',

    'brand.tag': 'Ästhetische Medizin',
    'nav.approach': 'Ansatz',
    'nav.treatments': 'Behandlungen',
    'nav.results': 'Resultate',
    'nav.physician': 'Dr. Snow',
    'nav.locations': 'Standorte',
    'nav.contact': 'Kontakt',
    'nav.faq': 'Fragen',

    'cta.book': 'Beratung vereinbaren',
    'cta.treatments': 'Behandlungen ansehen',
    'cta.bookWith': 'Termin bei Dr. Snow <span aria-hidden="true">→</span>',

    'hero.eyebrow': 'Ästhetische Medizin · Seit 2016',
    'hero.l1': 'Ästhetische Medizin,',
    'hero.l2': 'bei der Sie',
    'hero.l3': 'Sie selbst bleiben.',
    'hero.lede': 'Ärztlich geführte Behandlungen in vier europäischen Kliniken. Zurückhaltende Dosierung, ein Plan über Jahre statt über einzelne Termine — und Resultate, auf die niemand zeigen kann.',
    'hero.scroll': 'Scrollen',

    'approach.eyebrow': 'Der Ansatz',
    'approach.h': 'Wir behandeln in Millimetern.',
    'approach.p1': 'Zu viel Volumen ist schnell gesetzt und langsam wieder weg. Jeder Plan beginnt hier bewusst unterdosiert: Wir setzen weniger, als das Gesicht verträgt, kontrollieren nach zwei Wochen und ergänzen nur das, was das Resultat verlangt. Das kostet einen Termin mehr. Es ist der Unterschied zwischen erholt und behandelt aussehen.',
    'approach.p2': 'Die Anatomie bestimmt den Plan, nicht eine Preisliste. Dr. Snow beurteilt das Gesicht in Ruhe und in Bewegung, erfasst die verschobenen Vektoren und behandelt die Ursache der Veränderung statt der Linie, die sie hinterlassen hat.',
    'approach.role': 'Gründerin · Ärztin für ästhetische Medizin',

    'figures.clinics': 'Kliniken',
    'figures.countries': 'Länder',
    'figures.physician': 'Ärztin, jede Behandlung',

    'treatments.eyebrow': 'Behandlungen',
    'treatments.h': 'Eine kurze Liste, sauber ausgeführt.',
    'treatments.lede': 'Neun Verfahren, ausgewählt, weil sie über Jahre Bestand haben. Alles, was eine andere Fachrichtung braucht, überweisen wir.',

    'results.eyebrow': 'Resultate',
    'results.h': 'Der Massstab ist, ob jemand die Behandlung bemerkt.',
    'results.p': 'Fotos entstehen bei jedem Termin im gleichen Abstand und im gleichen Licht. Sie entscheiden darüber, ob wir ergänzen, halten oder aufhören — und sind die einzige ehrliche Grundlage, ein Resultat nach vier Wochen zu beurteilen.',
    'results.note': 'Resultate sind individuell. Anatomie, Hautqualität, Alter und Lebensstil verändern, was möglich ist. Jeder Plan wird vor der Buchung in der Beratung vereinbart.',
    'results.before': 'Vorher',
    'results.after': 'Nachher · 4 Wochen',
    'results.sliderLabel': 'Resultat aufdecken — ziehen oder Pfeiltasten verwenden',

    'process.eyebrow': 'Ablauf',
    'process.h': 'Vier Termine, in dieser Reihenfolge.',
    'process.lede': 'Beim ersten Termin wird nicht injiziert. Der Ablauf existiert, damit Sie es sich jederzeit anders überlegen können, solange es noch ohne Folgen ist.',
    'process.s1.h': 'Beratung',
    'process.s1.d': 'Fünfundvierzig Minuten. Anamnese, Gesichtsanalyse in Ruhe und in Bewegung, Fotodokumentation und ein offenes Gespräch darüber, was eine Behandlung für Sie leisten kann — und was nicht.',
    'process.s2.h': 'Plan',
    'process.s2.d': 'Ein schriftlicher Plan mit Reihenfolge, Intervallen und Gesamtkosten, den Sie vor der Zusage erhalten. Was zu Ihrer Anatomie nicht passt, steht nicht darauf.',
    'process.s3.h': 'Behandlung',
    'process.s3.d': 'Durchgeführt von Dr. Snow, nie delegiert. Oberflächenanästhesie als Standard, ausschliesslich CE-zertifizierte Produkte, jede Chargennummer in Ihrer Akte dokumentiert.',
    'process.s4.h': 'Kontrolle',
    'process.s4.d': 'Eine Nachkontrolle nach zwei Wochen, inbegriffen. Hier wird ein Resultat fertig — kleine Korrekturen jetzt sind der Grund, warum das Ergebnis später unauffällig wirkt.',

    'physician.eyebrow': 'Die Ärztin',
    'physician.h': 'Dr. Snow',
    'physician.p1': 'Ärztin für ästhetische Medizin und Gründerin von Snow Clinics. Sie arbeitet nach festem Turnus in vier Städten — eine Patientin in Marbella und eine Patientin in Zürich werden von denselben Händen nach demselben Standard behandelt.',
    'physician.p2': 'Ihr Ruf beruht auf Zurückhaltung. Patientinnen und Patienten kommen mit dem Wunsch nach einem Eingriff und gehen häufig mit einem kleineren — oder mit einem Pflegeprotokoll und einem Termin in sechs Monaten.',
    'physician.c1': 'Beratung und Behandlung auf Deutsch, Englisch, Spanisch und Polnisch',
    'physician.c2': 'Ausschliesslich CE-zertifizierte Injektionsprodukte mit Chargenrückverfolgung in jeder Patientenakte',
    'physician.c3': 'Jede Behandlung persönlich durchgeführt — keine Delegation an nichtärztliches Personal',
    'physician.c4': 'Komplikationsprotokoll und Notfallkontakt für jede Patientin und jeden Patienten',

    'locations.eyebrow': 'Standorte',
    'locations.h': 'Vier Städte, ein Standard.',
    'locations.lede': 'Dr. Snow wechselt nach festem Plan zwischen den Kliniken. Die Termine für die nächsten drei Monate werden bei der Buchung bestätigt.',
    'loc.ch': 'Schweiz',
    'loc.de': 'Deutschland',
    'loc.fr': 'Frankreich',
    'loc.es': 'Spanien',
    'loc.zurich': 'Hauptstandort. Injektionen, regenerative Behandlungen und Fadenlifting. Beratung von Montag bis Freitag.',
    'loc.konstanz': 'Zwanzig Minuten von der Klinik in Zürich. Vollständiges Behandlungsangebot inklusive Haut- und Haarprotokollen.',
    'loc.paris': 'Monatliche Kliniktage. Vorab buchbar — die Termine werden zu Beginn jedes Quartals freigegeben.',
    'loc.marbella': 'Saisonale Klinik. Hautregeneration nach dem Sommer, Pigmentierung und regenerative Protokolle.',

    'reviews.eyebrow': 'In ihren Worten',
    'reviews.h': 'Was Patientinnen danach sagen.',
    'reviews.lede': 'Mit Einverständnis nach der Kontrolle in Woche zwei erhoben.',
    'q1.t': 'Ich kam wegen Filler und ging mit einem Plan, der bei der Haut anfing. Sechs Monate später hat mich niemand gefragt, was ich habe machen lassen — genau darum ging es.',
    'q1.b': 'Elena · Zürich',
    'q2.t': 'Sie hat mir die Hälfte von dem ausgeredet, wonach ich gefragt habe. Das hat noch nie eine Ärztin getan, und deshalb bin ich seit vier Jahren hier.',
    'q2.b': 'Marie · Paris',
    'q3.t': 'Die Kontrolle nach zwei Wochen hat für mich alles verändert. Kleine Korrektur, völlig anderes Resultat — und kein Druck, noch etwas zu buchen.',
    'q3.b': 'Sofía · Marbella',
    'q4.t': 'Zum ersten Mal wurde ich von der Ärztin behandelt, die auch beraten hat, von Anfang bis Ende. Dafür allein hat sich die Fahrt aus Konstanz gelohnt.',
    'q4.b': 'Thomas · Konstanz',

    'faq.eyebrow': 'Fragen',
    'faq.h': 'Bevor Sie buchen.',
    'faq.lede': 'Wenn Ihre Frage fehlt, stellen Sie sie im Formular unten — Dr. Snow beantwortet diese selbst.',
    'faq.q1': 'Tut es weh?',
    'faq.a1': 'Die meisten beschreiben Injektionsbehandlungen als unangenehm, nicht als schmerzhaft. Oberflächenanästhesie wird standardmässig aufgetragen und zwanzig Minuten belassen, Filler enthalten Lidocain. Fadenlifting erfolgt in Lokalanästhesie.',
    'faq.q2': 'Mit wie viel Ausfallzeit muss ich rechnen?',
    'faq.a2': 'Botulinumtoxin und Mesotherapie: keine über eine Stunde Rötung hinaus. Lippen: zwei bis drei Tage Schwellung. Fäden: drei bis fünf Tage Druckempfindlichkeit und mögliche Blutergüsse. Wir sagen Ihnen vor der Terminwahl, welche Woche Sie freihalten sollten.',
    'faq.q3': 'Werde ich anders aussehen?',
    'faq.a3': 'Sie sollten aussehen wie Sie selbst an einer guten Woche. Würde ein Plan Ihre Züge verändern statt sie wiederherzustellen, sagt Dr. Snow das in der Beratung und schlägt eine Alternative vor — oder lehnt die Behandlung ab.',
    'faq.q4': 'Was passiert beim ersten Termin?',
    'faq.a4': 'Nur eine Beratung. Anamnese, Gesichtsanalyse, standardisierte Fotos und ein schriftlicher Plan. Am selben Tag wird nichts injiziert, damit Sie den Plan in Ruhe lesen und entscheiden können.',
    'faq.q5': 'In welchen Sprachen findet die Beratung statt?',
    'faq.a5': 'Deutsch, Englisch, Spanisch und Polnisch. Sagen Sie bei der Buchung, was Ihnen lieber ist — der Termin findet dann in dieser Sprache statt.',
    'faq.q6': 'Kann ich einen Termin verschieben oder absagen?',
    'faq.a6': 'Ja, mit 48 Stunden Vorlauf und ohne Kosten. Die Kliniktage in Paris und Marbella sind begrenzt — je früher Sie absagen, desto eher kann jemand anders den Platz übernehmen.',

    'contact.eyebrow': 'Termin',
    'contact.h': 'Beginnen Sie mit einer Beratung.',
    'contact.p': 'Senden Sie das Formular und Sie erhalten innerhalb eines Werktags freie Termine an Ihrem Wunschstandort. Für Dringendes rufen Sie an oder schreiben Sie auf WhatsApp.',
    'contact.phone': 'Telefon & WhatsApp',
    'contact.social': 'Instagram',
    'contact.cities': 'Standorte',

    'form.name': 'Name <span class="req" aria-hidden="true">*</span>',
    'form.email': 'E-Mail <span class="req" aria-hidden="true">*</span>',
    'form.phone': 'Telefon',
    'form.phoneHint': 'Bitte mit Ländervorwahl, wenn Sie ausserhalb der Schweiz sind.',
    'form.clinic': 'Wunschstandort <span class="req" aria-hidden="true">*</span>',
    'form.choose': 'Standort wählen',
    'form.interest': 'Woran denken Sie?',
    'form.undecided': 'Noch unsicher — bitte beraten',
    'form.message': 'Was wir wissen sollten',
    'form.consent': 'Ich bin damit einverstanden, dass Snow Clinics die oben genannten Angaben zur Beantwortung meiner Anfrage speichert.',
    'form.submit': 'Termin anfragen',
    'form.sentH': 'Anfrage eingegangen.',
    'form.sentP': 'Wir melden uns innerhalb eines Werktags mit freien Terminen. Wenn es dringend ist, rufen Sie an oder schreiben Sie auf WhatsApp: +34 637 479 715.',
    'form.errRequired': 'Dieses Feld wird benötigt.',
    'form.errEmail': 'Bitte eine E-Mail-Adresse angeben, unter der wir Sie erreichen.',
    'form.errConsent': 'Bitte das Kästchen anhaken, damit wir antworten dürfen.',
    'form.errSummary': 'Bitte die markierten Felder prüfen.',

    'footer.blurb': 'Ärztlich geführte ästhetische Medizin in Zürich, Konstanz, Paris und Marbella. Natürliche Resultate, medizinische Expertise.',
    'footer.explore': 'Entdecken',
    'footer.contact': 'Kontakt',
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.imprint': 'Impressum',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'AGB'
  };

  var EN = {};                       // filled from the markup on first run
  var current = 'en';

  function nodes() {
    return Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
  }

  function captureEnglish() {
    nodes().forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var attr = el.getAttribute('data-i18n-attr');
      if (EN[key] === undefined) {
        EN[key] = attr ? el.getAttribute(attr) : el.innerHTML;
      }
    });
  }

  function apply(lang) {
    var dict = lang === 'de' ? DE : EN;
    nodes().forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var value = dict[key];
      if (value === undefined) return;
      var attr = el.getAttribute('data-i18n-attr');
      if (attr) { el.setAttribute(attr, value); }
      else { el.innerHTML = value; }
    });

    current = lang;
    document.documentElement.lang = lang;

    Array.prototype.forEach.call(document.querySelectorAll('[data-lang]'), function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });

    try { localStorage.setItem('snow-lang', lang); } catch (err) { /* private mode */ }

    var url = new URL(window.location.href);
    if (lang === 'de') { url.searchParams.set('lang', 'de'); }
    else { url.searchParams.delete('lang'); }
    if (history.replaceState) { history.replaceState(null, '', url.toString()); }

    // German copy is longer; anything sized from its content must re-measure.
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
