// Smooth reveal for sections as they enter the viewport.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".section, .project").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(18px)";
  el.style.transition = "opacity .7s ease, transform .7s ease";
  observer.observe(el);
});

const portraitStage = document.querySelector(".orbital");
const portraitCard = document.querySelector(".portrait-card");

if (portraitStage && portraitCard && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  portraitStage.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;

    const bounds = portraitStage.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

    portraitCard.style.setProperty("--tilt-x", `${horizontal * 8}deg`);
    portraitCard.style.setProperty("--tilt-y", `${vertical * -6}deg`);
  });

  portraitStage.addEventListener("pointerleave", () => {
    portraitCard.style.removeProperty("--tilt-x");
    portraitCard.style.removeProperty("--tilt-y");
  });
}
