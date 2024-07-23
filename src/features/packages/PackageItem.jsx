import Button from "../../ui/Button";

function PackageItem({ data }) {
  return (
    <li className="flex w-[250px] flex-col pb-4 gap-1 text-center  bg-stone-400 text-stone-50">
      <img
        className="h-[200px] w-full  grayscale"
        src={data.image}
        alt={`image of ${data.name} package`}
      />
      <div className="flex flex-col gap-4 px-5 ">
        <div className="flex flex-col items-center gap-0 capitalize">
          <h2 className="w-[130px]">{data.name}</h2>
          {data.subname && <span className="text-xs">({data?.subname})</span>}
        </div>
        <h3>${data.price}</h3>
        <p className="flex flex-col">
          {data.features.map((feature, index) => (
            <span feature={feature} key={index}>
              {feature}
            </span>
          ))}
        </p>
        <Button to="/contact" type="small">
          Book now
        </Button>
      </div>
    </li>
  );
}

export default PackageItem;
