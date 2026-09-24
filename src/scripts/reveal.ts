import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo('.hero-content > *',
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.11, clearProps: 'all' });

  gsap.utils.toArray<HTMLElement>('.section h2, .section .large-copy, .project-card, .pillar, .update-list a').forEach(element => {
    gsap.fromTo(element,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', clearProps: 'all',
        scrollTrigger: { trigger: element, start: 'top 92%', once: true } });
  });
}
