import PackageDetails from "../features/packages/PackageDetails";
import PackageItems from "../features/packages/PackageItems";

function Packages() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-4">
      <PackageDetails />
      <PackageItems />
    </div>
  );
}

export default Packages;
