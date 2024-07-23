import ContactDetails from "../features/contact/ContactDetails";
import ContactForm from "../features/contact/ContactForm";

function Contact() {
  return (
    <div className="flex flex-col items-center gap-4 px-2 py-2 bg-white md:py-10 lg: md:px-10 ">
      <ContactDetails />
      <ContactForm />
    </div>
  );
}

export default Contact;
