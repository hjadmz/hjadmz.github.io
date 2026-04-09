import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { posts } from '../data/posts';

export default function Log() {
  return (
    <div className="reading-column">
      <h1 className="mb-16">Log</h1>
      <div className="flex flex-col gap-12">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link to={`/log/${post.slug}`} className="group block">
              <time className="text-[var(--step--1)] text-[var(--fg-muted)] mb-2 block font-mono transition-colors duration-500 group-hover:text-[var(--fg)]">
                {post.date}
              </time>
              <h2 className="text-[var(--step-2)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:opacity-60">
                {post.title}
              </h2>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
