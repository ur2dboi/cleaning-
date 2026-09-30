import type { Testimonial } from '../types';

export const COMPANY_INFO = {
  name: "Jitto Cleaning Services",
  shortName: "Jitto",
  tagline: "A CLEANER SPACE. MORE TIME FOR WHAT MATTERS.",
  phone: "(249) 800-0127",
  phoneRaw: "+12498000127",
  phoneSecondary: "437-447-5020",
  phoneSecondaryFormatted: "(437) 447-5020",
  phoneSecondaryRaw: "+14374475020",
  email: "info@jittogroups.ca",
  hours: "24/7 Open — Emergency, Flexible & After-Hours Available",
  status: "NOW ACCEPTING NEW CLIENTS",
  primaryRegion: "Barrie & Simcoe County",
  experienceYears: 16,
  serviceAreas: [
    "Barrie",
    "Shanty Bay",
    "Wasaga",
    "Wasaga Beach",
    "Innisfil",
    "Orillia",
    "Bradford",
    "Collingwood",
    "Alliston",
    "Midhurst",
    "Springwater",
    "Angus / Essa",
    "Simcoe County"
  ],
  trustSignals: [
    { label: "16+ Years Hands-On Experience", description: "Brings together 16+ years of private luxury housekeeping with professional engineering and seasoned real estate investment." },
    { label: "Fully Insured", description: "Comprehensive commercial and residential liability protection for total peace of mind." },
    { label: "100% Background-Checked Staff", description: "Vetted, discreet, and trustworthy professionals with verified background checks." },
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
        "Making beds (linens changed on request) and tidying living spaces"
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
  overview: "First impressions define your business. Jitto delivers professional, reliable janitorial and commercial cleaning with flexible scheduling that fits your operating hours—daytime porter, evening after-hours, or weekend programs. Our staff are fully insured, background-checked, and adhere to strict security protocols.",
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

export const JUNK_REMOVAL_DETAILS = {
  title: "Junk & Debris Removal",
  subtitle: "Full-service hauling, responsible recycling, and our signature broom-swept guarantee.",
  targetAudience: "Homeowners, Realtors, Contractors, Estate Executors & Property Managers",
  overview: "From single heavy appliances to complete estate cleanouts and jobsite construction debris, Jitto provides dependable, full-service hauling across Barrie and Simcoe County. Our crew handles all the heavy lifting, loading, and responsible sorting—with priority given to local donation and green diversion. And because we are professional cleaners, we sweep and vacuum the area spotless before leaving.",
  services: [
    {
      name: "Residential Declutter & Furniture",
      badge: "Home & Condo",
      timing: "Same-Day / Next-Day Available",
      description: "Quick, hassle-free removal of old sofas, mattresses, appliances, electronics, basement clutter, and garage overflow.",
      includes: [
        "Two-person professional lifting crew",
        "Safe extraction without scratching walls or doorframes",
        "Donation delivery for salvageable items",
        "Broom-swept clean finish of loading area"
      ]
    },
    {
      name: "Renovation & Construction Debris",
      badge: "Jobsite Ready",
      timing: "Scheduled or On-Demand Sweeps",
      description: "Removal of drywall off-cuts, lumber, flooring, tiles, framing offcuts, packaging, and general contractor scrap.",
      includes: [
        "Heavy debris hauling and weight-certified disposal",
        "Sweep-out of subfloors and work areas",
        "Compliant Simcoe County disposal transfers",
        "Photo verification sent directly to project managers"
      ]
    },
    {
      name: "Estate & Whole-Home Cleanouts",
      badge: "Full Property Reset",
      timing: "Comprehensive Project Scoping",
      description: "Respectful, thorough clearing of entire estates, rental turnovers, foreclosures, or downsizing transitions.",
      includes: [
        "Room-by-room sorting & categorization",
        "Separation of family keepsakes and donation items",
        "Complete removal of remaining unwanted items",
        "Detailed vacuuming and floor sweep"
      ]
    },
    {
      name: "Commercial & Office Decommission",
      badge: "Commercial Facilities",
      timing: "After-Hours & Weekend Hauling",
      description: "Removal of old desks, cubicles, retail display fixtures, filing cabinets, and certified electronic e-waste recycling.",
      includes: [
        "Disassembly of modular office furniture",
        "Certified electronic waste diversion",
        "Flexible off-hours scheduling to avoid business disruption",
        "Itemized disposal manifest for corporate records"
      ]
    }
  ],
  whatWeTake: [
    { title: "Furniture & Bedding", items: "Couches, sectionals, mattresses, box springs, dressers, dining sets, desks" },
    { title: "Appliances & White Goods", items: "Refrigerators, freezers, stoves, washers, dryers, microwaves, air conditioners" },
    { title: "Renovation Materials", items: "Drywall, studs, plywood, tile, sinks, cabinetry, carpet rolls, doors" },
    { title: "Yard & Outdoor Waste", items: "Fencing, patio furniture, tree limbs, brush, old barbecues, sheds" },
    { title: "Electronics & E-Waste", items: "Computers, monitors, printers, televisions, stereos, small appliances" },
    { title: "Household & Attic Clutter", items: "Boxes, books, clothes, exercise equipment, tools, holiday decorations" }
  ],
  whatWeDoNotTake: [
    "Wet paints, stains, or liquid solvents",
    "Hazardous chemicals, motor oil, or car batteries",
    "Biological or medical waste",
    "Asbestos-containing materials",
    "Pressurized propane tanks or explosives"
  ],
  benefits: [
    { title: "Heavy Lifting & Labor Included", desc: "You just point to what needs to go. Our dedicated two-person crew handles all carrying, navigating stairs, and loading." },
    { title: "The Broom-Swept Guarantee", desc: "Unlike standard haulers who leave dirt and drywall dust behind, we sweep and detail the area clean after loading." },
    { title: "Eco-Friendly Donation & Diversion", desc: "We partner with local charities and transfer stations across Simcoe County to divert usable goods from landfills." },
    { title: "Upfront Transparent Proposals", desc: "Volume-based pricing with no hidden weight or disposal fees. What we quote is what you pay." }
  ]
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    author: "Michelle Hiliz",
    role: "Verified Client (7 reviews)",
    location: "Barrie",
    category: "residential",
    rating: 5,
    content: "I decided to give Jitto a chance even though they're a new local business. I figured a company that's just starting out would work hard to earn its reputation — and they definitely did. The team was professional, thorough, and genuinely cared about doing a great job. What was meant to be a one-time cleaning turned into biweekly service because I was so happy with the results. I'm looking forward to having them back!",
    date: "1 month ago"
  },
  {
    id: "2",
    author: "Mohammad Mokhtari",
    role: "Local Guide Level 2",
    location: "Shanty Bay",
    category: "residential",
    rating: 5,
    content: "Jane has done an excellent job caring for our home and cottage over the years. She is reliable, detail-oriented, and truly cares about doing things well. I would highly recommend Jitto to anyone and look forward to having her help us again.",
    date: "1 month ago"
  },
  {
    id: "3",
    author: "Lynn Lacroix",
    role: "Verified Client (3 reviews)",
    location: "Wasaga",
    category: "residential",
    rating: 5,
    content: "My mother in law was looking for a cleaner and found this wonderful website. Jane is very thoughtful and is always in touch to make things go smoothly. My mother in law was very impressed with her first cleaning experience. She has booked her next appointment with her. Thank you Jane!",
    date: "1 month ago"
  }
];

export const FAQS = [
  {
    q: "How do you determine a custom proposal for a property?",
    a: "Every home, commercial facility, and job site is unique. Rather than quoting generic flat estimates that fail to reflect real requirements, we provide a customized proposal based on your exact square footage, room layout, condition, and cleaning frequency. We provide complimentary walkthrough consultations and transparent SOW agreements."
  },
  {
    q: "Are you fully insured?",
    a: "Yes, 100%. Jitto Cleaning Services is fully registered, carries comprehensive commercial and residential liability insurance, and all staff are criminal background-checked for your complete protection."
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
    a: "Absolutely. When you call (249) 800-0127 or (437) 447-5020, or email info@jittogroups.ca, you connect directly with the founders and operational leaders—not a distant call center."
  }
];
