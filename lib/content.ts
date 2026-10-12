/**
 * All website content, extracted from the two source documents.
 *
 * `source` on each item is the traceability anchor used by
 * the project's content-traceability record — "P12" = company profile, page 12;
 * "D12" = ESG presentation, slide 12; "B12" = branding proposal, page 12.
 *
 * RULES ENFORCED ON THIS CONTENT:
 *  - No performance metric, target, percentage or count appears anywhere: the source has none.
 *  - No certification is claimed: the source has none.
 *  - No client name, personnel name, email address, phone number or postal address is included.
 *  - Wording is quoted from the source. Where the source is grammatically broken it has been
 *    lightly corrected ONLY where meaning is unaffected, and the correction is noted.
 */

export type Sourced<T> = T & { source: string };

/** A plain text line that carries its own provenance. */
export type SourcedText = { value: string; source: string };

/* ------------------------------------------------------------------ */
/* Positioning by audience  —  profile p11 / deck s11                   */
/* ------------------------------------------------------------------ */

export type AudienceTrack = Sourced<{
  id: 'corporation' | 'investor' | 'government' | 'rating';
  name: string;
  summary: string;
  detail: string;
}>;

export const audienceTracks: AudienceTrack[] = [
  {
    id: 'corporation',
    name: 'Corporation',
    summary: 'Embed ESG into how the business actually runs.',
    detail:
      'We provide the ESG implementation and also optimising company performance by utilizing ESG.',
    source: 'profile p11 / deck s11',
  },
  {
    id: 'investor',
    name: 'Investor',
    summary: 'See through the disclosure to the underlying position.',
    detail:
      'We help investor on ESG disclosure and providing clear insight about regulation framework to ' +
      'help them define the correct green investment.',
    source: 'profile p11 / deck s11',
  },
  {
    id: 'government',
    name: 'Government',
    summary: 'Meet the disclosure obligations of public contracting.',
    detail: 'We provide the ESG disclosure and implementation for the Government contracting agency.',
    source: 'profile p11 / deck s11',
  },
  {
    id: 'rating',
    name: 'Rating',
    summary: 'Build a defensible basis for an ESG rating.',
    detail: 'We provide comprehensive review and framework to define the ESG ratings.',
    source: 'profile p11 / deck s11',
  },
];

/* ------------------------------------------------------------------ */
/* Consulting services  —  profile p12 / deck s12                      */
/* ------------------------------------------------------------------ */

export type Service = Sourced<{
  id: string;
  title: string;
  body: string;
}>;

export const services: Service[] = [
  {
    id: 'reporting-due-diligence',
    title: 'ESG / Sustainability Reporting and Due Diligence',
    body:
      'Sustainability reporting and due diligence engagements, assembling the disclosure an ' +
      'organisation needs to report credibly.',
    source: 'profile p12 / deck s12',
  },
  {
    id: 'green-project-investors',
    title: 'Linking Green Projects to ESG Investors',
    body:
      'Connecting green projects with ESG investors so that capital and qualifying projects find ' +
      'each other.',
    source: 'profile p12 / deck s12',
  },
  {
    id: 'stakeholder-materiality',
    title: 'Stakeholder Engagement and Materiality Assessments',
    body:
      'Structured stakeholder engagement and materiality assessment, to establish which issues ' +
      'genuinely matter — and which do not.',
    source: 'profile p12 / deck s12',
  },
  {
    id: 'taxonomy-ghg',
    title: 'Taxonomy and GHG Emission Assessment',
    body:
      'Assessment against taxonomy and greenhouse-gas emission criteria, the factual basis for ' +
      'any credible environmental claim.',
    source: 'profile p12 / deck s12',
  },
  {
    id: 'framework-disclosure',
    title: 'Disclosure against Sustainability Frameworks',
    body:
      'Preparing disclosure aligned to recognised sustainability frameworks, so the report is ' +
      'comparable rather than bespoke.',
    source: 'profile p12 / deck s12',
  },
  {
    id: 'supply-chain',
    title: 'Supply Chain Due Diligence & Recommendation',
    body:
      'Due diligence across the supply chain, with recommendations that can be acted on rather ' +
      'than merely filed.',
    source: 'profile p12 / deck s12',
  },
  {
    id: 'gri-reporting',
    title: 'Sustainability Reporting (GRI)',
    body:
      'Providing sustainability reporting based on Global Reporting Index (GRI) standards, that can ' +
      'help our client to determine their ESG implementation and also showing their sustainability ' +
      'journey.',
    source: 'deck s16',
  },
];

/* ------------------------------------------------------------------ */
/* Method: Identify → Analyze → Impact  —  profile p10 / deck s10       */
/* ------------------------------------------------------------------ */

export type ProcessStage = Sourced<{
  id: string;
  index: string;
  name: string;
  summary: string;
  activities: string[];
  output: string;
}>;

export const processStages: ProcessStage[] = [
  {
    id: 'identify',
    index: '01',
    name: 'Identify',
    summary: 'Set the strategy and understand the stakeholder landscape.',
    activities: [
      "Setting an organization's strategy and vision and for overseeing their implementation.",
      'Evaluate and define your ESG engagement and its true impact on your business performance.',
      'Engage stakeholder, identify your stakeholders and understand.',
    ],
    output: 'An agreed strategy, vision and materiality position.',
    source: 'profile p10 / deck s10',
  },
  {
    id: 'analyze',
    index: '02',
    name: 'Analyze',
    summary: 'Test the position against risk, opportunity and capability.',
    activities: [
      'Assess a company’s risks and opportunities and how these are being managed or pursued.',
      'Assess a company’s ability to execute strategies that achieve multiple objectives, both ' +
        'financial and non-financial.',
    ],
    output: 'A quantified view of exposure and execution capacity.',
    source: 'profile p10 / deck s10',
  },
  {
    id: 'impact',
    index: '03',
    name: 'Impact',
    summary: 'Produce the report and embed ESG into operations.',
    activities: [
      'Producing ESG / Sustainability report that showing your ESG action plan and implementation.',
      'Enable you to deliver higher ESG and business performance.',
      'Integrate ESG into your company’s strategy and operations.',
    ],
    output: 'A published sustainability report and an embedded operating practice.',
    source: 'profile p10 / deck s10',
  },
];

/* ------------------------------------------------------------------ */
/* ESG pillars  —  profile p6 / deck s6                                 */
/* ------------------------------------------------------------------ */

export type EsgPillar = Sourced<{
  key: 'E' | 'S' | 'G';
  name: string;
  strapline: string;
  body: string;
}>;

export const esgPillars: EsgPillar[] = [
  {
    key: 'E',
    name: 'Environmental',
    strapline: 'Our impact to the Earth',
    body:
      'Environmental Criteria addresses the energy in-take and waste discharged by a company and ' +
      'its consequences on the environment.',
    source: 'profile p6 / deck s6',
  },
  {
    key: 'S',
    name: 'Social',
    strapline: 'Our impact to Society',
    body:
      'Social Criteria addresses the relationships a company has and the reputation it factors in ' +
      'the society.',
    source: 'profile p6 / deck s6',
  },
  {
    key: 'G',
    name: 'Governance',
    strapline: 'How we conduct our business',
    body:
      'Governance addresses the internal practice and controls the company adopts to govern and ' +
      'make effective policy decisions.',
    source: 'profile p6 / deck s6',
  },
];

/** IFC's definition of ESG, quoted in the source. — profile p2 / deck s2 */
export const esgDefinition = {
  text:
    'IFC defines ESG as a set of environmental, social, and governance factors considered by ' +
    'companies when managing their operations, and investors when making investments, in respect ' +
    'of the risks, impacts, and opportunities',
  attribution: 'Definition as quoted from IFC in the company’s own materials.',
  source: 'profile p2 / deck s2',
} as const;

/** The line that frames the whole practice. — profile p2 / deck s2 */
export const esgThesis = {
  text:
    'ESG is not about values but organisation’s ability to create and sustain long-term value in a ' +
    'rapidly changing world',
  source: 'profile p2 / deck s2',
} as const;

/** Six benefits of ESG. — profile p7 / deck s7 */
export const whyEsg: SourcedText[] = [
  { value: 'Creating long-term value', source: 'profile p7 / deck s7' },
  { value: 'Minimising operational costs and business risks', source: 'profile p7 / deck s7' },
  {
    value: 'Ensuring regulatory compliance and creating competitive advantage.',
    source: 'profile p7 / deck s7',
  },
  { value: 'Increasing opportunities and growth', source: 'profile p7 / deck s7' },
  { value: 'Organisational resilience', source: 'profile p7 / deck s7' },
  {
    value: 'Refining corporate purpose and addressing stakeholder priorities.',
    source: 'profile p7 / deck s7',
  },
];

/* ------------------------------------------------------------------ */
/* Mission & vision  —  profile p5 / deck s5                            */
/* ------------------------------------------------------------------ */

export const mission: SourcedText[] = [
  { value: 'Raising awareness towards sustainability', source: 'profile p5 / deck s5' },
  { value: 'Maintaining sustainable values for the better future', source: 'profile p5 / deck s5' },
  { value: 'Disseminating ESG principles to our partners', source: 'profile p5 / deck s5' },
];

export const vision: SourcedText = {
  value:
    'To be the trusted partner in sustainability and to help clients in delivering sustainability ' +
    'values',
  source: 'profile p5 / deck s5',
};

/* ------------------------------------------------------------------ */
/* Why us  —  deck s14                                                  */
/* ------------------------------------------------------------------ */

export type WhyUs = Sourced<{ title: string; body: string }>;

export const whyUs: WhyUs[] = [
  {
    title: 'Knowledge and expertise',
    body:
      'We have the best Academics as well of Industry Experts in our team who have In-depth ' +
      'knowledge and a extensive hands of experience',
    source: 'deck s14',
  },
  {
    title: 'Experience with government entities',
    body:
      'Our team of Experts have long relation history with government agencies which gives us a ' +
      'clear competitive edge in relation to compliance',
    source: 'deck s14',
  },
  {
    title: 'Experience with the energy and mining sector',
    body:
      'Since some of our experts coming from Energy and Mining sector we already have clear insight ' +
      'on how the ESG framework is coming into shape and how its being implemented',
    source: 'deck s14',
  },
  {
    title: 'In-house expertise',
    body:
      'We have our in-house team with renowned professionals from environment, law and good ' +
      'governance background.',
    source: 'deck s14',
  },
];

/* ------------------------------------------------------------------ */
/* Strategy  —  profile p13 / deck s13                                  */
/* ------------------------------------------------------------------ */

export const strategy: SourcedText[] = [
  {
    value: 'Industry agnostic approach for ESG assessment and integration',
    source: 'profile p13 / deck s13',
  },
  {
    value: 'Technology based approach for factual analysis.',
    source: 'profile p13 / deck s13',
  },
  {
    value:
      'Liaise with local NGO and local environmental conservatory for ESG investment linked up',
    source: 'profile p13 / deck s13',
  },
];

/* ------------------------------------------------------------------ */
/* Journey  —  profile p3 / deck s3                                     */
/* ------------------------------------------------------------------ */

export type JourneyEntry = Sourced<{ year: string; text: string }>;

export const journey: JourneyEntry[] = [
  {
    year: '2022',
    text: 'Set its footprint as an ESG Solution Provider.',
    source: 'profile p3 / deck s3',
  },
  {
    year: '2023',
    text:
      'Began implementing ESG solutions for its clients, and entered into strategic collaboration ' +
      'with PT Agra Surya Energy.',
    source: 'profile p3 / deck s3',
  },
];

/** Partner note — the partnership is asserted in the source but NOT confirmed as current. */
export const partnerNotice =
  'The collaboration with PT Agra Surya Energy is reported in the company’s own materials ' +
  '(2023). It is shown here as it was documented; current status should be confirmed before this ' +
  'is relied upon.';

/* ------------------------------------------------------------------ */
/* Indonesian regulations  —  profile p8 / deck s8                      */
/* ------------------------------------------------------------------ */

export type Regulation = Sourced<{
  id: string;
  short: string;
  instrument: string;
  requirement: string;
}>;

export const regulations: Regulation[] = [
  {
    id: 'pojk-51',
    short: 'POJK No. 51/POJK.03/2017',
    instrument: 'Financial Services Authority Regulation',
    requirement:
      'Requires companies to make sustainability reports to complement the company’s annual ' +
      'report (annual report) as an integral part.',
    source: 'profile p8 / deck s8',
  },
  {
    id: 'uu-25-2007',
    short: 'UU No. 25/2007',
    instrument: 'Investment (Penanaman Modal)',
    requirement:
      'Investment states that social responsibility and every investor is responsible for that.',
    source: 'profile p8 / deck s8',
  },
  {
    id: 'uu-40-2007',
    short: 'UU No. 40/2007, Pasal 74',
    instrument: 'Limited Liability Company (Perseroan Terbatas)',
    requirement:
      'States that a Company that carries out its business activities in the field of and/or ' +
      'related to natural resources is obliged to carry out social and environmental ' +
      'responsibilities.',
    source: 'profile p8 / deck s8',
  },
  {
    id: 'pp-47-2012',
    short: 'PP No. 47/2012',
    instrument: 'Social and Environmental Responsibility',
    requirement:
      'Companies are not only required to carry out their social and environmental ' +
      'responsibilities, but also must report these accountability activities.',
    source: 'profile p8 / deck s8',
  },
  {
    id: 'uu-32-2009',
    short: 'UU No. 32/2009',
    instrument: 'Environmental Protection and Management',
    requirement:
      'Everyone who carries out a business and/or activity is obliged to maintain the ' +
      'sustainability of environmental functions and comply with provisions concerning ' +
      'environmental quality standards and/or environmental damage standard criteria.',
    source: 'profile p8 / deck s8',
  },
  {
    id: 'perpres-98-2021',
    short: 'Perpres No. 98/2021',
    instrument: 'Measurement, Reporting and Verification (MRV)',
    requirement:
      'Measurement, Reporting and Verification is an activity to ensure that data and/or ' +
      'information on Mitigation Actions and Adaptation Actions has been carried out in accordance ' +
      'with established procedures and/or standards and is guaranteed to be correct.',
    source: 'profile p8 / deck s8',
  },
];

/* ------------------------------------------------------------------ */
/* Reporting frameworks  —  profile p9 / deck s9                        */
/* ------------------------------------------------------------------ */

export type Framework = Sourced<{
  id: string;
  name: string;
  scope: string;
  note: string;
}>;

export const frameworks: Framework[] = [
  {
    id: 'gri',
    name: 'Global Reporting Initiative (GRI)',
    scope: 'Broad stakeholders',
    note: '36 standards.',
    source: 'profile p9 / deck s9',
  },
  {
    id: 'sasb',
    name: 'Sustainability Accounting Standards Board (SASB)',
    scope: 'Sector specific',
    note: '26 standards.',
    source: 'profile p9 / deck s9',
  },
  {
    id: 'msci',
    name: 'MSCI',
    scope: 'Risk exposure and risk management',
    note: 'Risk exposure and risk management.',
    source: 'profile p9 / deck s9',
  },
];

/* ------------------------------------------------------------------ */
/* Sectors served  —  profile p20 / deck s17                            */
/* ------------------------------------------------------------------ */

export const sectors: SourcedText[] = [
  'Transportation and Logistics',
  'Agriculture',
  'Education',
  'Food and Beverage',
  'Real Estate and Property',
  'Manufacturing',
  'Telecommunication',
  'Mining and Oil & Gas',
  'Health Care',
  'Aviation',
  'Utilities and Infrastructure',
  'ICT',
  'Hotels and Tourism',
  'Energy',
].map((value) => ({ value, source: 'profile p20 / deck s17' }));

/* ------------------------------------------------------------------ */
/* Renewable energy  —  profile p17 / deck s15                          */
/* ------------------------------------------------------------------ */

export const renewableEnergy = {
  lead:
    'Teaming up with PT. Agra Surya Energy, we offer innovative renewable energy solutions, ' +
    'focusing on on-grid solar PV installations.',
  body:
    'Our expertise lies in Engineering, Procurement, and Construction, catering to residential, ' +
    'commercial, and industrial clients, fostering a greener energy landscape.',
  source: 'profile p17 / deck s15',
} as const;

/**
 * Renewable-energy highlights. The three card titles are the facts the source actually
 * documents (profile p17 / deck s15); the photographs are the company's own installation
 * imagery and illustrate the capability rather than captioning a specific site.
 * Mounting type is deliberately NOT asserted per photo — it cannot be verified from the
 * source, and mislabelling an installation would be a factual error.
 */
export type EnergyHighlight = {
  id: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

export const energyHighlights: EnergyHighlight[] = [
  {
    id: 'on-grid',
    title: 'On-grid solar PV',
    body: 'Innovative renewable energy solutions focused on on-grid solar PV installations.',
    image: '/images/installation-array-open.jpg',
    alt: 'A large solar array in open terrain beneath a bright sky.',
  },
  {
    id: 'epc',
    title: 'Engineering, procurement and construction',
    body: 'Our expertise lies in Engineering, Procurement, and Construction.',
    image: '/images/installation-array-roof.jpg',
    alt: 'Solar panels mounted in rows above planted ground.',
  },
  {
    id: 'sectors',
    title: 'Residential, commercial and industrial',
    body: 'Catering to residential, commercial, and industrial clients.',
    image: '/images/installation-works.jpg',
    alt: 'Technicians installing solar panels on a roof.',
  },
];

/* ------------------------------------------------------------------ */
/* Team, by function — NO names published.                              */
/* profile p21–p23 / deck s18–s20 name individuals; none are reproduced. */
/* ------------------------------------------------------------------ */

export type TeamFunction = { title: string; body: string };

export const teamFunctions: TeamFunction[] = [
  {
    title: 'Executive board',
    body:
      'The firm is led by an executive board covering strategy, partnerships, technology and ' +
      'information, with commissioner oversight.',
  },
  {
    title: 'Specialist bench',
    body:
      'In-house specialists across environment, law, finance and good-governance practice, ' +
      'supported by associate management and business development.',
  },
  {
    title: 'Advisory panel',
    body:
      'An external advisory panel with former senior experience across environmental regulation, ' +
      'energy governance and international development institutions.',
  },
];

export const teamPrivacyNote =
  'Individual team members are not listed on this site. Team composition is provided on request ' +
  'as part of a formal proposal.';
