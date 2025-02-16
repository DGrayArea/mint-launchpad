import Photo from "./Photo";

const AllTabs = ({ contract }: { contract: string | any }) => {
  return (
    <div className="flex flex-row items-center mt-5 md:mt-8 w-full justify-center min-h-sreen lg:mb-20">
      <Photo contract={contract} />
    </div>
  );
};

export default AllTabs;
