import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import Infoboxes from "@/components/infoboxes";
import FeaturedProperties from "@/components/FeaturedProperties";

const Home = () => {
  return (
    <>
      <Hero />
      <Infoboxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
};

export default Home;
