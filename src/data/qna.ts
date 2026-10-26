import { QnaItem } from '../types/game';

export const QNA_QUESTIONS: QnaItem[] = [
  // 1. Analytical Thinking & Root Cause Analysis
  {
    id: 'en_q1',
    step: 'Analytical Thinking: Root Cause vs. Symptoms',
    scenario: 'A university campus coffee shop experiences a 40% drop in morning sales following multiple drink spills and long queues.',
    question: 'According to the "5 Whys" root-cause methodology, what should the manager investigate first before penalizing staff?',
    options: [
      {
        id: 'a',
        text: 'The counter ergonomic layout, workflow bottlenecks, and wet-floor hazards that cause staff to trip.',
        isCorrect: true,
        explanation: 'Correct! Analytical thinking distinguishes underlying systemic bottlenecks from surface-level human errors.'
      },
      {
        id: 'b',
        text: 'Issue an immediate disciplinary warning to baristas on duty.',
        isCorrect: false,
        explanation: 'Incorrect. Punishing symptoms without diagnosing systemic causes leads to higher turnover and recurring issues.'
      },
      {
        id: 'c',
        text: 'Immediately offer a 50% discount on all morning drinks.',
        isCorrect: false,
        explanation: 'Incorrect. Discounts may increase crowd volume, worsening queues and slipping accidents.'
      }
    ]
  },
  {
    id: 'en_q2',
    step: 'Critical Thinking: The Sunk Cost Fallacy',
    scenario: 'Your project team spent $5,000 and 3 weeks developing a legacy software module, but an unexpected API change makes a modern open-source tool 10x faster and free.',
    question: 'How does a disciplined critical thinker evaluate whether to abandon the $5,000 project?',
    options: [
      {
        id: 'a',
        text: 'Ignore past expenditures entirely and evaluate solely future costs, risks, and benefits of both options.',
        isCorrect: true,
        explanation: 'Spot on! The Sunk Cost Fallacy occurs when past non-recoverable costs irrationally dictate future commitments.'
      },
      {
        id: 'b',
        text: 'Continue with the original module to ensure the $5,000 already invested is not wasted.',
        isCorrect: false,
        explanation: 'Incorrect. Pouring more resources into an obsolete solution multiplies the total loss.'
      },
      {
        id: 'c',
        text: 'Wait for the semester to end before making any architectural decision.',
        isCorrect: false,
        explanation: 'Incorrect. Delaying decisions amplifies opportunity costs and technical debt.'
      }
    ]
  },
  {
    id: 'en_q3',
    step: 'Creative Thinking: Lateral Re-framing',
    scenario: 'During the Apollo 13 crisis, carbon dioxide scrubbers in the Lunar Module were square, while the Command Module canisters were round.',
    question: 'Which creative problem-solving principle allowed Mission Control to build an adapter using only duct tape, cardboard, and plastic bags?',
    options: [
      {
        id: 'a',
        text: 'Functional Fixedness Overcoming: Re-imagining commonplace items beyond their conventional designated roles.',
        isCorrect: true,
        explanation: 'Excellent! Overcoming functional fixedness is a cornerstone of creative problem-solving under extreme constraints.'
      },
      {
        id: 'b',
        text: 'Linear Extrapolation: Following NASA standard operating manuals strictly to the letter.',
        isCorrect: false,
        explanation: 'Incorrect. Existing manuals provided no solution for incompatible scrubber geometries.'
      },
      {
        id: 'c',
        text: 'Accepting the constraint as an insurmountable physical impossibility.',
        isCorrect: false,
        explanation: 'Incorrect. Lateral thinking actively finds workarounds when standard paths are blocked.'
      }
    ]
  },
  {
    id: 'en_q4',
    step: 'Stakeholder Alignment: Multi-Perspective Trade-offs',
    scenario: 'A university plans to convert an open quiet study hall into a 24/7 collaborative startup incubator, triggering fierce debates.',
    question: 'How should a strategic decision-maker align the competing priorities of Students, Faculty, and Facilities Management?',
    options: [
      {
        id: 'a',
        text: 'Implement a zoned hybrid model with acoustic baffles, designated quiet hours, and joint operational guidelines.',
        isCorrect: true,
        explanation: 'Correct! Recognizing diverse stakeholder needs allows for integrative win-win solutions rather than zero-sum compromises.'
      },
      {
        id: 'b',
        text: 'Exclusively favor whichever group raises the loudest objections on social media.',
        isCorrect: false,
        explanation: 'Incorrect. Reactive capitulation undermines strategic campus goals and operational safety.'
      },
      {
        id: 'c',
        text: 'Cancel all renovations and leave the space in its current deteriorating condition.',
        isCorrect: false,
        explanation: 'Incorrect. Avoiding the decision entirely fails all stakeholders as demand evolves.'
      }
    ]
  },
  {
    id: 'en_q5',
    step: 'Step 3: Brainstorming & The Power of Backup Plans',
    scenario: 'A nationwide transit strike paralyses public trains 24 hours before your company launch event in Zurich.',
    question: 'Why does developing an explicit "Plan B" fundamentally outperform relying solely on high optimism for Plan A?',
    options: [
      {
        id: 'a',
        text: 'Pre-planned alternatives preserve operational agility and perceived locus of control when external shocks occur.',
        isCorrect: true,
        explanation: 'Precisely! As emphasized in SSA101, backup plans reduce panic latency and maintain proactive momentum.'
      },
      {
        id: 'b',
        text: 'Creating backup plans proves that the initial strategy was fundamentally flawed and incompetent.',
        isCorrect: false,
        explanation: 'Incorrect. Robust contingency planning is a hallmark of strategic maturity, not failure.'
      },
      {
        id: 'c',
        text: 'Backup plans should only be thought of after Plan A has already failed completely.',
        isCorrect: false,
        explanation: 'Incorrect. Thinking of alternatives amidst a crisis results in poor, rushed decisions under stress.'
      }
    ]
  },
  {
    id: 'en_q6',
    step: 'Critical Thinking: Confirmation Bias in Crisis',
    scenario: 'An electric vehicle manufacturer notices rare battery overheating alerts, but the engineering lead dismisses them as "harmless telemetry noise".',
    question: 'What cognitive bias is actively impairing the lead engineer’s judgment?',
    options: [
      {
        id: 'a',
        text: 'Confirmation Bias: Actively favoring data that supports existing beliefs while discarding disconfirming evidence.',
        isCorrect: true,
        explanation: 'Accurate! Critical thinking mandates actively seeking out disconfirming evidence to stress-test safety assumptions.'
      },
      {
        id: 'b',
        text: 'Pareto Optimization: Focusing on the 80% of vehicles that run without overheating.',
        isCorrect: false,
        explanation: 'Incorrect. Pareto analysis is a prioritization framework, not an observational cognitive defect.'
      },
      {
        id: 'c',
        text: 'Hindsight Bias: Overestimating the predictability of an event after it has already occurred.',
        isCorrect: false,
        explanation: 'Incorrect. The crisis is ongoing; hindsight bias applies retrospectively after the fact.'
      }
    ]
  },
  {
    id: 'en_q7',
    step: 'Step 5: Decision Matrix & Quantitative Narrowing',
    scenario: 'Your project team generated 6 potential solutions to resolve peak campus Wi-Fi congestion. Time and budget only allow executing one.',
    question: 'What is the most objective technique to narrow down and rank these solutions?',
    options: [
      {
        id: 'a',
        text: 'Construct a Weighted Scoring Matrix assessing Impact, Implementation Feasibility, Cost, and Time-to-Deploy.',
        isCorrect: true,
        explanation: 'Correct! Weighted decision matrices transform subjective debate into structured, defensible multi-criteria analysis.'
      },
      {
        id: 'b',
        text: 'Pick whichever solution was proposed by the most senior team member.',
        isCorrect: false,
        explanation: 'Incorrect. Relying on the "HiPPO" (Highest Paid Person\'s Opinion) bypasses factual efficacy.'
      },
      {
        id: 'c',
        text: 'Flip a coin between the two most popular ideas to save time.',
        isCorrect: false,
        explanation: 'Incorrect. Arbitrary selection introduces unmitigated risk into infrastructure decisions.'
      }
    ]
  },
  {
    id: 'en_q8',
    step: 'Analytical Thinking: Correlation vs. Causation',
    scenario: 'Data shows that software teams drinking more coffee submit 30% more code pull requests, but also experience 40% more production bugs.',
    question: 'What fundamental analytical principle warns against concluding that "drinking coffee directly causes bugs"?',
    options: [
      {
        id: 'a',
        text: 'Correlation does not imply Causation; both may stem from an unmeasured confounding factor like fatigue or deadline crunch.',
        isCorrect: true,
        explanation: 'Spot on! Confounding variables (like intense overtime pressure) frequently induce apparent correlations.'
      },
      {
        id: 'b',
        text: 'Coffee caffeine molecules have been scientifically proven to alter software compilation logic.',
        isCorrect: false,
        explanation: 'Incorrect. This is nonsensical pseudoscience.'
      },
      {
        id: 'c',
        text: 'Larger datasets always automatically prove causal relationships without controlled testing.',
        isCorrect: false,
        explanation: 'Incorrect. Confounding bias persists and often scales up even in big datasets.'
      }
    ]
  },
  {
    id: 'en_q9',
    step: 'Step 7: Action Steps & Resilient Execution',
    scenario: 'You discover 3 final university exam dates overlap directly with your mandatory employment shift scheduled next week.',
    question: 'Which proactive Step 7 sequence best illustrates structured problem mitigation?',
    options: [
      {
        id: 'a',
        text: 'Identify formal exam reschedule policies, secure official course syllabi proofs, and propose an early shift swap 7 days prior.',
        isCorrect: true,
        explanation: 'Outstanding! Step 7 demands concrete, proactive, verifiable milestones before deadlines expire.'
      },
      {
        id: 'b',
        text: 'Call in sick on exam morning to both the university and the employer simultaneously.',
        isCorrect: false,
        explanation: 'Incorrect. Unplanned absences risk academic suspension and employment termination.'
      },
      {
        id: 'c',
        text: 'Skip all 3 exams and gamble on retaking the entire semester later.',
        isCorrect: false,
        explanation: 'Incorrect. Passivity converts manageable schedule collisions into severe long-term penalties.'
      }
    ]
  },
  {
    id: 'en_q10',
    step: 'Creative Thinking: SCAMPER Framework',
    scenario: 'A campus library has severe noise complaints in its group study zones due to mobile phone calls and video meetings.',
    question: 'Applying the "M - Modify/Magnify" or "R - Rearrange" prompt from SCAMPER, which innovative initiative fits best?',
    options: [
      {
        id: 'a',
        text: 'Repurpose unused storage closets into soundproof solo call-pods with dynamic visual availability indicators.',
        isCorrect: true,
        explanation: 'Great! SCAMPER (Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse) systematically inspires creative redesigns.'
      },
      {
        id: 'b',
        text: 'Ban all laptops, phones, and digital devices from the entire building permanently.',
        isCorrect: false,
        explanation: 'Incorrect. Draconian bans destroy educational utility and alienate modern students.'
      },
      {
        id: 'c',
        text: 'Hire security guards to shush students continuously every 5 minutes.',
        isCorrect: false,
        explanation: 'Incorrect. High labor cost with minimal user satisfaction.'
      }
    ]
  },
  {
    id: 'en_q11',
    step: 'Critical Thinking: False Dilemma Fallacy',
    scenario: 'A stakeholder argues: "Either we fully automate all customer service with AI today, or our company will definitely go bankrupt this quarter!"',
    question: 'Why is this statement a classic "False Dilemma" fallacy?',
    options: [
      {
        id: 'a',
        text: 'It artificially forces an extreme binary choice while deliberately concealing viable hybrid and phased intermediate alternatives.',
        isCorrect: true,
        explanation: 'Exactly! Critical thinking detects false dichotomies and uncovers nuanced middle-ground solutions.'
      },
      {
        id: 'b',
        text: 'Because artificial intelligence has never been used in customer support.',
        isCorrect: false,
        explanation: 'Incorrect. AI is widely used; the fallacy lies in the binary existential ultimatum.'
      },
      {
        id: 'c',
        text: 'Because all financial forecasts are 100% accurate without exception.',
        isCorrect: false,
        explanation: 'Incorrect. Forecasts involve probabilistic ranges, not guaranteed certainties.'
      }
    ]
  },
  {
    id: 'en_q12',
    step: 'Step 1: Problem Definition & Scope Creep',
    scenario: 'A student team tasked with creating a simple 5-minute survey app gradually tries to build a full social network with chat and payments.',
    question: 'What disciplined practice prevents "Scope Creep" from sabotaging the original deliverable?',
    options: [
      {
        id: 'a',
        text: 'Define clear Problem Boundaries, documented acceptance criteria, and a strict Minimum Viable Product (MVP).',
        isCorrect: true,
        explanation: 'Spot on! Step 1 requires circumscribing what the problem is AND what is explicitly out of scope.'
      },
      {
        id: 'b',
        text: 'Accept every single feature idea continuously to ensure all team members feel included.',
        isCorrect: false,
        explanation: 'Incorrect. Unbounded feature bloat guarantees missed deadlines and buggy execution.'
      },
      {
        id: 'c',
        text: 'Cancel the project entirely because software development is unpredictable.',
        isCorrect: false,
        explanation: 'Incorrect. Boundary management and sprint planning resolve scope uncertainty.'
      }
    ]
  }
];
