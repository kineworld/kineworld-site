const canvas = document.querySelector<HTMLCanvasElement>('#world-field-canvas');
const context = canvas?.getContext('2d', { alpha: true });

if (canvas && context) {
  const ctx = context;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width = 0;
  let height = 0;
  let pointerX = 0;
  let pointerY = 0;
  let targetX = 0;
  let targetY = 0;
  let frame = 0;
  let last = 0;

  function resize() {
    const ratio = Math.min(devicePixelRatio || 1, 1.6);
    width = innerWidth;
    height = innerHeight;
    canvas!.width = Math.round(width * ratio);
    canvas!.height = Math.round(height * ratio);
    canvas!.style.width = width + 'px';
    canvas!.style.height = height + 'px';
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw(performance.now());
  }

  function draw(time: number) {
    ctx.clearRect(0, 0, width, height);
    const mobile = width < 800;
    const start = mobile ? width * 0.05 : width * 0.36;
    const count = mobile ? 21 : 39;
    const phase = reduced ? 0 : time * 0.00016;
    const scrollPhase = scrollY * 0.00035;
    const excursion = mobile ? 25 : 55;

    pointerX += (targetX - pointerX) * 0.035;
    pointerY += (targetY - pointerY) * 0.035;

    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const base = height * (0.16 + t * 0.78);
      const alpha = (mobile ? 0.05 : 0.065) + Math.sin(t * Math.PI) * (mobile ? 0.09 : 0.13);
      ctx.beginPath();
      for (let j = 0; j <= 66; j++) {
        const x = start + (width - start + 60) * j / 66;
        const n = j / 66;
        const wave = Math.sin(n * 8.2 + t * 6.1 + phase + scrollPhase) * excursion * (0.35 + n * 0.8);
        const fold = Math.sin(n * 15.3 - t * 4.2 - phase * 0.8) * excursion * 0.18;
        const y = base + wave + fold + pointerY * n * 0.24;
        if (j === 0) ctx.moveTo(x + pointerX * n * 0.2, y);
        else ctx.lineTo(x + pointerX * n * 0.2, y);
      }
      ctx.strokeStyle = `rgba(71, 155, 255, ${alpha.toFixed(3)})`;
      ctx.lineWidth = i % 7 === 0 ? 1.2 : 0.7;
      ctx.stroke();
    }

    const dots = mobile ? 5 : 9;
    for (let i = 0; i < dots; i++) {
      const progression = ((i / dots + phase * 0.11) % 1);
      const x = start + (width - start) * progression;
      const y = height * (0.5 + Math.sin(progression * 8.2 + phase + scrollPhase) * 0.075);
      const radius = i % 3 === 0 ? 2.6 : 1.4;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(151, 205, 255, 0.72)';
      ctx.shadowBlur = 14;
      ctx.shadowColor = '#438fff';
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  }

  function tick(time: number) {
    if (!document.hidden && time - last > 32) {
      draw(time);
      last = time;
    }
    frame = requestAnimationFrame(tick);
  }

  addEventListener('resize', resize, { passive: true });
  if (!reduced) {
    addEventListener('pointermove', event => {
      targetX = (event.clientX / innerWidth - 0.5) * 35;
      targetY = (event.clientY / innerHeight - 0.5) * 25;
    }, { passive: true });
    frame = requestAnimationFrame(tick);
  }
  resize();
  addEventListener('pagehide', () => cancelAnimationFrame(frame), { once: true });
}
