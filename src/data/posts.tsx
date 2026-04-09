import React from 'react';

export interface PostData {
  slug: string;
  title: string;
  date: string;
  content: React.ReactNode;
}

export const posts: PostData[] = [
  {
    slug: 'knowledge-vs-intelligence',
    title: 'Knowledge ≠ Intelligence',
    date: '2026-04-08',
    content: (
      <div className="space-y-8 text-[var(--step-0)] text-[var(--fg-muted)] leading-relaxed">
        <p>
          You can earn a perfect SAT score or an A in every class at a prestigious school and still be far surpassed by someone who struggled in school. This happens because formal education is a controlled environment that rewards information storage, while the real world is a chaotic environment that rewards information processing.
        </p>
        <p>
          Some people have an innate ability to do well in school but struggle to articulate the information in the real world efficiently.
        </p>
        <p>
          For the sake of clarity, let's define success as measurable impact. I have seen this firsthand: a developer who attended Yale and mastered advanced subjects like AP Calculus, yet failed to apply that knowledge in any meaningful way.
        </p>
        <p>
          Some people are naturally talented at excelling in academics, but there is a separate gift for logic and reasoning that exists beyond structured coursework. These people see patterns that those with "all the knowledge" often miss. True intelligence is less about what you have stored and more about your ability to process information and turn it into solutions. I think this metaphor might help: CPU vs. a large hard drive.
        </p>
        <p>
          The ability to articulate information effectively is much more rare than most imagine. Ironically, the people who possess this gift often hate school. They aren't interested in the linear, high-latency pace of a classroom; they are interested in solving new, unique problems with whatever information they can find, but it tends to be messy and not "structured."
        </p>
        <p>
          Ultimately, intelligence is a skill of its own, distinct from academic credentials. It is the ability to navigate the unknown, solve the unique, and translate information into action—regardless of how they performed in a system designed to measure memorization.
        </p>
        <p className="text-[var(--fg)] font-medium">
          Einstein didn't learn the theory of relativity in school, he discovered it.
        </p>
      </div>
    ),
  },
  {
    slug: 'tools-vs-results',
    title: 'Tools vs. Results',
    date: '2026-04-08',
    content: (
      <div className="space-y-8 text-[var(--step-0)] text-[var(--fg-muted)] leading-relaxed">
        <p className="text-[var(--step-1)] text-[var(--fg)] font-medium">
          "The tools one uses to articulate his thoughts are insignificant; the result is what matters."
        </p>
        <p>
          This principle applies whether the outcome is a digital painting or a life-saving medical diagnosis. Much of the current resistance to AI is rooted in a "game of telephone" where critics use jargon to mask their own biases. While some concerns are valid, many people hide behind environmental or ethical arguments as a proxy for bullying people. They aren't trying to save the planet; they are trying to protect a sense of security in a market that has always been volatile.
        </p>
        
        <div className="pt-8">
          <h2 className="text-[var(--step-1)] text-[var(--fg)] mb-4">Connective Intelligence vs. Human Error</h2>
          <p>
            The true value of AI isn't in "slop," but in its ability to connect dots across silos that humans often miss due to fatigue or professional myopia. We see this in medical breakthroughs where AI identifies patterns—like sleep apnea in chronic dialysis patients—that specialists overlooked for decades. Humans are prone to logic errors, personality clashes, and "dialysis fatigue" of their own. Having a technology that improves safety and finds the "missing context" is more than just a convenience; it is a mandate for progress.
          </p>
        </div>

        <div className="pt-8">
          <h2 className="text-[var(--step-1)] text-[var(--fg)] mb-4">The Democratization of Expression</h2>
          <p>
            Art is, at its core, human expression. If a grandmother uses AI to generate a photo of her deceased grandson hugging her, that is a legitimate emotional externalization. She may lack the technical skill to draw it by hand, but the emotional directive was hers. AI provides a pipeline for visionaries who think in words and concepts rather than manual execution. Whether a prompt takes fifteen seconds or an hour of technical refinement, the spark is human. This isn't laziness; it is the democratization of the ability to manifest thought into reality.
          </p>
        </div>

        <div className="pt-8">
          <h2 className="text-[var(--step-1)] text-[var(--fg)] mb-4">The Passion Filter and Market Bloat</h2>
          <p>
            The current distress in fields like Computer Science is often a result of market bloat rather than technological replacement. For years, people have flooded the industry solely for the "six-figure Netflix salary" without a genuine passion for systems or problem-solving. You cannot build a massive infrastructure like Google alone, no matter how smart you are; it requires collaboration and vision. One person can only do so much. Those who are merely "good at sounding right" or chasing a paycheck are the ones threatened by automation. Genuinely smart builders who use these tools to solve complex errors will always remain relevant.
          </p>
        </div>

        <div className="pt-8">
          <h2 className="text-[var(--step-1)] text-[var(--fg)] mb-4">The Ethics of Adaptation</h2>
          <p>
            We must prioritize results that actually matter—safety, efficiency, and the progression of the species. An artist who relies solely on the "friction" of their old tools as their value proposition is in the same position as the milkman was when the refrigerator arrived. Adaptation isn't a choice; it's a requirement. If a technology makes the world safer, more expressive, or more efficient, we should not stifle it to protect those who refuse to evolve. We must push through the discomfort of the shift to reach the opportunities on the other side.
          </p>
        </div>
      </div>
    ),
  }
];
