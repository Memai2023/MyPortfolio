import { Link } from "react-router-dom";

import ghostGameplayHero from "../../assets/images/projects/lost-little-ghost/lost-little-ghost-gameplay-hero.png";
import ghostVisualDirection from "../../assets/images/projects/lost-little-ghost/lost-little-ghost-visual-direction.png";

// Gameplay video. To use a different recording of the full game, replace this
// import with the new file (e.g. lost-little-ghost-gameplay.mp4) — or set it to
// null to show the placeholder frame until the video is ready.
import ghostGameplayVideo from "../../assets/videos/lost-little-ghost/lost-little-ghost-preview.mp4";

import VideoPreview from "../../components/ui/VideoPreview";
import ImageLightbox from "../../components/ui/ImageLightbox";

import { useLanguage } from "../../features/language/useLanguage";

const ITCH_URL = "https://memai26.itch.io/lost-little-ghost";
const GITHUB_URL = "https://github.com/Memai2023/LostLittleGhost2.0";

const gameplayVideoSrc: string | null = ghostGameplayVideo;

function LostLittleGhost() {
  const { language } = useLanguage();

  const content =
    language === "sv"
      ? {
          back: "Tillbaka till projekt",
          eyebrow: "Skolprojekt · Spel · AI-assisterad utveckling",
          title: "Lost Little Ghost",
          intro:
            "Ett experimentellt spelprojekt på 2,5 dagar som utforskar AI-assisterad utveckling, visuellt berättande och snabb prototypning.",

          meta: [
            {
              label: "Roll",
              value:
                "UX / Experience Design, AI-assisterad utveckling, visuell förfining",
            },
            { label: "Team", value: "Grupprojekt i skolan" },
            { label: "Tid", value: "2,5 dagar" },
            {
              label: "Verktyg",
              value:
                "Godot, VS Code, Claude AI, GitHub, generativa AI-verktyg",
            },
          ],

          playLabel: "Spela på itch.io",
          githubLabel: "Visa på GitHub",
          newTab: "(öppnas i en ny flik)",

          heroTag: "Det färdiga spelet",
          heroAlt:
            "Skärmbild från det färdiga spelet Lost Little Ghost: ett litet vitt spöke på en trädstam i en mörkblå skog om natten, med spökjägare som bär lyktor och en själsmätare uppe till vänster.",
          heroCaption: "Skärmbild från den spelbara slutversionen.",

          challengeLabel: "Utmaningen",
          challengeLead:
            "Utmaningen var enkel: kunde en grupp UX-studenter utan tidigare erfarenhet av spelutveckling skapa ett spelbart spel på bara 2,5 dagar?",
          challengeText:
            "I stället för att försöka bygga allt för hand använde vi generativ AI och AI-assisterad kodning som produktionsverktyg. Det gjorde att vi snabbt kunde gå från koncept till spelbar prototyp och lägga vår tid på riktning, iteration och den övergripande spelupplevelsen.",

          videoLabel: "Gameplay",
          videoTitle: "Den färdiga prototypen",
          videoText:
            "Prototypen hölls medvetet liten på grund av tidsramen. Videon visar hela den spelbara upplevelsen.",
          videoPlaceholder: "Gameplayvideo kommer snart",

          directionLabel: "Koncept",
          directionTitle: "Visuell riktning & AI-assisterad produktion",
          directionText: [
            "Med bara 2,5 dagar på oss använde vi generativ AI för att snabbt ta fram visuella koncept, karaktärer, miljöer och andra assets. Först utvecklade vi en visuell riktning för världen, stämningen och karaktärerna, som blev vår referens genom hela produktionen.",
            "Det färdiga spelet utvecklades under arbetets gång och matchar inte den ursprungliga visionen exakt, men konceptet hjälpte oss att hålla en konsekvent riktning inom en mycket begränsad tidsram.",
          ],
          conceptTag: "Tidigt koncept · AI-genererat",
          conceptAlt:
            "AI-genererad konceptbild för Lost Little Ghost: en moodboard med tre miljöer (kyrkogård, spökskog och husets tomt), spökets uttryck, spökjägaren, plattformar, gränssnittselement och en färgpalett.",
          conceptCaption:
            "Tidig visuell riktning — AI-genererad konceptutforskning som användes som referens under den 2,5 dagar långa produktionen.",
          conceptNote: "Inte en skärmbild från spelet.",

          contributionLabel: "Mitt bidrag",
          contributionTitle: "Riktning, integration och iteration",
          contributionText:
            "AI var en del av arbetsflödet, och gruppen bidrog med assets, musik, idéer och prompts. Min roll var att sätta upp grunden, styra implementationen och få ihop delarna till ett spelbart bygge.",
          contributionGroups: [
            {
              title: "Grund & arbetsflöde",
              items: [
                "Satte upp projektets grund och tekniska struktur",
                "Skapade och hanterade GitHub-uppsättningen och arbetsflödet",
                "Arbetade i VS Code med Claude AI för att implementera spelet",
                "Kopplade implementationen till Godot",
              ],
            },
            {
              title: "Integration & iteration",
              items: [
                "Integrerade assets och musik från gruppen",
                "Itererade på spelet med AI-assisterad kodning",
                "Hjälpte till att omsätta gruppens koncept och prompts till ett fungerande, spelbart bygge",
              ],
            },
            {
              title: "Visuell förfining",
              items: [
                "Förfinade det visuella resultatet mot slutet av projektet",
                "Förbättrade bakgrundens parallax och mindre visuella detaljer så att spelet kändes mjukare och mer sammanhållet",
              ],
            },
          ],

          workflowLabel: "Snabbt AI-arbetsflöde",
          workflow: [
            "Koncept",
            "Visuell riktning",
            "AI-genererade assets",
            "AI-assisterad implementation",
            "Integration i Godot",
            "Testning",
            "Visuell polering",
          ],

          reflectionLabel: "Resultat & reflektion",
          reflection: [
            "Projektet var avsiktligt ett experiment snarare än ett färdigutvecklat spel. På 2,5 dagar gick vi från idé till spelbar prototyp och lärde oss var AI kunde snabba på produktionen — och var mänsklig riktning, testning och förfining fortfarande behövdes.",
            "För mig var det mest värdefulla att lära mig styra ett AI-assisterat arbetsflöde i stället för att bara generera isolerade resultat. Slutresultatet kom från att hela tiden välja ut, justera, integrera och förfina det verktygen producerade.",
          ],

          nextProject: "Nästa projekt",
          nextTitle: "Sellpy Redesign",
        }
      : {
          back: "Back to work",
          eyebrow: "School project · Game · AI-assisted development",
          title: "Lost Little Ghost",
          intro:
            "A 2.5-day experimental game project exploring AI-assisted development, visual storytelling and rapid prototyping.",

          meta: [
            {
              label: "Role",
              value:
                "UX / Experience Design, AI-assisted development, visual refinement",
            },
            { label: "Team", value: "Student group project" },
            { label: "Duration", value: "2.5 days" },
            {
              label: "Tools",
              value: "Godot, VS Code, Claude AI, GitHub, generative AI tools",
            },
          ],

          playLabel: "Play on itch.io",
          githubLabel: "View GitHub",
          newTab: "(opens in a new tab)",

          heroTag: "The final game",
          heroAlt:
            "Screenshot of the finished Lost Little Ghost game: a small white ghost standing on a log in a dark blue forest at night, with lantern-carrying ghost hunters on nearby platforms and a soul meter in the top-left corner.",
          heroCaption: "Screenshot from the final playable build.",

          challengeLabel: "The challenge",
          challengeLead:
            "The challenge was simple: could a group of UX students with no previous game development experience create a playable game in only 2.5 days?",
          challengeText:
            "Instead of trying to build everything manually, we treated generative AI and AI-assisted coding as production tools. This allowed us to move quickly from concept to a playable prototype while focusing our time on direction, iteration and the overall player experience.",

          videoLabel: "Gameplay",
          videoTitle: "The final prototype",
          videoText:
            "The prototype was kept intentionally small because of the timeframe. The video shows the complete playable experience.",
          videoPlaceholder: "Gameplay video coming soon",

          directionLabel: "Concept",
          directionTitle: "Visual direction & AI-assisted production",
          directionText: [
            "With only 2.5 days to build the game, we used generative AI to rapidly create visual concepts, characters, environments and other assets. We first developed a visual direction for the world, atmosphere and characters, which became our reference throughout production.",
            "The final game evolved during development and doesn’t match the original vision exactly, but the concept helped us maintain a consistent direction while working within a very limited timeframe.",
          ],
          conceptTag: "Early concept · AI-generated",
          conceptAlt:
            "AI-generated concept board for Lost Little Ghost: a mood board showing three environments (graveyard, haunted forest and house grounds), ghost expressions, the ghost hunter, platform assets, UI elements and a colour palette.",
          conceptCaption:
            "Early visual direction — AI-generated concept exploration used as a reference throughout the 2.5-day production.",
          conceptNote: "Not a screenshot of the game.",

          contributionLabel: "My contribution",
          contributionTitle: "Direction, integration and iteration",
          contributionText:
            "AI was part of the workflow, and my group contributed assets, music, ideas and prompts. My role was to set up the foundation, guide the implementation and bring the pieces together into a playable build.",
          contributionGroups: [
            {
              title: "Foundation & workflow",
              items: [
                "Set up the initial project foundation and technical structure",
                "Created and managed the GitHub setup and workflow",
                "Worked in VS Code with Claude AI to implement the game",
                "Connected the implementation with Godot",
              ],
            },
            {
              title: "Integration & iteration",
              items: [
                "Integrated the assets and music contributed by the group",
                "Iterated on the game together with AI-assisted coding",
                "Helped turn the group’s concepts and prompts into a working, playable build",
              ],
            },
            {
              title: "Visual refinement",
              items: [
                "Refined the visual result toward the end of the project",
                "Improved the background parallax and smaller visual details to make the game feel smoother and more cohesive",
              ],
            },
          ],

          workflowLabel: "Rapid AI workflow",
          workflow: [
            "Concept",
            "Visual direction",
            "AI-generated assets",
            "AI-assisted implementation",
            "Integration in Godot",
            "Testing",
            "Visual polish",
          ],

          reflectionLabel: "Result & reflection",
          reflection: [
            "The project was intentionally an experiment rather than a fully developed game. In 2.5 days we went from an idea to a playable prototype and learned where AI could accelerate production — and where human direction, testing and refinement were still necessary.",
            "For me, the most valuable part was learning how to guide an AI-assisted workflow rather than simply generate isolated outputs. The final result came from continuously selecting, adjusting, integrating and refining what the tools produced.",
          ],

          nextProject: "Next project",
          nextTitle: "Sellpy Redesign",
        };

  return (
    <article className="case-study case-study--ghost">
      <div className="case-study__container">
        <Link className="case-study__back" to="/work">
          ← {content.back}
        </Link>

        {/* Hero */}
        <header className="case-study__hero ghost-hero">
          <p className="case-study__eyebrow">{content.eyebrow}</p>
          <h1 className="case-study__title">{content.title}</h1>
          <p className="case-study__intro">{content.intro}</p>

          <div className="ghost-hero__actions">
            <a
              className="hero__primary-link"
              href={ITCH_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.playLabel}
              <span className="ghost-visually-hidden"> {content.newTab}</span>
              <span aria-hidden="true">↗</span>
            </a>

            <a
              className="hero__secondary-link"
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.githubLabel}
              <span className="ghost-visually-hidden"> {content.newTab}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </header>

        <figure className="ghost-frame ghost-frame--final">
          <div className="ghost-frame__media">
            <ImageLightbox src={ghostGameplayHero} alt={content.heroAlt} />
          </div>

          <figcaption className="ghost-frame__caption">
            <span className="ghost-tag ghost-tag--final">
              {content.heroTag}
            </span>
            <span>{content.heroCaption}</span>
          </figcaption>
        </figure>

        <dl className="ghost-meta">
          {content.meta.map((item) => (
            <div className="ghost-meta__item" key={item.label}>
              <dt className="case-study__label">{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>

        {/* Challenge */}
        <section
          className="case-study__section ghost-challenge"
          aria-labelledby="ghost-challenge-heading"
        >
          <h2 id="ghost-challenge-heading" className="case-study__label">
            {content.challengeLabel}
          </h2>

          <div>
            <p className="case-study__large-text">{content.challengeLead}</p>
            <p className="ghost-body">{content.challengeText}</p>
          </div>
        </section>

        {/* Gameplay video */}
        <section
          className="case-study__media-section ghost-video-section"
          aria-labelledby="ghost-video-heading"
        >
          <div className="case-study__section-heading">
            <p className="case-study__label">{content.videoLabel}</p>
            <h2 id="ghost-video-heading">{content.videoTitle}</h2>
            <p>{content.videoText}</p>
          </div>

          <div className="case-study__video ghost-video">
            {gameplayVideoSrc ? (
              <VideoPreview
                src={gameplayVideoSrc}
                title="Lost Little Ghost gameplay video"
                allowZoom
              />
            ) : (
              <p className="ghost-video__placeholder">
                {content.videoPlaceholder}
              </p>
            )}
          </div>
        </section>

        {/* Visual direction */}
        <section
          className="ghost-direction"
          aria-labelledby="ghost-direction-heading"
        >
          <div className="case-study__section-heading ghost-direction__text">
            <p className="case-study__label">{content.directionLabel}</p>
            <h2 id="ghost-direction-heading">{content.directionTitle}</h2>
            {content.directionText.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <figure className="ghost-frame ghost-frame--concept">
            <div className="ghost-frame__media">
              <ImageLightbox
                src={ghostVisualDirection}
                alt={content.conceptAlt}
              />
            </div>

            <figcaption className="ghost-frame__caption">
              <span className="ghost-tag ghost-tag--concept">
                {content.conceptTag}
              </span>
              <span>
                {content.conceptCaption}{" "}
                <strong>{content.conceptNote}</strong>
              </span>
            </figcaption>
          </figure>
        </section>

        {/* My contribution */}
        <section
          className="case-study__section ghost-contribution"
          aria-labelledby="ghost-contribution-heading"
        >
          <div className="case-study__section-heading">
            <p className="case-study__label">{content.contributionLabel}</p>
            <h2 id="ghost-contribution-heading">
              {content.contributionTitle}
            </h2>
            <p>{content.contributionText}</p>
          </div>

          <div className="ghost-contribution__groups">
            {content.contributionGroups.map((group, index) => (
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

        {/* Workflow */}
        <section
          className="ghost-workflow"
          aria-labelledby="ghost-workflow-heading"
        >
          <h2 id="ghost-workflow-heading" className="case-study__label">
            {content.workflowLabel}
          </h2>

          <ol className="ghost-workflow__steps">
            {content.workflow.map((step, index) => (
              <li className="ghost-workflow__step" key={step}>
                <span className="ghost-workflow__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="ghost-workflow__name">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Reflection */}
        <section
          className="case-study__reflection"
          aria-labelledby="ghost-reflection-heading"
        >
          <h2 id="ghost-reflection-heading" className="case-study__label">
            {content.reflectionLabel}
          </h2>

          <div>
            <p className="case-study__large-text">{content.reflection[0]}</p>
            <p className="ghost-body">{content.reflection[1]}</p>
          </div>
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

export default LostLittleGhost;
