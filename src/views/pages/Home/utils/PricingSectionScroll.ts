export default function PricingSectionScroll() {
  const targetElement = document.getElementById("pricing");
  if (targetElement) {
    const elementPosition =
      targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - 120;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}
