/* ==========================================================================
   CENTRAL CONTENT FILE
   --------------------------------------------------------------------------
   All texts, credits and media references for the whole site live here.

   Media files live in /public/media/<project>/ and are referenced by path.
   Each media entry keeps its alt text, caption and credit together.
   `aspect` must match the real file — media is never cropped.

   An entry without `src` is a placeholder: it shows as a labelled box in the
   local preview and is left out of the published site.

   "To confirm" notes live in review.local.ts (kept off GitHub) and
   show only in the local preview, never on the published site.
   ========================================================================== */

export type MediaKind = 'image' | 'video' | 'embed';

export interface Media {
  kind: MediaKind;
  /** Public path ('/media/…') or, for kind 'embed', a player URL. Empty = placeholder. */
  src?: string;
  /** Poster image for videos */
  poster?: string;
  /** WebVTT subtitles for videos */
  captionsSrc?: string;
  /** Direct link shown under a video in case the player fails */
  fallbackUrl?: string;
  /** Muted silent loop (homepage previews only) */
  loop?: boolean;
  /** Very tall images (e.g. storyboards): shown in a scrollable frame instead of shrinking */
  scroll?: boolean;
  /** CSS aspect ratio of the real asset — never crop to fit */
  aspect: string;
  alt: string;
  caption?: string;
  credit?: string;
  /** Video length in m:ss (used on the samples page) */
  duration?: string;
  /** What should go here — shown on placeholders only */
  intended?: string;
  suggestedPath?: string;
}

const M = '/media';

function img(path: string, w: number, h: number, alt: string, caption?: string, credit?: string, extra: Partial<Media> = {}): Media {
  return { kind: 'image', src: `${M}/${path}`, aspect: `${w} / ${h}`, alt, caption, credit, ...extra };
}
function vid(path: string, w: number, h: number, duration: string, alt: string, caption?: string, credit?: string): Media {
  const base = path.replace(/\.mp4$/, '');
  return { kind: 'video', src: `${M}/${path}`, poster: `${M}/${base}-poster.jpg`, aspect: `${w} / ${h}`, duration, alt, caption, credit };
}
/** An empty slot: placeholder in the local preview, hidden on the published site. */
function placeholder(project: string, name: string, kind: MediaKind, aspect: string, intended: string): Media {
  return { kind, aspect, alt: intended, intended, suggestedPath: `${M}/${project}/${name}.${kind === 'image' ? 'jpg' : 'mp4'}` };
}

/** True when a media entry should be rendered (real file, or placeholder while developing). */
export const visible = (m?: Media) => !!m && (!!m.src || import.meta.env.DEV);

/* --------------------------------------------------------------------------
   Site
   -------------------------------------------------------------------------- */
export const site = {
  name: 'Lea Schönfelder',
  role: 'Artist & Game Designer',
  email: 'lea@schoenfelder.co',
  year: 2026,
  description:
    'Lea Schönfelder is an artist and game designer. Her work explores what interaction can express, whose experiences games can represent, and who feels invited to play.',
  /** Social sharing image, 1200×630 recommended. */
  ogImage: '/media/perfect-woman/roles.jpg',
  tryAgainPrototype: 'https://leaschoenfelder.github.io/failing-play/',
};

/* --------------------------------------------------------------------------
   Credits (from the media manifest)
   -------------------------------------------------------------------------- */
const C = {
  pw: 'Concept, Art and Game Design: Lea Schönfelder · Programming and Game Design: Peter Lu',
  awc: '© ustwo games',
  fh: '© Fein Games',
  ta: '© Lea Schönfelder',
};

/* --------------------------------------------------------------------------
   Media library
   -------------------------------------------------------------------------- */
const pw = {
  heroPhoto: img('perfect-woman/hero-photo.jpg', 2000, 1334,
    'Full-body documentation of a player using Kinect poses to control Perfect Woman.',
    'Perfect Woman is played with the whole body.'),
  roles: img('perfect-woman/roles.jpg', 2000, 1125,
    'A colourful ensemble of exaggerated female life roles from the game.',
    'Some of the lives players can choose.'),
  exhibition: img('perfect-woman/exhibition-digifest.jpg', 1200, 1800,
    'Live exhibition documentation showing embodied play in a public setting.',
    'Perfect Woman at Digifest, 2015.', 'Photo: Paula Lafleur'),
  academic: img('perfect-woman/scene-academic.jpg', 1600, 900,
    'An academic or professional life-role scene from the game’s branching biography.'),
  underworld: img('perfect-woman/scene-underworld.jpg', 1600, 900,
    'A surreal underworld scene showing the game’s dark humour.'),
  performance: img('perfect-woman/screen-performance.jpg', 1440, 810,
    'The “Call Girl (60)” performance stage, with pose interface and a theatrical heart-and-star backdrop.',
    'Each life is a pose to be held.'),
  choice: img('perfect-woman/screen-choice.jpg', 1440, 810,
    'The life-path choice screen at age 85, offering several identities with different difficulty levels.',
    'Choosing the next stage of life, at age 85.'),
  grandmother: img('perfect-woman/screen-grandmother.jpg', 1440, 810,
    'The “Wise and Experienced Grandmother (85)” outcome beside a fireplace.'),
  concept: img('perfect-woman/concept.jpg', 612, 842,
    'A hand-drawn early concept connecting a professor-at-MIT persona to four possible outcomes in old age.',
    'Early concept sketch of the branching life paths.', 'Drawing: Lea Schönfelder'),
  storyboard: img('perfect-woman/storyboard.jpg', 1440, 6000,
    'A long storyboard mapping onboarding, Kinect calibration, choices, scenes, cutscenes, deaths and endings.',
    'Storyboard of the whole game, from calibration to endings. Scroll to see all of it.', undefined, { scroll: true }),
  teaser: vid('perfect-woman/teaser.mp4', 1280, 720, '0:31',
    'Teaser combining a performer’s body poses with the game’s life-role scenes.',
    'Teaser.', 'Video: Steven Amrhein'),
  // 65 s montage from the 2014 gameplay recording (manifest: PerfectWoman_Gameplay_Montage_65s.mp4)
  gameplay: vid('perfect-woman/gameplay.mp4', 1920, 1080, '1:05',
    'Gameplay montage combining the “Super Talented Singer and Performer” and “Eager Student” choices, their pose-controlled performances and the consequences “great career”, “miss some fun” and “burn out at 45”.',
    'Gameplay montage: two life roles, from body pose to choice and consequence.'),
};

const awc = {
  hero: img('assemble-with-care/hero.jpg', 2000, 1250,
    'A repair workspace with a red portable radio, a screwdriver, a small device, batteries and a cup on a leafy green background.',
    'Every object arrives with a story.', C.awc),
  storyboard: img('assemble-with-care/storyboard.jpg', 1199, 1600,
    'Storyboard frame: a seated woman at a table, with first-person hands holding a repair object in the foreground.',
    'Storyboard.', C.awc),
  selma: img('assemble-with-care/card-selma.png', 1400, 1049,
    'Character card for “Sensible Selma”, holding a tape recorder she no longer needs.', 'Sensible Selma.', C.awc),
  ada: img('assemble-with-care/card-ada.png', 1400, 1049,
    'Character card for “Ambitious Ada”, an activist holding “Fix the City” and “Vote Ada” signs.', 'Ambitious Ada.', C.awc),
  carl: img('assemble-with-care/card-carl.png', 1400, 1049,
    'Character card for “Caring Carl”, holding a green telephone linked to memories of his mother.', 'Caring Carl.', C.awc),
  trailer: vid('assemble-with-care/trailer.mp4', 1280, 720, '1:10',
    'Trailer introducing the repair shop, the characters and the emotional tone of the game.',
    'Trailer.', C.awc),
  camera: vid('assemble-with-care/repair-camera.mp4', 1280, 720, '1:39',
    'Close, tactile gameplay sequence of taking apart and reassembling a reflex camera.',
    'One complete repair: a reflex camera, taken apart and put back together.', C.awc),
};

const fh = {
  hero: img('finding-hannah/hero.jpg', 2048, 1536,
    'A dense, hand-painted Berlin transit scene filled with commuters and small narrative details.',
    'A Berlin transit scene, one of the game’s search spaces.', C.fh),
  intro: img('finding-hannah/hannah-intro.jpg', 1800, 1349,
    'Close-up of Hannah against a neon-lit Berlin background, introducing herself to the player.',
    '“My name is Hannah. I live in Berlin.”', C.fh),
  courtyard: img('finding-hannah/scene-courtyard.jpg', 1800, 1349,
    'An illustrated garden or courtyard scene populated with characters and searchable details.', undefined, C.fh),
  bookshop: img('finding-hannah/scene-bookshop.jpg', 1800, 1350,
    'A richly detailed bookshop interior showing the game’s hidden-object storytelling.',
    'Every object in a scene can carry part of the story.', C.fh),
  desk: img('finding-hannah/scene-desk.jpg', 2200, 1017,
    'A contemporary desk and workplace scene composed as an explorable illustrated tableau.', undefined, C.fh),
  cafe: img('finding-hannah/scene-cafe.jpg', 2200, 1017,
    'A busy café scene that places everyday social life at the centre of play.', undefined, C.fh),
  club: img('finding-hannah/scene-club.jpg', 2200, 1017,
    'A crowded Berlin club scene rendered as a colourful search space.', undefined, C.fh),
  wartime: img('finding-hannah/scene-wartime.jpg', 2200, 1017,
    'A wartime-era scene connecting the present-day story to an earlier generation.', undefined, C.fh),
  books: img('finding-hannah/scene-books.jpg', 2200, 1018,
    'A book-filled interior showing how environmental detail carries story and interaction.', undefined, C.fh),
  eva: img('finding-hannah/concept-eva.png', 740, 1200, 'Character concept artwork for Eva.', 'Eva.', C.fh),
  hannah: img('finding-hannah/concept-hannah.png', 741, 1200, 'Character concept artwork for Hannah, the contemporary protagonist.', 'Hannah.', C.fh),
  sigrid: img('finding-hannah/concept-sigrid.png', 742, 1200, 'Character concept artwork for Sigrid, from an older generation of the family.', 'Sigrid.', C.fh),
  knitting: img('finding-hannah/knitting-concept.jpg', 1199, 1600,
    'An early open-layout concept for Sigrid’s knitting interaction.', 'Early concept for Sigrid’s knitting interaction.', C.fh),
  trailer: vid('finding-hannah/trailer.mp4', 1280, 720, '0:49',
    'Trailer moving across the three women’s lives and different historical periods.',
    'Trailer.', C.fh),
  prototype: vid('finding-hannah/prototype-teaser.mp4', 886, 1920, '0:49',
    'An early monochrome portrait-format prototype with story fragments and line-based puzzles.',
    'Early prototype, before the final visual language.', C.fh),
};

const story = (folder: number, title: string, alts: string[]): Story => ({
  title,
  frames: alts.map((alt, i) => img(`try-again/stories/s${folder}-${i + 1}.jpg`, 800, 800, alt)),
});

const ta = {
  garden: img('try-again/garden-finale.jpg', 1400, 1400,
    'Wildflowers growing through a line-grid garden, with the phrase “This isn’t a fail.”',
    'The end of story 6: wildflowers grow through the grid.', C.ta),
  calendar: img('try-again/calendar.jpg', 1400, 1400,
    'A fully coloured, overcrowded weekly calendar showing the actual outcome of a planned routine.',
    'A planned week, and what it actually became.', C.ta),
  /** Illustrated stories, one square each; frames in reading order (source folders 1, 2, 3, 4, 6). */
  stories: [
    story(1, 'Fail #1', [
      'Title card: “Fail #1”.',
      'An angry couple shouting, with their sad daughter in front of them.',
      'Text panel: “I screamed at my husband. It made my daughter sad.”',
    ]),
    story(2, 'Fail #2', [
      'Title card: “Fail #2”.',
      'Text panel: “A woman cried bitterly on the subway. One should help.”',
      'A pair of white earphones beside a crying woman on the subway.',
      'Text panel: “When I finally took off my earphones, she was gone.”',
    ]),
    story(3, 'Fail #3', [
      'Title card: “Fail #3”.',
      'A frying pan with an egg and a slice of bacon, seen from above.',
      'Text panel: “I threw out the non-stick pan.”',
      'A black skull above the words “It’s not healthy”.',
      'Text panel: “The new one is cast-iron.”',
      'A cast-iron pan with burnt food.',
      'Text panel: “Now I burn everything I cook.”',
    ]),
    story(4, 'Fail #4', [
      'Title card: “Fail #4”.',
      'Text panel: “How I wish my schedule looks:”',
      'A sparse schedule with three entries: yoga, work and espresso with friends.',
      'Text panel: “How my schedule looks:”',
      'A schedule packed with blocks: drop off kid, meeting, focus time, lunch, call friend, important meeting, meeting and yoga.',
    ]),
    story(6, 'Fail #6', [
      'Title card: “Fail #6”.',
      'A garden bed with a few tiny sprouts.',
      'Text panel: “I’m late with gardening this year.”',
      'Two seedlings in small pots.',
      'Text panel: “Someone gives me 2 tomatoes.”',
      'Text panel: “I don’t plant them.” Below, the two seedlings wilting in their pots.',
      'Text panel: “After weeks, wild flowers grow by themselves.”',
      'White wild flowers growing out of the garden bed.',
      'Text panel: “This isn’t a fail.”',
      'Wildflowers growing through a line-grid garden.',
    ]),
  ],
  gameplay: vid('try-again/gameplay.mp4', 1126, 2436, '0:29',
    'Portrait gameplay: start screen, a planned routine, a drawn line, the overcrowded calendar and a second solution.',
    'Gameplay recording on a phone.', C.ta),
};

/* --------------------------------------------------------------------------
   Homepage copy
   -------------------------------------------------------------------------- */
export const home = {
  eyebrow: 'Artist & Game Designer',
  /** Each array item is one line of the headline (deliberate line breaks). */
  headline: ['Expanding the', 'Language and', 'Audience of Games'],
  intro:
    'I make games that explore what interaction can express, whose experiences games can represent, and who feels invited to play. My work moves between experimental performance, tactile puzzles and personal storytelling, using familiar and unfamiliar forms of play to explore human experience.',
  samplesLabel: 'View Selected Work Samples',
  samplesSub: 'Four works',
  exploreLabel: 'Explore the work',

  openingMedia: {
    perfectWoman: { ...pw.heroPhoto, caption: 'Perfect Woman, 2014', credit: undefined },
    tryAgain: { ...ta.garden, caption: 'Try Again, ongoing', credit: undefined },
  },

  inquiry: [
    {
      title: 'Interaction as Expression',
      text: 'How can the actions we perform in games give form to emotions, relationships and social experiences?',
    },
    {
      title: 'Expanding Participation',
      text: 'How can games make room for different perspectives, stories and creators without demanding familiarity with established gaming conventions?',
    },
  ],
  inquiryBridge:
    'Experimentation and accessibility are not opposites. Their relationship is one of the central questions of my practice.',

  bio: [
    'Lea Schönfelder is a German artist and game designer whose work explores games as a medium for personal, emotional and social expression. Her practice spans independent experimental games, internationally recognised interactive works and interdisciplinary creative collaborations.',
    'Her projects include Perfect Woman, Monument Valley 2, Assemble with Care and Finding Hannah. She co-founded the independent studio Fein Games and continues to explore new approaches to interactive storytelling through her ongoing work Try Again.',
  ],
  recognition: [
    { award: 'BAFTA Breakthrough UK', year: '2020', note: 'Personal recognition' },
    { award: 'Apple App Store Award, Cultural Impact', year: '2023', note: 'Finding Hannah' },
    { award: 'A MAZE. Most Amazing Game Award', year: '2014', note: 'Perfect Woman' },
  ],
  /** One short line on exhibitions — only verified institutions. Empty = hidden. */
  exhibitionsLine: '',
};

/* --------------------------------------------------------------------------
   Projects
   -------------------------------------------------------------------------- */
export interface ContextItem { label: string; detail?: string; href?: string }
export interface LinkItem { label: string; href: string; external?: boolean }
export interface Gallery { title: string; items: Media[] }
export interface Story { title: string; frames: Media[] }

export interface Project {
  slug: string;
  principal: boolean;
  number?: string;
  title: string;
  year: string;
  medium: string;
  role: string;
  collaborators: string;
  /** Short credit line used on the homepage */
  creditShort: string;
  status?: string;
  question: string;

  home?: { headline: string; caption: string; media: Media[] };

  hero: Media;
  /** 'wide' = full-width hero; 'portrait' = vertical media next to the text */
  heroLayout: 'wide' | 'portrait';

  work: string[];
  interaction: { title: string; text: string[]; media: Media[] };
  galleries?: Gallery[];
  /** Click-through picture stories, shown in one row */
  stories?: { title: string; hint: string; items: Story[] };
  contribution: string[];
  fullCredits?: string[];
  process: Media[];
  context: ContextItem[];
  links: LinkItem[];

  /** Colours used for this project's sections only */
  theme?: { bg: string; fg: string; muted: string; line: string };

  next: string;
}

export const projects: Project[] = [
  /* ---------------------------------------------------------------- 01 */
  {
    slug: 'perfect-woman',
    principal: true,
    number: '01',
    title: 'Perfect Woman',
    year: '2014',
    medium: 'Movement-based game for Kinect',
    role: 'Concept, Art and Game Design',
    collaborators: 'Peter Lu (Programming and Game Design)',
    creditShort: C.pw,
    question: 'What does it take to perform a perfect life?',
    home: {
      headline: 'When social expectations become physical performance.',
      caption:
        'A movement-based game that turns the pressure to live a perfect life into a physical challenge.',
      media: [pw.roles, pw.exhibition],
    },
    hero: pw.heroPhoto,
    heroLayout: 'wide',
    work: [
      'Perfect Woman is a game played with the whole body. Players move through the stages of a woman’s life and, at each stage, choose who they want to become. Every choice is tied to a pose that has to be held in front of a Kinect camera.',
      'The game takes the expectations placed on women and turns them into a physical challenge. Trying to live a perfect life becomes something players feel in their own bodies: stretching, balancing and struggling to keep up.',
    ],
    interaction: {
      title: 'The pose as a choice',
      text: [
        'The central decision was to make social pressure physical. Instead of pressing a button to choose a path, players commit to it with their posture. The more a choice promises, the harder the pose becomes to hold.',
        'Watching someone play is part of the work. The audience sees the effort, the hesitation and the moment the body gives in.',
      ],
      media: [pw.gameplay, pw.choice, pw.performance],
    },
    galleries: [
      { title: 'From the game', items: [pw.teaser, pw.roles, pw.academic, pw.underworld, pw.grandmother] },
    ],
    contribution: [
      'I conceived Perfect Woman and was responsible for its concept, art and game design. Peter Lu programmed the game and shaped its game design with me.',
    ],
    fullCredits: [
      'Concept, Art and Game Design: Lea Schönfelder',
      'Programming and Game Design: Peter Lu',
      'Additional Art: Marius Winter',
      'Producers: Benedikt Haas and Annika Bauer',
      'Website and Video: Steven Amrhein',
    ],
    process: [pw.concept, pw.exhibition, pw.storyboard],
    context: [
      { label: 'A MAZE. Most Amazing Game Award', detail: '2014' },
      { label: 'Exhibited internationally, including Digifest 2015' },
    ],
    links: [],
    next: 'assemble-with-care',
  },

  /* ---------------------------------------------------------------- 02 */
  {
    slug: 'assemble-with-care',
    principal: true,
    number: '02',
    title: 'Assemble with Care',
    year: '2019',
    medium: 'Narrative puzzle game',
    role: 'Lead Game Designer; led the design and development team',
    collaborators: 'ustwo games',
    creditShort: 'Lead Game Designer, ustwo games',
    question: 'Can the act of repairing something become a way to explore emotional relationships?',
    home: {
      headline: 'Repairing objects. Reconnecting people.',
      caption:
        'An exploration of how tactile interactions can become metaphors for care, memory and emotional repair.',
      media: [awc.hero],
    },
    hero: awc.hero,
    heroLayout: 'wide',
    work: [
      'In Assemble with Care, players restore cherished objects that belong to the people of a small town. Each object carries a story.',
      'Opening it up, understanding how it works and putting it back together becomes a way of entering the lives and relationships of its owners. The game is calm and unhurried. It asks players to handle things carefully, and to notice that the people who own them need care too.',
    ],
    interaction: {
      title: 'Repair as metaphor',
      text: [
        'Every repair follows the same rhythm: take the object apart, find what is broken, mend it and reassemble it. The interactions are tactile and paced so that each part is handled rather than skipped.',
        'This physical attention mirrors the emotional work in the story: understanding how something fits together before trying to fix it.',
      ],
      media: [awc.camera],
    },
    galleries: [{ title: 'Trailer', items: [awc.trailer] }],
    contribution: [
      'As lead game designer, I led the design and development team of Assemble with Care. The game is a ustwo games production, made by the whole studio team.',
    ],
    fullCredits: ['A ustwo games production', 'Lead Game Designer: Lea Schönfelder', '© ustwo games'],
    process: [awc.storyboard, awc.selma, awc.ada, awc.carl],
    context: [
      { label: 'Apple Arcade launch title', detail: '2019' },
      { label: 'BAFTA Games Award nomination', detail: 'For the game' },
    ],
    links: [],
    next: 'finding-hannah',
  },

  /* ---------------------------------------------------------------- 03 */
  {
    slug: 'finding-hannah',
    principal: true,
    number: '03',
    title: 'Finding Hannah',
    year: '2023',
    medium: 'Narrative hidden-object game',
    role: 'Co-founder & Co-CEO, Creative Direction',
    collaborators: 'Fein Games',
    creditShort: 'Creative Direction, Fein Games',
    question: 'How can familiar game conventions open up space for unfamiliar perspectives?',
    home: {
      headline: 'Making room for stories rarely told in games.',
      caption:
        'Three generations of women, their search for self-determination, and familiar forms of play that invite new audiences into their stories.',
      media: [fh.hero],
    },
    hero: fh.hero,
    heroLayout: 'wide',
    work: [
      'Finding Hannah tells the story of three generations of women in Berlin and their search for self-determination: who they are, what they choose and what they are allowed to choose.',
      'The story unfolds through hidden-object scenes, one of the most widely played casual game forms. This makes the narrative approachable for people who might not think of themselves as players, and gives space to perspectives that games rarely tell.',
    ],
    interaction: {
      title: 'Familiar forms, unfamiliar stories',
      text: [
        'Hidden-object games are widely played but rarely taken seriously. Choosing this form was an artistic decision: a mechanic many people already know lowers the threshold, so attention can move to the characters and their lives.',
        'Searching a scene becomes a way of looking closely at someone’s world: their rooms, their belongings and the traces of their decisions.',
      ],
      media: [fh.intro, fh.bookshop],
    },
    galleries: [
      { title: 'Scenes', items: [fh.trailer, fh.cafe, fh.club, fh.desk, fh.wartime, fh.books, fh.courtyard] },
    ],
    contribution: [
      'As co-founder and co-CEO of Fein Games, I was creative director of Finding Hannah and led its creative, production and business direction. The game was made by the Fein Games team; its art is by Elena Resko and Bien Tran.',
    ],
    fullCredits: [
      'A Fein Games production',
      'Creative Direction: Lea Schönfelder',
      'Art: Elena Resko and Bien Tran',
      'With the Fein Games team, including Franziska Zeiner, Rebecca Harwick, Piotr Skrzypczyński, Ewa Chruściel, Kate Miller and Ian Stewart',
      '© Fein Games',
    ],
    process: [fh.eva, fh.hannah, fh.sigrid, fh.knitting, fh.prototype],
    context: [
      { label: 'Apple App Store Award, Cultural Impact', detail: '2023' },
      { label: 'Apple Design Award finalist, Inclusion', detail: '2023' },
    ],
    links: [],
    theme: { bg: '#E9DDCB', fg: '#1C1B19', muted: '#5F5A52', line: '#CDBFA9' },
    next: 'try-again',
  },

  /* ---------------------------------------------------------------- 04 */
  {
    slug: 'try-again',
    principal: true,
    number: '04',
    title: 'Try Again',
    year: '2026',
    medium: 'Illustrated stories and line puzzles, browser prototype',
    role: 'Independent work',
    collaborators: 'Independent project',
    creditShort: 'Try Again, 2026. © Lea Schönfelder',
    status: 'Ongoing · prototype',
    question: 'What happens when everyday failure becomes the starting point for a playful story?',
    home: {
      headline: 'Small failures. Playable stories.',
      caption:
        'An ongoing experiment in interactive storytelling, combining personal accounts of everyday imperfection with short illustrated narratives and accessible logic puzzles.',
      media: [ta.stories[4].frames[6], ta.stories[4].frames[8], ta.gameplay],
    },
    hero: ta.gameplay,
    heroLayout: 'portrait',
    work: [
      'Try Again is an ongoing experiment in interactive storytelling. It combines short, personal accounts of everyday imperfection with illustrated stories and approachable logic puzzles.',
      'The project explores how vulnerability, humour and small interactive challenges can sit together, and how a brief, approachable interaction can carry a personal story without requiring any experience with games.',
    ],
    interaction: {
      title: 'Drawing a line through a story',
      text: [
        'Each story is told through illustrated panels and continued through a small line puzzle. The player draws a line through a grid, and the drawing becomes part of the story: a planned week turns into an overcrowded calendar, a late garden fills with wildflowers.',
        'The puzzles are not meant to test skill. They let players step briefly into the story, and sometimes fail at it themselves.',
      ],
      media: [ta.calendar, ta.garden],
    },
    stories: {
      title: 'Stories',
      hint: 'Click a story to step through it, one picture at a time.',
      items: ta.stories,
    },
    contribution: [
      'Try Again is my ongoing independent project. It is currently an experimental prototype, playable in the browser in English and German.',
    ],
    fullCredits: ['Try Again, 2026. © Lea Schönfelder'],
    process: [],
    context: [
      { label: 'Ongoing prototype', detail: 'Playable in the browser, English and German' },
      { label: 'Seven illustrated stories so far' },
    ],
    links: [{ label: 'Play the Prototype', href: site.tryAgainPrototype, external: true }],
    theme: { bg: '#EFE3D2', fg: '#1C1B19', muted: '#635D55', line: '#D6C6B0' },
    next: 'monument-valley-2',
  },

  /* ---------------------------------------------------------- supplementary */
  {
    slug: 'monument-valley-2',
    principal: false,
    title: 'Monument Valley 2',
    year: '2017',
    medium: 'Puzzle game, mobile',
    role: 'Senior Game Designer',
    collaborators: 'ustwo games',
    creditShort: 'Senior Game Designer, ustwo games',
    question: 'How can spatial interaction give form to a relationship?',
    home: {
      headline: 'Monument Valley 2',
      caption: 'Exploring how spatial interaction can express the relationship between a mother and child.',
      media: [placeholder('monument-valley-2', 'thumb', 'image', '4 / 3', 'Small image of mother and child in the game')],
    },
    hero: placeholder('monument-valley-2', 'hero', 'image', '16 / 9', 'Hero: one strong image'),
    heroLayout: 'wide',
    work: [
      'Monument Valley 2 follows a mother and her child through a world of impossible architecture. Their relationship is expressed through space: how the two characters move together, apart and towards each other as the levels unfold.',
    ],
    interaction: {
      title: 'Two characters, one space',
      text: [
        'Level design and interaction carry the story. Guiding two characters through the same architecture lets the relationship between them become something the player navigates directly.',
      ],
      media: [placeholder('monument-valley-2', 'gameplay', 'video', '16 / 9', 'Relevant gameplay or level-design sequence')],
    },
    contribution: [
      'As senior game designer, I was involved in prototyping, interaction design and level design.',
      'Monument Valley 2 was created by the team at ustwo games. Its visual style, narrative and overall design are the work of many people.',
    ],
    process: [],
    context: [],
    links: [],
    next: 'perfect-woman',
  },
];

export const principalProjects = projects.filter((p) => p.principal);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug)!;

/* --------------------------------------------------------------------------
   Work samples (/samples)
   -------------------------------------------------------------------------- */
export interface Sample {
  slug: string;
  framing: string;
  role: string;
  clips: Media[];
}

export const samples = {
  headline: 'Selected Work Samples',
  sub: 'Four works exploring interaction as artistic expression, from embodied performance and emotional mechanics to accessible storytelling and contemporary experiments.',
  note: 'Curated selection for the KHM Expanded Gaming professorship application, 2026.',
  items: [
    {
      slug: 'perfect-woman',
      framing: 'Social expectations become a physical performance: players hold the poses their chosen life demands.',
      role: 'Concept, Art and Game Design · with Peter Lu (Programming and Game Design)',
      clips: [pw.teaser, pw.gameplay],
    },
    {
      slug: 'assemble-with-care',
      framing: 'Tactile repair as a way of approaching memory, relationships and care.',
      role: 'Lead Game Designer; led the design and development team · ustwo games',
      clips: [awc.trailer, awc.camera],
    },
    {
      slug: 'finding-hannah',
      framing: 'A familiar casual-game form opens up a story about three generations of women.',
      role: 'Co-founder & Co-CEO, Creative Direction · Fein Games',
      clips: [fh.trailer],
    },
    {
      slug: 'try-again',
      framing: 'Personal stories of everyday failure, told through illustrations and small line puzzles.',
      role: 'Ongoing independent work · prototype',
      clips: [ta.gameplay],
    },
  ] as Sample[],
};

const toSecs = (d?: string) => {
  if (!d) return 0;
  const [m, s] = d.split(':').map(Number);
  return m * 60 + s;
};
export const fmt = (secs: number) => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
export const sampleSecs = (s: Sample) => s.clips.reduce((t, c) => t + toSecs(c.duration), 0);
export const totalSecs = (items: Sample[]) => items.reduce((t, s) => t + sampleSecs(s), 0);
