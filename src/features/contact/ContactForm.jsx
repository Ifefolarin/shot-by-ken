import { useState } from "react";
import { Form } from "react-router-dom";

function ContactForm() {
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState("");

  return (
    <form method="POST">
      <div className="flex flex-col justify-center gap-4 py-3 sm:gap-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex flex-col gap-1">
            <label htmlFor="*">Your Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input sm:w-[21rem] w-[18.5rem] rounded-3xl"
              type="text"
              required
            />
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <label htmlFor="*">Email</label>
            <input
              className="input sm:w-[21rem] w-[18.5rem]  rounded-3xl "
              type="email"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 sm:gap-4 ">
          <label className="capitalize">type of event</label>
          <select
            className=" rounded-3xl input border-stone-950"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="wedding">Wedding</option>
            <option value="engagement">Engagement</option>
            <option value="Birthday">Birthday</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex flex-col gap-1 sm:gap-2">
            <label htmlFor="*">Location</label>
            <input
              className="input sm:w-[21rem] w-[18.5rem] rounded-3xl"
              type="text"
              required
            />
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <label htmlFor="*">Date</label>
            <input
              className="input sm:w-[21rem] w-[18.5rem] rounded-3xl "
              type="date"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 sm:gap-2">
          <label htmlFor="*">More about the event</label>
          <textarea
            className="h-[100px] rounded-xl border input border-stone-950"
            id=""
          ></textarea>
        </div>

        <button className="relative float-right py-3 uppercase transition-all duration-200 border sm:w-40 bg-stone-950 text-stone-50 rounded-3xl hover:bg-stone-800">
          Book Now
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
