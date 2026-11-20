/**
 * SINGLE SOURCE OF TRUTH FOR ALL EDITABLE SITE CONTENT.
 *
 * Text in [square brackets] is still missing from Prachya. Keep the slot and
 * render it visibly; replace the value when the real content arrives. Do not
 * invent numbers, awards or links that are not in the content doc.
 */

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type IconName =
  | 'home'
  | 'briefcase'
  | 'trophy'
  | 'brain'
  | 'folder'
  | 'users'
  | 'pen'
  | 'mic'
  | 'mail'
  | 'github'
  | 'linkedin'
  | 'kaggle'
  | 'facebook'
  | 'instagram'
  | 'x'
  | 'mapPin'
  | 'calendar'
  | 'graduationCap'
  | 'clock'
  | 'globe'
  | 'code'
  | 'sparkles'
  | 'award'
  | 'externalLink'
  | 'arrowRight'
  | 'lightbulb'
  | 'database'
  | 'terminal'
  | 'layers'
  | 'chart'
  | 'book'
  | 'target'
  | 'coffee'
  | 'heart'
  | 'python'
  | 'pytorch'
  | 'tensorflow'
  | 'numpy'
  | 'git'
  | 'googlecolab'
  | 'langchain';

export interface LinkItem {
  label: string;
  href: string;
  icon?: IconName;
}

export interface Profile {
  name: string;
  shortName: string;
  title: string;
  tagline: string;
  badgeText: string;
  heroTagline: string;
  heroHighlight: string;
  metaDescription: string;
  seoKeywords: string[];
  location: string;
  email: string;
  emailHref: string;
  photoLight: string;
  photoDark: string;
  photoAlt: string;
  photoCaption: string;
  contactInvitation: string;
  footerTagline: string;
}

export interface ExperienceItem {
  organization: string;
  organizationUrl?: string;
  logo?: string;
  role: string;
  tag: string;
  period: string;
  location: string;
  description: string;
  links?: LinkItem[];
}

export interface AchievementRow {
  id: string;
  icon: IconName;
  title: string;
  year: string;
  detail: string;
  certificatePath?: string;
  certificateAlt?: string;
}

export interface Achievements {
  honors: AchievementRow[];
  competitions: AchievementRow[];
}

export interface SkillItem {
  name: string;
  icon?: IconName;
}

export interface SkillGroup {
  title: string;
  icon: IconName;
  /** 1, 2 or 3 — the desktop column this card belongs to. */
  column: 1 | 2 | 3;
  skills: SkillItem[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  links: LinkItem[];
}

export interface LeadershipItem {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface SeminarLink {
  label: string;
  /** Missing links are hidden until Prachya sends the URL. */
  href?: string;
}

export interface Seminar {
  slug: string;
  title: string;
  host: string;
  date: string;
  topic: string;
  summary: string;
  details: string;
  topics: string[];
  photos: string[];
  links: SeminarLink[];
}

export interface FeatureItem {
  source: string;
  href: string;
  line: string;
}

export interface Book {
  id: string;
  cover: string;
  title: string;
  author: string;
  topic: string;
  status: string;
  noteHref?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface DecorativeSymbol {
  char: string;
  /** Position as a percentage of the viewport. */
  x: number;
  y: number;
  size: number;
  blur?: boolean;
  delay: number;
  /** Hide on small screens to keep mobile light. */
  mobile?: boolean;
}

export interface DecorativeParticle {
  /** Position as a percentage of the viewport. */
  x: number;
  y: number;
  /** Diameter in pixels. */
  size: number;
  delay: number;
  duration: number;
  color: 'accent' | 'accent-2';
}

export interface DecorativeContent {
  codeLines: string[];
  symbols: DecorativeSymbol[];
  particles: DecorativeParticle[];
}

export interface NavItem {
  label: string;
  href: string;
  icon: IconName;
  /** Route prefixes that should also mark this item active. */
  activeOn?: string[];
  /** Home-page section to highlight, when the link itself is a route. */
  activeSection?: string;
}

export interface Navigation {
  primary: NavItem[];
  more: NavItem[];
}

/** Structural headings and UI labels. Kept here so components hold no copy. */
export interface SiteCopy {
  sectionTitles: {
    experience: string;
    achievements: string;
    skills: string;
    projects: string;
    leadership: string;
    writing: string;
    notes: string;
    talks: string;
    blog: string;
    contact: string;
  };
  labels: {
    viewProjects: string;
    contactMe: string;
    more: string;
    readMore: string;
    moreProjects: string;
  };
  achievements: {
    honorsTitle: string;
    competitionsTitle: string;
    achievement: string;
    year: string;
    detail: string;
    viewCertificate: string;
    close: string;
    certificates: string;
  };
  form: {
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    nameError: string;
    emailError: string;
    messageError: string;
    invalidForm: string;
    serverError: string;
    networkError: string;
    success: string;
    honeypot: string;
  };
  footer: {
    line: string;
  };
  writing: {
    subtitle: string;
    featuredLabel: string;
    sampleLabel: string;
    readEssay: string;
    moreFromJournal: string;
    articleSingular: string;
    articlePlural: string;
    exploreAll: string;
    backToWriting: string;
    searchPlaceholder: string;
    allTags: string;
    noArticles: string;
    moreComing: string;
    minuteRead: string;
    share: string;
    copyLink: string;
    copied: string;
    shareOnLinkedIn: string;
    shareOnX: string;
    previous: string;
    next: string;
    by: string;
    published: string;
    tableOfContents: string;
  };
  notes: {
    subtitle: string;
    notesTitle: string;
    allGroups: string;
    noNotes: string;
    backToNotes: string;
    viewRepo: string;
    sampleLabel: string;
    booksTitle: string;
    booksSubtitle: string;
    booksEmpty: string;
  };
  talks: {
    intro: string;
    viewAll: string;
    eventPost: string;
    video: string;
    facebookPost: string;
    photos: string;
    noTalks: string;
    aboutSession: string;
    topicsCovered: string;
    backToTalks: string;
    featuresTitle: string;
  };
  blog: {
    subtitle: string;
    allCategories: string;
    noPosts: string;
    backToBlog: string;
    viewAllPosts: string;
    sampleLabel: string;
    photos: string;
  };
  a11y: {
    openMenu: string;
    closeMenu: string;
    scrollToTop: string;
    switchToLight: string;
    switchToDark: string;
    placeholderValue: string;
    filterByTag: string;
    filterByGroup: string;
    filterByCategory: string;
    articleNavigation: string;
    noteNavigation: string;
    blogNavigation: string;
    talkNavigation: string;
  };
}

/* -------------------------------------------------------------------------- */
/* Content                                                                    */
/* -------------------------------------------------------------------------- */

export const profile: Profile = {
  name: 'Prachya Biswas',
  shortName: 'PB',
  title: 'Computer Science student at Brac University',
  tagline: 'AI/ML • Data Science • Math Olympiad',
  badgeText: 'AI/ML • Data Science • Math Olympiad',
  heroTagline: 'Trying to learn what machines learn',
  heroHighlight:
    'Regional Champion at BdMO · Problem setter at Bangladesh Mathematical Olympiad',
  metaDescription:
    'Prachya Biswas is a Computer Science student at BRAC University, Dhaka, working on machine learning and data science and serving as an academic team member at the Bangladesh Mathematical Olympiad.',
  seoKeywords: [
    'Prachya Biswas',
    'AI/ML',
    'Data Science',
    'Math Olympiad',
    'BRAC University',
    'Portfolio',
  ],
  location: 'Dhaka, Bangladesh',
  email: 'prachya.biswas@g.bracu.ac.bd',
  emailHref: 'mailto:prachya.biswas@g.bracu.ac.bd',
  photoLight: '/images/prachya_light.jpg',
  photoDark: '/images/prachya_dark.jpg',
  photoAlt: 'Portrait of Prachya Biswas',
  photoCaption: 'Prachya Biswas',
  contactInvitation:
    'Have a project, a research idea or a question about math olympiads? Send me a message.',
  footerTagline: 'AI/ML • Data Science • Math Olympiad',
};

export const experience: ExperienceItem[] = [
  {
    organization: 'ML & AI Research Lab, Bangladesh',
    role: 'Research Secretary',
    tag: '[tag]',
    period: 'Apr 7, 2026 – Present',
    location: 'Dhaka, Bangladesh',
    description:
      'Secretary of a research lab for machine learning and AI in Bangladesh.',
  },
  {
    organization: 'Bangladesh Mathematical Olympiad',
    role: 'Academic Team Member',
    tag: '[tag]',
    period: 'Dec 11, 2025 – Present',
    location: 'Dhaka, Bangladesh',
    description: 'Academic team member at the national math olympiad.',
  },
  {
    organization: 'IEEE BRAC University Student Branch',
    role: 'Secretariat',
    tag: '[tag]',
    period: 'Jun 25, 2026 – Present',
    location: 'Dhaka, Bangladesh',
    description: 'Part of the branch secretariat.',
  },
];

export const achievements: Achievements = {
  honors: [
    {
      id: 'certificate-of-excellence',
      icon: 'award',
      title: 'Certificate of Excellence',
      year: '2026',
      detail: 'For Academic Team contributions at the Bangladesh Mathematical Olympiad.',
      certificatePath: '/certificates/certificate-of-excellence.jpg',
      certificateAlt: 'Certificate of Excellence at the Bangladesh Mathematical Olympiad',
    },
    {
      id: 'bbaio-finalist',
      icon: 'trophy',
      title: 'Finalist, Bangladesh Blockchain and AI Olympiad (BBAIO)',
      year: '[year]',
      detail: 'Reached the final in the AI category.',
      certificatePath: '/certificates/bbaio.jpg',
      certificateAlt: 'Bangladesh Blockchain and AI Olympiad finalist certificate',
    },
    {
      id: 'idsol-2026',
      icon: 'globe',
      title: 'Participant, International Data Science Olympiad (IDSOL)',
      year: '2026',
      detail: 'Presented Vangari AI and led the data science side of the team.',
    },
    {
      id: 'bdmo-regional-champion',
      icon: 'target',
      title: 'Former Regional Champion, Bangladesh Mathematical Olympiad',
      year: '[year]',
      detail: 'Champion at the regional round of BdMO.',
    },
    {
      id: 'ibm-ml-professional',
      icon: 'brain',
      title: 'IBM Machine Learning Professional Certificate',
      year: '[year]',
      detail: 'Professional certificate from the IBM Skills Network.',
    },
    {
      id: 'national-childrens-award',
      icon: 'award',
      title: 'National Children\'s Award',
      year: '2019',
      detail: 'First place in both the Quiz Contest and the Science Project Contest.',
    },
    {
      id: 'promising-debater',
      icon: 'mic',
      title: 'Former Promising Debater',
      year: '[year]',
      detail: 'Recognised at the RC CTG.mid CITY-Drishti School of Debate.',
    },
    {
      id: 'duke-of-edinburgh-bronze',
      icon: 'award',
      title:
        "Bronze Standard Award, The Duke of Edinburgh's International Award",
      year: '[year]',
      detail: 'Completed the Bronze level of the international award programme.',
      certificatePath: '/certificates/duke-of-edinburgh.jpg',
      certificateAlt: "Duke of Edinburgh's Bronze Award certificate",
    },
  ],
  competitions: [
    {
      id: 'imlo-2026',
      icon: 'brain',
      title: 'International Machine Learning Olympiad (IMLO)',
      year: '2026',
      detail: 'Team of 3.',
    },
    {
      id: 'nasa-space-apps-2026',
      icon: 'globe',
      title: 'NASA Space Apps Challenge, Dhaka',
      year: '2026',
      detail: 'Data Science Lead, team Agnishikha, project AstraFlame.',
    },
  ],
};

export const skills: SkillGroup[] = [
  {
    title: 'Languages',
    icon: 'code',
    column: 1,
    skills: [
      { name: 'Python', icon: 'python' },
      { name: 'Java' },
      { name: 'TypeScript' },
    ],
  },
  {
    title: 'Machine Learning',
    icon: 'brain',
    column: 1,
    skills: [
      { name: 'Linear Regression' },
      { name: 'Logistic Regression' },
      { name: 'KNN' },
      { name: 'SVM' },
      { name: 'Neural Networks' },
      { name: 'Time Series Analysis' },
      { name: 'Gaussian Processes' },
    ],
  },
  {
    title: 'Data Science',
    icon: 'chart',
    column: 1,
    skills: [
      { name: 'Scikit-Learn' },
      { name: 'NumPy', icon: 'numpy' },
      { name: 'Pandas' },
      { name: 'SciPy' },
      { name: 'Matplotlib' },
      { name: 'Jupyter Notebook' },
      { name: 'Data Preprocessing & Feature Engineering' },
      { name: 'Data Pipelines' },
      { name: 'Model Evaluation & Cross-Validation' },
    ],
  },
  {
    title: 'AI',
    icon: 'sparkles',
    column: 2,
    skills: [
      { name: 'RAG Pipelines' },
      { name: 'AI Agents' },
      { name: 'Agentic AI' },
      { name: 'LangChain', icon: 'langchain' },
    ],
  },
  {
    title: 'Deep Learning',
    icon: 'layers',
    column: 2,
    skills: [
      { name: 'PyTorch', icon: 'pytorch' },
      { name: 'timm' },
      { name: 'TensorFlow', icon: 'tensorflow' },
      { name: 'Vision Transformer (ViT)' },
      { name: 'EfficientNet' },
    ],
  },
  {
    title: 'Backend and Web',
    icon: 'globe',
    column: 2,
    skills: [
      { name: 'Next.js' },
      { name: 'React' },
      { name: 'FastAPI' },
      { name: 'Express.js' },
    ],
  },
  {
    title: 'Databases',
    icon: 'database',
    column: 2,
    skills: [
      { name: 'PostgreSQL' },
      { name: 'PostGIS' },
    ],
  },
  {
    title: 'Tools',
    icon: 'terminal',
    column: 3,
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Google Colab', icon: 'googlecolab' },
    ],
  },
  {
    title: 'DevOps and Infrastructure',
    icon: 'terminal',
    column: 3,
    skills: [
      { name: 'Docker' },
      { name: 'Docker Compose' },
      { name: 'GitHub Actions' },
      { name: 'Linux' },
      { name: 'Azure' },
    ],
  },
  {
    title: 'Mathematics',
    icon: 'target',
    column: 3,
    skills: [
      { name: 'Olympiad Problem Solving' },
      { name: 'Teaching' },
    ],
  },
  {
    title: 'Spoken Languages',
    icon: 'globe',
    column: 3,
    skills: [{ name: 'Bangla' }, { name: 'English' }],
  },
];

export const projects: Project[] = [
  {
    id: 'medisense-bd',
    title: 'MediSense BD',
    description:
      'An integrated national health intelligence platform for Bangladesh. It forecasts dengue, diarrhea, influenza, typhoid and malaria risk across all 64 districts, and adds hospital routing, drug verification and Bengali symptom triage. Prachya implemented the TRACE forecasting model as data scientist.',
    tech: ['Python', 'scikit-learn', 'LSTM', 'Next.js', 'PostgreSQL'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/prachyabiswas',
        icon: 'github',
      },
    ],
  },
  {
    id: 'vangari-ai',
    title: 'Vangari AI',
    description:
      'A waste marketplace that connects waste owners with certified collectors. A photo of scrap goes in, and the AI estimates the material mix, weight and payout, then the nearest collector is dispatched. Built for IDSOL 2026, with Prachya leading the data science side.',
    tech: ['Gemma 4', 'PyTorch', 'ViT-Small', 'EfficientNet-B0', 'Next.js'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/prachyabiswas',
        icon: 'github',
      },
    ],
  },
  {
    id: 'astraflame',
    title: 'AstraFlame',
    description:
      'Team AgniShikha\'s entry for NASA Space Apps Challenge 2026 (Dhaka), "Flame in Freefall". From oxygen level, pressure, airflow and material it estimates flame spread, extinction and smoke, trained on 850 NASA microgravity combustion runs, with error bands and a warning when a condition was never tested. Prachya was Data Science Lead.',
    tech: ['Python', 'scikit-learn', 'Gaussian process', 'Next.js', 'NASA data'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/prachyabiswas',
        icon: 'github',
      },
    ],
  },
  {
    id: 'agentic-ai-from-scratch',
    title: 'Agentic-AI-From-Scratch',
    description:
      'A beginner-friendly learning repo on generative AI, RAG and agentic AI with LangChain, built module by module. It has theory notes and working code: first LLM calls, a blood report analysis app with a Streamlit UI, ChromaDB semantic search and a RAG pipeline.',
    tech: ['Python', 'LangChain', 'RAG', 'ChromaDB', 'Streamlit'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/prachyabiswas',
        icon: 'github',
      },
    ],
  },
  {
    id: 'ml-algorithms-from-scratch',
    title: 'Machine learning algorithms from scratch',
    description:
      'Linear regression, logistic regression, KNN, SVM and a neural network, each written from scratch in NumPy without ML libraries.',
    tech: ['Python', 'NumPy'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/prachyabiswas',
        icon: 'github',
      },
    ],
  },
  {
    id: 'computational-biology-meets-cells',
    title: 'Computational Biology Meets Cells',
    description:
      'Module-by-module notes from self-study of bioinformatics, with annotated commands and solved exercises. The 17-module plan covers sequence alignment, genome assembly, protein structure, phylogenetics, RNA-seq and multi-omics, with single-cell analysis (Seurat, CellChat, Monocle) planned.',
    tech: ['Bioinformatics', 'Python', 'R', 'Biopython', 'Conda'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/prachyabiswas',
        icon: 'github',
      },
    ],
  },
];

export const leadership: LeadershipItem[] = [
  {
    id: 'math-olympiad-academic-team',
    title: 'Math olympiad academic team',
    description:
      'Academic team member at the Bangladesh Mathematical Olympiad.',
    icon: 'users',
  },
  {
    id: 'teaching-olympiad-students',
    title: 'Teaching olympiad students',
    description:
      'Prep classes for Prothom Alo Math Olympiad students, from primary to advanced level. The first class was a two-hour lecture on the Pigeonhole Principle.',
    icon: 'lightbulb',
  },
  {
    id: 'study-materials',
    title: 'Study materials',
    description:
      'Worksheets and exam guides for Cambridge O Level Mathematics students.',
    icon: 'book',
  },
  {
    id: 'seminars-and-workshops',
    title: 'Seminars and workshops',
    description:
      'Sessions at CUET and Chittagong University (details under Talks and Features).',
    icon: 'mic',
  },
  {
    id: 'student-communities',
    title: 'Student communities',
    description:
      'Secretariat at IEEE BRAC University Student Branch, Sub-Executive of HR at BUEDF, General Member in R&D at BUCC.',
    icon: 'globe',
  },
];

/** Five seminars are listed in the doc; the main page shows the latest three. */
export const seminars: Seminar[] = [
  {
    slug: 'machine-learning-2026-ai-seminar',
    title: 'Machine Learning 2026: Artificial Intelligence seminar',
    host: 'IEEE CUET Student Branch',
    date: '[date]',
    topic: '[topic]',
    summary: '[summary from Prachya]',
    details:
      "Machine Learning 2026: Artificial Intelligence seminar, organised by the IEEE CUET Student Branch. Prachya conducted the session as a speaker. Photos from the session are below; date and the full topic list will be added here.",
    topics: [],
    photos: [
      '/images/cuet_workshop_pic_1.jpg',
      '/images/cuet_workshop_pic_2.jpg',
    ],
    links: [{ label: 'Event post' }],
  },
  {
    slug: 'seminar-placeholder-2',
    title: '[event name]',
    host: '[host: CUET or CU]',
    date: '[date]',
    topic: '[topic]',
    summary: '[summary from Prachya]',
    details: '',
    topics: [],
    photos: ['/images/cu_workshop_pic1.jpg'],
    links: [{ label: 'Video' }],
  },
  {
    slug: 'seminar-placeholder-3',
    title: '[event name]',
    host: '[host]',
    date: '[date]',
    topic: '[topic]',
    summary: '[summary from Prachya]',
    details: '',
    topics: [],
    photos: ['/images/cu_workshop_pic2.jpg'],
    links: [{ label: 'Facebook post' }],
  },
  {
    slug: 'seminar-placeholder-4',
    title: '[event name]',
    host: '[host]',
    date: '[date]',
    topic: '[topic]',
    summary: '[summary from Prachya]',
    details: '',
    topics: [],
    photos: ['/images/cu_workshop_pic3.jpg'],
    links: [{ label: 'Facebook post' }],
  },
  {
    slug: 'seminar-placeholder-5',
    title: '[event name]',
    host: '[host]',
    date: '[date]',
    topic: '[topic]',
    summary: '[summary from Prachya]',
    details: '',
    topics: [],
    photos: ['/images/cu_workshop_pic4.jpg'],
    links: [{ label: 'Facebook post' }],
  },
];

/** Media features are hidden until Prachya sends at least one real link. */
export const features: FeatureItem[] = [
  { source: 'Jamuna TV', href: '', line: '[one line from Prachya]' },
];

export const books: Book[] = [
  {
    id: 'book-placeholder',
    cover: '/images/writing-placeholder.svg',
    title: '[book title]',
    author: '[author]',
    topic: '[ML, AI or Mathematics]',
    status: '[Reading or Finished]',
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: 'Email',
    href: profile.emailHref,
    icon: 'mail',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/prachya.biswas',
    icon: 'facebook',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/prachyabiswas',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/prachya-biswas-06715932a',
    icon: 'linkedin',
  },
];

/** Navbar order follows the content doc. Writing is filtered by the navbar. */
export const navigation: Navigation = {
  primary: [
    { label: 'Home', href: '/#home', icon: 'home' },
    { label: 'Experience', href: '/#experience', icon: 'briefcase' },
    { label: 'Achievements', href: '/#achievements', icon: 'trophy' },
    { label: 'Skills', href: '/#skills', icon: 'brain' },
    { label: 'Projects', href: '/#projects', icon: 'folder' },
  ],
  more: [
    {
      label: 'Leadership & Mentorship',
      href: '/#leadership',
      icon: 'users',
    },
    {
      label: 'Writing',
      href: '/#writing',
      icon: 'pen',
      activeOn: ['/writing'],
    },
    {
      label: 'Notes and Books',
      href: '/notes',
      icon: 'book',
      activeOn: ['/notes'],
    },
    {
      label: 'Talks and Features',
      href: '/#talks',
      icon: 'mic',
      activeOn: ['/talks'],
    },
    {
      label: 'Blog',
      href: '/blog',
      icon: 'globe',
      activeOn: ['/blog'],
      activeSection: 'blog',
    },
    { label: 'Contact', href: '/#contact', icon: 'mail' },
  ],
};

export const copy: SiteCopy = {
  sectionTitles: {
    experience: 'Experience',
    achievements: 'Honors and achievements',
    skills: 'Skills',
    projects: 'Projects',
    leadership: 'Leadership and Mentorship',
    writing: 'Writing',
    notes: 'Notes and Books',
    talks: 'Talks and Features',
    blog: 'Blog',
    contact: 'Contact Me',
  },
  labels: {
    viewProjects: 'See What I Build',
    contactMe: 'Contact Me',
    more: 'More',
    readMore: 'Read more',
    moreProjects: 'More Projects on GitHub',
  },
  achievements: {
    honorsTitle: 'Honors and achievements',
    competitionsTitle: 'Competitions entered',
    achievement: 'Achievement',
    year: 'Year',
    detail: 'Detail',
    viewCertificate: 'View certificate',
    close: 'Close',
    certificates: 'Certificates',
  },
  form: {
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send Message',
    sending: 'Sending...',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'you@example.com',
    messagePlaceholder: 'Tell me a little about your idea, role or question...',
    nameError: 'Please enter a name between 2 and 80 characters.',
    emailError: 'Please enter a valid email address.',
    messageError: 'Message must be between 10 and 2000 characters.',
    invalidForm: 'Please fix the highlighted fields and try again.',
    serverError:
      'Something went wrong. Please email me directly at prachya.biswas@g.bracu.ac.bd.',
    networkError:
      'Something went wrong. Please email me directly at prachya.biswas@g.bracu.ac.bd.',
    success: 'Thanks, your message is sent. I will reply soon.',
    honeypot: 'Company',
  },
  footer: {
    line: '© 2026 Prachya Biswas. Dhaka, Bangladesh.',
  },
  writing: {
    subtitle:
      'Notes on machine learning, experiments and the things I learn along the way.',
    featuredLabel: 'Featured essay',
    sampleLabel: 'Sample article',
    readEssay: 'Read the essay',
    moreFromJournal: 'More from the journal',
    articleSingular: 'article',
    articlePlural: 'articles',
    exploreAll: 'Explore all writing',
    backToWriting: 'Back to Writing',
    searchPlaceholder: 'Search articles...',
    allTags: 'All',
    noArticles: 'No articles match your filters.',
    moreComing: 'More essays are on the way.',
    minuteRead: 'min read',
    share: 'Share this article',
    copyLink: 'Copy link',
    copied: 'Copied!',
    shareOnLinkedIn: 'Share on LinkedIn',
    shareOnX: 'Share on X',
    previous: 'Previous',
    next: 'Next',
    by: 'By',
    published: 'Published',
    tableOfContents: 'On this page',
  },
  notes: {
    subtitle:
      'Machine learning, AI and mathematics notes from my own study, plus the books I am reading.',
    notesTitle: 'Notes',
    allGroups: 'All',
    noNotes: 'No notes in this group yet.',
    backToNotes: 'Back to Notes',
    viewRepo: 'View repo',
    sampleLabel: 'Sample note',
    booksTitle: 'Books',
    booksSubtitle:
      'A reading list of machine learning, AI and mathematics books.',
    booksEmpty: 'The reading list is coming soon.',
  },
  talks: {
    intro: 'I have also conducted seminars and workshops at CUET and CU.',
    viewAll: 'View all seminars',
    eventPost: 'Event post',
    video: 'Video',
    facebookPost: 'Facebook post',
    photos: 'Photos',
    noTalks: 'Seminar details are coming soon.',
    aboutSession: 'About this session',
    topicsCovered: 'Topics covered',
    backToTalks: 'Back to Talks',
    featuresTitle: 'Features and media',
  },
  blog: {
    subtitle:
      'Photos and moments from university, olympiads, competitions and teaching.',
    allCategories: 'All',
    noPosts: 'No posts in this category yet.',
    backToBlog: 'Back to Blog',
    viewAllPosts: 'View all posts',
    sampleLabel: 'Sample post',
    photos: 'Photos',
  },
  a11y: {
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    scrollToTop: 'Scroll to top',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    placeholderValue: 'Placeholder value',
    filterByTag: 'Filter by tag',
    filterByGroup: 'Filter notes by group',
    filterByCategory: 'Filter posts by category',
    articleNavigation: 'Article navigation',
    noteNavigation: 'Note navigation',
    blogNavigation: 'Blog navigation',
    talkNavigation: 'Seminar navigation',
  },
};

/** Decorative-only strings. Rendered with aria-hidden and data-nosnippet. */
export const decorative: DecorativeContent = {
  codeLines: [
    'import torch',
    'from torch import nn',
    'model = ResNet(blocks=4)',
    'loss = criterion(logits, y)',
    'loss.backward()',
    'optimizer.step()',
    'model.fit(X_train, y_train)',
    'preds = model.predict(X_test)',
    'X = np.array([[...], [...], [...]])',
    'git commit -m "improve baseline"',
    'acc = accuracy_score(y, preds)',
    'with torch.no_grad():',
  ],
  symbols: [
    { char: '{ }', x: 7, y: 18, size: 1.4, delay: 0, mobile: true },
    { char: '< />', x: 78, y: 12, size: 1.2, delay: 1.5, mobile: true },
    { char: '( )', x: 22, y: 72, size: 1.1, delay: 3.2 },
    { char: '[ ]', x: 88, y: 64, size: 1.5, delay: 0.8 },
    { char: '=>', x: 48, y: 22, size: 1.3, delay: 2.6, blur: true },
    { char: '#', x: 63, y: 82, size: 1.8, delay: 4.1, blur: true },
    { char: ';', x: 12, y: 44, size: 1.0, delay: 1.1 },
    { char: '0 1', x: 92, y: 35, size: 1.0, delay: 5.3, mobile: true },
    { char: '∑', x: 35, y: 88, size: 1.7, delay: 2.2, blur: true },
    { char: '∇', x: 70, y: 48, size: 1.4, delay: 3.9 },
    { char: 'λ', x: 5, y: 88, size: 1.6, delay: 0.4 },
    { char: 'θ', x: 82, y: 88, size: 1.3, delay: 4.8, blur: true },
    { char: '∂', x: 44, y: 58, size: 1.2, delay: 1.9 },
    { char: 'σ', x: 28, y: 32, size: 1.5, delay: 5.7, mobile: true },
    { char: 'λθ', x: 56, y: 6, size: 1.0, delay: 2.9, blur: true },
    { char: '01', x: 16, y: 6, size: 1.1, delay: 3.5 },
  ],
  particles: [
    { x: 8, y: 22, size: 3, delay: 0, duration: 12, color: 'accent' },
    { x: 19, y: 68, size: 2, delay: 1.4, duration: 15, color: 'accent-2' },
    { x: 31, y: 14, size: 4, delay: 2.8, duration: 18, color: 'accent' },
    { x: 42, y: 82, size: 2, delay: 0.7, duration: 11, color: 'accent' },
    { x: 54, y: 38, size: 3, delay: 3.6, duration: 14, color: 'accent-2' },
    { x: 66, y: 72, size: 2, delay: 1.9, duration: 16, color: 'accent' },
    { x: 74, y: 18, size: 4, delay: 4.2, duration: 19, color: 'accent' },
    { x: 86, y: 54, size: 3, delay: 0.3, duration: 13, color: 'accent-2' },
    { x: 93, y: 86, size: 2, delay: 2.2, duration: 17, color: 'accent' },
    { x: 12, y: 92, size: 3, delay: 5.1, duration: 15, color: 'accent-2' },
    { x: 27, y: 46, size: 2, delay: 3.3, duration: 12, color: 'accent' },
    { x: 38, y: 28, size: 3, delay: 6.4, duration: 20, color: 'accent-2' },
    { x: 58, y: 8, size: 2, delay: 4.8, duration: 14, color: 'accent' },
    { x: 69, y: 94, size: 4, delay: 1.1, duration: 18, color: 'accent-2' },
    { x: 81, y: 34, size: 2, delay: 5.7, duration: 13, color: 'accent' },
    { x: 95, y: 12, size: 3, delay: 2.6, duration: 16, color: 'accent-2' },
    { x: 4, y: 58, size: 4, delay: 3.9, duration: 17, color: 'accent' },
    { x: 23, y: 8, size: 3, delay: 0.9, duration: 13, color: 'accent-2' },
    { x: 35, y: 62, size: 5, delay: 5.4, duration: 21, color: 'accent' },
    { x: 48, y: 48, size: 3, delay: 1.7, duration: 15, color: 'accent-2' },
    { x: 61, y: 26, size: 4, delay: 4.4, duration: 19, color: 'accent' },
    { x: 77, y: 80, size: 3, delay: 2.1, duration: 12, color: 'accent-2' },
    { x: 89, y: 44, size: 5, delay: 6.1, duration: 22, color: 'accent' },
    { x: 99, y: 68, size: 3, delay: 1.3, duration: 16, color: 'accent-2' },
  ],
};
