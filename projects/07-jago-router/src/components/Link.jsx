import { EVENTS, MOUSE_BUTTON } from '../constants/contants';

const navigate = (path) => {
  window.history.pushState({}, '', path);
  const navEvent = new Event(EVENTS.pushstate);
  window.dispatchEvent(navEvent);
};

export const Link = ({ resetScroll, target, to, ...props }) => {
  /**
   * Handles the click event for the Link component.
   *
   * @param {MouseEvent} event - The click event.
   * @returns {void}
   */
  const handleClick = (event) => {
    const isMainEvent = event.button === MOUSE_BUTTON.primary; //Primary click
    const isModifiedEvent =
      event.metaKey || event.altKey || event.ctrlKey || event.shiftKe;
    const isManageableEvent = target === undefined || target === '_self';

    if (!isMainEvent || isModifiedEvent || !isManageableEvent) {
      return;
    }

    //Navigate with SPA
    event.preventDefault();
    navigate(to);
    resetScroll && window.scrollTo(0, 0);
  };
  return <a onClick={handleClick} href={to} target={target} {...props} />;
};
