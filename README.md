# LOADYS.js

A helper library for Load Repository

## Usage

```javascript
let flip = new FLIP({
  element: target,
  duration: 2000
});

// First position & opacity.
flip.first();

// Apply the 'end' class and snapshot the last position & opacity.
flip.last('end');

// Move and fade the element back to the original position.
flip.invert();

// Play it forwards.
flip.play();
```