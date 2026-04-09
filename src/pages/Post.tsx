import { useParams } from 'react-router-dom';
import { motion, useScroll } from 'motion/react';
import { posts } from '../data/posts';
import { Mark } from '../components/Mark';

export default function Post() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);
  const { scrollYProgress } = useScroll();

  if (!post) {
    return (
      <article className="reading-column">
        <h1 className="mb-8">Post Not Found</h1>
        <p className="text-[var(--step-0)] text-[var(--fg-muted)]">The requested log entry does not exist.</p>
      </article>
    );
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--fg)] origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      <article className="reading-column">
      <header className="mb-16">
        <time className="text-[var(--step--1)] text-[var(--fg-muted)] mb-4 block font-mono">
          {post.date}
        </time>
        <h1 className="mb-8 capitalize">{post.title}</h1>
      </header>

      <div className="max-w-none">
        {post.content}
      </div>

      <div className="mt-24 flex flex-row items-center justify-center gap-3 pb-8 text-[var(--fg-muted)] font-mono text-xs uppercase tracking-widest">
        <div className="text-[var(--fg)]">
          <Mark className="w-4 h-4 opacity-80" />
        </div>
        <span>hjadmz</span>
        <span className="opacity-30">/</span>
        <span>{post.slug}</span>
      </div>
    </article>
    </>
  );
}
