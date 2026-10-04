# Lab Two

This project is an interactive webpage based around a moon.

## Functions

### Click the Moon

Clicking the main moon makes the eyes appear.

The eyes blink at slightly different random times to create a more unsettling effect.

### Inactivity

If the user does not click or type anything for 7.77 seconds:

- The moon turns red
- The moon starts pulsing
- The input message changes to:
  `I thought you left...`

Any click or keyboard input returns the moon to normal.

### `star`

Typing:

`star`

and pressing Enter creates random white stars in the background.

Typing `star` again does nothing if the stars already exist.

### `sun`

Typing:

`sun`

and pressing Enter:

- Removes the stars
- Turns the entire screen white for 7 seconds
- Returns to the normal page afterward

### `moon`

Typing:

`moon`

for the first time creates an extra moon on the lower-right side.

Typing:

`moon`

a second time creates another moon on the upper-left side.

Moving the mouse into the center area of either extra moon makes that moon disappear.

## Files

- `index.html` — webpage structure
- `style.css` — visual styling and animations
- `script.js` — interactions and event listeners
- `moon1.png` — extra moon
- `moon2.png` — main moon
- `moon3.png` — extra moon
- `eye_L.png` — left eye
- `eye_R.png` — right eye
