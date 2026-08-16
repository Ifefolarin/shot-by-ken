"use client";

interface BookButtonProps {
  serviceId: string;
  className: string;
}

export function BookButton({ serviceId, className }: BookButtonProps) {
  function handleClick() {
    window.dispatchEvent(new CustomEvent("prefill-service", { detail: serviceId }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      Book
    </button>
  );
}
