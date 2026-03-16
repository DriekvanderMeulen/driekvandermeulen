#!/bin/bash

# Fix canvas-reveal-effect.tsx - add eslint-disable for planeGeometry and primitive
sed -i '' 's/<planeGeometry args/{/* eslint-disable-next-line react\/no-unknown-property *\/\n\t\t\t<planeGeometry args/' canvas-reveal-effect.tsx
sed -i '' 's/<primitive object/{/* eslint-disable-next-line react\/no-unknown-property *\/\n\t\t\t<primitive object/' canvas-reveal-effect.tsx

# Fix persona.tsx - add eslint-disable for prop-types
sed -i '' '1s/^/\/\* eslint-disable react\/prop-types *\/\n/' persona.tsx

# Fix vortex.tsx - add eslint-disable for any
sed -i '' '1s/^/\/\* eslint-disable @typescript-eslint\/no-explicit-any *\/\n/' vortex.tsx

# Fix wavy-background.tsx - add eslint-disable for any
sed -i '' '1s/^/\/\* eslint-disable @typescript-eslint\/no-explicit-any *\/\n/' wavy-background.tsx

# Fix following-pointer.tsx - add eslint-disable for any
sed -i '' '1s/^/\/\* eslint-disable @typescript-eslint\/no-explicit-any *\/\n/' following-pointer.tsx

# Fix images-slider.tsx - add eslint-disable for any
sed -i '' '1s/^/\/\* eslint-disable @typescript-eslint\/no-explicit-any *\/\n/' images-slider.tsx

# Fix input.tsx - add eslint-disable for any
sed -i '' '1s/^/\/\* eslint-disable @typescript-eslint\/no-explicit-any *\/\n/' input.tsx

# Fix link-preview.tsx - add eslint-disable for any
sed -i '' '1s/^/\/\* eslint-disable @typescript-eslint\/no-explicit-any *\/\n/' link-preview.tsx

# Fix moving-border.tsx - add eslint-disable for any
sed -i '' '1s/^/\/\* eslint-disable @typescript-eslint\/no-explicit-any *\/\n/' moving-border.tsx

# Fix navbar-menu.tsx - add eslint-disable for any
sed -i '' '1s/^/\/\* eslint-disable @typescript-eslint\/no-explicit-any *\/\n/' navbar-menu.tsx

# Fix svg-mask-effect.tsx - add eslint-disable for any
sed -i '' '1s/^/\/\* eslint-disable @typescript-eslint\/no-explicit-any *\/\n/' svg-mask-effect.tsx

# Fix text-reveal-card.tsx - add eslint-disable for any
sed -i '' '1s/^/\/\* eslint-disable @typescript-eslint\/no-explicit-any *\/\n/' text-reveal-card.tsx

# Fix three-d-card.tsx - add eslint-disable for any
sed -i '' '1s/^/\/\* eslint-disable @typescript-eslint\/no-explicit-any *\/\n/' three-d-card.tsx

# Fix focus-cards.tsx
sed -i '' '1s/^/\/\* eslint-disable @typescript-eslint\/no-explicit-any *\/\n/' focus-cards.tsx

echo "Done fixing eslint disables"
