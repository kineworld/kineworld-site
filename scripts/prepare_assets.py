from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1] / 'public' / 'assets'
logo = Image.open(root / 'logo-original.jpg').convert('RGBA')
pixels = logo.load()
for y in range(logo.height):
    for x in range(logo.width):
        r, g, b, _ = pixels[x, y]
        # The supplied original is blue on white. Keep the blue pixels and
        # use the white background as alpha without changing the silhouette.
        a = 255 - min(r, g, b)
        if a < 8:
            pixels[x, y] = (0, 85, 235, 0)
        else:
            pixels[x, y] = (0, 85, 235, a)
box = logo.getbbox()
logo = logo.crop(box)
resample = getattr(getattr(Image, 'Resampling', Image), 'LANCZOS')
logo.thumbnail((760, 760), resample)
logo.save(root / 'logo-mark.png', optimize=True)
logo.resize((64, 64), resample).save(root.parent / 'favicon.png')
white = logo.copy()
white.putdata([(245, 247, 250, a) for _, _, _, a in logo.getdata()])
white.save(root / 'logo-white.png', optimize=True)
for background, name in [((5, 7, 11, 255), 'logo-on-black.png'), ((255, 255, 255, 255), 'logo-on-white.png')]:
    canvas = Image.new('RGBA', (900, 900), background)
    mark = logo.copy()
    mark.thumbnail((600, 600), resample)
    canvas.alpha_composite(mark, ((900 - mark.width)//2, (900 - mark.height)//2))
    canvas.convert('RGB').save(root / name, 'PNG', optimize=True)

portal = Image.open(root / 'portal-original.png').convert('RGB')
portal.save(root / 'portal-hero.webp', 'WEBP', quality=84, method=6)
portal.resize((1200, 673), resample).save(root / 'og-cover.jpg', 'JPEG', quality=84, optimize=True)
