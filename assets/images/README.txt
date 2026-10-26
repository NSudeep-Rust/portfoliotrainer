PUT YOUR PHOTOS IN THIS FOLDER
==============================

These paths are already wired into index.html — just drop files in
with the same names (or rename and update the src in index.html):

  portrait.jpg          → hero portrait (works best at 4:5, e.g. 800x1000)
  training-01.jpg       → gallery photo 1 (works best at 4:3, e.g. 1200x900)
  training-02.jpg       → gallery photo 2
  training-03.jpg       → gallery photo 3
  training-04.jpg       → gallery photo 4
  training-05.jpg       → gallery photo 5
  training-06.jpg       → gallery photo 6
  og-image.jpg          → social share preview (1200x630)
  favicon.svg/.png      → browser tab icon

Tips
----
- JPG or WebP, ~1600px on the long edge, compressed (aim < 300 KB each).
- After adding a file, also update its alt text and the location/date
  captions next to it in index.html.
- Missing files are harmless: the site shows a styled "ADD PHOTO" tile
  instead of a broken image. Add photos whenever you're ready.
- This folder also keeps .gitkeep behaviour: Git tracks this README.txt,
  so the folder structure survives cloning before photos are added.
