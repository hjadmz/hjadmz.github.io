import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { posts } from '../data/posts';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = (reduceMotion: boolean) => ({
  hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
});

export default function Log() {
  const shouldReduceMotion = useReducedMotion();
  const it = item(!!shouldReduceMotion);

  return (
    <div className="reading-column">
      <motion.h1 className="mb-16" initial={it.hidden} animate={it.show}>Log</motion.h1>
      <motion.div
        className="flex flex-col gap-12"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {posts.map((post) => (
          <motion.article key={post.slug} variants={it}>
            <Link to={`/log/${post.slug}`} className="group block">
              <time className="text-[var(--step--1)] text-[var(--fg-muted)] mb-2 block font-mono transition-colors duration-500 group-hover:text-[var(--fg)]">
                {post.date}
              </time>
              <h2 className="text-[var(--step-2)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:opacity-60">
                {post.title}
              </h2>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
