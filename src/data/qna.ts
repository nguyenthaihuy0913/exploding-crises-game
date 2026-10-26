import { QnaItem } from '../types/game';

export const QNA_QUESTIONS: QnaItem[] = [
  {
    "id": "en_q01",
    "step": "Step 1: Problem Definition - Scope Creep",
    "scenario": "A student team is assigned to design a 5-question cafeteria feedback tool in two weeks. By day four, members want to add food delivery, online payments, and student messaging.",
    "question": "Which fundamental principle of Step 1 (Problem Definition) did the student team violate?",
    "options": [
      {
        "id": "a",
        "text": "Uncontrolled scope expansion that blurs the core objective and exceeds allotted timelines.",
        "isCorrect": true,
        "explanation": "Correct! Step 1 requires defining clear boundaries and an MVP before considering peripheral features."
      },
      {
        "id": "b",
        "text": "Encouraging expansive cross-functional feature discovery that should proceed without schedule boundaries to maximize user utility.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Uncontrolled feature bloat without schedule governance guarantees missed deadlines."
      },
      {
        "id": "c",
        "text": "Failing to recruit external software developers who could implement all four enterprise systems within the original two-week window.",
        "isCorrect": false,
        "explanation": "Incorrect. This fallaciously blames resource headcounts instead of addressing a foundational scoping error."
      },
      {
        "id": "d",
        "text": "Ignoring advanced artificial intelligence automated predictive modeling algorithms for anticipating peak lunch hour foot traffic.",
        "isCorrect": false,
        "explanation": "Incorrect. Premature complexity that distracts from the fundamental 5-question feedback objective."
      }
    ]
  },
  {
    "id": "en_q02",
    "step": "Step 1: Problem Framing - Symptom vs. Root Cause",
    "scenario": "A campus startup observes user churn rising by 35% this month. The director immediately prepares a massive 50% discount voucher campaign to stop customer departures.",
    "question": "Why does issuing discount vouchers represent a dangerous problem-solving error?",
    "options": [
      {
        "id": "a",
        "text": "Issuing price discounts is financially insufficient because contemporary university students respond solely to free merchandise and cash giveaways.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Subsidizing churned users without diagnosing the underlying cause burns cash without fixing retention."
      },
      {
        "id": "b",
        "text": "It treats a visible surface symptom instead of investigating root software bugs or UX flaws.",
        "isCorrect": true,
        "explanation": "Spot on! Churn is a symptom. If the app is crashing, price cuts merely subsidize departing users without resolving defects."
      },
      {
        "id": "c",
        "text": "Customer support agents should have been immediately suspended for failing to convince leaving users to remain loyal to the service.",
        "isCorrect": false,
        "explanation": "Incorrect. Emotional blame attribution fails to identify mechanical or architectural system bottlenecks."
      },
      {
        "id": "d",
        "text": "Voucher promotional discounts inevitably trigger inflationary currency distortions across regional microeconomic educational ecosystems.",
        "isCorrect": false,
        "explanation": "Incorrect. Irrelevant macroeconomic distraction that ignores product usability and service quality."
      }
    ]
  },
  {
    "id": "en_q03",
    "step": "Step 1: Drafting The Problem Statement",
    "scenario": "An urban delivery logistics team drafts their problem statement: \"Our team currently lacks five new refrigerated delivery vans to complete same-day orders on time.\"",
    "question": "What is the primary methodological flaw in this problem statement?",
    "options": [
      {
        "id": "a",
        "text": "Refrigerated delivery vans are economically unviable compared to cargo bicycles in high-density urban downtown corridors.",
        "isCorrect": false,
        "explanation": "Incorrect. This debates vehicle choices rather than critiquing the logical structure of the problem statement."
      },
      {
        "id": "b",
        "text": "The statement presumes a specific solution rather than neutrally defining the operational performance gap.",
        "isCorrect": true,
        "explanation": "Accurate! A disciplined problem statement articulates the gap and metric impact, never a pre-selected procurement solution."
      },
      {
        "id": "c",
        "text": "Problem statements must strictly exclude numerical quantities, delivery milestones, and operational metrics from formal documentation.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Metrics are essential; the defect is baking the assumed solution directly into the definition."
      },
      {
        "id": "d",
        "text": "Logistics statements should prioritize driver emotional sentiment indices rather than focusing strictly on temporal order fulfillment ratios.",
        "isCorrect": false,
        "explanation": "Incorrect. While driver morale matters, problem statements require objective operational baseline definitions."
      }
    ]
  },
  {
    "id": "en_q04",
    "step": "Step 1: Boundary Setting & Non-Goals",
    "scenario": "A campus working group begins redesigning quiet study halls in the main library. Vocal student delegates demand that cafeteria food menus and dorm gym hours be included.",
    "question": "How should the project lead manage these extra requests during Step 1?",
    "options": [
      {
        "id": "a",
        "text": "Incorporate all delegate requests into the active project charter to foster comprehensive campus-wide political alignment and goodwill.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Attempting to satisfy every peripheral request causes boundary dissolution and project failure."
      },
      {
        "id": "b",
        "text": "Establish an explicit Non-Goals register to maintain project focus while logging feedback.",
        "isCorrect": true,
        "explanation": "Outstanding! Documenting explicit non-goals protects core delivery focus while showing stakeholders their input was recorded."
      },
      {
        "id": "c",
        "text": "Dismiss student input entirely and restrict planning authority to senior library administrative staff behind closed doors.",
        "isCorrect": false,
        "explanation": "Incorrect. Eliminating stakeholder consultation creates severe resistance during eventual rollout."
      },
      {
        "id": "d",
        "text": "Immediately expand project staffing by four hundred percent to simultaneously re-engineer all residential and athletic campus facilities.",
        "isCorrect": false,
        "explanation": "Incorrect. Absurd scope inflation that bankrupts capital budgets and guarantees organizational failure."
      }
    ]
  },
  {
    "id": "en_q05",
    "step": "Step 1: Context & Constraint Analysis",
    "scenario": "A student society aims to build a campus ridesharing platform. They plan server architecture without verifying municipal taxi transport regulations or university IT policies.",
    "question": "Which critical component of Step 1 did the development team neglect?",
    "options": [
      {
        "id": "a",
        "text": "Environmental context and regulatory boundary constraints.",
        "isCorrect": true,
        "explanation": "Correct! Feasibility boundaries and legal constraints must be established before committing engineering resources."
      },
      {
        "id": "b",
        "text": "Failing to conduct international multi-country user perception surveys across fifteen university campuses worldwide before writing any code.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Premature worldwide scaling before establishing local legal compliance is wasteful."
      },
      {
        "id": "c",
        "text": "Selecting relational SQL database schemas instead of non-relational graph databases for modeling urban geographical spatial coordinate points.",
        "isCorrect": false,
        "explanation": "Incorrect. Technical implementation details do not replace legal and operational boundary checks."
      },
      {
        "id": "d",
        "text": "Mandating that all incoming freshmen purchase company equity shares prior to obtaining authorized access to the campus vehicle network.",
        "isCorrect": false,
        "explanation": "Incorrect. Unrealistic legal arrangement completely unrelated to problem definition and boundary analysis."
      }
    ]
  },
  {
    "id": "en_q06",
    "step": "Step 2: Root Cause - 5 Whys Analysis",
    "scenario": "Baristas at a campus coffee shop repeatedly slip and drop hot beverages during peak morning hours. Management penalizes staff members for careless hurrying.",
    "question": "Applying the 5 Whys, what did management fail to investigate?",
    "options": [
      {
        "id": "a",
        "text": "Mandating that baristas attend weekly classroom posture lectures to ensure they walk at half speed across wet service counters.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Forcing artificial slowdowns exacerbates customer wait times without fixing floor drainage."
      },
      {
        "id": "b",
        "text": "Underlying physical causes like leaking ice drainage and untextured flooring.",
        "isCorrect": true,
        "explanation": "Correct! The 5 Whys drill through surface human error to uncover latent environmental and equipment layout hazards."
      },
      {
        "id": "c",
        "text": "Doubling financial disciplinary deductions to verify whether fiscal disincentives eliminate physical slipping on liquid surfaces.",
        "isCorrect": false,
        "explanation": "Incorrect. Escalating punitive fines demoralizes staff without stopping physical water leaks."
      },
      {
        "id": "d",
        "text": "Replacing human beverage preparation entirely with imported high-speed humanoid robotic dispensing arms within thirty business days.",
        "isCorrect": false,
        "explanation": "Incorrect. Unfeasible capital expenditure that avoids simple plumbing and floor maintenance."
      }
    ]
  },
  {
    "id": "en_q07",
    "step": "Step 2: MECE Principle (Issue Trees)",
    "scenario": "A consulting team analyzes why university bookstore revenue dropped. They categorize drivers into: \"Online Competitors\", \"High Textbook Prices\", and \"Low Student Enrollment\".",
    "question": "Why does this categorization breach the MECE (Mutually Exclusive, Collectively Exhaustive) principle?",
    "options": [
      {
        "id": "a",
        "text": "Categories overlap and omit non-textbook revenue streams like stationery.",
        "isCorrect": true,
        "explanation": "Spot on! Price and competition overlap in consumer purchasing decisions, while omitting other merchandise categories."
      },
      {
        "id": "b",
        "text": "Consulting frameworks should never disaggregate commercial retail revenue into distinct constituent mathematical components or price variables.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Mathematical revenue disaggregation is the foundation of sound issue tree structuring."
      },
      {
        "id": "c",
        "text": "University bookstores must legally maintain monopolistic retail pricing structures exempt from standard competitive market forces.",
        "isCorrect": false,
        "explanation": "Incorrect. Factually incorrect assumption regarding educational retail commerce."
      },
      {
        "id": "d",
        "text": "The categories fail to incorporate metaphysical astrological indicators influencing seasonal undergraduate purchasing inclinations.",
        "isCorrect": false,
        "explanation": "Incorrect. Pseudoscience distractor irrelevant to analytical business problem solving."
      }
    ]
  },
  {
    "id": "en_q08",
    "step": "Step 2: Ishikawa 4M Root Cause Taxonomy",
    "scenario": "A commercial bakery experiences inconsistent pastry crust browning. An analysis using the Ishikawa 4M taxonomy (Man, Machine, Method, Material) is initiated.",
    "question": "Under which 4M branch does \"An uncalibrated thermal oven sensor causing temperature fluctuations\" belong?",
    "options": [
      {
        "id": "a",
        "text": "Material: Categorized under raw organic ingredient variations such as sugar crystallization and moisture content in flour bags.",
        "isCorrect": false,
        "explanation": "Incorrect. Ingredients belong to Material; technical hardware belongs to Machine."
      },
      {
        "id": "b",
        "text": "Method: Classified under operational recipe instructions, mixing duration guidelines, and standardized cooling rack procedures.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Procedural timing belongs to Method; physical sensor hardware belongs to Machine."
      },
      {
        "id": "c",
        "text": "Machine: Operating physical equipment, instruments, and hardware sensors.",
        "isCorrect": true,
        "explanation": "Spot on! The baking oven and its electronic thermal sensor are mechanical hardware tools classified under Machine."
      },
      {
        "id": "d",
        "text": "Man: Attributed to the psychological emotional fatigue experienced by head pastry chefs working early morning baking shifts.",
        "isCorrect": false,
        "explanation": "Incorrect. The sensor is a physical calibration hardware defect, not human fatigue."
      }
    ]
  },
  {
    "id": "en_q09",
    "step": "Step 2: Hypothesis-Driven Structuring",
    "scenario": "A tech firm starts investigating server slowdowns. The lead engineer insists on examining all 80 server microservices before forming any initial hypothesis.",
    "question": "Why is an inductive \"boil the ocean\" approach inferior to hypothesis-driven problem solving?",
    "options": [
      {
        "id": "a",
        "text": "Testing all microservices ensures complete architectural comprehension and should precede any deductive hypothesis testing.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Exhaustively testing non-culprit systems wastes precious time during urgent outages."
      },
      {
        "id": "b",
        "text": "Hypotheses focus data collection on high-probability bottlenecks first.",
        "isCorrect": true,
        "explanation": "Correct! Structured problem solvers formulate testable hypotheses to rapidly isolate and validate root causes."
      },
      {
        "id": "c",
        "text": "Modern cloud microservice architectures never generate diagnosable telemetry logs for performance monitoring.",
        "isCorrect": false,
        "explanation": "Incorrect. Microservices produce extensive telemetry; the problem is lack of focused prioritization."
      },
      {
        "id": "d",
        "text": "Senior software architects are legally forbidden from diagnosing backend systems without prior unanimous executive committee voting.",
        "isCorrect": false,
        "explanation": "Incorrect. Corporate governance does not mandate committee voting for technical server diagnostics."
      }
    ]
  },
  {
    "id": "en_q10",
    "step": "Step 2: Correlation vs. Causation",
    "scenario": "Data indicates software engineers drinking four cups of coffee daily submit 30% more code pull requests but also encounter 40% more critical system bugs.",
    "question": "What analytical fallacy occurs if leadership concludes coffee causes code defects?",
    "options": [
      {
        "id": "a",
        "text": "Failing to collect longitudinal biometric data across twenty thousand international developers to prove that caffeine chemically alters compiler code.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). The issue is not lack of biometric trials, but attributing causality to an unadjusted correlation."
      },
      {
        "id": "b",
        "text": "Overlooking that heavy caffeine intake and coding bugs both stem from deadline crunch.",
        "isCorrect": true,
        "explanation": "Brilliant! A confounding third variable (workplace pressure and fatigue) causes both caffeine consumption and error rates."
      },
      {
        "id": "c",
        "text": "Assuming sample sizes under five hundred thousand observations are completely invalid for exploratory enterprise organizational analytics.",
        "isCorrect": false,
        "explanation": "Incorrect. Moderate sample sizes yield valuable insights; the error is faulty causal inference."
      },
      {
        "id": "d",
        "text": "Ignoring that beverage temperature correlates directly with keyboard mechanical switch degradation over prolonged seasonal testing.",
        "isCorrect": false,
        "explanation": "Incorrect. Spurious physical explanation unrelated to programmer cognitive workload."
      }
    ]
  },
  {
    "id": "en_q11",
    "step": "Step 3: Pareto Principle (80/20 Rule)",
    "scenario": "A technical helpdesk receives 400 support tickets across 8 distinct categories. Engineering capacity allows addressing only 2 categories this sprint.",
    "question": "How does a disciplined team apply the Pareto Principle to prioritize?",
    "options": [
      {
        "id": "a",
        "text": "Distribute technical engineering hours uniformly across all eight ticket categories to ensure equitable treatment for every product team.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Uniform resource spreading dilutes focus so zero root issues get resolved permanently."
      },
      {
        "id": "b",
        "text": "Target the 20% of root defect types that generate 80% of total customer tickets.",
        "isCorrect": true,
        "explanation": "Precisely! The Pareto Principle instructs problem solvers to isolate the \"Vital Few\" defects that yield disproportionate recovery impact."
      },
      {
        "id": "c",
        "text": "Select whichever two defect types possess the shortest code descriptions regardless of how many customer accounts they disrupt.",
        "isCorrect": false,
        "explanation": "Incorrect. Prioritizing by brevity or convenience ignores measurable customer severity."
      },
      {
        "id": "d",
        "text": "Delay all bug remediation efforts until the subsequent fiscal quarter while commissioning third-party management consulting audits.",
        "isCorrect": false,
        "explanation": "Incorrect. Bureaucratic procrastination allows severe defects to degrade customer retention unchecked."
      }
    ]
  },
  {
    "id": "en_q12",
    "step": "Step 3: Impact vs. Effort Prioritization Matrix",
    "scenario": "During a product sprint, a team brainstorms 20 feature ideas. Four ideas require minimal coding effort and yield immediate revenue lift, while others require 6 months of work.",
    "question": "In which quadrant of the 2x2 Impact-Effort Matrix do these 4 high-yield features sit?",
    "options": [
      {
        "id": "a",
        "text": "Low Impact, High Effort: Categorized as \"Money Pits\" that require extensive architectural consensus building before initiation.",
        "isCorrect": false,
        "explanation": "Incorrect. Low impact and high effort characterize bad investments, not high-yield features."
      },
      {
        "id": "b",
        "text": "High Impact, Low Effort: Designated as \"Quick Wins\" for immediate execution.",
        "isCorrect": true,
        "explanation": "Spot on! High impact with low effort delivers immediate ROI, known as \"Quick Wins\"."
      },
      {
        "id": "c",
        "text": "Low Impact, Low Effort: Classified as \"Fill-In Distractions\" that should only be pursued when developers run out of tasks.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). These features yield significant revenue, so they are high impact."
      },
      {
        "id": "d",
        "text": "High Effort, Low Feasibility: Labeled as \"Moonshot Explorations\" requiring venture capital syndication prior to backlog grooming.",
        "isCorrect": false,
        "explanation": "Incorrect. The features require minimal effort and are immediately viable."
      }
    ]
  },
  {
    "id": "en_q13",
    "step": "Step 3: Eliminating Non-Critical Branches",
    "scenario": "A university committee investigating campus parking congestion spends 60 hours debating whether to redesign visitor parking permit stamp ink colors.",
    "question": "What prioritization failure (Law of Triviality / Bikeshedding) occurred?",
    "options": [
      {
        "id": "a",
        "text": "Failing to eliminate low-impact trivial issues in favor of major capacity bottlenecks.",
        "isCorrect": true,
        "explanation": "Correct! Teams fall into Parkinson’s Law of Triviality when they spend outsized time on trivial details because they are easy to understand."
      },
      {
        "id": "b",
        "text": "Stamp ink color decisions represent crucial visual branding touchpoints that dictate long-term university student matriculation loyalty.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Ink colors have negligible impact on physical parking stall capacity."
      },
      {
        "id": "c",
        "text": "The committee should have requisitioned five thousand liters of fluorescent reflective ink before conducting preliminary parking lot counts.",
        "isCorrect": false,
        "explanation": "Incorrect. Wasteful procurement that escalates an already trivial tangent."
      },
      {
        "id": "d",
        "text": "Parking congestion cannot be analyzed without first calculating the astronomical gravitational pull on passenger sedans during full moon phases.",
        "isCorrect": false,
        "explanation": "Incorrect. Absurd distraction having zero bearing on urban transportation engineering."
      }
    ]
  },
  {
    "id": "en_q14",
    "step": "Step 3: Forced Ranking & Resource Constraints",
    "scenario": "A student startup with $2,000 budget lists 12 marketing initiatives. The founder declares all 12 are equally \"Top Priority 1\" and must receive identical funding.",
    "question": "Why is declaring all initiatives \"Top Priority\" a leadership failure?",
    "options": [
      {
        "id": "a",
        "text": "Democracy requires that every marketing channel receive equal budgetary disbursements to protect organizational team harmony.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Equal distribution without prioritization guarantees underfunded, ineffective campaigns."
      },
      {
        "id": "b",
        "text": "When everything is a priority, nothing is, causing fragmented budgets and zero impact.",
        "isCorrect": true,
        "explanation": "Accurate! True prioritization requires tough trade-offs and forced ranking under scarce capital constraints."
      },
      {
        "id": "c",
        "text": "Marketing initiatives must never be funded using cash reserves until after the company files for an initial public offering on NASDAQ.",
        "isCorrect": false,
        "explanation": "Incorrect. Pre-IPO startups must market their offerings to gain early traction."
      },
      {
        "id": "d",
        "text": "Advertising agencies require minimum retainer deposits of two million dollars before accepting preliminary telephone consultation calls.",
        "isCorrect": false,
        "explanation": "Incorrect. False premise unrelated to the internal logic of priority setting."
      }
    ]
  },
  {
    "id": "en_q15",
    "step": "Step 3: Opportunity Cost in Decision Making",
    "scenario": "An app team spends three weeks hand-coding a custom internal chat widget instead of integrating a proven free open-source plugin, delaying their core payment feature launch.",
    "question": "What economic and problem-solving concept illustrates the cost of this choice?",
    "options": [
      {
        "id": "a",
        "text": "Opportunity Cost: The lost value of not launching core payments three weeks earlier.",
        "isCorrect": true,
        "explanation": "Precisely! Opportunity cost measures the lost revenue and advantage of the best forgone alternative."
      },
      {
        "id": "b",
        "text": "The Sunk Capital Asset Preservation Metric: Documenting internal development hours to claim intellectual property patent protections.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Building commodity chat widgets from scratch confers no patent advantage and delays market launch."
      },
      {
        "id": "c",
        "text": "Economies of Scale: Decreasing average marginal unit costs achieved through continuous internal proprietary code typing.",
        "isCorrect": false,
        "explanation": "Incorrect. Economies of scale apply to volume production, not reinventing existing wheels."
      },
      {
        "id": "d",
        "text": "Regulatory Monopolistic Rent-Seeking: Generating statutory barriers to prevent third-party payment gateways from serving students.",
        "isCorrect": false,
        "explanation": "Incorrect. Irrelevant regulatory concept that has nothing to do with internal team time allocation."
      }
    ]
  },
  {
    "id": "en_q16",
    "step": "Step 4: Confirmation Bias in Research",
    "scenario": "A founder convinced students hate cafeteria sushi searches Google exclusively for \"cafeteria sushi food poisoning complaints\" and ignores satisfaction surveys showing 92% approval.",
    "question": "Which cognitive bias severely distorts the founder’s data analysis?",
    "options": [
      {
        "id": "a",
        "text": "Systemic Availability Heuristic: Evaluating event likelihoods based solely on the vivid emotional recall of catastrophic public disasters.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). While related, actively searching only for confirming queries is classic confirmation bias."
      },
      {
        "id": "b",
        "text": "Confirmation Bias: Seeking data that confirms preconceptions while dismissing counter-evidence.",
        "isCorrect": true,
        "explanation": "Spot on! Confirmation bias blinds investigators by cherry-picking evidence that supports preconceived beliefs."
      },
      {
        "id": "c",
        "text": "Hindsight Bias: Falsely believing after an outcome occurs that one had accurately predicted it all along.",
        "isCorrect": false,
        "explanation": "Incorrect. Hindsight bias occurs post-event; this is active distortion of ongoing data gathering."
      },
      {
        "id": "d",
        "text": "The Bandwagon Effect: Uncritically adopting ideological dogmas simply because the majority of surrounding peers endorse them.",
        "isCorrect": false,
        "explanation": "Incorrect. The founder is acting against the 92% majority consensus."
      }
    ]
  },
  {
    "id": "en_q17",
    "step": "Step 4: Primary vs. Secondary Research",
    "scenario": "To solve long wait lines at the campus health clinic, an analyst reads ten generic medical journal articles from 2012 rather than interviewing clinic nurses and observing patient triage.",
    "question": "Why is relying solely on 12-year-old secondary research flawed here?",
    "options": [
      {
        "id": "a",
        "text": "Secondary literature lacks localized context, real-time workflow observations, and stakeholder reality.",
        "isCorrect": true,
        "explanation": "Correct! Step 4 requires fact-based primary field data to understand immediate operational bottlenecks."
      },
      {
        "id": "b",
        "text": "Peer-reviewed academic journals published prior to 2020 are legally prohibited from being cited in operational healthcare engineering audits.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Literature is not legally barred, but outdated general studies cannot diagnose local bottlenecks."
      },
      {
        "id": "c",
        "text": "On-site interviews with registered nurses violate international biometric data privacy treaties governing clinical personnel.",
        "isCorrect": false,
        "explanation": "Incorrect. Standard operational workflow interviews do not violate privacy treaties when conducted properly."
      },
      {
        "id": "d",
        "text": "Observational triage research requires clinical investigators to possess active board-certified surgical operating licenses.",
        "isCorrect": false,
        "explanation": "Incorrect. Operational process mapping requires analytical observation, not surgical credentials."
      }
    ]
  },
  {
    "id": "en_q18",
    "step": "Step 4: Survivorship Bias in Benchmarking",
    "scenario": "A student entrepreneur analyzes the biographies of Steve Jobs, Bill Gates, and Mark Zuckerberg, concluding that dropping out of college guarantees startup unicorn success.",
    "question": "Which sampling and analytical error misled the student?",
    "options": [
      {
        "id": "a",
        "text": "Clustering Illusion: Mistaking random probabilistic distribution patterns in small sample sizes for intentional strategic conspiracies.",
        "isCorrect": false,
        "explanation": "Incorrect. The error is looking only at successful outliers, not misinterpreting random clusters."
      },
      {
        "id": "b",
        "text": "Survivorship Bias: Studying successful outliers while ignoring thousands of dropouts who failed.",
        "isCorrect": true,
        "explanation": "Spot on! Survivorship bias analyzes only \"survivors\" of a filter, reaching wildly inaccurate conclusions about causality."
      },
      {
        "id": "c",
        "text": "Gambler’s Fallacy: Believing past independent random events dictate the statistical probability of upcoming independent trials.",
        "isCorrect": false,
        "explanation": "Incorrect. The fallacy here stems from filtered sampling, not coin-flip probability logic."
      },
      {
        "id": "d",
        "text": "Fundamental Attribution Error: Overestimating situational environmental factors while underestimating personal moral integrity.",
        "isCorrect": false,
        "explanation": "Incorrect. Attribution theory explains interpersonal judgment, whereas this is classic survivorship selection bias."
      }
    ]
  },
  {
    "id": "en_q19",
    "step": "Step 4: Triangulation of Data Sources",
    "scenario": "An IT team investigates system slowness. Rather than relying solely on user complaints, they combine helpdesk logs, real-time server telemetry, and controlled synthetic network pings.",
    "question": "Why does this method (Triangulation) produce superior analytical findings?",
    "options": [
      {
        "id": "a",
        "text": "Cross-verifies subjective user sentiment with objective technical machine metrics.",
        "isCorrect": true,
        "explanation": "Accurate! Triangulating multiple qualitative and quantitative sources filters out subjective bias and reveals ground truth."
      },
      {
        "id": "b",
        "text": "Triangulation guarantees that network infrastructure operates at three times the speed of conventional linear diagnostic architectures.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Triangulation is an analytical methodology, not a network acceleration protocol."
      },
      {
        "id": "c",
        "text": "Collecting multiple data streams eliminates the legal requirement to maintain encrypted secure offsite database backup servers.",
        "isCorrect": false,
        "explanation": "Incorrect. Data security requirements remain mandatory regardless of analytical methodology."
      },
      {
        "id": "d",
        "text": "Machine telemetry metrics automatically fabricate synthetic customer satisfaction survey scores with ninety-nine percent accuracy.",
        "isCorrect": false,
        "explanation": "Incorrect. Telemetry monitors hardware and software performance, not subjective emotional user sentiment."
      }
    ]
  },
  {
    "id": "en_q20",
    "step": "Step 4: Identifying Confounding Variables",
    "scenario": "A campus fitness center notes gym visits drop 40% every December. The manager concludes students lose interest in personal health at year-end and plans to cancel equipment leases.",
    "question": "What confounding variable did the fitness manager completely overlook?",
    "options": [
      {
        "id": "a",
        "text": "December coincides with intense final exams and campus winter recess closures.",
        "isCorrect": true,
        "explanation": "Spot on! Academic calendars and winter break explain the seasonal drop, not a permanent loss of health interest."
      },
      {
        "id": "b",
        "text": "Undergraduate student biological metabolisms automatically decelerate by forty percent during winter solstice planetary rotations.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Pseudoscience assertion that ignores academic schedules and holiday closures."
      },
      {
        "id": "c",
        "text": "The gym manager failed to install high-frequency infrared heating lamps across the entire outdoor university running track.",
        "isCorrect": false,
        "explanation": "Incorrect. Facility heating does not explain why students leave campus for winter break."
      },
      {
        "id": "d",
        "text": "Modern exercise bicycles undergo mandatory mechanical firmware resets administered remotely by federal athletic authorities every December.",
        "isCorrect": false,
        "explanation": "Incorrect. Fictional bureaucratic distraction irrelevant to seasonal student attendance."
      }
    ]
  },
  {
    "id": "en_q21",
    "step": "Step 5: Minto Pyramid Principle Structure",
    "scenario": "A student presents a project report by reading 45 slides of raw statistical tables for 30 minutes before revealing their main recommendation in the final 10 seconds.",
    "question": "How does Barbara Minto’s Pyramid Principle recommend restructuring this presentation?",
    "options": [
      {
        "id": "a",
        "text": "Start with the governing recommendation first, supported by grouped key arguments and data.",
        "isCorrect": true,
        "explanation": "Correct! Top-down communication states the core conclusion first, enabling busy decision-makers to grasp the message immediately."
      },
      {
        "id": "b",
        "text": "Extend the preliminary methodological literature review section to sixty slides before presenting any quantitative empirical findings.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Lengthening background slides compounds executive fatigue and obscures conclusions."
      },
      {
        "id": "c",
        "text": "Disguise the final conclusion entirely so executive stakeholders must independently deduce the strategic takeaway through deductive reasoning.",
        "isCorrect": false,
        "explanation": "Incorrect. Forcing audiences to guess your point creates confusion and indecision."
      },
      {
        "id": "d",
        "text": "Replace all verbal slides with thirty minutes of synchronized interpretive dance illustrating macroeconomic supply and demand curves.",
        "isCorrect": false,
        "explanation": "Incorrect. Absurd visual stunt that destroys professional business credibility."
      }
    ]
  },
  {
    "id": "en_q22",
    "step": "Step 5: The \"So What?\" Test in Synthesis",
    "scenario": "A market research analyst reports: \"73% of campus commuters travel by bus and wait an average of 18 minutes.\" The executive sponsor replies: \"So what?\"",
    "question": "What crucial element of synthesis did the analyst fail to provide?",
    "options": [
      {
        "id": "a",
        "text": "Failing to execute an interactive Monte Carlo algorithmic simulation illustrating random passenger bus boarding intervals.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Complex simulations do not answer \"So what?\" without strategic takeaways."
      },
      {
        "id": "b",
        "text": "The actionable strategic implication and recommended intervention for the business.",
        "isCorrect": true,
        "explanation": "Spot on! Data is useless without answering \"So What?\"—explaining why it matters and what action must follow."
      },
      {
        "id": "c",
        "text": "Omitting the vehicle identification numbers and tire manufacturing dates of all city transit buses operating near campus.",
        "isCorrect": false,
        "explanation": "Incorrect. Excessive operational minutiae dilutes strategic insight."
      },
      {
        "id": "d",
        "text": "Failing to translate the statistical report into Classical Latin for archival preservation within the university rare books repository.",
        "isCorrect": false,
        "explanation": "Incorrect. Pretentious academic distraction irrelevant to operational problem solving."
      }
    ]
  },
  {
    "id": "en_q23",
    "step": "Step 5: Synthesizing vs. Summarizing",
    "scenario": "After conducting 30 student interviews, Team A lists all 30 interview transcripts in chronological bullet points. Team B synthesizes them into 3 actionable thematic insights.",
    "question": "Why does Team B’s approach represent genuine synthesis rather than mere summary?",
    "options": [
      {
        "id": "a",
        "text": "Team A demonstrated superior academic rigor because longer verbatim transcript lists provide exhaustive transparency for leadership.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Dumping raw data forces leadership to do the analytical heavy lifting."
      },
      {
        "id": "b",
        "text": "Synthesis distills disparate data into coherent, forward-looking insights that drive decisions.",
        "isCorrect": true,
        "explanation": "Accurate! Summary recaps the past; synthesis connects the dots to generate actionable future direction."
      },
      {
        "id": "c",
        "text": "Team B should have discarded all qualitative research and replaced it with fabricated regression models to appear more quantitative.",
        "isCorrect": false,
        "explanation": "Incorrect. Fabricating data is unethical and destroys decision validity."
      },
      {
        "id": "d",
        "text": "Executive committees are legally prohibited from reviewing business presentations containing fewer than fifty thousand words.",
        "isCorrect": false,
        "explanation": "Incorrect. Executives value brevity, clarity, and synthesized actionable recommendations."
      }
    ]
  },
  {
    "id": "en_q24",
    "step": "Step 5: Executive Communication & SCQA Framework",
    "scenario": "A project lead uses the SCQA framework (Situation, Complication, Question, Answer) to pitch a digital sign-in kiosk to the university chancellor.",
    "question": "Which component represents the \"Complication\" in this structure?",
    "options": [
      {
        "id": "a",
        "text": "Manual paper logs cause 25-minute registration delays, breaching fire safety crowd codes.",
        "isCorrect": true,
        "explanation": "Correct! The complication describes the emerging tension or breakdown that destabilizes the baseline situation."
      },
      {
        "id": "b",
        "text": "The university currently maintains twelve administrative campus buildings welcoming thousands of enrolled undergraduate scholars.",
        "isCorrect": false,
        "explanation": "Incorrect. This describes the baseline Situation, not the disruptive Complication."
      },
      {
        "id": "c",
        "text": "We recommend installing four automated self-service biometric iPad kiosks in the primary administrative welcome lobby.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). This is the Answer / Solution, not the Complication."
      },
      {
        "id": "d",
        "text": "How can the administration streamline front-desk visitor processing without recruiting additional full-time personnel?",
        "isCorrect": false,
        "explanation": "Incorrect. This is the Question arising from the complication."
      }
    ]
  },
  {
    "id": "en_q25",
    "step": "Step 5: Actionable Recommendations",
    "scenario": "A consulting report concludes: \"The university should foster holistic synergy and pursue excellence in digital transformation across all educational paradigms.\"",
    "question": "What is the fatal flaw in this recommendation?",
    "options": [
      {
        "id": "a",
        "text": "It consists of vague corporate buzzwords lacking specific owners, metrics, and actionable steps.",
        "isCorrect": true,
        "explanation": "Spot on! A sound recommendation specifies Who does What, by When, with What Resources and Success Metrics."
      },
      {
        "id": "b",
        "text": "The recommendation should have included at least forty additional syllables of abstract post-structuralist philosophical jargon.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Adding more jargon makes the recommendation even less actionable."
      },
      {
        "id": "c",
        "text": "Digital transformation cannot legally occur within educational institutions without simultaneous federal congressional approval.",
        "isCorrect": false,
        "explanation": "Incorrect. Schools regularly adopt digital tools without congressional intervention."
      },
      {
        "id": "d",
        "text": "The report should have mandated that all teaching faculty immediately surrender personal cell phones to administrative storage.",
        "isCorrect": false,
        "explanation": "Incorrect. Draconian policy suggestion having no connection to actionable strategy."
      }
    ]
  },
  {
    "id": "en_q26",
    "step": "Step 6: Pre-Mortem Analysis",
    "scenario": "Before launching an online student course-registration portal, the lead architect gathers the team and asks: \"Imagine it is day 1, the system has completely crashed. What went wrong?\"",
    "question": "What is the strategic purpose of conducting a \"Pre-Mortem\" in Step 6?",
    "options": [
      {
        "id": "a",
        "text": "Conducting pre-mortems induces demoralizing defeatism that permanently damages engineering team psychological velocity.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Pre-mortems build resilience by proactively anticipating vulnerabilities."
      },
      {
        "id": "b",
        "text": "Identifies hidden operational risks and failure modes before launch, enabling preventive mitigation.",
        "isCorrect": true,
        "explanation": "Correct! Gary Klein’s Pre-Mortem removes optimism bias and surfaces latent failure points before they occur."
      },
      {
        "id": "c",
        "text": "Assigning legal liability and scapegoat blame to specific junior developers prior to testing code in production.",
        "isCorrect": false,
        "explanation": "Incorrect. Pre-mortems uncover systemic risks, never assign personal blame."
      },
      {
        "id": "d",
        "text": "Pre-mortems allow management to cancel all software projects and return invested venture capital to sovereign wealth funds.",
        "isCorrect": false,
        "explanation": "Incorrect. The goal is project success through preventive hardening, not project cancellation."
      }
    ]
  },
  {
    "id": "en_q27",
    "step": "Step 6: Trade-Off Analysis & Decision Matrices",
    "scenario": "A student startup must choose between Option A (cheap, slow, highly reliable) and Option B (expensive, fast, untested). The CEO insists Option A is universally superior on all dimensions.",
    "question": "What critical principle of decision making does the CEO fail to acknowledge?",
    "options": [
      {
        "id": "a",
        "text": "Every strategic decision entails trade-offs where gains in one dimension require sacrifices in others.",
        "isCorrect": true,
        "explanation": "Spot on! There are no solutions without trade-offs. Pretending one choice has zero downsides is naive."
      },
      {
        "id": "b",
        "text": "Startups should always choose whichever option has the highest financial expense to impress potential seed-stage angel investors.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Spending capital unnecessarily burns cash runway and accelerates bankruptcy."
      },
      {
        "id": "c",
        "text": "Option A must be selected because business textbooks mandate that slow operational speed guarantees superior long-term profits.",
        "isCorrect": false,
        "explanation": "Incorrect. In fast-moving markets, excessive slowness can be fatal."
      },
      {
        "id": "d",
        "text": "Decision matrices are invalid unless evaluated by artificial intelligence neural networks running on quantum supercomputers.",
        "isCorrect": false,
        "explanation": "Incorrect. Simple weighted scoring models work exceptionally well for multi-criteria decisions."
      }
    ]
  },
  {
    "id": "en_q28",
    "step": "Step 6: Sunk Cost Fallacy in Go/No-Go Decisions",
    "scenario": "A university software project has spent $100,000 over 8 months. New testing proves the software is defective and obsolete. The director refuses to cancel it because \"we already spent $100k\".",
    "question": "What psychological trap is clouding the director’s decision making?",
    "options": [
      {
        "id": "a",
        "text": "Sunk Cost Fallacy: Continuing a failing initiative solely due to unrecoverable past investments.",
        "isCorrect": true,
        "explanation": "Precisely! Sunk costs cannot be recovered. Decisions must be made on future costs versus future benefits."
      },
      {
        "id": "b",
        "text": "The Endowment Effect: Overvaluing external third-party software products compared to internally hand-coded applications.",
        "isCorrect": false,
        "explanation": "Incorrect. The endowment effect is overvaluing what you own; throwing good money after bad is sunk cost."
      },
      {
        "id": "c",
        "text": "Anchoring Bias: Over-relying on the first piece of numerical information encountered during negotiations with vendors.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). While related to numbers, justifying continuation via past spent money is sunk cost."
      },
      {
        "id": "d",
        "text": "Framing Effect: Drawing conflicting logical deductions from identical data based strictly on whether information is presented positively.",
        "isCorrect": false,
        "explanation": "Incorrect. The error is evaluating past unrecoverable spend instead of prospective return."
      }
    ]
  },
  {
    "id": "en_q29",
    "step": "Step 6: Stakeholder Buy-In & Influence Mapping",
    "scenario": "An operations team plans to replace paper cafeteria receipts with digital QR codes. They secure approval from the CFO but forget to consult cafeteria cashiers who must scan them.",
    "question": "Why does bypassing front-line operational stakeholders jeopardize the rollout?",
    "options": [
      {
        "id": "a",
        "text": "Front-line cashiers possess high execution power and can derail adoption through friction and workarounds.",
        "isCorrect": true,
        "explanation": "Correct! Stakeholder analysis requires engaging those who execute the process, not just executive sponsors."
      },
      {
        "id": "b",
        "text": "Executive CFO approval automatically overrides all human psychological behavioral habits across retail worker populations.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Executive decrees without front-line training and buy-in invariably fail during execution."
      },
      {
        "id": "c",
        "text": "Cashiers must legally hold twenty percent voting equity in the catering enterprise before processing digital optical barcodes.",
        "isCorrect": false,
        "explanation": "Incorrect. Front-line consultation is an operational and cultural necessity, not an equity ownership rule."
      },
      {
        "id": "d",
        "text": "Scanning QR codes requires cashiers to obtain specialized federal telecommunications engineering operator certifications.",
        "isCorrect": false,
        "explanation": "Incorrect. Scanning modern QR codes requires basic device training, not engineering licenses."
      }
    ]
  },
  {
    "id": "en_q30",
    "step": "Step 6: Reversible vs. Irreversible Decisions (Type 1 vs Type 2)",
    "scenario": "Jeff Bezos categorizes decisions into Type 1 (irreversible, \"one-way doors\") and Type 2 (reversible, \"two-way doors\"). A team debates button colors for 4 weeks.",
    "question": "How should the team treat button color selection under this framework?",
    "options": [
      {
        "id": "a",
        "text": "Type 1 Decision: Treat it as a permanent corporate commitment requiring exhaustive board of directors oversight.",
        "isCorrect": false,
        "explanation": "Incorrect. Button colors are instantly reversible and low-risk."
      },
      {
        "id": "b",
        "text": "Type 2 Decision: Reversible with low downside; decide rapidly and iterate based on data.",
        "isCorrect": true,
        "explanation": "Spot on! Reversible decisions should be made quickly by small teams. Deliberating 4 weeks on button colors is severe analysis paralysis."
      },
      {
        "id": "c",
        "text": "Type 0 Decision: Outsource button styling to international geopolitical treaty negotiators to ensure neutrality.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Fictional category that humorously illustrates absurd over-engineering."
      },
      {
        "id": "d",
        "text": "Button color adjustments permanently alter underlying cryptographic blockchain smart contracts and cannot be undone.",
        "isCorrect": false,
        "explanation": "Incorrect. CSS UI styling is trivial to modify and redeploy."
      }
    ]
  },
  {
    "id": "en_q31",
    "step": "Step 7: Pilot Testing vs. Big Bang Rollout",
    "scenario": "A university plans to deploy a new campus-wide grading software for 20,000 students. The vendor urges switching the entire university database over on Monday morning.",
    "question": "Why should the project manager insist on a Pilot Test in Step 7 instead?",
    "options": [
      {
        "id": "a",
        "text": "Big bang rollouts are universally recommended by software engineers because they force immediate user compliance without complaints.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). \"Big bang\" releases carry catastrophic risk if unforeseen bugs corrupt live data."
      },
      {
        "id": "b",
        "text": "A pilot tests workflows in a controlled small cohort, isolating bugs before enterprise scaling.",
        "isCorrect": true,
        "explanation": "Accurate! Piloting in one department validates technical stability and user readiness while bounding failure risk."
      },
      {
        "id": "c",
        "text": "Pilot testing eliminates the need for software code documentation and post-launch technical support desks.",
        "isCorrect": false,
        "explanation": "Incorrect. Documentation and support remain critical regardless of rollout strategy."
      },
      {
        "id": "d",
        "text": "Grading software can only be operated legally during leap years under international educational software standards.",
        "isCorrect": false,
        "explanation": "Incorrect. Fictional regulation distractor having no basis in educational technology."
      }
    ]
  },
  {
    "id": "en_q32",
    "step": "Step 7: Leading vs. Lagging Indicators",
    "scenario": "A startup wants to improve customer satisfaction. They measure quarterly Net Promoter Score (NPS) but have no weekly metrics tracking unresolved support tickets.",
    "question": "In Step 7 monitoring, what is the key difference between quarterly NPS and daily ticket resolution time?",
    "options": [
      {
        "id": "a",
        "text": "NPS is a lagging indicator of past sentiment; ticket resolution is a leading indicator of emerging churn.",
        "isCorrect": true,
        "explanation": "Spot on! Lagging metrics show past outcomes after the damage is done. Leading metrics provide early warnings for proactive intervention."
      },
      {
        "id": "b",
        "text": "Quarterly NPS scores predict daily software compiler crashes with ninety-eight percent mathematical precision.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). NPS reflects broad customer sentiment, not real-time software compiler telemetry."
      },
      {
        "id": "c",
        "text": "Leading indicators can only be measured once every five years during formal federal industrial economic census cycles.",
        "isCorrect": false,
        "explanation": "Incorrect. Leading indicators must be tracked frequently (daily/weekly) to enable timely course correction."
      },
      {
        "id": "d",
        "text": "Customer satisfaction metrics are obsolete because modern enterprise software products never require customer retention.",
        "isCorrect": false,
        "explanation": "Incorrect. Customer retention is the lifeblood of SaaS and recurring enterprise business models."
      }
    ]
  },
  {
    "id": "en_q33",
    "step": "Step 7: Agile Feedback Loops & Retrospectives",
    "scenario": "After completing a 4-week software milestone, the project team refuses to conduct a Sprint Retrospective because \"the software was shipped and looking back is a waste of time.\"",
    "question": "What vital problem-solving discipline did the team abandon?",
    "options": [
      {
        "id": "a",
        "text": "Continuous learning and process refinement loops that prevent recurring systemic bottlenecks.",
        "isCorrect": true,
        "explanation": "Correct! Step 7 requires closing the feedback loop. Retrospectives allow teams to institutionalize wins and fix recurring process flaws."
      },
      {
        "id": "b",
        "text": "Software engineering velocity increases exponentially when developers deliberately avoid evaluating previous code defects.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Ignoring past mistakes guarantees repeating them in upcoming sprints."
      },
      {
        "id": "c",
        "text": "Retrospectives are purely ceremonial social gatherings that provide zero tangible engineering or operational insights.",
        "isCorrect": false,
        "explanation": "Incorrect. Well-facilitated retrospectives surface actionable root-cause process improvements."
      },
      {
        "id": "d",
        "text": "Sprint retrospectives require mandatory notarized sign-offs from international trade union representatives.",
        "isCorrect": false,
        "explanation": "Incorrect. Retrospectives are internal team alignment mechanisms, not legal union filings."
      }
    ]
  },
  {
    "id": "en_q34",
    "step": "Step 7: The PDCA Cycle (Plan-Do-Check-Act)",
    "scenario": "A university dining hall implements a new tray-return conveyor belt. When students start jamming the belt on day two, staff simply turn the motor off and abandon the project.",
    "question": "Which phase of Deming’s PDCA cycle did the dining hall leadership fail to execute?",
    "options": [
      {
        "id": "a",
        "text": "Plan: Drafting preliminary technical CAD engineering blueprints for the conveyor motor electrical wiring.",
        "isCorrect": false,
        "explanation": "Incorrect. The machine was already built and installed, so the initial planning was completed."
      },
      {
        "id": "b",
        "text": "Do: Turning the power switch on and allowing dishes to travel across the motorized rubber belt.",
        "isCorrect": false,
        "explanation": "Incorrect. They completed the \"Do\" phase when they initiated live operations on day one."
      },
      {
        "id": "c",
        "text": "Check & Act: Analyzing the jam root cause and adjusting belt speed or drop-off signage.",
        "isCorrect": true,
        "explanation": "Spot on! PDCA requires analyzing failures during the \"Check\" phase and making corrective improvements in \"Act\", rather than giving up."
      },
      {
        "id": "d",
        "text": "Deming’s PDCA cycle applies exclusively to automotive engine factories in Nagoya and cannot be used in food services.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). PDCA is a universal problem-solving framework applicable to any operational process."
      }
    ]
  },
  {
    "id": "en_q35",
    "step": "Step 7: Change Management & The J-Curve",
    "scenario": "A company implements a modern CRM platform. During the first two weeks, sales productivity temporarily drops by 15% as reps learn the interface. The CEO panics and demands reverting to paper.",
    "question": "What predictable implementation phenomenon did the CEO fail to understand?",
    "options": [
      {
        "id": "a",
        "text": "The Change Curve: Productivity temporarily dips during adoption before rising above baseline.",
        "isCorrect": true,
        "explanation": "Accurate! The J-Curve of change management shows that new tools initially disrupt muscle memory before delivering superior productivity."
      },
      {
        "id": "b",
        "text": "Any enterprise digital tool that causes a temporary efficiency dip must be permanently terminated within twenty-four hours.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Knee-jerk abandonment prevents organizations from ever achieving technological modernization."
      },
      {
        "id": "c",
        "text": "Sales representatives should be replaced with automated telemarketing robots whenever a productivity metric drops by one percent.",
        "isCorrect": false,
        "explanation": "Incorrect. Draconian overreaction that destroys institutional knowledge and customer relationships."
      },
      {
        "id": "d",
        "text": "Modern CRM platforms operate solely on lunar calendar cycles and experience natural quarterly productivity blackouts.",
        "isCorrect": false,
        "explanation": "Incorrect. Fictional astrological distractor having zero connection to organizational change management."
      }
    ]
  },
  {
    "id": "en_q36",
    "step": "Step 7: Institutionalizing Solutions & SOPs",
    "scenario": "An IT team successfully recovers from a massive ransomware incident. Six months later, new hires make the exact same credential mistakes because no incident report or standard procedure was written.",
    "question": "What essential closing phase of Step 7 (Implementation) was neglected?",
    "options": [
      {
        "id": "a",
        "text": "Institutionalizing solutions into Standard Operating Procedures (SOPs) and ongoing training programs.",
        "isCorrect": true,
        "explanation": "Correct! A problem is not truly solved until the solution is institutionalized into policies, documentation, and training."
      },
      {
        "id": "b",
        "text": "Failing to execute punitive public disciplinary tribunals broadcast live to all corporate regional offices worldwide.",
        "isCorrect": false,
        "explanation": "Incorrect (Plausible Distractor). Blame cultures suppress transparent incident reporting and make future breaches more likely."
      },
      {
        "id": "c",
        "text": "New hires should be required to pass twenty-four-hour polygraph lie detector examinations prior to receiving company email logins.",
        "isCorrect": false,
        "explanation": "Incorrect. Invasive polygraphs do not substitute for clear security procedures and password managers."
      },
      {
        "id": "d",
        "text": "Cybersecurity incident playbooks become legally invalid after seven calendar days under international internet agreements.",
        "isCorrect": false,
        "explanation": "Incorrect. Incident playbooks are durable institutional assets that must be maintained and practiced regularly."
      }
    ]
  }
];
