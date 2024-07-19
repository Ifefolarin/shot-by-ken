import ContactDetails from "../features/contact/ContactDetails";
import ContactForm from "../features/contact/ContactForm";

function Contact() {
  return (
    <div className="flex lg:absolute lg:right-0 flex-col items-start justify-center w-full gap-4 px-2 py-2 md:py-4 lg:py-20  md:items-center  bg-white lg:w-[50rem] lg:mt-10 md:px-10 ">
      <ContactDetails />
      <ContactForm />
    </div>
  );
}

export default Contact;
