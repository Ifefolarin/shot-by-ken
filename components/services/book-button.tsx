"use client";

interface BookButtonProps {
  serviceId: string;
  className: string;
}

export function BookButton({ serviceId, className }: BookButtonProps) {
  function handleClick() {
    sessionStorage.setItem("prefill_service", serviceId);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      Book
    </button>
  );
}
