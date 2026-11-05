/* ==========================================================================
   CENTRAL CONTENT FILE
   --------------------------------------------------------------------------
   All texts, credits and media references for the whole site live here.

   To replace a placeholder with real media:
     1. Put the file into /public/media/<project>/ (e.g. hero.jpg)
     2. Set `src: '/media/<project>/hero.jpg'` on the matching slot below
     3. Check `aspect` matches the real file (e.g. '16 / 9', '9 / 16', '4 / 3')
     4. Write a meaningful `alt`, and `caption` / `credit` where needed

   Slots without `src` render as labelled placeholders.
   "To confirm" notes live in review.local.ts (kept off GitHub) and
   show only in the local preview, never on the published site.
   ========================================================================== */

export type MediaKind = 'image' | 'video' | 'embed';

export interface Media {
  kind: MediaKind;
  /** Public path ('/media/…') or, for kind 'embed', a player URL (YouTube/Vimeo). Empty = placeholder. */
  src?: string;
  /** Poster image for videos */
  poster?: string;
  /** WebVTT subtitles for videos */
  captionsSrc?: string;
  /** Direct link shown under a video in case the player fails */
  fallbackUrl?: string;
  /** Muted silent loop (homepage previews only) */
  loop?: boolean;
  /** CSS aspect ratio of the real asset — never crop to fit */
  aspect: string;
  alt: string;
  caption?: string;
  credit?: string;
  /** What should go here — shown on the placeholder */
  intended: string;
  /** Where the file is expected — shown on the placeholder */
  suggestedPath: string;
}

/** Helper to define a media slot with a suggested file path. */
function slot(
  project: string,
  name: string,
  m: Omit<Media, 'suggestedPath' | 'alt'> & { alt?: string; ext?: string },
): Media {
  const ext = m.ext ?? (m.kind === 'image' ? 'jpg' : 'mp4');
  const { ext: _ignored, ...rest } = m;
  return { alt: m.intended, ...rest, suggestedPath: `/media/${project}/${name}.${ext}` };
}

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
  /** Social sharing image, 1200×630, e.g. '/media/og.jpg'. Leave empty until available. */
  ogImage: '',
  failingPrototype: 'https://leaschoenfelder.github.io/failing-play/',
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
  samplesSub: 'Approx. 8 minutes · Four works',
  exploreLabel: 'Explore the work',

  openingMedia: {
    perfectWoman: slot('perfect-woman', 'opening', {
      kind: 'image',
      aspect: '4 / 3',
      intended: 'Perfect Woman — person physically playing, or exhibition view',
      caption: 'Perfect Woman, 2014',
    }),
    failing: slot('failing', 'opening', {
      kind: 'image',
      aspect: '3 / 4',
      intended: 'Failing — original illustrated story panel',
      caption: 'Failing, ongoing',
    }),
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
    'Her projects include Perfect Woman, Monument Valley 2, Assemble with Care and Finding Hannah. She co-founded the independent studio Fein Games and continues to explore new approaches to interactive storytelling through her ongoing work Failing.',
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
  contribution: string[];
  fullCredits?: string[];
  process: Media[];
  context: ContextItem[];
  links: LinkItem[];

  /** Colours sampled from the artwork, used for this project's sections only */
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
    medium: 'Movement-based game, Kinect',
    role: 'Game Director, Game Designer, Artist',
    collaborators: 'Co-created with Peter Lu',
    creditShort: 'Co-created with Peter Lu',
    question: 'What does it take to perform a perfect life?',
    home: {
      headline: 'When social expectations become physical performance.',
      caption:
        'A movement-based game that turns the pressure to live a perfect life into a physical challenge.',
      media: [
        slot('perfect-woman', 'home', {
          kind: 'image',
          aspect: '16 / 9',
          intended: 'Large exhibition photo or footage still: a person physically interacting with the game',
        }),
      ],
    },
    hero: slot('perfect-woman', 'hero', {
      kind: 'image',
      aspect: '16 / 9',
      intended: 'Hero: photograph or video of a person playing with Kinect',
    }),
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
      media: [
        slot('perfect-woman', 'gameplay', {
          kind: 'video',
          aspect: '16 / 9',
          intended: 'Gameplay footage showing body movement and the on-screen response',
        }),
        slot('perfect-woman', 'choices', {
          kind: 'image',
          aspect: '16 / 9',
          intended: 'Screen illustrating different life choices',
        }),
      ],
    },
    contribution: [
      'I co-created Perfect Woman with Peter Lu. I worked on the project as game director, game designer and artist.',
    ],
    process: [
      slot('perfect-woman', 'process', {
        kind: 'image',
        aspect: '4 / 3',
        intended: 'Optional: development sketch or exhibition documentation',
      }),
    ],
    context: [
      { label: 'A MAZE. Most Amazing Game Award', detail: '2014' },
      { label: 'Exhibited internationally, including at ZKM', detail: 'Selected exhibition history to follow' },
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
    medium: 'Narrative puzzle game, mobile and desktop',
    role: 'Game Director & Lead Game Designer',
    collaborators: 'ustwo games',
    creditShort: 'Game Director & Lead Game Designer, ustwo games',
    question: 'Can the act of repairing something become a way to explore emotional relationships?',
    home: {
      headline: 'Repairing objects. Reconnecting people.',
      caption:
        'An exploration of how tactile interactions can become metaphors for care, memory and emotional repair.',
      media: [
        slot('assemble-with-care', 'home', {
          kind: 'image',
          aspect: '4 / 3',
          intended: 'An actual repair interaction (not title artwork)',
        }),
      ],
    },
    hero: slot('assemble-with-care', 'hero', {
      kind: 'image',
      aspect: '16 / 9',
      intended: 'Hero: image showing a repair interaction',
    }),
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
      media: [
        slot('assemble-with-care', 'repair-sequence', {
          kind: 'video',
          aspect: '16 / 9',
          intended: 'Gameplay footage of one complete repair sequence',
        }),
        slot('assemble-with-care', 'detail-1', {
          kind: 'image',
          aspect: '4 / 3',
          intended: 'Detail shot demonstrating tactility and interaction design',
        }),
        slot('assemble-with-care', 'detail-2', {
          kind: 'image',
          aspect: '4 / 3',
          intended: 'Second detail shot',
        }),
      ],
    },
    contribution: [
      'I was game director and lead game designer of Assemble with Care, which was developed collaboratively by the team at ustwo games.',
    ],
    process: [
      slot('assemble-with-care', 'process', {
        kind: 'image',
        aspect: '4 / 3',
        intended: 'Development sketches or prototypes (if approved for use)',
      }),
    ],
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
    role: 'Co-founder, Game Director & Game Designer',
    collaborators: 'Fein Games',
    creditShort: 'Game Director & Game Designer, Fein Games',
    question: 'How can familiar game conventions open up space for unfamiliar perspectives?',
    home: {
      headline: 'Making room for stories rarely told in games.',
      caption:
        'Three generations of women, their search for self-determination, and familiar forms of play that invite new audiences into their stories.',
      media: [
        slot('finding-hannah', 'home', {
          kind: 'image',
          aspect: '16 / 9',
          intended: 'Colourful, recognisable hidden-object scene (full width)',
        }),
      ],
    },
    hero: slot('finding-hannah', 'hero', {
      kind: 'image',
      aspect: '16 / 9',
      intended: 'Hero: rich, recognisable hidden-object scene',
    }),
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
      media: [
        slot('finding-hannah', 'story', {
          kind: 'image',
          aspect: '16 / 9',
          intended: 'Visual or gameplay sequence involving the characters and their narrative',
        }),
        slot('finding-hannah', 'gameplay', {
          kind: 'video',
          aspect: '16 / 9',
          intended: 'Gameplay demonstrating familiar interaction conventions',
        }),
      ],
    },
    contribution: [
      'I co-founded Fein Games and was game director and game designer of Finding Hannah, which was created together with the studio team.',
    ],
    process: [
      slot('finding-hannah', 'process', {
        kind: 'image',
        aspect: '4 / 3',
        intended: 'Optional: story, art-direction or character-development document',
      }),
    ],
    context: [
      { label: 'Apple App Store Award, Cultural Impact', detail: '2023' },
      { label: 'Apple Design Award finalist, Inclusion', detail: '2023' },
    ],
    links: [],
    // Replace with colours sampled from the artwork once available.
    theme: { bg: '#E9DDCB', fg: '#1C1B19', muted: '#5F5A52', line: '#CDBFA9' },
    next: 'failing',
  },

  /* ---------------------------------------------------------------- 04 */
  {
    slug: 'failing',
    principal: true,
    number: '04',
    title: 'Failing',
    year: 'Ongoing',
    medium: 'Illustrated stories and logic puzzles, browser prototype',
    role: 'Concept, design and direction',
    collaborators: 'Development and art credits to follow',
    creditShort: 'Ongoing experimental work',
    status: 'Work in progress · prototype',
    question: 'What happens when everyday failure becomes the starting point for a playful story?',
    home: {
      headline: 'Small failures. Playable stories.',
      caption:
        'An ongoing experiment in interactive storytelling, combining personal accounts of everyday imperfection with short illustrated narratives and accessible logic puzzles.',
      media: [
        slot('failing', 'story-1', {
          kind: 'image',
          aspect: '3 / 4',
          intended: 'Original illustrated story panel 1',
        }),
        slot('failing', 'story-2', {
          kind: 'image',
          aspect: '3 / 4',
          intended: 'Original illustrated story panel 2',
        }),
        slot('failing', 'gameplay-portrait', {
          kind: 'video',
          aspect: '9 / 16',
          intended: 'Portrait gameplay footage (muted loop or poster)',
        }),
      ],
    },
    hero: slot('failing', 'hero', {
      kind: 'video',
      aspect: '9 / 16',
      intended: 'Hero: original portrait gameplay footage',
    }),
    heroLayout: 'portrait',
    work: [
      'Failing is an ongoing experiment in interactive storytelling. It combines short, personal accounts of everyday imperfection with illustrated stories and approachable logic puzzles.',
      'The project explores how vulnerability, humour and small interactive challenges can sit together, and how a brief, approachable interaction can carry a personal story without requiring any experience with games.',
    ],
    interaction: {
      title: 'Story and puzzle',
      text: [
        'Each story is told through illustrated panels and continued through a small logic puzzle. The puzzles are not meant to test skill. They let players step briefly into the story, and sometimes fail at it themselves.',
      ],
      media: [
        slot('failing', 'story-sequence', {
          kind: 'image',
          aspect: '3 / 4',
          intended: 'One complete illustrated story sequence',
        }),
        slot('failing', 'progression', {
          kind: 'video',
          aspect: '9 / 16',
          intended: 'Clip showing interaction and narrative progression',
        }),
      ],
    },
    contribution: [
      'Failing is my ongoing independent practice. The project is currently an experimental prototype, playable in the browser.',
    ],
    process: [
      slot('failing', 'process', {
        kind: 'image',
        aspect: '4 / 3',
        intended: 'Concept material (working title “Try Again”)',
      }),
    ],
    context: [
      { label: 'Ongoing prototype', detail: 'Not a released game' },
      { label: 'Earlier concept material', detail: 'Developed under the working title Try Again' },
    ],
    links: [{ label: 'Play the Prototype', href: site.failingPrototype, external: true }],
    // Replace with colours sampled from the illustrations once available.
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
      media: [
        slot('monument-valley-2', 'thumb', {
          kind: 'image',
          aspect: '4 / 3',
          intended: 'Small image of mother and child in the game',
        }),
      ],
    },
    hero: slot('monument-valley-2', 'hero', {
      kind: 'image',
      aspect: '16 / 9',
      intended: 'Hero: one strong image',
    }),
    heroLayout: 'wide',
    work: [
      'Monument Valley 2 follows a mother and her child through a world of impossible architecture. Their relationship is expressed through space: how the two characters move together, apart and towards each other as the levels unfold.',
    ],
    interaction: {
      title: 'Two characters, one space',
      text: [
        'Level design and interaction carry the story. Guiding two characters through the same architecture lets the relationship between them become something the player navigates directly.',
      ],
      media: [
        slot('monument-valley-2', 'gameplay', {
          kind: 'video',
          aspect: '16 / 9',
          intended: 'Relevant gameplay or level-design sequence',
        }),
      ],
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
  /** m:ss — update with the real duration of the final clip */
  duration: string;
  framing: string;
  role: string;
  video: Media;
}

export const samples = {
  headline: 'Selected Work Samples',
  sub: 'Four works exploring interaction as artistic expression, from embodied performance and emotional mechanics to accessible storytelling and contemporary experiments.',
  note: 'Curated selection for the KHM Expanded Gaming professorship application, 2026.',
  items: [
    {
      slug: 'perfect-woman',
      duration: '2:00',
      framing: 'Social expectations become a physical performance: players hold the poses their chosen life demands.',
      role: 'Co-creator with Peter Lu · Game Director, Game Designer, Artist',
      video: slot('samples', 'perfect-woman', {
        kind: 'video',
        aspect: '16 / 9',
        intended: 'Work sample: Perfect Woman (target 2:00)',
      }),
    },
    {
      slug: 'assemble-with-care',
      duration: '1:50',
      framing: 'Tactile repair as a way of approaching memory, relationships and care.',
      role: 'Game Director & Lead Game Designer · ustwo games',
      video: slot('samples', 'assemble-with-care', {
        kind: 'video',
        aspect: '16 / 9',
        intended: 'Work sample: Assemble with Care (target 1:50)',
      }),
    },
    {
      slug: 'finding-hannah',
      duration: '1:30',
      framing: 'A familiar casual-game form opens up a story about three generations of women.',
      role: 'Co-founder, Game Director & Game Designer · Fein Games',
      video: slot('samples', 'finding-hannah', {
        kind: 'video',
        aspect: '16 / 9',
        intended: 'Work sample: Finding Hannah (target 1:30)',
      }),
    },
    {
      slug: 'failing',
      duration: '2:30',
      framing: 'Personal stories of everyday failure, told through illustrations and small logic puzzles.',
      role: 'Ongoing independent work · prototype',
      video: slot('samples', 'failing', {
        kind: 'video',
        aspect: '9 / 16',
        intended: 'Work sample: Failing, portrait (target 2:30)',
      }),
    },
  ] as Sample[],
};

/** Sum of "m:ss" durations, returned as "m:ss" */
export function totalDuration(items: { duration: string }[]) {
  const secs = items.reduce((t, i) => {
    const [m, s] = i.duration.split(':').map(Number);
    return t + m * 60 + s;
  }, 0);
  return `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
}
