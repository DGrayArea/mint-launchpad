import CardItem from "./CardItem";

const CardGrid = () => {
  return (
    <div className="grid gap-x-4 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div className="grid gap-2 sm:gap-x-4 sm:gap-y-10  grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 col-start-1 col-end-6 row-start-1 px-20 mb-20">
        <CardItem image="/1.png" />
        <CardItem image="/2.png" />
        <CardItem image="/4.png" />
        <CardItem image="/5.png" />
        <CardItem image="/1.png" />
        <CardItem image="/4.png" />
        <CardItem image="/5.png" />
        <CardItem image="/2.png" />
        <CardItem image="/3.png" />
        <CardItem image="/3.png" />
      </div>
    </div>
  );
};

export default CardGrid;
