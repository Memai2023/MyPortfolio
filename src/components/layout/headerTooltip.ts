import type { FocusEvent, KeyboardEvent, MouseEvent } from "react";

// Lets Escape dismiss a header button's tooltip without moving focus or the
// pointer (WCAG 1.4.13). It shows again after the next blur or mouse leave.
export const tooltipDismissHandlers = {
  onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.currentTarget.dataset.tooltipDismissed = "true";
    }
  },
  onBlur(event: FocusEvent<HTMLElement>) {
    delete event.currentTarget.dataset.tooltipDismissed;
  },
  onMouseLeave(event: MouseEvent<HTMLElement>) {
    delete event.currentTarget.dataset.tooltipDismissed;
  },
};
