import { Link, useParams } from "react-router-dom";

import sellpyPreview from "../../assets/videos/sellpy/sellpy-preview.mp4";
import sellpyHomepageRedesign from "../../assets/images/projects/sellpy/sellpy-homepage-redesign.png";
import sellpyProfileRedesign from "../../assets/images/projects/sellpy/sellpy-profile-redesign.png";

import auraBeautyPreview from "../../assets/videos/aura-beauty/aura-beauty-preview.mp4";
import auraIntroductionToDevelopment from "../../assets/images/projects/aura-beauty/aura-beauty-introduction-to-development.png";
import auraLearningJourney from "../../assets/images/projects/aura-beauty/aura-beauty-learning-journey.png";
import auraLearningLoop from "../../assets/images/projects/aura-beauty/aura-beauty-learning-loop.png";

import VideoPreview from "../../components/ui/VideoPreview";
import ImageLightbox from "../../components/ui/ImageLightbox";

import LostLittleGhost from "./LostLittleGhost";

import { useLanguage } from "../../features/language/useLanguage";

function CaseStudy() {
  const { slug } = useParams();
  const { language } = useLanguage();

  const isSellpy = slug === "sellpy-redesign";
  const isAuraBeauty = slug === "aura-beauty";
  const isLostLittleGhost = slug === "lost-little-ghost";

  if (isLostLittleGhost) {
    return <LostLittleGhost />;
  }

  if (!isSellpy && !isAuraBeauty) {
    return (
      <article className="case-study">
        <div className="case-study__container">
          <Link className="case-study__back" to="/work">
            ← {language === "sv" ? "Tillbaka till projekt" : "Back to work"}
          </Link>

          <h1>
            {language === "sv"
              ? "Case study kommer snart"
              : "Case study coming soon"}
          </h1>
        </div>
      </article>
    );
  }

  if (isSellpy) {
    const content =
      language === "sv"
        ? {
            eyebrow: "Tidigt skolprojekt · UX/UI · Figma",
            title: "Sellpy Redesign",
            intro:
              "Ett redesignkoncept som utforskar hur Sellpys digitala shoppingupplevelse kan göra second hand mer attraktivt, lättillgängligt och inspirerande.",
            disclaimer:
              "Skolprojekt och designkoncept. Projektet genomfördes inte på uppdrag av Sellpy.",

            challengeLabel: "Utmaningen",
            challenge:
              "Hur kan second hand kännas renare, enklare och mer attraktivt för människor som är öppna för att köpa begagnat men ändå ofta väljer nyproducerat?",

            roleLabel: "Min roll",
            role: "Research · UX/UI-design · Prototyping · Figma",

            approachLabel: "Arbetssätt",
            approach:
              "Projektet började som ett grupparbete kring överkonsumtion av kläder. Därefter utvecklade jag konceptet individuellt och omvandlade vår svartvita mid-fi-prototyp till ett high-fidelity redesignkoncept.",

            processLabel: "Process",
            process: [
              "Desk research",
              "Enkät",
              "Affinity mapping",
              "How Might We",
              "Crazy 8s",
              "Prototyping",
            ],

            improvementsLabel: "Viktiga förbättringar",
            improvements: [
              "Förenklade startsidan och minskade visuellt brus",
              "Förbättrade visuell hierarki och läsbarhet",
              "Gjorde profilvyn mer konsekvent och lättnavigerad",
              "Lyfte fram tvättservice och hållbarhetsbudskap tydligare",
            ],

            previewLabel: "Från referens till redesign",
            archivedLabel: "Sellpys webbplats — arkiverad referens",
            redesignLabel: "Mitt redesignkoncept",
            previewText:
              "Videon visar den version av Sellpys webbplats som användes som referens i projektet, följt av mitt redesignkoncept.",

            homepageTitle: "Redesign av startsidan",
            homepageText:
              "En tydligare startsida med mindre visuellt brus och starkare fokus på second hand, service och kategorier.",

            profileTitle: "Redesign av profilvyn",
            profileText:
              "En mer konsekvent profilvy med tydligare hierarki, navigering och viktiga användaråtgärder.",

            reflectionLabel: "Reflektion",
            reflection:
              "Projektet lärde mig hur viktigt det är att balansera visuell detaljnivå med testning och prioritering. Nästa gång skulle jag lägga mindre tid på tidig detaljpolering och reservera mer tid för validering och responsiv design.",

            nextProject: "Nästa projekt",
            nextTitle: "Aura Beauty",
          }
        : {
            eyebrow: "Early school project · UX/UI · Figma",
            title: "Sellpy Redesign",
            intro:
              "A redesign concept exploring how Sellpy’s digital shopping experience could make second-hand shopping feel more appealing, accessible and inspiring.",
            disclaimer:
              "School project and design concept. This work was not commissioned by Sellpy.",

            challengeLabel: "The challenge",
            challenge:
              "How could second-hand shopping feel cleaner, easier and more appealing to people who are open to buying used clothing but still often choose newly produced items?",

            roleLabel: "My role",
            role: "Research · UX/UI Design · Prototyping · Figma",

            approachLabel: "Approach",
            approach:
              "The project began as a group exploration of clothing overconsumption. I later continued the concept independently, transforming our grayscale mid-fi prototype into a high-fidelity redesign concept.",

            processLabel: "Process",
            process: [
              "Desk research",
              "Survey",
              "Affinity mapping",
              "How Might We",
              "Crazy 8s",
              "Prototyping",
            ],

            improvementsLabel: "Key improvements",
            improvements: [
              "Simplified the homepage and reduced visual clutter",
              "Improved visual hierarchy and readability",
              "Made the profile experience more consistent and easier to navigate",
              "Highlighted washing services and sustainability more clearly",
            ],

            previewLabel: "From reference to redesign",
            archivedLabel: "Sellpy website — archived reference",
            redesignLabel: "My redesign concept",
            previewText:
              "The video shows the version of Sellpy’s website used as reference for the project, followed by my redesign concept.",

            homepageTitle: "Homepage redesign",
            homepageText:
              "A clearer homepage with less visual clutter and stronger focus on second hand, services and categories.",

            profileTitle: "Profile redesign",
            profileText:
              "A more consistent profile experience with clearer hierarchy, navigation and key user actions.",

            reflectionLabel: "Reflection",
            reflection:
              "The project taught me to balance visual refinement with testing and prioritisation. If I repeated it, I would spend less time polishing details early and reserve more time for validation and responsive design.",

            nextProject: "Next project",
            nextTitle: "Aura Beauty",
          };

    return (
      <article className="case-study">
        <div className="case-study__container">
          <Link className="case-study__back" to="/work">
            ← {language === "sv" ? "Tillbaka till projekt" : "Back to work"}
          </Link>

          <header className="case-study__hero">
            <p className="case-study__eyebrow">{content.eyebrow}</p>
            <h1 className="case-study__title">{content.title}</h1>
            <p className="case-study__intro">{content.intro}</p>
            <p className="case-study__disclaimer">{content.disclaimer}</p>
          </header>

          <section className="case-study__overview">
            <div className="case-study__overview-item">
              <p className="case-study__label">{content.challengeLabel}</p>
              <p>{content.challenge}</p>
            </div>

            <div className="case-study__overview-item">
              <p className="case-study__label">{content.roleLabel}</p>
              <p>{content.role}</p>
            </div>
          </section>

          <section className="case-study__media-section">
            <div className="case-study__section-heading">
              <p className="case-study__label">{content.previewLabel}</p>

              <h2>
                {content.archivedLabel}
                <span aria-hidden="true"> → </span>
                {content.redesignLabel}
              </h2>

              <p>{content.previewText}</p>
            </div>

            <div className="case-study__video">
              <VideoPreview
                src={sellpyPreview}
                title="Sellpy redesign case study preview"
                allowZoom
              />
            </div>
          </section>

          <section className="case-study__design-showcase">
            <figure className="case-study__design-figure">
              <div className="case-study__design-image">
                <ImageLightbox
                  src={sellpyHomepageRedesign}
                  alt={
                    language === "sv"
                      ? "Mitt redesignkoncept för Sellpys startsida"
                      : "My redesign concept for the Sellpy homepage"
                  }
                />
              </div>

              <figcaption>
                <span>01</span>

                <div>
                  <strong>{content.homepageTitle}</strong>
                  <p>{content.homepageText}</p>
                </div>
              </figcaption>
            </figure>

            <figure className="case-study__design-figure">
              <div className="case-study__design-image">
                <ImageLightbox
                  src={sellpyProfileRedesign}
                  alt={
                    language === "sv"
                      ? "Mitt redesignkoncept för Sellpys profilvy"
                      : "My redesign concept for the Sellpy profile page"
                  }
                />
              </div>

              <figcaption>
                <span>02</span>

                <div>
                  <strong>{content.profileTitle}</strong>
                  <p>{content.profileText}</p>
                </div>
              </figcaption>
            </figure>
          </section>

          <section className="case-study__section">
            <div className="case-study__section-heading">
              <p className="case-study__label">{content.approachLabel}</p>
              <p className="case-study__large-text">{content.approach}</p>
            </div>

            <div>
              <p className="case-study__label">{content.processLabel}</p>

              <div className="case-study__process">
                {content.process.map((step, index) => (
                  <div className="case-study__process-item" key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="case-study__section">
            <div>
              <p className="case-study__label">{content.improvementsLabel}</p>

              <div className="case-study__improvements">
                {content.improvements.map((improvement, index) => (
                  <div className="case-study__improvement" key={improvement}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{improvement}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="case-study__reflection">
            <p className="case-study__label">{content.reflectionLabel}</p>
            <p className="case-study__large-text">{content.reflection}</p>
          </section>

          <Link className="case-study__next" to="/work/aura-beauty">
            <span>{content.nextProject}</span>
            <strong>{content.nextTitle}</strong>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </article>
    );
  }

  const auraContent =
    language === "sv"
      ? {
          eyebrow: "Skolprojekt · Gamification · UX",
          title: "Aura Beauty",
          intro:
            "Ett gamifierat utbildningskoncept för onboarding och kontinuerligt lärande inom skönhetsbranschen.",
          disclaimer:
            "Grupprojekt. Prototypen implementerades i Claude Artifact av en annan gruppmedlem utifrån gruppens gemensamma koncept, designbeslut och material.",

          challengeLabel: "Utmaningen",
          challenge:
            "Hur kan onboarding och kompetensutveckling bli mer aktiv, motiverande och lätt att följa utan att lärandet reduceras till text, film och poäng?",

          roleLabel: "Min roll",
          role: "Konceptutveckling · Gamification · UX · Användartester · Visuell presentation",

          previewLabel: "Prototyp",
          previewTitle: "Från onboarding till fortsatt utveckling",
          previewText:
            "Videon visar den interaktiva prototypen och hur användaren möter utbildningar, progression, uppdrag och feedback.",

          coreLabel: "Kärnidén",
          coreTitle: "Learning by doing",
          coreText:
            "I stället för att lägga XP och nivåer ovanpå passivt innehåll byggde vi själva lärandet kring quiz, kundscenarier, feedback och praktiska uppdrag.",

          systemLabel: "Gamification-system",
          system: [
            "XP och nivåer",
            "Progression",
            "Upplåsbara utbildningar",
            "Quiz och kundscenarier",
            "Praktiska butiksuppdrag",
            "Direkt feedback",
            "Topplista",
            "Fortsatt lärande",
          ],

          testingLabel: "Testning",
          testingTitle: "8 testpersoner · 3 testomgångar · 1 återtest",
          testingText:
            "Progression och feedback fungerade bra. Topplistan motiverade vissa användare men upplevdes som stressande eller irrelevant av andra. Därför fick tävlingsmomentet mindre fokus och systemen gjordes tydligare.",

          improvementsLabel: "Förbättringar efter test",
          improvements: [
            "Tydligare progression och låsta utbildningar",
            "Min utveckling gjordes mer begriplig",
            "Veckovyn i schemat förbättrades",
            "Onödiga gamification-element togs bort",
          ],

          pitchLabel: "Visuell storytelling & pitch",
          pitchText:
            "Jag tog stort ansvar för den visuella riktningen i vår slutpresentation. AI-genererat bildmaterial användes som utgångspunkt, och jag arbetade vidare med layout, typografi, text och grafiska element för att skapa en sammanhållen och säljande presentation.",

          reflectionLabel: "Reflektion",
          reflection:
            "Projektet lärde mig att mer gamification inte automatiskt skapar en bättre upplevelse. De starkaste delarna var de som faktiskt stödde lärandet: tydlig progression, meningsfulla uppdrag, feedback och möjligheten att använda kunskapen i praktiken.",

          nextProject: "Nästa projekt",
          nextTitle: "Lost Little Ghost",
        }
      : {
          eyebrow: "School project · Gamification · UX",
          title: "Aura Beauty",
          intro:
            "A gamified learning concept for onboarding and continuous development in beauty retail.",
          disclaimer:
            "Group project. The prototype was implemented in Claude Artifact by another group member based on the group’s shared concept, design decisions and assets.",

          challengeLabel: "The challenge",
          challenge:
            "How could onboarding and continuous learning become more active, motivating and easier to follow without reducing learning to passive content and points?",

          roleLabel: "My role",
          role: "Concept Development · Gamification · UX · User Testing · Visual Presentation",

          previewLabel: "Prototype",
          previewTitle: "From onboarding to continuous development",
          previewText:
            "The video shows the interactive prototype and how users move through training, progression, missions and feedback.",

          coreLabel: "Core idea",
          coreTitle: "Learning by doing",
          coreText:
            "Rather than adding XP and levels on top of passive training, we designed the learning itself around quizzes, customer scenarios, feedback and practical missions.",

          systemLabel: "Gamification system",
          system: [
            "XP and levels",
            "Progression",
            "Unlockable training",
            "Quizzes and customer scenarios",
            "Practical in-store missions",
            "Direct feedback",
            "Leaderboard",
            "Continuous learning",
          ],

          testingLabel: "Testing",
          testingTitle: "8 participants · 3 test rounds · 1 retest",
          testingText:
            "Progression and feedback worked well. The leaderboard motivated some users but felt stressful or irrelevant to others, so competition was reduced and the systems were clarified.",

          improvementsLabel: "Improvements after testing",
          improvements: [
            "Clarified progression and locked training",
            "Made My Development easier to understand",
            "Improved the weekly schedule overview",
            "Removed unnecessary gamification elements",
          ],

          pitchLabel: "Visual storytelling & pitch",
          pitchText:
            "I took major responsibility for the visual direction of our final pitch. AI-generated imagery was used as a starting point, and I refined the layouts, typography, copy and graphic elements to create a cohesive and persuasive presentation.",

          reflectionLabel: "Reflection",
          reflection:
            "The project taught me that more gamification does not automatically create a better experience. The strongest elements were the ones that supported learning directly: clear progression, meaningful tasks, feedback and opportunities to apply knowledge in practice.",

          nextProject: "Next project",
          nextTitle: "Lost Little Ghost",
        };

  return (
    <article className="case-study">
      <div className="case-study__container">
        <Link className="case-study__back" to="/work">
          ← {language === "sv" ? "Tillbaka till projekt" : "Back to work"}
        </Link>

        <header className="case-study__hero">
          <p className="case-study__eyebrow">{auraContent.eyebrow}</p>
          <h1 className="case-study__title">{auraContent.title}</h1>
          <p className="case-study__intro">{auraContent.intro}</p>
          <p className="case-study__disclaimer">{auraContent.disclaimer}</p>
        </header>

        <section className="case-study__overview">
          <div className="case-study__overview-item">
            <p className="case-study__label">{auraContent.challengeLabel}</p>
            <p>{auraContent.challenge}</p>
          </div>

          <div className="case-study__overview-item">
            <p className="case-study__label">{auraContent.roleLabel}</p>
            <p>{auraContent.role}</p>
          </div>
        </section>

        <section className="case-study__media-section">
          <div className="case-study__section-heading">
            <p className="case-study__label">{auraContent.previewLabel}</p>
            <h2>{auraContent.previewTitle}</h2>
            <p>{auraContent.previewText}</p>
          </div>

          <div className="case-study__video">
            <VideoPreview
              src={auraBeautyPreview}
              title="Aura Beauty prototype preview"
              allowZoom
            />
          </div>
        </section>

        {/* Visual overview */}
        <section className="case-study__design-showcase case-study__design-showcase--single">
          <figure className="case-study__design-figure">
            <div className="case-study__design-image">
              <ImageLightbox
                src={auraIntroductionToDevelopment}
                alt={
                  language === "sv"
                    ? "Aura Beauty från introduktion till utveckling"
                    : "Aura Beauty from onboarding to continuous development"
                }
              />
            </div>

            <figcaption>
              <span>01</span>

              <div>
                <strong>
                  {language === "sv"
                    ? "Från introduktion till utveckling"
                    : "From onboarding to development"}
                </strong>

                <p>
                  {language === "sv"
                    ? "En visuell överblick över hur lärande, progression och verksamhetens behov hänger ihop."
                    : "A visual overview of how learning, progression and business needs connect."}
                </p>
              </div>
            </figcaption>
          </figure>
        </section>

        <section className="case-study__section">
          <div className="case-study__section-heading">
            <p className="case-study__label">{auraContent.coreLabel}</p>
            <h2>{auraContent.coreTitle}</h2>
            <p className="case-study__large-text">{auraContent.coreText}</p>
          </div>

          <div>
            <p className="case-study__label">{auraContent.systemLabel}</p>

            <div className="case-study__process">
              {auraContent.system.map((item, index) => (
                <div className="case-study__process-item" key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning loop */}
        <section className="case-study__design-showcase case-study__design-showcase--single">
          <figure className="case-study__design-figure">
            <div className="case-study__design-image">
              <ImageLightbox
                src={auraLearningLoop}
                alt={
                  language === "sv"
                    ? "Aura Beautys lärandeloop"
                    : "Aura Beauty learning loop"
                }
              />
            </div>

            <figcaption>
              <span>02</span>

              <div>
                <strong>
                  {language === "sv" ? "Lärandeloopen" : "The learning loop"}
                </strong>

                <p>
                  {language === "sv"
                    ? "Lär → testa och gör → få feedback → se progression → gå vidare till nästa mål."
                    : "Learn → test and do → receive feedback → see progress → move to the next goal."}
                </p>
              </div>
            </figcaption>
          </figure>
        </section>

        <section className="case-study__section">
          <div className="case-study__section-heading">
            <p className="case-study__label">{auraContent.testingLabel}</p>
            <h2>{auraContent.testingTitle}</h2>
            <p>{auraContent.testingText}</p>
          </div>

          <div>
            <p className="case-study__label">{auraContent.improvementsLabel}</p>

            <div className="case-study__improvements">
              {auraContent.improvements.map((improvement, index) => (
                <div className="case-study__improvement" key={improvement}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{improvement}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning journey */}
        <section className="case-study__design-showcase case-study__design-showcase--single">
          <figure className="case-study__design-figure">
            <div className="case-study__design-image">
              <ImageLightbox
                src={auraLearningJourney}
                alt={
                  language === "sv"
                    ? "Aura Beautys läranderesa i praktiken"
                    : "Aura Beauty learning journey in practice"
                }
              />
            </div>

            <figcaption>
              <span>03</span>

              <div>
                <strong>
                  {language === "sv"
                    ? "Läranderesan i praktiken"
                    : "The learning journey in practice"}
                </strong>

                <p>
                  {language === "sv"
                    ? "Prototypen visar hur användaren möter utbildning, feedback och progression i vardagen."
                    : "The prototype shows how training, feedback and progression come together in everyday use."}
                </p>
              </div>
            </figcaption>
          </figure>
        </section>

        <section className="case-study__reflection">
          <p className="case-study__label">{auraContent.pitchLabel}</p>
          <p className="case-study__large-text">{auraContent.pitchText}</p>
        </section>

        <section className="case-study__reflection">
          <p className="case-study__label">{auraContent.reflectionLabel}</p>
          <p className="case-study__large-text">{auraContent.reflection}</p>
        </section>

        <Link className="case-study__next" to="/work/lost-little-ghost">
          <span>{auraContent.nextProject}</span>
          <strong>{auraContent.nextTitle}</strong>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}

export default CaseStudy;
