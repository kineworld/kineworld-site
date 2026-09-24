// Moving highlights follow the river in the source image; the alpha matte
// clips them to its water so mountains and sky remain still.
const canvas = document.querySelector<HTMLCanvasElement>('.world-river-canvas');
const motion = matchMedia('(prefers-reduced-motion: reduce)');

if (canvas && !motion.matches) {
  const context = canvas.getContext('2d', { alpha: true });
  if (context) {
    const scene = new Image();
    scene.src = '/assets/world-threshold-v3.webp';
    type Point = readonly [number, number];
    const routes: Point[][] = [
      [[1360,390],[1290,408],[1210,433],[1280,449],[1202,472],[1250,491],[1182,510],[1280,530],[1365,549],[1270,572],[1325,598],[1360,628]],
      [[1280,411],[1180,434],[1125,448],[1198,471],[1160,489],[1235,512],[1290,540]],
    ];
    const streams = routes.map(points => {
      const lengths = [0];
      for (let i = 1; i < points.length; i++) {
        lengths.push(lengths[i - 1] + Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]));
      }
      return { points, lengths, total: lengths[lengths.length - 1] };
    });
    const unit = (seed: number) => {
      const value = Math.sin(seed * 127.1 + 81.53) * 43758.5453;
      return value - Math.floor(value);
    };
    const glints = Array.from({ length: 210 }, (_, index) => ({
      stream: index % 5 === 0 ? 1 : 0,
      position: unit(index + 1),
      speed: 26 + unit(index + 91) * 38,
      offset: (unit(index + 181) - .5) * (index % 5 === 0 ? 13 : 27),
      length: 4 + unit(index + 271) * 11,
      width: .8 + unit(index + 361) * 1.4,
      strength: .32 + unit(index + 451) * .5,
    }));
    const sample = (stream: typeof streams[number], distance: number) => {
      const along = distance % stream.total;
      let segment = 1;
      while (segment < stream.lengths.length - 1 && stream.lengths[segment] < along) segment++;
      const start = stream.points[segment - 1];
      const end = stream.points[segment];
      const span = stream.lengths[segment] - stream.lengths[segment - 1];
      const fraction = (along - stream.lengths[segment - 1]) / span;
      const dx = (end[0] - start[0]) / span;
      const dy = (end[1] - start[1]) / span;
      return { x: start[0] + (end[0] - start[0]) * fraction, y: start[1] + (end[1] - start[1]) * fraction, dx, dy };
    };
    let frame = 0;
    let previous = 0;
    const paint = (now: number) => {
      const elapsed = Math.min((now - (previous || now)) / 1000, .05);
      previous = now;
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (scene.complete && scene.naturalWidth) {
        context.globalAlpha = .72;
        // Displace narrow strips of the actual river texture. The matte removes
        // all pixels outside the water after the canvas is composited.
        for (let y = 382; y < 640; y += 3) {
          const shift = 7 * Math.sin(y * .11 - now * .0021)
            + 4 * Math.sin(y * .047 - now * .0011);
          context.drawImage(scene, 1010 + shift, y, 515, 3, 1010, y, 515, 3);
        }
        context.globalAlpha = 1;
      }
      context.lineCap = 'round';
      context.shadowColor = 'rgba(144,207,255,.82)';
      context.shadowBlur = 6;
      for (const glint of glints) {
        const stream = streams[glint.stream];
        glint.position = (glint.position + elapsed * glint.speed / stream.total) % 1;
        const point = sample(stream, glint.position * stream.total);
        const x = point.x - point.dy * glint.offset;
        const y = point.y + point.dx * glint.offset;
        context.strokeStyle = `rgba(204,235,255,${glint.strength})`;
        context.lineWidth = glint.width;
        context.beginPath();
        context.moveTo(x - point.dx * glint.length, y - point.dy * glint.length);
        context.lineTo(x, y);
        context.stroke();
      }
      frame = requestAnimationFrame(paint);
    };
    frame = requestAnimationFrame(paint);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else { previous = 0; frame = requestAnimationFrame(paint); }
    });
  }
}
