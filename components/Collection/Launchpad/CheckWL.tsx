import { Input } from "@/components/ui/input";

const CheckWL = () => {
  const Whitelisted = false;
  return (
    <div className="flex flex-col items-center mt-5 md:mt-16 lg:mt-16 w-full justify-center min-h-sreen lg:mb-20">
      <Input
        placeholder="Enter an Address"
        className="max-w-[80%] lg:max-w-96 py-7 border-gray-600 rounded-xl px-4 text-center mt-36"
      />

      <div
        className={`mt-20 ${Whitelisted ? "text-green-500" : "text-red-500"}`}
      >
        The Address above is {Whitelisted ? "Whitelisted" : "Not Whitelisted"}
      </div>
    </div>
  );
};

export default CheckWL;
