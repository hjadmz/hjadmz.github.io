export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  keyIdeas: string[];
  sections: { heading: string; body: string[] }[];
};

export const posts: Post[] = [
  {
    slug: 'knowledge-vs-intelligence',
    title: 'Knowledge ≠ Intelligence',
    summary: 'Academic performance can hide weak real-world reasoning; intelligence is adaptive processing.',
    date: '2026-04-08',
    tags: ['reasoning', 'systems', 'learning'],
    keyIdeas: [
      'School rewards storage; the real world rewards processing.',
      'Pattern recognition and articulation often matter more than credentials.',
      'Impact comes from turning information into action.'
    ],
    sections: [
      {
        heading: 'Environment shapes what gets rewarded',
        body: [
          'Formal education is a controlled environment that rewards information storage.',
          'Real systems are noisy and uncertain, and they reward information processing under constraints.'
        ]
      },
      {
        heading: 'Credentials are not capability',
        body: [
          'People can excel academically yet struggle to apply what they know to ambiguous problems.',
          'Reasoning quality, communication, and adaptation often decide practical outcomes.'
        ]
      },
      {
        heading: 'What intelligence looks like in practice',
        body: [
          'Intelligence is less about static recall and more about dynamic synthesis.',
          'High leverage comes from connecting context quickly and producing useful decisions.'
        ]
      }
    ]
  },
  {
    slug: 'tools-vs-results',
    title: 'Tools vs. Results',
    summary: 'Tool choice is secondary; what matters is safety, expression, and measurable outcomes.',
    date: '2026-04-08',
    tags: ['ai', 'ethics', 'craft'],
    keyIdeas: [
      'Judge output quality and impact, not the prestige of the toolchain.',
      'AI can surface cross-domain patterns humans miss under fatigue.',
      'Adaptation is a responsibility when better outcomes are possible.'
    ],
    sections: [
      {
        heading: 'Result over ritual',
        body: [
          'Tools are implementation details; outcomes are what users actually experience.',
          'Debate about process should not obscure improvements in safety and clarity.'
        ]
      },
      {
        heading: 'Connective intelligence',
        body: [
          'Machine assistance can combine signals across silos faster than individual specialists.',
          'In high-risk contexts, finding missing context is a functional requirement.'
        ]
      },
      {
        heading: 'Democratized expression',
        body: [
          'People without technical craft can still express meaningful intent.',
          'The emotional and conceptual direction remains human even when tools evolve.'
        ]
      }
    ]
  }
];
