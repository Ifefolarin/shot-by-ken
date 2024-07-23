import { Link } from "react-router-dom";

function Button({ children, type, disabled, to }) {
  const base = " uppercase transition-all duration-200 px-4 rounded-3xl ";
  const styles = {
    primary:
      base +
      "bg-stone-950 py-3 sm:w-40 sm:float-right items-center w-full text-stone-50 hover:bg-stone-800 ",
    small: base + "border hover:bg-stone-300 text-sm py-2 mb-2  ",
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
