import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.registerPlugin(ScrollTrigger);
  if (document.querySelector('.hero')) gsap.timeline({
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=1500', scrub: 1.2 }
  })
    .to('.world-field-image', {
      scale: 1.9,
      xPercent: -15,
      transformOrigin: '68% 45%',
      ease: 'none'
    }, 0)
    .to('.hero-content', { opacity: 0, y: -90, ease: 'none' }, 0);
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
