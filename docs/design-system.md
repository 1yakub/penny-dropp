# Penny Dropp design system

Portfolio of a fictional artist, built as a working vending machine. The drop is the one memorable moment. Everything around it stays flat and disciplined.

## Color

| Token | Hex | Use |
| --- | --- | --- |
| cobalt | #2323ff | Page ground, slots |
| bubble | #ff5fae | Machine body, slots, shows section |
| lime | #d6ff3a | LED text, flap, list section, hover |
| tomato | #ff4a1f | Control panel, slots, closing section |
| paper | #ffffff | Keys, cards, slots |
| ink | #000000 | All outlines, all hard shadows |

Text on cobalt is paper. Text on every other color is ink. Black on cobalt fails contrast and is never used.

## Type

- Bagel Fat One: display, sign tiles, keys, headings.
- Familjen Grotesk: body and small labels.
- Doto: LED surfaces only (status display, ticker, slot codes). A dot matrix face has a written reason here, because those surfaces are LED displays on a machine. It is not used anywhere else.

## Structure

- Outlines are solid ink at 3px, 4px or 6px. Shadows are hard offsets with no blur (4, 8, 14px).
- Slot codes are real data: a letter and a number select that object on the keypad.
- Uppercase appears only in the sign and on LED surfaces, because real machines print it that way.

## Motion

- The drop answers a press. It has a release, a fall with gravity, a thump and a bounce, built with Motion.
- The sign tiles fall once on load. The ticker runs on the LED strip. Nothing else moves unprompted.
- Reduced motion turns all of this off, and a press opens the object directly.

## Content rules

- Penny is fictional, and the site says so in its first line and in the footer.
- Generated images contain no text and no faces. Her head is always covered by the paper bag.
