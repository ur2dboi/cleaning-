import type { Testimonial } from '../types';

export const COMPANY_INFO = {
  name: "Jitto Cleaning Services",
  shortName: "Jitto",
  tagline: "A CLEANER SPACE. MORE TIME FOR WHAT MATTERS.",
  phone: "(249) 800-0127",
  phoneRaw: "+12498000127",
  email: "info@jittogroups.ca",
  hours: "24/7 Open — Emergency, Flexible & After-Hours Available",
  status: "NOW ACCEPTING NEW CLIENTS",
  primaryRegion: "Barrie & Simcoe County",
  experienceYears: 16,
  serviceAreas: [
    "Barrie",
    "Innisfil",
    "Orillia",
    "Bradford",
    "Collingwood",
    "Wasaga Beach",
    "Alliston",
    "Midhurst",
    "Springwater",
    "Angus / Essa",
    "Simcoe County"
  ],
  trustSignals: [
    { label: "16+ Years Hands-On Experience", description: "Founded by a professional housekeeper with over 16 years in private estate residences." },
    { label: "Fully Insured & WSIB Covered", description: "Comprehensive commercial and residential liability protection for total peace of mind." },
    { label: "100% Background-Checked Staff", description: "Vetted, discreet, and uniformed professionals in official Jitto navy polos." },
    { label: "Checklists, Not Guesswork", description: "Every clean follows a standardized room-by-room quality checklist." },
    { label: "Proof, Not Promises", description: "Time-stamped before-and-after photos and completed checklists sent directly to your phone." },
    { label: "The Same Crew Whenever Possible", description: "Consistent team members who learn your space, priorities, and preferences." },
    { label: "Direct Owner Oversight", description: "Questions or special requests go directly to company ownership, not an anonymous call center." },
    { label: "24/7 Availability", description: "Flexible scheduling, after-hours commercial work, and urgent handover turnarounds." }
  ]
};

export const RESIDENTIAL_DETAILS = {
  title: "Residential Cleaning",
  subtitle: "Warm, meticulous care for homeowners who value their time and sanctuary.",
  targetAudience: "Homeowners, Condominiums, Estates & Busy Families",
  overview: "Your home is where you recharge. Founded on over 16 years of hands-on housekeeping in private residences, Jitto delivers a level of care and thoroughness you can feel the moment you walk through the door. We bring our own high-grade supplies and HEPA filtration equipment, treat every surface with respect, and never cut corners.",
  services: [
    {
      name: "Regular Maintenance Clean",
      badge: "Recurring Program",
      cadence: "Weekly, Bi-Weekly, or Monthly",
      description: "Consistent, dependable upkeep that keeps your home immaculate, hygienic, and organized without lifting a finger.",
      includes: [
        "Dusting all reachable surfaces, fans, and sills",
        "Disinfecting kitchen countertops, sink, and exterior appliances",
        "Scrubbing and sanitizing toilets, tubs, showers, and mirrors",
        "Vacuuming carpets, rugs, and damp-mopping all hard floors",
        "Emptying all trash bins and replacing liners",
        "Neatening beds and living spaces"
      ]
    },
    {
      name: "Detailed Deep Clean",
      badge: "Seasonal Reset",
      cadence: "Seasonal or As Needed",
      description: "A comprehensive reset that tackles built-up grime, baseboards, doors, vents, and neglected corners.",
      includes: [
        "Everything in Regular Maintenance Clean, plus:",
        "Hand-washing baseboards, door frames, and switch plates",
        "Detailed scrubbing of bathroom grout and tile backsplash",
        "Exterior and top-of-cabinet wipe-down",
        "High/low corner cobweb removal and light fixture detailing",
        "Under and behind accessible furniture"
      ]
    },
    {
      name: "Move-In / Move-Out Turnover",
      badge: "Turnover Ready",
      cadence: "Tenant turnover or Real estate closing",
      description: "Spotless, empty-home cleaning guaranteed to satisfy demanding landlords, realtors, and incoming buyers.",
      includes: [
        "Inside and outside of all kitchen and bathroom cabinetry/drawers",
        "Inside refrigerator, freezer, and oven detailing",
        "Deep scrub of tubs, shower enclosures, and vanity sinks",
        "Complete wall spot-cleaning and baseboard washing",
        "Full vacuum, carpet edge detailing, and floor sanitization",
        "Window sills, tracks, and interior glass"
      ]
    }
  ],
  checklist: [
    {
      category: "Kitchen",
      tasks: [
        "Wipe exterior of all appliances (stove, fridge, dishwasher, microwave)",
        "Clean microwave inside and outside",
        "Scrub and sanitize sink, faucet, and drain surround",
        "Wipe down countertops, backsplashes, and small countertop appliances",
        "Wipe cabinet exteriors and handles",
        "Vacuum and wash hard floors"
      ]
    },
    {
      category: "Bathrooms",
      tasks: [
        "Scrub, disinfect and shine shower walls, glass doors, and bathtubs",
        "Disinfect toilet inside, rim, pedestal, and surrounding floor",
        "Clean and polish vanity top, sink basins, and chrome faucets",
        "Streak-free cleaning of mirrors and medicine cabinets",
        "Wash baseboards and tile floors on hands and knees"
      ]
    },
    {
      category: "Bedrooms & Living Areas",
      tasks: [
        "Dust furniture, picture frames, lampshades, and decor",
        "Make beds (linen change upon request)",
        "Wipe window sills, door frames, and light switches",
        "Vacuum upholstered furniture and under cushions",
        "Vacuum carpets/rugs and damp mop hard floors"
      ]
    }
  ]
};

export const COMMERCIAL_DETAILS = {
  title: "Commercial & Office Cleaning",
  subtitle: "Immaculate presentation and hygiene for offices, clinics, retail, and managed properties.",
  targetAudience: "Offices, Medical/Dental Clinics, Retail Boutiques, Property Managers",
  overview: "First impressions define your business. Jitto delivers professional, reliable janitorial and commercial cleaning with flexible scheduling that fits your operating hours—daytime porter, evening after-hours, or weekend programs. Our staff are fully insured, WSIB covered, and adhere to strict security protocols.",
  benefits: [
    { title: "Reliability & Accountable Crews", desc: "No skipped visits or excuses. We follow scheduled contracts with precision." },
    { title: "After-Hours & 24/7 Scheduling", desc: "We clean when your doors are closed so your workday is never interrupted." },
    { title: "Medical & High-Touch Sanitation", desc: "Hospital-grade DIN-registered disinfectants for clinics, desks, door handles, and restrooms." },
    { title: "Customized Service Agreements", desc: "Tailored scope, frequency, and supply management to match your facility requirements." }
  ],
  spacesServed: [
    { title: "Corporate Offices & Tech Workspaces", desc: "Desks, conference rooms, breakrooms, trash consolidation, and sparkling glass partitions." },
    { title: "Medical & Dental Clinics", desc: "Stringent sanitation of waiting areas, reception desks, examination rooms, and restrooms." },
    { title: "Retail Stores & Showrooms", desc: "High-shine floors, dust-free displays, spotless entry glass, and pristine fitting rooms." },
    { title: "Property Management & Common Areas", desc: "Lobbies, hallways, stairwells, elevators, and clubhouse maintenance." }
  ]
};

export const POST_CONSTRUCTION_DETAILS = {
  title: "Post-Construction & Handover Cleaning",
  subtitle: "Fine dust removal, sticker scraping, and white-glove turnaround ready for inspection.",
  targetAudience: "Custom Home Builders, General Contractors, Renovators, Designers",
  overview: "Construction produces fine airborne drywall dust, paint overspray, adhesive residue, and trade debris that standard cleaners cannot handle. Jitto specializes in multi-phase post-construction detailing. We ensure your new build or renovation passes client walkthroughs and building inspections with flying colors.",
  phases: [
    {
      phase: "Phase 1: Rough Clean",
      timing: "Post-drywall, electrical & plumbing trim",
      desc: "Removal of large debris, sweep-out, initial vacuuming, and scraping of paint/drywall splatter from subfloors and framing."
    },
    {
      phase: "Phase 2: Final Detailing Clean",
      timing: "All trades finished, fixtures installed",
      desc: "HEPA air filtration vacuuming, manufacturer sticker removal from windows/appliances, washing interior windows, detailing millwork, vents, and fixtures."
    },
    {
      phase: "Phase 3: Touch-Up / Handover Walkthrough",
      timing: "Day before client inspection or closing",
      desc: "Elimination of lingering settling dust, polishing chrome/stainless, final floor wash, and leaving the property in turnkey move-in condition."
    }
  ],
  deliverables: [
    "Before-and-after photo verification log sent directly to project manager",
    "Completed room-by-room signoff inspection sheet",
    "Rapid turnaround to meet tight closing deadlines",
    "Careful treatment of custom cabinetry, luxury stone, and hardwood"
  ]
};

export const COMING_SOON_SERVICES = [
  {
    id: "hvac",
    title: "HVAC & Air Duct Cleaning",
    badge: "Coming Soon",
    desc: "Complete interior duct sanitation, furnace fan cleaning, and allergen extraction to ensure crisp, clean indoor air quality for homes and offices.",
    eta: "Launching Soon in Simcoe County",
    highlights: ["Negative air HEPA collection", "Mold & dust mite elimination", "Improves HVAC efficiency", "Recommended after renovations"]
  },
  {
    id: "junk",
    title: "Junk & Debris Removal",
    badge: "Coming Soon",
    desc: "Professional hauling and eco-conscious disposal for renovation leftovers, estate cleanouts, bulky furniture, and yard clutter.",
    eta: "Launching Soon in Simcoe County",
    highlights: ["Same-day & scheduled hauling", "Donation & recycling priority", "Heavy lifting included", "Broom-clean finish after haul"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    author: "Elena Rostova",
    role: "Homeowner",
    location: "Barrie (South Shore)",
    category: "residential",
    rating: 5,
    content: "With 16 years of housekeeping experience, Jitto’s standards are unmatched. Having the same crew show up every two weeks gives me total trust. The house smells clean, never chemically, and our kitchen island looks like a magazine cover.",
    date: "2 weeks ago"
  },
  {
    id: "2",
    author: "Marcus Vance",
    role: "Project Manager, Vance Custom Homes",
    location: "Innisfil",
    category: "post-construction",
    rating: 5,
    content: "In construction, delays kill margins. Jitto came through on a 4,800 sq ft custom build handover on 48 hours notice. Every speck of drywall dust was gone, windows were streak-free, and they sent a full photo report before our clients arrived.",
    date: "1 month ago"
  },
  {
    id: "3",
    author: "Dr. Sarah Thornton",
    role: "Clinic Director, Simcoe Wellness",
    location: "Downtown Barrie",
    category: "commercial",
    rating: 5,
    content: "Our dental clinic requires uncompromising disinfection. Jitto has handled our after-hours commercial cleaning flawlessly for 8 months. Transparent checklists and direct access to the owners make communication effortless.",
    date: "3 weeks ago"
  }
];

export const FAQS = [
  {
    q: "How do you determine a custom proposal for a property?",
    a: "Every home, commercial facility, and job site is unique. Rather than quoting generic flat estimates that fail to reflect real requirements, we provide a customized proposal based on your exact square footage, room layout, condition, and cleaning frequency. We provide complimentary walkthrough consultations and transparent SOW agreements."
  },
  {
    q: "Are you fully insured and covered by WSIB?",
    a: "Yes, 100%. Jitto Cleaning Services is fully registered, carries comprehensive commercial liability insurance, and all staff are WSIB-covered and criminal background-checked for your complete protection."
  },
  {
    q: "Do I need to provide cleaning supplies or equipment?",
    a: "No. Jitto provides all professional-grade equipment, commercial HEPA vacuums, microfiber cloths, and safe, eco-conscious cleaning solutions. If you have specialty surfaces or preferred products, we are always happy to accommodate."
  },
  {
    q: "Will I have the same cleaning crew every visit?",
    a: "Whenever possible, yes. We know that familiarity builds trust and efficiency. Having the same crew ensures they learn your space, your preferences, and what matters to you."
  },
  {
    q: "What is your service area?",
    a: "We are proudly based in Barrie and serve all surrounding areas throughout Simcoe County, including Innisfil, Orillia, Bradford, Collingwood, Wasaga Beach, Alliston, Springwater, and Angus."
  },
  {
    q: "What does 'Proof, not promises' mean?",
    a: "For post-construction projects, turnover cleans, and upon client request, our supervisors send time-stamped before-and-after photos and a signed room checklist directly to your phone or email before you arrive at the property."
  },
  {
    q: "Can I reach the owners if I have questions?",
    a: "Absolutely. When you call (249) 800-0127 or email info@jittogroups.ca, you connect directly with the founders and operational leaders—not a distant call center."
  }
];
