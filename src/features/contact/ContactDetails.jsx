function ContactDetails() {
  return (
    <div className="flex flex-col gap-4 pb-4 border-b ">
      <h1 className="text-xl uppercase sm:text-5xl font">Let's Discuss</h1>
      <p className="text-sm sm:text-lg sm:w-[41rem]">
        Every person and story is precious, and I want to give each client my
        utmost attention to guarantee the quality of my work and time. I’m
        excited to go wherever your love story is taking me and looking forward
        to hearing from you! At summer I am between France, Italy and all over
        the Europe, and will be happy to be at your wedding wherever it will be
        located at any time.
      </p>
      <div className="flex justify-between mb-4 text-sm md:justify-around sm:text-lg ">
        <div className="flex flex-col">
          <p className="uppercase text-stone-400">Email me</p>
          <p>example@email.com</p>
        </div>
        <div className="flex flex-col">
          <p className="uppercase text-stone-400">call me</p>
          <p>0987654321</p>
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
