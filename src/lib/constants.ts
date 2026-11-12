export const SITE_NAME = "RSE Associates, Inc.";
export const SITE_DESCRIPTION =
  "Structural engineering for architecture that has to perform beautifully. RSE Associates provides structural engineering services for architects, institutions, and developers across Boston, New York, and Los Angeles.";
export const SITE_URL = "https://www.rseassociates.com";

export const NAV_LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Awards", href: "/awards" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const OFFICES = [
  {
    city: "Watertown, MA",
    label: "Boston",
    address: "63 Pleasant Street",
    cityState: "Watertown, MA 02472",
    isPrimary: true,
  },
  {
    city: "Los Angeles, CA",
    label: "Los Angeles",
    address: "771 E 14th Street",
    cityState: "Los Angeles, CA 90021",
    isPrimary: false,
  },
  {
    city: "Port Washington, NY",
    label: "New York",
    address: "18 Second Avenue",
    cityState: "Port Washington, NY 11050",
    isPrimary: false,
  },
] as const;

export const PHONE = "(617) 926-9300";
export const EMAIL = "admin@rseassociates.com";

export const PROJECT_CATEGORIES = [
  "Higher Education",
  "K-12 Schools",
  "Public & Civic",
  "Restoration & Renovation",
  "Residential",
  "Libraries",
  "Museum & Performing Arts",
  "Landscapes & Parks",
  "Mass Timber",
  "Commercial & Mixed Use",
  "Student Residence Halls",
  "Athletic Facilities",
] as const;

export const SERVICES = [
  {
    title: "New Construction",
    slug: "new-construction",
    description:
      "Full structural design services for ground-up buildings, from concept through construction administration. We work alongside architects from day one to develop structural systems that serve the design, not fight it.",
  },
  {
    title: "Adaptive Reuse & Renovation",
    slug: "adaptive-reuse",
    description:
      "Structural engineering for the transformation of existing and historic buildings. We assess existing conditions, develop reinforcement strategies, and design interventions that respect the original structure while meeting current codes and new programmatic demands.",
  },
  {
    title: "Master Planning & Feasibility Studies",
    slug: "master-planning",
    description:
      "Early-stage structural assessments that help architects, developers, and institutions understand what is possible. We evaluate existing structures, identify constraints, and provide realistic guidance on scope, cost, and constructability.",
  },
  {
    title: "Structural Investigation",
    slug: "structural-investigation",
    description:
      "Detailed field investigation and analysis of existing structures. We document conditions, identify deficiencies, and provide clear recommendations for renovation planning, damage assessment, or due diligence.",
  },
  {
    title: "Structural Peer Reviews",
    slug: "peer-reviews",
    description:
      "Independent review of structural designs by other engineers. We provide thorough, objective analysis for building officials, owners and institutions that require a third-party review of complex or high-profile projects.",
  },
  {
    title: "Design Competition Support",
    slug: "design-competitions",
    description:
      "Structural engineering support for architecture competitions and design proposals. We help architects develop compelling, buildable structural concepts on tight timelines ensuring the vision is grounded in real engineering.",
  },
] as const;

export const FEATURED_PROJECTS = [
  {
    title: "Fall River Justice Center",
    location: "Fall River, MA",
    category: "Public & Civic",
    description:
      "A modern courthouse with a dramatic curved glass facade and stone-clad wings serving the Fall River community.",
    imageAlt: "Fall River Justice Center — civic courthouse with curved glass facade",
    imageSrc: "/images/projects/fall-river-justice-center.jpg",
  },
  {
    title: "Essex Technical High School",
    location: "Hathorne, MA",
    category: "K-12 Schools",
    description:
      "A career technical high school campus with modern vocational and academic facilities.",
    imageAlt: "Essex Technical High School — contemporary K-12 campus with wood and glass facade",
    imageSrc: "/images/projects/essex-technical-high-school.jpg",
  },
  {
    title: "UMass Dartmouth Balsam",
    location: "Dartmouth, MA",
    category: "Higher Education",
    description:
      "A residential and academic building at UMass Dartmouth with modular facade panels and a central glass connector.",
    imageAlt: "UMass Dartmouth Balsam — higher education building with orange and teal facade",
    imageSrc: "/images/projects/umass-dartmouth-balsam.jpg",
  },
  {
    title: "University of Massachusetts Amherst Isenberg School of Management",
    location: "Amherst, MA",
    category: "Higher Education",
    description:
      "Structural Engineering for a new 40,000 net sf building and renovations to the existing 47,700 sf building. This $45.8M project includes bridges between the buildings and a 5,000 sf atrium space featuring 3-story, sloped \"fins\" covering custom steel trusses.",
    imageAlt: "University of Massachusetts Amherst Isenberg School of Management — higher education building in Amherst, MA",
    imageSrc: "/images/projects/university-of-massachusetts-amherst-isenberg-school-of-management-amherst-ma.jpg",
  },
  {
    title: "Walden Pond Visitor Center",
    location: "Concord, MA",
    category: "Landscapes & Parks",
    description:
      "A visitor center at Walden Pond with wood cladding, glass walls, and a boardwalk approach through the surrounding landscape.",
    imageAlt: "Walden Pond Visitor Center — wood and glass visitor center with boardwalk",
    imageSrc: "/images/projects/walden-pond-visitor-center.jpg",
  },
  {
    title: "Performing Arts Center",
    location: "Massachusetts",
    category: "Museum & Performing Arts",
    description:
      "A performing arts facility with a sweeping curved glass facade reflected in an adjacent pond.",
    imageAlt: "Performing arts center — curved glass facade with pond reflection",
    imageSrc: "/images/projects/performing-arts-center.jpg",
  },
] as const;

export const ALL_PROJECTS = [
  ...FEATURED_PROJECTS,
  {
    title: "The Winsor School",
    location: "Boston, MA",
    category: "K-12 Schools",
    description:
      "Structural engineering for a distinguished independent school building with traditional masonry and contemporary detailing.",
    imageAlt: "The Winsor School — independent school building with curved corner facade",
    imageSrc: "/images/projects/the-winsor-school.jpg",
  },
  {
    title: "Pan Peninsula",
    location: "London, UK",
    category: "Residential",
    description:
      "Structural engineering for twin residential towers at Pan Peninsula, a landmark waterfront development in London.",
    imageAlt: "Pan Peninsula — twin residential towers reflected in water at dusk",
    imageSrc: "/images/projects/pan-peninsula.jpg",
  },
  {
    title: "Multi-Unit Residential Building",
    location: "Boston, MA",
    category: "Residential",
    description:
      "A four-story multi-unit residential building with contemporary panel cladding and wood accent bays.",
    imageAlt: "Multi-unit residential building — contemporary apartment building exterior",
    imageSrc: "/images/projects/multi-unit-residential-building.jpg",
  },
  {
    title: "Gladys E. Kelly Public Library",
    location: "Webster, MA",
    category: "Libraries",
    description:
      "A welcoming civic library with an open reading room, wood ceiling baffles, and floor-to-ceiling windows.",
    imageAlt: "Gladys E. Kelly Public Library — library interior with reading room and bookshelves",
    imageSrc: "/images/projects/gladys-e-kelly-public-library.jpg",
  },
  {
    title: "Boston Public Library, Roxbury Branch",
    location: "Roxbury, MA",
    category: "Libraries",
    description:
      "An award-winning branch library that serves as both community anchor and architectural landmark.",
    imageAlt: "Roxbury Branch of the Boston Public Library — award-winning contemporary library",
    imageSrc: "/images/projects/bpl-roxbury.png",
  },
  {
    title: "Brooklyn Waterfront Pavilion",
    location: "Brooklyn, NY",
    category: "Landscapes & Parks",
    description:
      "A public pavilion with vertical wood-slat cladding set within a landscaped waterfront park.",
    imageAlt: "Brooklyn waterfront pavilion — wood-slat public building with city skyline",
    imageSrc: "/images/projects/brooklyn-waterfront-pavilion.jpg",
  },
  {
    title: "Historic Campus Expansion",
    location: "Massachusetts",
    category: "Restoration & Renovation",
    description:
      "Adaptive reuse and expansion of a historic brick campus building with a contemporary glass and metal addition.",
    imageAlt: "Historic campus expansion — brick building with modern addition on hillside",
    imageSrc: "/images/projects/historic-campus-expansion.jpg",
  },
  {
    title: "Massachusetts State Police Lower Basin Barracks",
    location: "Boston, MA",
    category: "Public & Civic",
    description:
      "Structural engineering for the modernization and expansion of the State Police housed in the historic 1908 Lower Basin Gatehouse, completed 2023.",
    imageAlt: "Lower Basin Barracks — historic gatehouse with modern police facility addition at dusk",
    imageSrc: "/images/projects/lower-basin-barracks.jpg",
  },
  {
    title: "Walden Mass Timber Interior",
    location: "Massachusetts",
    category: "Mass Timber",
    description:
      "Mass timber structural engineering showcasing wood as a strong, low-carbon alternative to concrete and steel.",
    imageAlt: "Walden mass timber interior — exposed wood structure",
    imageSrc: "/images/projects/walden-mass-timber-interior.jpg",
  },
  {
    title: "Mass Timber Structure",
    location: "Massachusetts",
    category: "Mass Timber",
    description:
      "Structural engineering for a mass timber building demonstrating durable, low-carbon construction.",
    imageAlt: "Mass timber structure — engineered wood framing",
    imageSrc: "/images/projects/mass-timber-structure.jpg",
  },
  {
    title: "Moore Square Park",
    location: "Raleigh, NC",
    category: "Mass Timber",
    description:
      "Mass timber structural engineering for Moore Square Park — wood construction in a civic landscape setting.",
    imageAlt: "Moore Square Park — mass timber civic structure",
    imageSrc: "/images/projects/moore-square-park.jpg",
  },

  {
    title: "University of Massachusetts Amherst Champions Center",
    location: "Amherst, MA",
    category: "Athletic Facilities",
    description:
      "Structural engineering for University of Massachusetts Amherst Champions Center. Architect: JCJ Architecture. Athletic Facilities project by RSE Associates.",
    imageAlt: "University of Massachusetts Amherst Champions Center — athletic facilities project",
    imageSrc: "/images/projects/university-of-massachusetts-amherst-champions-center.jpg",
  },
  {
    title: "800 Apollo Creative Office",
    location: "Massachusetts",
    category: "Commercial & Mixed Use",
    description:
      "Structural engineering for 800 Apollo Creative Office. Commercial & Mixed Use project by RSE Associates.",
    imageAlt: "800 Apollo Creative Office — commercial & mixed use project",
    imageSrc: "/images/projects/800-apollo-creative-office.jpg",
  },
  {
    title: "Ankara Office Tower",
    location: "Massachusetts",
    category: "Commercial & Mixed Use",
    description:
      "Structural engineering for Ankara Office Tower. Commercial & Mixed Use project by RSE Associates.",
    imageAlt: "Ankara Office Tower — commercial & mixed use project",
    imageSrc: "/images/projects/ankara-office-tower.jpg",
  },
  {
    title: "Lulu Island Neighborhood 3",
    location: "Massachusetts",
    category: "Commercial & Mixed Use",
    description:
      "Structural engineering for Lulu Island Neighborhood 3. Commercial & Mixed Use project by RSE Associates.",
    imageAlt: "Lulu Island Neighborhood 3 — commercial & mixed use project",
    imageSrc: "/images/projects/lulu-island-neighborhood-3.jpg",
  },
  {
    title: "Marsh Wall Development",
    location: "Massachusetts",
    category: "Commercial & Mixed Use",
    description:
      "Structural engineering for Marsh Wall Development. Commercial & Mixed Use project by RSE Associates.",
    imageAlt: "Marsh Wall Development — commercial & mixed use project",
    imageSrc: "/images/projects/marsh-wall-development.jpg",
  },
  {
    title: "One Congress Street",
    location: "Massachusetts",
    category: "Commercial & Mixed Use",
    description:
      "Structural engineering for One Congress Street. Commercial & Mixed Use project by RSE Associates.",
    imageAlt: "One Congress Street — commercial & mixed use project",
    imageSrc: "/images/projects/one-congress-street.jpg",
  },
  {
    title: "One Lansdowne Road",
    location: "Massachusetts",
    category: "Commercial & Mixed Use",
    description:
      "Structural engineering for One Lansdowne Road. Commercial & Mixed Use project by RSE Associates.",
    imageAlt: "One Lansdowne Road — commercial & mixed use project",
    imageSrc: "/images/projects/one-lansdowne-road.jpg",
  },
  {
    title: "Zero Greenway-Parcel 25",
    location: "Massachusetts",
    category: "Commercial & Mixed Use",
    description:
      "Structural engineering for Zero Greenway-Parcel 25. Commercial & Mixed Use project by RSE Associates.",
    imageAlt: "Zero Greenway-Parcel 25 — commercial & mixed use project",
    imageSrc: "/images/projects/zero-greenway-parcel-25.jpg",
  },
  {
    title: "Bowdoin College Walker Art Museum Brunswick, ME",
    location: "Massachusetts",
    category: "Higher Education",
    description:
      "Structural Engineering for the $18M renovation and addition to a historic building built in the late 1800’s. Structural work includes an addition and reconfiguration of the existing structural framing with extensive underpinning of the existing foundations. This project was featured in “Architectural Record”.",
    imageAlt: "Bowdoin College Walker Art Museum Brunswick, ME — higher education project",
    imageSrc: "/images/projects/bowdoin-college-walker-art-museum-brunswick-me.jpg",
  },
  {
    title: "Bridgewater State University Pope & Scott Halls",
    location: "Bridgewater, MA",
    category: "Higher Education",
    description:
      "Structural engineering for Bridgewater State University Pope & Scott Halls. Architect: PRA Architects. Higher Education project by RSE Associates.",
    imageAlt: "Bridgewater State University Pope & Scott Halls — higher education project",
  },
  {
    title: "Bunker Hill Community College-Success Center and Building E Charlestown, MA",
    location: "Massachusetts",
    category: "Higher Education",
    description:
      "Structural Engineering of a new, 53,000 GSF building to replace the existing M Building, and renovations to approximately 44,500 sf of E Building, providing new space for student collaboration. This project provides the first new building on the campus in over a decade for the almost 50-year-old college. The improvements include upgrades to the existing buildings’ electrical systems and other campus utilities. The total construction budget for both elements is $49M.",
    imageAlt: "Bunker Hill Community College-Success Center and Building E Charlestown, MA — higher education project",
    imageSrc: "/images/projects/bunker-hill-community-college-success-center-and-building-e-charlestown-ma.jpg",
  },
  {
    title: "Harvard ArtLab Allston, MA",
    location: "Massachusetts",
    category: "Higher Education",
    description:
      "Structural Engineering for a 9,000 sf space devoted to artistic research and innovation. The carbon net-zero building features exposed steel framing.",
    imageAlt: "Harvard ArtLab Allston, MA — higher education project",
    imageSrc: "/images/projects/harvard-artlab-allston-ma.jpg",
  },
  {
    title: "Harvard Law School Bence Site Cambridge, MA",
    location: "Massachusetts",
    category: "Higher Education",
    description:
      "Structural Engineering for a new 4-story, 21,000 sf mixed use building at 1607 Massachusetts Ave. that houses both Clinical and Research programs.  This project has achieved LEED Gold Certification.",
    imageAlt: "Harvard Law School Bence Site Cambridge, MA — higher education project",
    imageSrc: "/images/projects/harvard-law-school-bence-site-cambridge-ma.jpg",
  },
  {
    title: "John J. Sbrega Health & Sciences Building - Bristol Community College Fall River, MA",
    location: "Massachusetts",
    category: "Higher Education",
    description:
      "Structural Engineering for a new 50,600 sf concrete-framed Health & Sciences building featuring a Zero-Net Energy distinction.",
    imageAlt: "John J. Sbrega Health & Sciences Building - Bristol Community College Fall River, MA — higher education project",
  },
  {
    title: "MassArt Bakalar & Paine Galleries Boston, MA",
    location: "Massachusetts",
    category: "Higher Education",
    description:
      "Structural Engineering for the $9M renovation to the existing space including the addition of a significant new entrance. The gallery is the largest free contemporary art space in New England, the Bakalar & Paine Galleries are a venue for national and international contemporary art and serve as a vital cultural resource for the College, Boston, and beyond.",
    imageAlt: "MassArt Bakalar & Paine Galleries Boston, MA — higher education project",
    imageSrc: "/images/projects/massart-bakalar-paine-galleries-boston-ma.jpg",
  },
  {
    title: "MassBay Community College Health and Science Center Framingham, MA",
    location: "Structural Engineering for a new 70,000 sf Health and Science center for the campus. The project supports MassBay's leading health sciences programs, including teaching spaces for EMT, Paramedicine, Simulation, Nursing, Radiology, Sonography, and Phlebotomy, as well as Early Childhood Education and its Academic Achievement Center. The project includes a centralized node that has a café and flexible spaces for students to gather. The new building will aim to be Zero-Net Energy ready and achieve LEED+ Gold certification. Construction cost is $54.5M. -Completed 2023-",
    category: "Higher Education",
    description:
      "Structural engineering for MassBay Community College Health and Science Center Framingham, MA Architect: Sasaki. Higher Education project by RSE Associates.",
    imageAlt: "MassBay Community College Health and Science Center Framingham, MA — higher education project",
    imageSrc: "/images/projects/massbay-community-college-health-and-science-center-framingham-ma.jpg",
  },
  {
    title: "Middlesex Community College  Richard and Nancy Donahue Academic Arts Center Lowell, MA",
    location: "Massachusetts",
    category: "Higher Education",
    description:
      "Structural Engineering for the extensive renovations of the existing historic 1876 Boston & Maine Railroad Depot building to convert it into a performing arts venue. The building sat vacant for decades. The 20,000 sf renewed structure is now part of the city's revitalized urban core. The building contains 3 major teaching spaces: a 100-seat music recital hall, a dance studio and a 2-story, 177-seat theater.",
    imageAlt: "Middlesex Community College  Richard and Nancy Donahue Academic Arts Center Lowell, MA — higher education project",
    imageSrc: "/images/projects/middlesex-community-college-richard-and-nancy-donahue-academic-arts-center-lowell-ma.jpg",
  },
  {
    title: "Northern Kentucky University – Griffin Hall Center for Informatics Highland Heights, KY",
    location: "​Structural Engineering for a new 134,000 GSF academic building. The buildings’ distinctive 120-seat “Digitorium” is the core of the space. The new building also houses 32 learning spaces and classrooms, 12 laboratories, 2 audio studios, 4 conference rooms and 2 student lounges. The complex geometry of the Digitorium was constructed with a reinforced CMU core, sloping steel exterior columns, and a curved steel facade support. This project achieved LEED Silver certification.",
    category: "Higher Education",
    description:
      "Structural engineering for Northern Kentucky University – Griffin Hall Center for Informatics Highland Heights, KY Architect: Goody Clancy. Higher Education project by RSE Associates.",
    imageAlt: "Northern Kentucky University – Griffin Hall Center for Informatics Highland Heights, KY — higher education project",
    imageSrc: "/images/projects/northern-kentucky-university-griffin-hall-center-for-informatics-highland-heights-ky.jpg",
  },
  {
    title: "Philadelphia College of Osteopathic Medicine - School of Medicine Building Moultrie, GA",
    location: "Massachusetts",
    category: "Higher Education",
    description:
      "Structural Engineering of the new 76,000 gsf building to accommodate a new Doctor of Osteopath program with space for faculty offices, classrooms, anatomy and labs.",
    imageAlt: "Philadelphia College of Osteopathic Medicine - School of Medicine Building Moultrie, GA — higher education project",
    imageSrc: "/images/projects/philadelphia-college-of-osteopathic-medicine-school-of-medicine-building-moultrie-ga.jpg",
  },
  {
    title: "Quinsigamond Community College Quest Center Worcester, MA",
    location: "Massachusetts",
    category: "Higher Education",
    description:
      "Structural Engineering for the new $23M, 36,000 sf Science and Technology building. There are a combination of wet and dry labs dispersed throughout the building with classrooms, offices and support spaces clustered around them.",
    imageAlt: "Quinsigamond Community College Quest Center Worcester, MA — higher education project",
    imageSrc: "/images/projects/quinsigamond-community-college-quest-center-worcester-ma.jpg",
  },
  {
    title: "Springfield Technical Community College Ira K. Rubezhal Student Learning Commons Springfield, MA",
    location: "Massachusetts",
    category: "Higher Education",
    description:
      "Structural Engineering for the the $33M renovations and upgrades to the existing 100,000 GSF historic building on the STCC campus. The existing building was originally an armory with unreinforced masonry, wood trusses and wood floors. Complete upgrades to the lateral system including new concrete shear walls and reinforced floor diaphragms.",
    imageAlt: "Springfield Technical Community College Ira K. Rubezhal Student Learning Commons Springfield, MA — higher education project",
    imageSrc: "/images/projects/springfield-technical-community-college-ira-k-rubezhal-student-learning-commons-springfield-ma.jpg",
  },
  {
    title: "UMass Amherst South College Academic Facility Amherst, MA",
    location: "Massachusetts",
    category: "Higher Education",
    description:
      "Structural Engineering for the $36M addition and complete renovations to the existing historic building to increase the program space from 16,000 net sf to 54,000 net sf. While the addition is steel framed, the existing building is a wood and masonry structure which required extensive underpinning, seismic upgrades and reconstruction of large portions of floors.",
    imageAlt: "UMass Amherst South College Academic Facility Amherst, MA — higher education project",
    imageSrc: "/images/projects/umass-amherst-south-college-academic-facility-amherst-ma.jpg",
  },
  {
    title: "University Of South Dakota Beacom",
    location: "Massachusetts",
    category: "Higher Education",
    description:
      "University of South Dakota Beacom School of Business Vermillion, SD Architect: Charles Rose Architects",
    imageAlt: "University Of South Dakota Beacom — higher education project",
    imageSrc: "/images/projects/university-of-south-dakota-beacom.jpg",
  },
  {
    title: "UMass Basketball Champions Center",
    location: "Amherst, MA",
    category: "Athletic Facilities",
    description:
      "The John Francis Kennedy Champions Center for UMass Basketball — a dedicated training and athletics facility.",
    imageAlt: "UMass Basketball Champions Center — athletics facility with glass facade",
    imageSrc: "/images/projects/umass-basketball-champions-center.jpg",
  },
  {
    title: "University of Massachusetts Amherst- P3 Student Housing Amherst, MA",
    location: "Massachusetts",
    category: "Higher Education",
    description:
      "Structural Engineering for 3 new student housing developments spread over two sites, including multi-story undergraduate and graduate housing, and 20 townhouse style homes for family housing. Undergraduate and graduate housing are wood framed over steel and slab on deck podium apartment buildings with 854 beds in 315,000 gsf and construction costs of $124M. Family housing includes 120 beds in modular townhomes.",
    imageAlt: "University of Massachusetts Amherst- P3 Student Housing Amherst, MA — higher education project",
    imageSrc: "/images/projects/university-of-massachusetts-amherst-p3-student-housing-amherst-ma.jpg",
  },
  {
    title: "University of Massachusetts Dartmouth-Dorms and Dining Hall",
    location: "Massachusetts",
    category: "Higher Education",
    description:
      "Structural engineering for University of Massachusetts Dartmouth-Dorms and Dining Hall. Higher Education project by RSE Associates.",
    imageAlt: "University of Massachusetts Dartmouth-Dorms and Dining Hall — higher education project",
    imageSrc: "/images/projects/university-of-massachusetts-dartmouth-dorms-and-dining-hall.jpg",
  },
  {
    title: "University of Massachusetts Boston Integrated Sciences Complex Boston, MA",
    location: "Massachusetts",
    category: "Higher Education",
    description:
      "Planning, Feasibility Study and Structural Engineering services for support design of the $135M, 225,000 sf new science complex located at the gateway of the campus. Scope of Work includes initial planning to determine building site and location of building and custom design to support the dramatic glass entry area. This project achieved LEED Gold certification. The design included considerations to a strict vibration criteria for lab spaces.",
    imageAlt: "University of Massachusetts Boston Integrated Sciences Complex Boston, MA — higher education project",
    imageSrc: "/images/projects/university-of-massachusetts-boston-integrated-sciences-complex-boston-ma.jpg",
  },
  {
    title: "University of Pennsylvania Law School",
    location: "Philadelphia, PA",
    category: "Higher Education",
    description:
      "Structural engineering for University of Pennsylvania Law School. Architect: Kennedy & Violich Architecture. Higher Education project by RSE Associates.",
    imageAlt: "University of Pennsylvania Law School — higher education project",
    imageSrc: "/images/projects/university-of-pennsylvania-law-school.jpg",
  },
  {
    title: "University of Rhode Island Brookside Hall Kingston, RI",
    location: "Massachusetts",
    category: "Higher Education",
    description:
      "Structural Engineering for the new $65M, 200,000 gross sf building which will have approximately 500 beds, common spaces, grab-and-go station, and student lounges.",
    imageAlt: "University of Rhode Island Brookside Hall Kingston, RI — higher education project",
    imageSrc: "/images/projects/university-of-rhode-island-brookside-hall-kingston-ri.jpg",
  },
  {
    title: "Wentworth Institute of Technology  Center for Engineering, Innovation and Sciences Boston, MA",
    location: "Structural Engineering for the $31.2M, 78,000 sf building over 5 levels. Design considerations include floor vibration criteria for lab spaces, and support for the folded zinc mesh cladding.",
    category: "Higher Education",
    description:
      "2021 Award for Higher Education Facilities Design",
    imageAlt: "Wentworth Institute of Technology  Center for Engineering, Innovation and Sciences Boston, MA — higher education project",
    imageSrc: "/images/projects/wentworth-institute-of-technology-center-for-engineering-innovation-and-sciences-boston-ma.jpg",
  },
  {
    title: "Westfield State University Nettie M. Stevens Science & Innovation Center Westfield, MA",
    location: "Massachusetts",
    category: "Higher Education",
    description:
      "Structural Engineering for the 55,000 sf addition and renovations to the existing 18,400 sf building. The new building and renovation of the existing building features interactive classrooms and research-quality labs for all science concentrations, along with nursing simulation suites. Construction cost is approximately $37 million. The new center achieved LEED Silver Certification.",
    imageAlt: "Westfield State University Nettie M. Stevens Science & Innovation Center Westfield, MA — higher education project",
    imageSrc: "/images/projects/westfield-state-university-nettie-m-stevens-science-innovation-center-westfield-ma.jpg",
  },
  {
    title: "Worcester State University Residence & Dining Hall Worcester, MA",
    location: "Massachusetts",
    category: "Higher Education",
    description:
      "Structural Engineering for the 152,000 GSF new building which has 400 beds, a 625 seat dining facility and a 1,600 sf health services center. The structure consisted of both concrete on metal deck with steel framing for the assembly spaces, and precast concrete plank on an upset structural T (d-beam) to create a flat ceiling in the dormitory spaces. This project achieved LEED Gold certification.",
    imageAlt: "Worcester State University Residence & Dining Hall Worcester, MA — higher education project",
    imageSrc: "/images/projects/worcester-state-university-residence-dining-hall-worcester-ma.jpg",
  },
  {
    title: "Worcester State University Wellness Center Worcester, MA",
    location: "Massachusetts",
    category: "Higher Education",
    description:
      "Structural Engineering for the $53M, 103,000 sf new athletic center. The new center features a 1,200 seat multi-purpose competition gymnasium with a 9,000 sf fitness/weight room, a 1,500 sf training room with hydrotherapy pools, 3 aerobics/dance/spinning rooms, 2 general purpose classrooms, a 1,200 sf function room, a student lounge with a juice bar, a golf simulation room and batting cages. This project achieved LEED Gold certification. Limiting the vibration due to aerobic activities was a consideration when designing the structure.",
    imageAlt: "Worcester State University Wellness Center Worcester, MA — higher education project",
    imageSrc: "/images/projects/worcester-state-university-wellness-center-worcester-ma.jpg",
  },
  {
    title: "Andover WESP School",
    location: "Massachusetts",
    category: "K-12 Schools",
    description:
      "Structural engineering for Andover WESP School. K-12 Schools project by RSE Associates.",
    imageAlt: "Andover WESP School — k-12 schools project",
    imageSrc: "/images/projects/andover-wesp-school.jpg",
  },
  {
    title: "Eliot K-8 Innovation School",
    location: "Massachusetts",
    category: "K-12 Schools",
    description:
      "Structural engineering for Eliot K-8 Innovation School. K-12 Schools project by RSE Associates.",
    imageAlt: "Eliot K-8 Innovation School — k-12 schools project",
    imageSrc: "/images/projects/eliot-k-8-innovation-school.jpg",
  },
  {
    title: "Frederick Gunn School Math, Science, and Technology Center",
    location: "Massachusetts",
    category: "K-12 Schools",
    description:
      "Structural engineering for Frederick Gunn School Math, Science, and Technology Center. K-12 Schools project by RSE Associates.",
    imageAlt: "Frederick Gunn School Math, Science, and Technology Center — k-12 schools project",
    imageSrc: "/images/projects/frederick-gunn-school-math-science-and-technology-center.jpg",
  },
  {
    title: "Fuller Middle School",
    location: "Massachusetts",
    category: "K-12 Schools",
    description:
      "Structural engineering for Fuller Middle School. K-12 Schools project by RSE Associates.",
    imageAlt: "Fuller Middle School — k-12 schools project",
    imageSrc: "/images/projects/fuller-middle-school.jpg",
  },
  {
    title: "Gibbs Middle School",
    location: "Massachusetts",
    category: "K-12 Schools",
    description:
      "Structural engineering for Gibbs Middle School. K-12 Schools project by RSE Associates.",
    imageAlt: "Gibbs Middle School — k-12 schools project",
    imageSrc: "/images/projects/gibbs-middle-school.jpg",
  },
  {
    title: "Lawrenceville High School Gruss Center for Arts & Design",
    location: "Massachusetts",
    category: "K-12 Schools",
    description:
      "Structural engineering for Lawrenceville High School Gruss Center for Arts & Design. K-12 Schools project by RSE Associates.",
    imageAlt: "Lawrenceville High School Gruss Center for Arts & Design — k-12 schools project",
    imageSrc: "/images/projects/lawrenceville-high-school-gruss-center-for-arts-design.jpg",
  },
  {
    title: "Lexington High School",
    location: "Massachusetts",
    category: "K-12 Schools",
    description:
      "Structural engineering for Lexington High School. K-12 Schools project by RSE Associates.",
    imageAlt: "Lexington High School — k-12 schools project",
    imageSrc: "/images/projects/lexington-high-school.jpg",
  },
  {
    title: "Shady Hill Elementary School",
    location: "Massachusetts",
    category: "K-12 Schools",
    description:
      "Structural engineering for Shady Hill Elementary School. K-12 Schools project by RSE Associates.",
    imageAlt: "Shady Hill Elementary School — k-12 schools project",
    imageSrc: "/images/projects/shady-hill-elementary-school.jpg",
  },
  {
    title: "Smithfield, RI Public Schools",
    location: "Massachusetts",
    category: "K-12 Schools",
    description:
      "Structural engineering for Smithfield, RI Public Schools. K-12 Schools project by RSE Associates.",
    imageAlt: "Smithfield, RI Public Schools — k-12 schools project",
    imageSrc: "/images/projects/smithfield-ri-public-schools.jpg",
  },
  {
    title: "Thayer Academy Middle School",
    location: "Massachusetts",
    category: "K-12 Schools",
    description:
      "Structural engineering for Thayer Academy Middle School. K-12 Schools project by RSE Associates.",
    imageAlt: "Thayer Academy Middle School — k-12 schools project",
    imageSrc: "/images/projects/thayer-academy-middle-school.jpg",
  },
  {
    title: "Thayer Academy Performing Arts Center",
    location: "Massachusetts",
    category: "K-12 Schools",
    description:
      "Structural engineering for Thayer Academy Performing Arts Center. K-12 Schools project by RSE Associates.",
    imageAlt: "Thayer Academy Performing Arts Center — k-12 schools project",
    imageSrc: "/images/projects/thayer-academy-performing-arts-center.jpg",
  },
  {
    title: "The Atrium School",
    location: "Massachusetts",
    category: "K-12 Schools",
    description:
      "Structural engineering for The Atrium School. K-12 Schools project by RSE Associates.",
    imageAlt: "The Atrium School — k-12 schools project",
    imageSrc: "/images/projects/the-atrium-school.jpg",
  },
  {
    title: "Branch Line Restaurant Pavilion",
    location: "Watertown, MA",
    category: "Landscapes & Parks",
    description:
      "Structural Engineering for the new 2,750 sf pavilion outside of a restaurant. Architect: Sasaki.",
    imageAlt: "Branch Line Restaurant Pavilion — landscapes & parks project",
    imageSrc: "/images/projects/branch-line-restaurant-pavilion.jpg",
  },
  {
    title: "Brighton Commons Park Pavilion",
    location: "Brighton, MA",
    category: "Landscapes & Parks",
    description:
      "Structural Engineering of the new 145 sf canopy structure and plaza deck. Special attention was paid to the unique panel geometry and exposed steel connections. Architect: Touloukian Touloukian Inc.",
    imageAlt: "Brighton Commons Park Pavilion — landscapes & parks project",
    imageSrc: "/images/projects/brighton-commons-park-pavilion.jpg",
  },
  {
    title: "Farnham-Connolly State Park Pavilion Canton, MA",
    location: "Structural Engineering for 2 canopy structures on raised platforms.The structure consisted of steel members, cables, and wood infill, with architecturally exposed connections.",
    category: "Landscapes & Parks",
    description:
      "Structural engineering for Farnham-Connolly State Park Pavilion Canton, MA Architect: Touloukian Touloukian Inc. Landscapes & Parks project by RSE Associates.",
    imageAlt: "Farnham-Connolly State Park Pavilion Canton, MA — landscapes & parks project",
    imageSrc: "/images/projects/farnham-connolly-state-park-pavilion-canton-ma.jpg",
  },
  {
    title: "Port of Los Angeles Waterfront Development",
    location: "Los Angeles, CA",
    category: "Landscapes & Parks",
    description:
      "Structural Engineering services for the design of the elevated pedestrian walkways, tunnels and an observation tower. The development of the area around the Port of Los Angeles was done to provide a green space buffer between the industrial port and the surrounding neighborhoods. The 97-acre site was transformed and includes a mixed-use district plus continuous open space. Recreation facilities and improved access were provided near the waterfront. Architect: Sasaki.",
    imageAlt: "Port of Los Angeles Waterfront Development — landscapes & parks project",
    imageSrc: "/images/projects/port-of-los-angeles-waterfront-development.jpg",
  },
  {
    title: "Smale Riverfront Park",
    location: "Cincinnati, OH",
    category: "Landscapes & Parks",
    description:
      "Structural Engineering of the public structures including canopies, a bandstand, a carousel, and a restaurant at the roof level of the underground parking structure. Architect: Sasaki.",
    imageAlt: "Smale Riverfront Park — landscapes & parks project",
    imageSrc: "/images/projects/smale-riverfront-park.jpg",
  },
  {
    title: "Ashby Library",
    location: "Massachusetts",
    category: "Libraries",
    description:
      "Structural engineering for Ashby Library. Libraries project by RSE Associates.",
    imageAlt: "Ashby Library — libraries project",
    imageSrc: "/images/projects/ashby-library.jpg",
  },
  {
    title: "Boston Public Library - Faneuil Branch",
    location: "Massachusetts",
    category: "Libraries",
    description:
      "Structural engineering for Boston Public Library - Faneuil Branch. Libraries project by RSE Associates.",
    imageAlt: "Boston Public Library - Faneuil Branch — libraries project",
    imageSrc: "/images/projects/boston-public-library-faneuil-branch.jpg",
  },
  {
    title: "Boston Public Library Jamaica Plain Branch",
    location: "Massachusetts",
    category: "Libraries",
    description:
      "Structural engineering for Boston Public Library Jamaica Plain Branch. Libraries project by RSE Associates.",
    imageAlt: "Boston Public Library Jamaica Plain Branch — libraries project",
    imageSrc: "/images/projects/boston-public-library-jamaica-plain-branch.jpg",
  },
  {
    title: "Eastham Library",
    location: "Massachusetts",
    category: "Libraries",
    description:
      "Structural engineering for Eastham Library. Libraries project by RSE Associates.",
    imageAlt: "Eastham Library — libraries project",
    imageSrc: "/images/projects/eastham-library.jpg",
  },
  {
    title: "Jones Library",
    location: "Massachusetts",
    category: "Libraries",
    description:
      "Structural engineering for Jones Library. Libraries project by RSE Associates.",
    imageAlt: "Jones Library — libraries project",
    imageSrc: "/images/projects/jones-library.jpg",
  },
  {
    title: "Medford Public Library",
    location: "Massachusetts",
    category: "Libraries",
    description:
      "Structural engineering for Medford Public Library. Libraries project by RSE Associates.",
    imageAlt: "Medford Public Library — libraries project",
    imageSrc: "/images/projects/medford-public-library.jpg",
  },
  {
    title: "Millis Library",
    location: "Massachusetts",
    category: "Libraries",
    description:
      "Structural engineering for Millis Library. Libraries project by RSE Associates.",
    imageAlt: "Millis Library — libraries project",
    imageSrc: "/images/projects/millis-library.jpg",
  },
  {
    title: "Scituate Town Library",
    location: "Massachusetts",
    category: "Libraries",
    description:
      "Structural engineering for Scituate Town Library. Libraries project by RSE Associates.",
    imageAlt: "Scituate Town Library — libraries project",
    imageSrc: "/images/projects/scituate-town-library.jpg",
  },
  {
    title: "Somerville West Library",
    location: "Massachusetts",
    category: "Libraries",
    description:
      "Structural engineering for Somerville West Library. Libraries project by RSE Associates.",
    imageAlt: "Somerville West Library — libraries project",
    imageSrc: "/images/projects/somerville-west-library.jpg",
  },
  {
    title: "Stoughton Public Library",
    location: "Massachusetts",
    category: "Libraries",
    description:
      "Structural engineering for Stoughton Public Library. Libraries project by RSE Associates.",
    imageAlt: "Stoughton Public Library — libraries project",
    imageSrc: "/images/projects/stoughton-public-library.jpg",
  },
  {
    title: "Department of Unemployment Assistance - Brockton, MA",
    location: "Massachusetts",
    category: "Mass Timber",
    description:
      "Structural engineering for Department of Unemployment Assistance - Brockton, MA. Mass Timber project by RSE Associates.",
    imageAlt: "Department of Unemployment Assistance - Brockton, MA — mass timber project",
    imageSrc: "/images/projects/department-of-unemployment-assistance-brockton-ma.jpg",
  },
  {
    title: "Central Square Theater 450 Mass Ave",
    location: "Massachusetts",
    category: "Museum & Performing Arts",
    description:
      "Structural engineering for Central Square Theater 450 Mass Ave. Museum & Performing Arts project by RSE Associates.",
    imageAlt: "Central Square Theater 450 Mass Ave — museum & performing arts project",
    imageSrc: "/images/projects/central-square-theater-450-mass-ave.jpg",
  },
  {
    title: "Helzberg Observatory",
    location: "Massachusetts",
    category: "Museum & Performing Arts",
    description:
      "Structural engineering for Helzberg Observatory. Museum & Performing Arts project by RSE Associates.",
    imageAlt: "Helzberg Observatory — museum & performing arts project",
    imageSrc: "/images/projects/helzberg-observatory.jpg",
  },
  {
    title: "Provincetown Art Museum",
    location: "Massachusetts",
    category: "Museum & Performing Arts",
    description:
      "Structural engineering for Provincetown Art Museum. Museum & Performing Arts project by RSE Associates.",
    imageAlt: "Provincetown Art Museum — museum & performing arts project",
    imageSrc: "/images/projects/provincetown-art-museum.jpg",
  },
  {
    title: "The Kennedy Center for Theater and Studio Arts",
    location: "Massachusetts",
    category: "Museum & Performing Arts",
    description:
      "Structural engineering for The Kennedy Center for Theater and Studio Arts. Museum & Performing Arts project by RSE Associates.",
    imageAlt: "The Kennedy Center for Theater and Studio Arts — museum & performing arts project",
    imageSrc: "/images/projects/the-kennedy-center-for-theater-and-studio-arts.jpg",
  },
  {
    title: "The Wellin Museum of Art -Hamilton College",
    location: "Massachusetts",
    category: "Museum & Performing Arts",
    description:
      "Structural engineering for The Wellin Museum of Art -Hamilton College. Museum & Performing Arts project by RSE Associates.",
    imageAlt: "The Wellin Museum of Art -Hamilton College — museum & performing arts project",
    imageSrc: "/images/projects/the-wellin-museum-of-art-hamilton-college.jpg",
  },
  {
    title: "Alice K. Wolf Center – Cambridge Housing Authority Headquarters",
    location: "Cambridge, MA",
    category: "Public & Civic",
    description:
      "Structural engineering for Alice K. Wolf Center – Cambridge Housing Authority Headquarters. Architect: Finegold Alexander Architects. Public & Civic project by RSE Associates.",
    imageAlt: "Alice K. Wolf Center – Cambridge Housing Authority Headquarters — public & civic project",
    imageSrc: "/images/projects/alice-k-wolf-center-cambridge-housing-authority-headquarters.jpg",
  },
  {
    title: "Austen Riggs Community Center",
    location: "Stockbridge, MA",
    category: "Public & Civic",
    description:
      "Structural engineering for Austen Riggs Community Center. Architect: Kyu Sung Woo Architects. Public & Civic project by RSE Associates.",
    imageAlt: "Austen Riggs Community Center — public & civic project",
    imageSrc: "/images/projects/austen-riggs-community-center.jpg",
  },
  {
    title: "Belle Isle Conservatory & Aqarium",
    location: "Detroit, MI",
    category: "Public & Civic",
    description:
      "Structural assessment and design for the rehabilitation of the Belle Isle Conservatory Palm House and Aquarium located on Belle Isle in Detroit. RSE’s work involved replacing the steel trusses supporting the glass walls and roof of the Palm House dome – built in 1904 – and assessing the existing Aquarium structure, the oldest continually operating public aquarium in North America. Architect: G.H. Forbes Associates Architects.",
    imageAlt: "Belle Isle Conservatory & Aqarium — public & civic project",
    imageSrc: "/images/projects/belle-isle-conservatory-aqarium.jpg",
  },
  {
    title: "Boston EMS Rivermoor Training Facility Boston, MA",
    location: "Massachusetts",
    category: "Public & Civic",
    description:
      "Structural Engineering for the adaptive reuse of the second floor of a large industrial building in Roxbury for the EMS Training Academy. The scope includes approximately 12,300 sf interior space (second floor) and 16,300 of exterior space (first floor).",
    imageAlt: "Boston EMS Rivermoor Training Facility Boston, MA — public & civic project",
    imageSrc: "/images/projects/boston-ems-rivermoor-training-facility-boston-ma.jpg",
  },
  {
    title: "Community Education Center for AACA/KKCS",
    location: "Boston, MA",
    category: "Public & Civic",
    description:
      "Structural engineering for Community Education Center for AACA/KKCS. Architect: Bruner/Cott Architects. Public & Civic project by RSE Associates.",
    imageAlt: "Community Education Center for AACA/KKCS — public & civic project",
    imageSrc: "/images/projects/community-education-center-for-aaca-kkcs.jpg",
  },
  {
    title: "Community Rowing Inc. Boat House",
    location: "Newton, MA",
    category: "Public & Civic",
    description:
      "Structural engineering for Community Rowing Inc. Boat House. Architect: Anmahian Winton Architects. Public & Civic project by RSE Associates.",
    imageAlt: "Community Rowing Inc. Boat House — public & civic project",
    imageSrc: "/images/projects/community-rowing-inc-boat-house.jpg",
  },
  {
    title: "Davenport Central Fire Station",
    location: "Davenport, IA",
    category: "Public & Civic",
    description:
      "Structural Engineering for the renovation and addition to the historic fire station. The 20,000 sf addition provides 7 new bays including 5 drive-through bays and was designed to meet LEED Silver requirements. The 10,000 sf renovated portion of the building houses lighter weight rescue vehicles with office space and a conference room on the second floor. Architect: The Galante Architecture Studio.",
    imageAlt: "Davenport Central Fire Station — public & civic project",
    imageSrc: "/images/projects/davenport-central-fire-station.jpg",
  },
  {
    title: "Fitchburg City Hall",
    location: "Fitchburg, MA",
    category: "Public & Civic",
    description:
      "Structural engineering for Fitchburg City Hall. Architect: ICON Architecture. Public & Civic project by RSE Associates.",
    imageAlt: "Fitchburg City Hall — public & civic project",
    imageSrc: "/images/projects/fitchburg-city-hall.jpg",
  },
  {
    title: "Franklin County Justice Center",
    location: "Greenfield, MA",
    category: "Public & Civic",
    description:
      "Structural Engineering of the new 75,000 sf addition and gut renovations of the 25,000 sf of existing space. The project joined the new building seamlessly with the existing, including upgrading the lateral system in the existing building. The new building included a space-saving concrete core that required careful coordination with the building MEP services, while framing the balance of the building with conventional steel and concrete on metal deck. Architect: Leers Weinzapfel Associates.",
    imageAlt: "Franklin County Justice Center — public & civic project",
    imageSrc: "/images/projects/franklin-county-justice-center.jpg",
  },
  {
    title: "J. Michael Ruane Judicial Center",
    location: "Salem, MA",
    category: "Public & Civic",
    description:
      "Structural engineering for J. Michael Ruane Judicial Center. Architect: Goody Clancy. Public & Civic project by RSE Associates.",
    imageAlt: "J. Michael Ruane Judicial Center — public & civic project",
    imageSrc: "/images/projects/j-michael-ruane-judicial-center.jpg",
  },
  {
    title: "John W. Olver Transit Center Greenfield, MA",
    location: "Massachusetts",
    category: "Public & Civic",
    description:
      "The John Olver Transit Center is the winner of the AIA's highest honor for sustainable design.",
    imageAlt: "John W. Olver Transit Center Greenfield, MA — public & civic project",
    imageSrc: "/images/projects/john-w-olver-transit-center-greenfield-ma.jpg",
  },
  {
    title: "Lawrence Police Department Lawrence, MA",
    location: "Massachusetts",
    category: "Public & Civic",
    description:
      "Structural Engineering for a new police station with a floor area of approximately 67,000 square feet. The estimated construction budget is $59M. The new state-of-the-art headquarters will provide officers with modern tools and infrastructure and is expected to be completed in February of 2026.",
    imageAlt: "Lawrence Police Department Lawrence, MA — public & civic project",
    imageSrc: "/images/projects/lawrence-police-department-lawrence-ma.jpg",
  },
  {
    title: "Lowell Justice Center",
    location: "Lowell, MA",
    category: "Public & Civic",
    description:
      "Structural Engineering of the new 263,000 sf, $200M court house and parking garage. This 7-story, energy efficient building has a LEED Platinum goal. Located in the historic Hamilton Canal District in downtown Lowell, the challenging site conditions include a high design flood elevation. The state of the art facility has 17 courtrooms housing the Superior, District, Probate & Family, Juvenile, and Housing Courts of Middlesex County, Massachusetts. Architect: Finegold Alexander Architects.",
    imageAlt: "Lowell Justice Center — public & civic project",
    imageSrc: "/images/projects/lowell-justice-center.jpg",
  },
  {
    title: "Medford Public Access TV",
    location: "Medford, MA",
    category: "Public & Civic",
    description:
      "Structural engineering for Medford Public Access TV. Architect: Scott Payette Architects. Public & Civic project by RSE Associates.",
    imageAlt: "Medford Public Access TV — public & civic project",
    imageSrc: "/images/projects/medford-public-access-tv.jpg",
  },
  {
    title: "One Veteran Plaza Silver Spring, MD",
    location: "Structural Engineering of the $17 million complex to provide space for town office, functions, and recreation.  The complex also includes an outdoor skating rink with a covered canopy.",
    category: "Public & Civic",
    description:
      "Structural engineering for One Veteran Plaza Silver Spring, MD Architect: Machado Silvetti. Public & Civic project by RSE Associates.",
    imageAlt: "One Veteran Plaza Silver Spring, MD — public & civic project",
    imageSrc: "/images/projects/one-veteran-plaza-silver-spring-md.jpg",
  },
  {
    title: "1470 Tremont",
    location: "Boston, MA",
    category: "Residential",
    description:
      "Structural Engineering for a new 5-story building with 4 levels of residential over retail/parking with a partial basement. There will be approximately 30 residential units and a total project area of 40,000 sf. The existing building will be demolished except the stone façade of the rear building will be preserved and incorporated into the new building design. The retail/parking level will be a podium with Type 1A construction and the residential levels will be Type 5B wood construction. Construction cost will be approximately $7.8 million. Architect: Hacin + Associates.",
    imageAlt: "1470 Tremont — residential project",
    imageSrc: "/images/projects/1470-tremont.jpg",
  },
  {
    title: "191-195 Bowdoin Street",
    location: "Boston, MA",
    category: "Residential",
    description:
      "Structural engineering for 191-195 Bowdoin Street. Architect: Utile, Inc. Residential project by RSE Associates.",
    imageAlt: "191-195 Bowdoin Street — residential project",
    imageSrc: "/images/projects/191-195-bowdoin-street.jpg",
  },
  {
    title: "3368 Washington Street",
    location: "Massachusetts",
    category: "Residential",
    description:
      "Structural engineering for 3368 Washington Street. Residential project by RSE Associates.",
    imageAlt: "3368 Washington Street — residential project",
    imageSrc: "/images/projects/3368-washington-street.jpg",
  },
  {
    title: "50 Symphony Road Boston, MA",
    location: "Structural Engineering for a new 5-story building with 20 residential units and a basement parking level. Residential areas will total approximately 25,000 sf, and garage approximately 5,000 sf.",
    category: "Residential",
    description:
      "Structural engineering for 50 Symphony Road Boston, MA Architect: Hendren Associates Architects & Planners. Residential project by RSE Associates.",
    imageAlt: "50 Symphony Road Boston, MA — residential project",
    imageSrc: "/images/projects/50-symphony-road-boston-ma.jpg",
  },
  {
    title: "90 Antwerp Street Brighton, MA",
    location: "Massachusetts",
    category: "Residential",
    description:
      "Structural Engineering for three, new low-rise buildings with 20 residential units totaling 22,000 gsf. The layout of each building is different, but all include covered parking. First floors will be slab on grade with wood and steel framed construction above.",
    imageAlt: "90 Antwerp Street Brighton, MA — residential project",
    imageSrc: "/images/projects/90-antwerp-street-brighton-ma.jpg",
  },
  {
    title: "Cambridge Housing Authority Harry Truman Apartments Cambridge, MA",
    location: "Massachusetts",
    category: "Residential",
    description:
      "Structural Engineering for 59 apartments in 8-story concrete buildings. Total living area is approximately 54,000 sf. Upgrades include renovations to all bathrooms and kitchens within the units, as well as upgrades to mechanical systems.",
    imageAlt: "Cambridge Housing Authority Harry Truman Apartments Cambridge, MA — residential project",
    imageSrc: "/images/projects/cambridge-housing-authority-harry-truman-apartments-cambridge-ma.jpg",
  },
  {
    title: "Cambridge Residence",
    location: "Cambridge, MA",
    category: "Residential",
    description:
      "Structural Engineering for a new 4,500 sf single family private residence. Architect: Anmahian Winton Architects.",
    imageAlt: "Cambridge Residence — residential project",
    imageSrc: "/images/projects/cambridge-residence.jpg",
  },
  {
    title: "E+ Highland Street Boston, MA Studio G Architects",
    location: "Structural Engineering for a new, four-story, residential building with 23 residential units. The new 30,000 sf building includes a semi-below-grade parking garage, and community art space. The new energy positive building is designed to surpass LEED Platinum standards.",
    category: "Residential",
    description:
      "Structural engineering for E+ Highland Street Boston, MA Studio G Architects. Residential project by RSE Associates.",
    imageAlt: "E+ Highland Street Boston, MA Studio G Architects — residential project",
    imageSrc: "/images/projects/e-highland-street-boston-ma-studio-g-architects.jpg",
  },
  {
    title: "East House",
    location: "Chilmark, MA",
    category: "Residential",
    description:
      "Structural engineering for East House. Architect: Peter Rose & Partners. Residential project by RSE Associates.",
    imageAlt: "East House — residential project",
    imageSrc: "/images/projects/east-house.jpg",
  },
  {
    title: "Hamptons Beach House",
    location: "East Quogue, NY",
    category: "Residential",
    description:
      "Structural Engineering for the new private family residence with a floor area of approximately 5,000 sf with an exterior trellis. This house features architecturally-exposed concrete construction.",
    imageAlt: "Hamptons Beach House — residential project",
    imageSrc: "/images/projects/hamptons-beach-house.jpg",
  },
  {
    title: "JJ Carroll Development - 2 Life Communities Boston, MA",
    location: "Massachusetts",
    category: "Residential",
    description:
      "Structural Engineering for a new, $35M, 130,000 GSF, 6 story building with mixed use including residential, commercial, healthcare, and parking. Building construction will be steel framed podium supporting 5 stories of wood-framed residential multi-family construction with 130 to 140 residential units.  This project is pursuing Passive House.",
    imageAlt: "JJ Carroll Development - 2 Life Communities Boston, MA — residential project",
    imageSrc: "/images/projects/jj-carroll-development-2-life-communities-boston-ma.jpg",
  },
  {
    title: "Kelley St. - Cambridge Residence",
    location: "Cambridge, MA",
    category: "Residential",
    description:
      "Structural engineering for Kelley St. - Cambridge Residence. Architect: Kyu Sung Woo Architects, Inc. Residential project by RSE Associates.",
    imageAlt: "Kelley St. - Cambridge Residence — residential project",
    imageSrc: "/images/projects/kelley-st-cambridge-residence.jpg",
  },
  {
    title: "On The Dot 495 Dorchester Ave. Boston, MA",
    location: "Massachusetts",
    category: "Residential",
    description:
      "Structural Engineering for a new 331-unit mixed income multi-family project in South Boston. The project is composed of two distinct buildings, a 16-story tower and a 6-story mid-rise designed to achieve LEED Gold status. Construction budget is $220M.  On The Dot is part of a larger 21-acre BPDA approved masterplan for the entire stretch of Dorchester Avenue; that will bring millions of square feet of 21st century workspace, housing, and much needed open space.",
    imageAlt: "On The Dot 495 Dorchester Ave. Boston, MA — residential project",
    imageSrc: "/images/projects/on-the-dot-495-dorchester-ave-boston-ma.jpg",
  },
  {
    title: "Red Rock Residence",
    location: "Canaan, NY",
    category: "Residential",
    description:
      "Structural engineering for Red Rock Residence. Architect: Anmahian Winton Architects. Residential project by RSE Associates.",
    imageAlt: "Red Rock Residence — residential project",
    imageSrc: "/images/projects/red-rock-residence.jpg",
  },
  {
    title: "Roxbury Crossing Senior Building",
    location: "Roxbury, MA",
    category: "Residential",
    description:
      "Structural engineering for Roxbury Crossing Senior Building. Architect: Goody Clancy. Residential project by RSE Associates.",
    imageAlt: "Roxbury Crossing Senior Building — residential project",
    imageSrc: "/images/projects/roxbury-crossing-senior-building.jpg",
  },
  {
    title: "The Guild at 154 Broadway",
    location: "Massachusetts",
    category: "Residential",
    description:
      "Structural engineering for The Guild at 154 Broadway. Residential project by RSE Associates.",
    imageAlt: "The Guild at 154 Broadway — residential project",
    imageSrc: "/images/projects/the-guild-at-154-broadway.jpg",
  },
  {
    title: "Tilia Jamaica Plain",
    location: "Jamaica Plain, MA",
    category: "Residential",
    description:
      "Structural Engineering for the 120 unit housing development, parking, retail spaces and a community center.",
    imageAlt: "Tilia Jamaica Plain — residential project",
    imageSrc: "/images/projects/tilia-jamaica-plain.jpg",
  },
  {
    title: "Upper Washington Street Housing - Viet AID",
    location: "Dorchester, MA",
    category: "Residential",
    description:
      "Structural engineering for Upper Washington Street Housing - Viet AID. Architect: Utile, Inc. Residential project by RSE Associates.",
    imageAlt: "Upper Washington Street Housing - Viet AID — residential project",
    imageSrc: "/images/projects/upper-washington-street-housing-viet-aid.jpg",
  },
  {
    title: "African Meeting House",
    location: "Massachusetts",
    category: "Restoration & Renovation",
    description:
      "Structural engineering for African Meeting House. Restoration & Renovation project by RSE Associates.",
    imageAlt: "African Meeting House — restoration & renovation project",
    imageSrc: "/images/projects/african-meeting-house.jpg",
  },
  {
    title: "Korean Church of Boston",
    location: "Massachusetts",
    category: "Restoration & Renovation",
    description:
      "Structural engineering for Korean Church of Boston. Restoration & Renovation project by RSE Associates.",
    imageAlt: "Korean Church of Boston — restoration & renovation project",
    imageSrc: "/images/projects/korean-church-of-boston.jpg",
  },
  {
    title: "Martha's Vineyard Museum",
    location: "Massachusetts",
    category: "Restoration & Renovation",
    description:
      "Structural engineering for Martha's Vineyard Museum. Restoration & Renovation project by RSE Associates.",
    imageAlt: "Martha's Vineyard Museum — restoration & renovation project",
    imageSrc: "/images/projects/martha-s-vineyard-museum.jpg",
  },
  {
    title: "Middlesex Community College Academic Arts Building",
    location: "Massachusetts",
    category: "Restoration & Renovation",
    description:
      "Structural engineering for Middlesex Community College Academic Arts Building. Restoration & Renovation project by RSE Associates.",
    imageAlt: "Middlesex Community College Academic Arts Building — restoration & renovation project",
    imageSrc: "/images/projects/middlesex-community-college-academic-arts-building.jpg",
  },
  {
    title: "Springfield Technical Community College Student Learning Commons",
    location: "Massachusetts",
    category: "Restoration & Renovation",
    description:
      "Structural engineering for Springfield Technical Community College Student Learning Commons. Restoration & Renovation project by RSE Associates.",
    imageAlt: "Springfield Technical Community College Student Learning Commons — restoration & renovation project",
    imageSrc: "/images/projects/springfield-technical-community-college-student-learning-commons.jpg",
  },
  {
    title: "University of Massachusetts Amherst Old Chapel",
    location: "Massachusetts",
    category: "Restoration & Renovation",
    description:
      "Structural engineering for University of Massachusetts Amherst Old Chapel. Restoration & Renovation project by RSE Associates.",
    imageAlt: "University of Massachusetts Amherst Old Chapel — restoration & renovation project",
    imageSrc: "/images/projects/university-of-massachusetts-amherst-old-chapel.jpg",
  },
  {
    title: "West Springfield Public Library",
    location: "Massachusetts",
    category: "Restoration & Renovation",
    description:
      "Structural engineering for West Springfield Public Library. Restoration & Renovation project by RSE Associates.",
    imageAlt: "West Springfield Public Library — restoration & renovation project",
    imageSrc: "/images/projects/west-springfield-public-library.jpg",
  },
  {
    title: "Williams College Museum of Art",
    location: "Massachusetts",
    category: "Restoration & Renovation",
    description:
      "Structural engineering for Williams College Museum of Art. Restoration & Renovation project by RSE Associates.",
    imageAlt: "Williams College Museum of Art — restoration & renovation project",
    imageSrc: "/images/projects/williams-college-museum-of-art.jpg",
  },
] as const;

export const AWARDS = [
  {
    year: 2024,
    title: "Harleston Parker Medal Award",
    organization: "Boston Society of Architects",
    project: "Roxbury Branch of the Boston Public Library",
  },
  {
    year: 2024,
    title: "Paul & Niki Tsongas Award",
    organization: "Preservation Massachusetts",
    project: "Lower Basin Barracks",
  },
  {
    year: 2024,
    title: "Boston Preservation Achievement",
    organization: "Boston Preservation Alliance",
    project: "Lower Basin Barracks",
  },
  {
    year: 2023,
    title: "Gold Medal — Facilities III",
    organization: "OFFICER Magazine",
    project: "Massachusetts State Police Lower Basin Barracks",
  },
  {
    year: 2022,
    title: "AIA Central Massachusetts Honor Award",
    organization: "AIA Central Massachusetts",
    project: "Gladys E. Kelly Public Library",
  },
  {
    year: 2021,
    title: "Boston Preservation Achievement",
    organization: "Boston Preservation Alliance",
    project: "Roxbury Branch of the Boston Public Library",
  },
  {
    year: 2021,
    title: "Accessible Design Award",
    organization: "Massachusetts Access Board",
    project: "Lowell Justice Center",
  },
  {
    year: 2021,
    title: "Higher Education Facilities Design Award",
    organization: "American Institute of Architects",
    project: "Wentworth Institute of Technology Science and Innovation Center",
  },
] as const;

export const LEADERSHIP = [
  {
    name: "Richmond So",
    title: "President / Founder",
    bio: "Founded RSE Associates in 2001 with a commitment to delivering the technical rigor of a large firm through the responsiveness of a small one. Leads the firm's strategic direction and principal-level project oversight.",
  },
  {
    name: "Jennifer McClain",
    title: "Principal",
    bio: "Brings deep expertise in complex institutional and civic projects. Known for close collaboration with architects and a rigorous approach to constructability.",
  },
  {
    name: "Tin Chu Wong",
    title: "Principal",
    bio: "Specializes in adaptive reuse, historic renovation, and structural investigation. Experienced across a wide range of building types and structural systems.",
  },
  {
    name: "Liam O'Hanlon",
    title: "Principal",
    bio: "Focuses on higher education, science, and technology facilities. Brings strong project management skills and an eye for efficient structural systems.",
  },
  {
    name: "Sofya Auren",
    title: "Principal",
    bio: "Expert in residential, mixed-use, and mass timber construction. Committed to sustainable design approaches and advancing the use of innovative structural materials.",
  },
] as const;
