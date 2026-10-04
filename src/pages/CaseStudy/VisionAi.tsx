import { Link } from "react-router-dom";

import visionAiShortfilm from "../../assets/videos/vision-ai/vision-ai-shortfilm.mp4";

import VideoPreview from "../../components/ui/VideoPreview";

import { useLanguage } from "../../features/language/useLanguage";

function VisionAi() {
  const { language } = useLanguage();

  const content =
    language === "sv"
      ? {
          back: "Tillbaka till projekt",
          eyebrow:
            "Framtidskoncept · Experience Design · AI-film · Prototyping · 2026",
          title: "Vision AI",
          intro:
            "Ett skolprojekt om framtidens teknik. I gruppen tog vi fram Vision AI – ett spekulativt koncept för en smart kontaktlins där AI och förstärkt information blir en del av vardagen. Mitt personliga fokus var projektets första AI-film: en kort, dramatisk och lite överdriven berättelse om ett vardagligt problem.",

          meta: [
            {
              label: "Min roll",
              value:
                "Scenario, AI-genererat filmmaterial och redigering av kortfilmen; bidrag till gruppens koncept",
            },
            { label: "Team", value: "Grupprojekt i skolan" },
            { label: "År", value: "2026" },
            {
              label: "Verktyg",
              value: "Adobe Firefly, AI-videogenerering, redigering",
            },
          ],

          filmLabel: "Kortfilmen",
          filmTitle: "Min första AI-genererade kortfilm",
          filmText:
            "Filmen visar behovet innan lösningen presenteras. Starta den och slå på ljudet – musiken och ljudet är en del av berättelsen.",
          filmVideoTitle: "Vision AI – kortfilm",

          needLabel: "Behovet",
          needLead:
            "En kvinna lagar mat och följer ett recept i mobilen – tills händerna är täckta av marinad.",
          needText: [
            "Uppgiften var att göra en kortfilm som gestaltar ett mänskligt behov. Jag valde en vardaglig situation: mobilen blir svår att använda med kladdiga händer, och frustrationen trappas upp.",
            "Jag gjorde medvetet situationen dramatisk, humoristisk och lite överdriven. Målet var att behovet skulle vara lätt att förstå och lätt att komma ihåg – innan framtidslösningen presenteras.",
          ],

          processLabel: "Så gjorde jag filmen",
          processTitle: "Från referensbilder till en sammanhängande film",
          processText:
            "Jag skapade visuella referenser och start- och slutbilder i Adobe Firefly, genererade korta videoklipp med AI och klippte ihop de klipp som fungerade till en film. Musik och ljud blev en viktig del av slutresultatet. Materialet var oförutsägbart – det krävde urval, redigering och kreativ problemlösning.",

          limitsLabel: "Att skapa med AI-begränsningar",
          limitsTitle: "Begränsade krediter – inga oändliga försök",
          limitsText:
            "Jag hade ett begränsat antal genereringar och kunde inte skapa om varje scen tills allt blev perfekt. Det blev en viktig del av processen.",
          limitsGroups: [
            {
              title: "Det som var svårt",
              items: [
                "Att hålla karaktären konsekvent",
                "Ansikten som förändrades mellan klipp",
                "Konstiga gester och rörelser",
                "Miljöer som skiftade mellan genereringar",
                "Promptar som inte följdes helt",
                "Få användbara försök",
              ],
            },
            {
              title: "Så arbetade jag runt det",
              items: [
                "Valde de starkaste genereringarna",
                "Klippte bort svaga eller misslyckade ögonblick",
                "Kombinerade korta klipp",
                "Använde klippning, timing, musik och ljud för att skapa en helhet",
              ],
            },
          ],
          limitsResult:
            "Materialet blev inte perfekt, men trots få genereringar, ojämn kontinuitet och att det var min första AI-film blev resultatet en kortfilm som kommunicerar problemet tydligt – med en dramatisk och humoristisk ton.",

          conceptLabel: "Vision AI-konceptet",
          conceptLead:
            "En AI-assisterad smart kontaktlins som ger kontextuell information direkt i synfältet.",
          conceptText:
            "I gruppen utforskade vi AI-assistans, information i användarens synfält, kontextuellt stöd och AR-liknande interaktion – med en kontaktlins tillsammans med kompletterande bärbar teknik. Vi diskuterade också integritet, samtycke, data, teknisk genomförbarhet och hur framtidens teknik kan påverka vardagliga beteenden.",
          process: [
            "Idé och research",
            "Tidiga gränssnittskoncept",
            "Visuell prototypning",
            "Visualisering av framtidsprodukten",
            "Presentation och film",
          ],

          roleLabel: "Min roll",
          roleLead:
            "Vision AI var ett grupprojekt. Mitt tydligaste individuella bidrag var kortfilmen.",
          roleItems: [
            "Tog fram scenariot för filmen",
            "Skapade och genererade filmmaterialet",
            "Arbetade inom ett begränsat antal AI-genereringar",
            "Valde ut användbart material",
            "Formade den dramatiska och humoristiska berättelsen",
            "Klippte ihop materialet till en sammanhängande kortfilm",
            "Bidrog till gruppens Vision AI-koncept och process",
          ],

          reflectionLabel: "Reflektion",
          reflectionLead:
            "Generativ AI är inte en knapp som levererar ett färdigt resultat.",
          reflectionText:
            "Det här var min första AI-genererade film. Med begränsade krediter kunde jag inte generera om varje ofullkomligt resultat, så jag fick arbeta med det jag hade: välja de starkaste klippen, klippa runt inkonsekvenser och använda timing och ljud för att bygga en sammanhängande berättelse. Det fick mig att se generativ AI mindre som ett automatiskt produktionsverktyg och mer som ett material som fortfarande behöver riktning, urval och redigering.",

          nextProject: "Nästa projekt",
          nextTitle: "The Awakening",
        }
      : {
          back: "Back to work",
          eyebrow:
            "Future Concept · Experience Design · AI Film · Prototyping · 2026",
          title: "Vision AI",
          intro:
            "A school project about future technology. As a group we developed Vision AI – a speculative concept for a smart contact lens where AI and augmented information become part of everyday life. My personal focus was the project's first AI film: a short, dramatic and slightly exaggerated story about an everyday problem.",

          meta: [
            {
              label: "My role",
              value:
                "Scenario, AI-generated film material and editing of the short film; contributions to the group concept",
            },
            { label: "Team", value: "School group project" },
            { label: "Year", value: "2026" },
            {
              label: "Tools",
              value: "Adobe Firefly, AI video generation, editing",
            },
          ],

          filmLabel: "The film",
          filmTitle: "My first AI-generated short film",
          filmText:
            "The film shows the need before the solution is presented. Play it with sound on – the music and sound are part of the story.",
          filmVideoTitle: "Vision AI – short film",

          needLabel: "The need",
          needLead:
            "A woman is cooking from a recipe on her phone – until her hands are covered in marinade.",
          needText: [
            "The assignment was to make a short film representing a human need. I chose an everyday situation: the phone becomes hard to use with messy hands, and the frustration escalates.",
            "I deliberately made it dramatic, humorous and slightly exaggerated. The goal was to make the need easy to understand and memorable – before presenting the future solution.",
          ],

          processLabel: "How I made it",
          processTitle: "From reference images to one coherent film",
          processText:
            "I created visual references and start and end images in Adobe Firefly, generated short video clips with AI and edited the clips that worked into one film. Music and sound became an important part of the final result. The material was unpredictable – it needed selection, editing and creative problem solving.",

          limitsLabel: "Creating within AI limitations",
          limitsTitle: "Limited credits – no endless retries",
          limitsText:
            "I had a limited number of generations, so I couldn't regenerate scenes until everything was perfect. That became a key part of the process.",
          limitsGroups: [
            {
              title: "What was difficult",
              items: [
                "Keeping the character consistent",
                "Faces changing between clips",
                "Strange gestures and movements",
                "Environments shifting between generations",
                "Prompts not followed exactly",
                "Few usable attempts",
              ],
            },
            {
              title: "How I worked around it",
              items: [
                "Chose the strongest generations",
                "Cut around weak or failed moments",
                "Combined short clips",
                "Used editing, timing, music and sound to make it coherent",
              ],
            },
          ],
          limitsResult:
            "The footage isn't perfect, but despite few generations, uneven continuity and it being my first AI film, the result is a short film that communicates the problem clearly – with a dramatic, humorous tone.",

          conceptLabel: "The Vision AI concept",
          conceptLead:
            "An AI-assisted smart contact lens that provides contextual information directly in the user's field of view.",
          conceptText:
            "As a group we explored AI assistance, information in the user's field of view, contextual support and AR-style interaction – a contact lens together with supporting wearable technology. We also discussed privacy, consent, data, technical feasibility and how future technology could affect everyday behaviour.",
          process: [
            "Idea and research",
            "Early interface concepts",
            "Visual prototyping",
            "Future-product visualisation",
            "Presentation and film",
          ],

          roleLabel: "My role",
          roleLead:
            "Vision AI was a group project. My clearest individual contribution was the short film.",
          roleItems: [
            "Developed the scenario for the film",
            "Created and generated the film material",
            "Worked within a limited number of AI generations",
            "Selected the usable output",
            "Shaped the dramatic, humorous storytelling",
            "Edited the material into one coherent short film",
            "Contributed to the group's Vision AI concept and process",
          ],

          reflectionLabel: "Reflection",
          reflectionLead:
            "Generative AI isn't a button that produces a finished result.",
          reflectionText:
            "This was my first AI-generated film. Limited credits meant I couldn't regenerate every imperfect result, so I had to work with what I had: selecting the strongest clips, editing around inconsistencies and using timing and sound to create a coherent story. It made me see generative AI less as an automatic production tool and more as material that still needs direction, selection and editing.",

          nextProject: "Next project",
          nextTitle: "The Awakening",
        };

  return (
    <article className="case-study case-study--vision">
      <div className="case-study__container">
        <Link className="case-study__back" to="/work">
          ← {content.back}
        </Link>

        {/* Hero */}
        <header className="case-study__hero ghost-hero">
          <p className="case-study__eyebrow">{content.eyebrow}</p>
          <h1 className="case-study__title">{content.title}</h1>
          <p className="case-study__intro">{content.intro}</p>
        </header>

        {/* The film: paused until played; sound off until the visitor turns
            it on with the sound control — the original audio is kept */}
        <section
          className="case-study__media-section"
          aria-labelledby="vision-film-heading"
        >
          <div className="case-study__section-heading">
            <p className="case-study__label">{content.filmLabel}</p>
            <h2 id="vision-film-heading">{content.filmTitle}</h2>
            <p>{content.filmText}</p>
          </div>

          <div className="case-study__video">
            <VideoPreview
              src={visionAiShortfilm}
              title={content.filmVideoTitle}
              playback="on-demand"
              allowZoom
            />
          </div>
        </section>

        <dl className="ghost-meta">
          {content.meta.map((item) => (
            <div className="ghost-meta__item" key={item.label}>
              <dt className="case-study__label">{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>

        {/* The need */}
        <section
          className="case-study__section ghost-challenge"
          aria-labelledby="vision-need-heading"
        >
          <h2 id="vision-need-heading" className="case-study__label">
            {content.needLabel}
          </h2>

          <div>
            <p className="case-study__large-text">{content.needLead}</p>
            {content.needText.map((paragraph) => (
              <p className="ghost-body" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* How the film was made */}
        <section
          className="case-study__section ghost-challenge"
          aria-labelledby="vision-process-heading"
        >
          <p className="case-study__label">{content.processLabel}</p>

          <div>
            <h2 id="vision-process-heading" className="vision-section-title">
              {content.processTitle}
            </h2>
            <p className="ghost-body">{content.processText}</p>
          </div>
        </section>

        {/* Creating within AI limitations */}
        <section
          className="case-study__section ghost-contribution"
          aria-labelledby="vision-limits-heading"
        >
          <div className="case-study__section-heading">
            <p className="case-study__label">{content.limitsLabel}</p>
            <h2 id="vision-limits-heading">{content.limitsTitle}</h2>
            <p>{content.limitsText}</p>
          </div>

          <div className="ghost-contribution__groups">
            {content.limitsGroups.map((group, index) => (
              <div className="ghost-contribution__group" key={group.title}>
                <h3>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {group.title}
                </h3>

                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            <p className="ghost-body vision-result">{content.limitsResult}</p>
          </div>
        </section>

        {/* The wider concept */}
        <section
          className="ghost-workflow vision-concept"
          aria-labelledby="vision-concept-heading"
        >
          <div className="case-study__section-heading">
            <p className="case-study__label">{content.conceptLabel}</p>
            <h2 id="vision-concept-heading">{content.conceptLead}</h2>
            <p>{content.conceptText}</p>
          </div>

          <ol className="ghost-workflow__steps vision-concept__steps">
            {content.process.map((step, index) => (
              <li className="ghost-workflow__step" key={step}>
                <span className="ghost-workflow__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="ghost-workflow__name">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* My role */}
        <section
          className="case-study__section ghost-challenge"
          aria-labelledby="vision-role-heading"
        >
          <h2 id="vision-role-heading" className="case-study__label">
            {content.roleLabel}
          </h2>

          <div>
            <p className="case-study__large-text">{content.roleLead}</p>
            <ul className="vision-role">
              {content.roleItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Reflection */}
        <section
          className="case-study__reflection"
          aria-labelledby="vision-reflection-heading"
        >
          <h2 id="vision-reflection-heading" className="case-study__label">
            {content.reflectionLabel}
          </h2>

          <div>
            <p className="case-study__large-text">{content.reflectionLead}</p>
            <p className="ghost-body">{content.reflectionText}</p>
          </div>
        </section>

        <Link className="case-study__next" to="/work/the-awakening">
          <span>{content.nextProject}</span>
          <strong>{content.nextTitle}</strong>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}

export default VisionAi;
