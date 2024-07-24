import ContactForm from "../features/contact/ContactForm";

import akere from "../assets/akere.jpeg";

function Contact() {
  return (
    <div>
      <img
        className="h-[200px] w-[24rem] md:h-[35rem] md:w-full lg:absolute lg:w-full lg:min-h-[70rem] lg:-z-10 grayscale transition-all duration-300"
        src={akere}
        alt="image of akere"
      />
      <ContactForm />
    </div>
  );
}

export default Contact;
