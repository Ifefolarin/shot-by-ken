import PackageItem from "./PackageItem";

const fakeData = [
  {
    image: "https://i.pravatar.cc/48?u=118836",
    name: "Engagement/ Roka Package",
    price: 899,
    features: [
      "1 photographer",
      "200-250 edited pictures",
      "3-4 Min cinematic Video ",
      "2 instagram reels",
    ],
  },
  {
    image: "https://i.pravatar.cc/48?u=933372",
    name: "Wedding Package",
    price: 1600,
    features: [
      "1 photographer",
      "200-250 edited pictures",
      "3-4 Min cinematic Video ",
      "Full event video",
      "2 instagram reels",
    ],
  },
  {
    image: "https://i.pravatar.cc/48?u=499476",
    name: "Full Package",
    subname: "pre wedding + Engagment + Wedding + reception",
    price: 3500,
    features: [
      "1 photographer",
      "350-400 edited pictures",
      "3-4 Min cinematic Video ",
      "Full event video",
      "3 instagram reels",
    ],
  },
];

function PackageItems() {
  return (
    <ul className="flex flex-col gap-4 sm:flex-row">
      {fakeData.map((data) => (
        <PackageItem data={data} key={data.name} />
      ))}
    </ul>
  );
}

export default PackageItems;
