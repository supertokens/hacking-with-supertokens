export const slotReplacer = (elementName: string) => {
  const rootElement = document.querySelector(elementName);

  if (!rootElement) {
    return;
  }

  const childrenElements = rootElement.querySelectorAll(`${elementName} > *`);
  childrenElements.forEach((element) => {
    if (element.classList.contains("wrapper")) {
      return;
    }

    (element as HTMLElement).style.display = "none";
  });

  const slots = rootElement.querySelectorAll("[data-slot]");

  slots.forEach((slot) => {
    const slotName = slot.getAttribute("data-slot");
    const slotElement = rootElement.querySelector(`[slot=${slotName}]`);

    if (slotElement) {
      slot.replaceChildren(slotElement);
      (slotElement as HTMLElement).style.display = "block";
    }
  });
};
