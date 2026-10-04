import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

import awakeningCover from "../../assets/images/projects/the-awakening/the-awakening-cover.png";

import YouTubePreview from "../../components/ui/YouTubePreview";

import { useLanguage } from "../../features/language/useLanguage";

// The playable prototype submitted for the course (an HTML version made by
// a team member) and the trailer (also made by a team member)
const ITCH_URL = "https://memai26.itch.io/the-awakening";
const TRAILER_ID = "PD4baLfQS5o";

function TheAwakening() {
  const { language } = useLanguage();

  const content =
    language === "sv"
      ? {
          back: "Tillbaka till projekt",
          eyebrow:
            "Speldesign · Experience Design · Unity · AI-assisterad utveckling · 2026",
          title: "The Awakening",
          intro:
            "Ett strategiskt skräckspel skapat som grupprojekt i en kurs i speldesign. Du spelar en urgammal havsvarelse som försöker bryta de sista Sigillen som håller den fången under havet – medan en mänsklig expedition försöker förstå den och försegla den för gott.",

          meta: [
            {
              label: "Min roll",
              value:
                "Unity-implementation och teknisk utveckling, spel- och interaktionsdesign i gruppen",
            },
            { label: "Team", value: "Grupprojekt i en kurs i speldesign" },
            { label: "År", value: "2026" },
            {
              label: "Verktyg",
              value: "Unity, Visual Studio Code, Claude Code, Git och GitHub",
            },
          ],

          trailerLabel: "Trailer",
          trailerTitle: "En första glimt",
          trailerPlay: "Spela trailern för The Awakening",
          trailerFrameTitle: "The Awakening – trailer (YouTube)",
          trailerCredit: "Trailern skapades av en medlem i projektgruppen.",
          trailerUnavailable: "Trailern är inte tillgänglig",

          gameLabel: "Spelet",
          gameLead:
            "Den centrala spänningen är en kapplöpning mellan Kraft och Hot.",
          gameText:
            "Monstret samlar Kraft genom att skrämma expeditionen och använder den för att manipulera människor eller miljön. Samtidigt ökar människorna Hotet ju mer de förstår om varelsen. Monstret arbetar för att bryta de återstående Sigillen – expeditionen för att försegla det.",

          roleLabel: "Min roll",
          roleLead: "Från gemensamma regler till en spelbar prototyp i Unity.",
          roleText: [
            "Spelidén, reglerna och temat tog vi fram tillsammans i gruppen. Mitt huvudsakliga bidrag var att översätta dem till en spelbar prototyp i Unity och att bygga den tekniska grund som gruppen arbetade i. Andra i gruppen fokuserade på UI-design, grafiska assets, filmiskt material, dokumentation och trailern.",
            "Jag var också med och formade spelreglerna, de Eurogame-inspirerade mekanikerna, temat, interaktionsdesignen och diskussionerna kring UI.",
          ],

          loopLabel: "Kärnloopen",
          loopTitle: "Två sidor, en kapplöpning",
          loopText:
            "Designen bygger på resurshantering och indirekt interaktion: monstret agerar genom rädsla och manipulation, medan människorna kommer framåt genom att samarbeta och analysera det de hittar.",
          loops: [
            {
              name: "Monstret",
              steps: [
                "Skrämma",
                "Rädsla",
                "Kraft",
                "Manipulation",
                "Lösa hinder",
                "Bryta ett Sigill",
              ],
            },
            {
              name: "Expeditionen",
              steps: [
                "Samarbeta",
                "Upptäcka",
                "Analysera bevis",
                "Öka Hotet",
                "Försegla monstret",
              ],
            },
          ],

          buildLabel: "Unity-implementation",
          buildTitle: "Det här byggde jag",
          buildText:
            "Jag arbetade med AI-assisterad utveckling – vibecoding med Claude Code i Visual Studio Code – för att snabbt gå från regler på papper till spelbara system, och testade och justerade dem längs vägen.",
          buildGroups: [
            {
              title: "Spelet i Unity",
              items: [
                "Implementerade Zone Map",
                "Implementerade Zone 1, den spelbara zonen",
                "Kopplade ihop UI med spellogiken",
                "Implementerade och testade systemen för Kraft, Hot och Rädsla",
                "Integrerade grafiska assets som gruppen skapat",
              ],
            },
            {
              title: "Arbetsflöde och verktyg",
              items: [
                "Satte upp projektstrukturen i Unity",
                "Arbetsflöde med Git och GitHub för gruppen",
                "Vibecoding med Claude Code i Visual Studio Code",
                "Speltester och iteration",
              ],
            },
          ],

          testLabel: "Test och iteration",
          testTitle: "Kärnloopen som inte gick att hoppa över",
          test: [
            { label: "Problem", text: "Monstret började med 3 Kraft." },
            {
              label: "Iakttagelse",
              text: "I testet kunde spelaren direkt använda Manipulera miljön och hoppa över Skrämma – kopplingen mellan Skrämma, Rädsla och Kraft introducerades aldrig.",
            },
            {
              label: "Förändring",
              text: "Startkraften sänktes från 3 till 1.",
            },
            {
              label: "Resultat",
              text: "I uppföljningstestet behövde spelaren Skrämma först, och kärnloopen blev tydlig.",
            },
          ],

          scopeLabel: "Utmaningen",
          scopeLead: "En av våra största utmaningar var omfånget.",
          scopeText: [
            "Det tog lång tid att landa i en gemensam spelidé, och att sätta upp Unity, VS Code och GitHub tog längre tid än väntat. Mycket av Unity-implementationen kom därför att ligga hos mig, medan andra i gruppen fokuserade på UI, assets, filmiskt material och dokumentation.",
            "Det blev en tydlig lärdom om omfång, prototypning och testning.",
          ],
          scopePlannedLabel: "Den ursprungliga idén",
          scopePlanned: ["Fyra Zoner", "En avslutande Awakening-sekvens"],
          scopeBuiltLabel: "Det vi byggde i kursen",
          scopeBuilt: ["Introduktion", "Zone Map", "Spelbar Zone 1"],

          playLabel: "Spelbar prototyp",
          playTitle: "Spela den inlämnade prototypen",
          playText:
            "För att hinna presentera en spelbar version inom kursens deadline skapade en gruppmedlem en HTML-version baserad på gruppens gemensamma spelidé och regler.",
          playCta: "Spela prototypen",
          newTab: "(öppnar itch.io i en ny flik)",

          reflectionLabel: "Reflektion",
          reflectionLead:
            "Testning borde vara en del av skapandet – inte den sista kvalitetskontrollen.",
          reflectionText:
            "Det är lätt att fortsätta designa och implementera, eftersom synliga resultat känns som framsteg. Att testa kräver att man släpper kontrollen, och det kan visa att något man lagt tid på inte fungerar.",
          futureLabel: "I kommande projekt vill jag",
          future: [
            "definiera den gemensamma visionen tidigare",
            "minska omfånget tidigare",
            "bygga den minsta spelbara kärnan först",
            "testa tidigare",
            "iterera innan jag finslipar det visuella",
          ],

          ongoing: "Pågående",
          continueTitle: "Jag fortsätter utveckla spelet i Unity",
          continueText:
            "Skolprojektet är avslutat, men jag fortsätter att utveckla The Awakening på egen hand i Unity. Jag använder projektet för att fördjupa mina kunskaper i Unity, interaktionsdesign, AI-assisterad utveckling och i att översätta komplexa spelregler till tydlig feedback för spelaren.",

          nextProject: "Nästa projekt",
          nextTitle: "Sellpy Redesign",
        }
      : {
          back: "Back to work",
          eyebrow:
            "Game Design · Experience Design · Unity · AI-assisted development · 2026",
          title: "The Awakening",
          intro:
            "A strategic horror game created as a group project in a game-design course. You play an ancient sea creature trying to break the last Seals that keep it trapped beneath the ocean – while a human expedition tries to understand it and seal it away for good.",

          meta: [
            {
              label: "My role",
              value:
                "Unity implementation and technical development, game and interaction design in the team",
            },
            { label: "Team", value: "Group project in a game-design course" },
            { label: "Year", value: "2026" },
            {
              label: "Tools",
              value: "Unity, Visual Studio Code, Claude Code, Git and GitHub",
            },
          ],

          trailerLabel: "Trailer",
          trailerTitle: "A first look",
          trailerPlay: "Play The Awakening trailer",
          trailerFrameTitle: "The Awakening – trailer (YouTube)",
          trailerCredit: "Trailer created by a member of the project team.",
          trailerUnavailable: "Trailer unavailable",

          gameLabel: "The game",
          gameLead: "The central tension is a race between Power and Threat.",
          gameText:
            "The monster gains Power by frightening the expedition and uses it to manipulate people or the environment. At the same time, the humans increase Threat as they understand more about the creature. The monster works to break the remaining Seals – the expedition to seal it away.",

          roleLabel: "My role",
          roleLead: "From shared rules to a playable prototype in Unity.",
          roleText: [
            "We developed the game concept, rules and theme together as a group. My main contribution was translating them into a playable prototype in Unity and building the technical foundation the team worked in. Other team members focused on UI design, visual assets, cinematic material, documentation and the trailer.",
            "I also helped shape the game rules, the Eurogame-inspired mechanics, the theme, the interaction design and the UI discussions.",
          ],

          loopLabel: "Core game loop",
          loopTitle: "Two sides, one race",
          loopText:
            "The design revolves around resource management and indirect interaction: the monster acts through fear and manipulation, while the humans make progress by working together and analysing what they find.",
          loops: [
            {
              name: "The monster",
              steps: [
                "Scare",
                "Fear",
                "Power",
                "Manipulation",
                "Solve obstacles",
                "Break a Seal",
              ],
            },
            {
              name: "The expedition",
              steps: [
                "Collaborate",
                "Discover",
                "Analyse evidence",
                "Increase Threat",
                "Seal the monster",
              ],
            },
          ],

          buildLabel: "Unity implementation",
          buildTitle: "What I built",
          buildText:
            "I worked with AI-assisted development – vibecoding with Claude Code in Visual Studio Code – to move quickly from rules on paper to playable systems, testing and adjusting them along the way.",
          buildGroups: [
            {
              title: "The game in Unity",
              items: [
                "Implemented the Zone Map",
                "Implemented Zone 1, the playable zone",
                "Connected the UI to the gameplay logic",
                "Implemented and tested the Power, Threat and Fear systems",
                "Integrated visual assets created by the team",
              ],
            },
            {
              title: "Workflow and tools",
              items: [
                "Set up the Unity project structure",
                "Git and GitHub workflow for the team",
                "Vibecoding with Claude Code in Visual Studio Code",
                "Gameplay testing and iteration",
              ],
            },
          ],

          testLabel: "Testing and iteration",
          testTitle: "Making the core loop impossible to skip",
          test: [
            { label: "Problem", text: "The monster started with 3 Power." },
            {
              label: "Observation",
              text: "In testing, the player could use Manipulate Environment straight away and skip Scare – so the link between Scare, Fear and Power was never introduced.",
            },
            {
              label: "Change",
              text: "Starting Power was reduced from 3 to 1.",
            },
            {
              label: "Result",
              text: "In the follow-up test the player had to Scare first, and the core loop became clear.",
            },
          ],

          scopeLabel: "The challenge",
          scopeLead: "One of our biggest challenges was scope.",
          scopeText: [
            "It took us a long time to reach a shared game concept, and setting up Unity, VS Code and GitHub took longer than expected. Much of the Unity implementation therefore came to rest with me, while other team members focused on UI, assets, cinematic material and documentation.",
            "It became a clear lesson in scope, prototyping and testing.",
          ],
          scopePlannedLabel: "The original concept",
          scopePlanned: ["Four Zones", "A final Awakening sequence"],
          scopeBuiltLabel: "What we built in the course",
          scopeBuilt: ["Introduction", "Zone Map", "Playable Zone 1"],

          playLabel: "Playable prototype",
          playTitle: "Play the submitted prototype",
          playText:
            "To meet the course deadline, a member of the team created a playable HTML version based on our shared game concept and rules.",
          playCta: "Play prototype",
          newTab: "(opens itch.io in a new tab)",

          reflectionLabel: "Reflection",
          reflectionLead:
            "Testing should be part of creating – not the final quality check.",
          reflectionText:
            "It's easy to keep designing and implementing, because visible output feels like progress. Testing means giving up control, and it may reveal that something you've invested time in doesn't work.",
          futureLabel: "In future projects I want to",
          future: [
            "define the shared vision earlier",
            "reduce scope earlier",
            "build the smallest playable core first",
            "test earlier",
            "iterate before polishing visuals",
          ],

          ongoing: "Ongoing",
          continueTitle: "Continuing the project in Unity",
          continueText:
            "The original school project has ended, but I'm continuing to develop The Awakening independently in Unity. I'm using the project to deepen my skills in Unity, interaction design, AI-assisted development and translating complex game rules into clear player feedback.",

          nextProject: "Next project",
          nextTitle: "Sellpy Redesign",
        };

  return (
    <article className="case-study case-study--awakening">
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

        {/* Trailer */}
        <section
          className="case-study__media-section awakening-trailer"
          aria-labelledby="awakening-trailer-heading"
        >
          <div className="case-study__section-heading">
            <p className="case-study__label">{content.trailerLabel}</p>
            <h2 id="awakening-trailer-heading">{content.trailerTitle}</h2>
          </div>

          <div className="case-study__video">
            <YouTubePreview
              videoId={TRAILER_ID}
              title={content.trailerFrameTitle}
              playLabel={content.trailerPlay}
              unavailableLabel={content.trailerUnavailable}
              poster={awakeningCover}
            />
          </div>

          <p className="awakening-credit">{content.trailerCredit}</p>
        </section>

        <dl className="ghost-meta">
          {content.meta.map((item) => (
            <div className="ghost-meta__item" key={item.label}>
              <dt className="case-study__label">{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>

        {/* The game */}
        <section
          className="case-study__section ghost-challenge"
          aria-labelledby="awakening-game-heading"
        >
          <h2 id="awakening-game-heading" className="case-study__label">
            {content.gameLabel}
          </h2>

          <div>
            <p className="case-study__large-text">{content.gameLead}</p>
            <p className="ghost-body">{content.gameText}</p>
          </div>
        </section>

        {/* My role */}
        <section
          className="case-study__section ghost-challenge"
          aria-labelledby="awakening-role-heading"
        >
          <h2 id="awakening-role-heading" className="case-study__label">
            {content.roleLabel}
          </h2>

          <div>
            <p className="case-study__large-text">{content.roleLead}</p>
            {content.roleText.map((paragraph) => (
              <p className="ghost-body" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Core loop */}
        <section
          className="ghost-workflow awakening-loop"
          aria-labelledby="awakening-loop-heading"
        >
          <div className="case-study__section-heading">
            <p className="case-study__label">{content.loopLabel}</p>
            <h2 id="awakening-loop-heading">{content.loopTitle}</h2>
            <p>{content.loopText}</p>
          </div>

          {content.loops.map((loop) => (
            <div className="awakening-loop__row" key={loop.name}>
              <h3 className="awakening-loop__name">{loop.name}</h3>

              <ol
                className="ghost-workflow__steps awakening-loop__steps"
                style={{ "--steps": loop.steps.length } as CSSProperties}
              >
                {loop.steps.map((step, index) => (
                  <li className="ghost-workflow__step" key={step}>
                    <span className="ghost-workflow__number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="ghost-workflow__name">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </section>

        {/* Unity implementation */}
        <section
          className="case-study__section ghost-contribution"
          aria-labelledby="awakening-build-heading"
        >
          <div className="case-study__section-heading">
            <p className="case-study__label">{content.buildLabel}</p>
            <h2 id="awakening-build-heading">{content.buildTitle}</h2>
            <p>{content.buildText}</p>
          </div>

          <div className="ghost-contribution__groups">
            {content.buildGroups.map((group, index) => (
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
          </div>
        </section>

        {/* Testing and iteration */}
        <section
          className="ghost-workflow awakening-test"
          aria-labelledby="awakening-test-heading"
        >
          <div className="case-study__section-heading">
            <p className="case-study__label">{content.testLabel}</p>
            <h2 id="awakening-test-heading">{content.testTitle}</h2>
          </div>

          <ol className="awakening-test__steps">
            {content.test.map((step) => (
              <li className="awakening-test__step" key={step.label}>
                <h3 className="case-study__label">{step.label}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Scope */}
        <section
          className="case-study__section ghost-challenge"
          aria-labelledby="awakening-scope-heading"
        >
          <h2 id="awakening-scope-heading" className="case-study__label">
            {content.scopeLabel}
          </h2>

          <div>
            <p className="case-study__large-text">{content.scopeLead}</p>
            {content.scopeText.map((paragraph) => (
              <p className="ghost-body" key={paragraph}>
                {paragraph}
              </p>
            ))}

            <div className="awakening-scope">
              <div className="awakening-scope__column">
                <h3 className="case-study__label">
                  {content.scopePlannedLabel}
                </h3>
                <ul>
                  {content.scopePlanned.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="awakening-scope__column awakening-scope__column--built">
                <h3 className="case-study__label">{content.scopeBuiltLabel}</h3>
                <ul>
                  {content.scopeBuilt.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Playable prototype */}
        <section
          className="case-study__section ghost-challenge awakening-play"
          aria-labelledby="awakening-play-heading"
        >
          <p className="case-study__label">{content.playLabel}</p>

          <div>
            <h2 id="awakening-play-heading" className="awakening-play__title">
              {content.playTitle}
            </h2>
            <p className="ghost-body">{content.playText}</p>

            <div className="ghost-hero__actions">
              <a
                className="hero__primary-link"
                href={ITCH_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.playCta}
                <span className="ghost-visually-hidden"> {content.newTab}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* Reflection */}
        <section
          className="case-study__reflection"
          aria-labelledby="awakening-reflection-heading"
        >
          <h2 id="awakening-reflection-heading" className="case-study__label">
            {content.reflectionLabel}
          </h2>

          <div>
            <p className="case-study__large-text">{content.reflectionLead}</p>
            <p className="ghost-body">{content.reflectionText}</p>

            <h3 className="case-study__label awakening-future__label">
              {content.futureLabel}
            </h3>
            <ul className="awakening-future">
              {content.future.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Continuing in Unity */}
        <section
          className="awakening-continue"
          aria-labelledby="awakening-continue-heading"
        >
          <p className="awakening-continue__badge">{content.ongoing}</p>
          <h2 id="awakening-continue-heading">{content.continueTitle}</h2>
          <p>{content.continueText}</p>
        </section>

        <Link className="case-study__next" to="/work/sellpy-redesign">
          <span>{content.nextProject}</span>
          <strong>{content.nextTitle}</strong>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}

export default TheAwakening;
