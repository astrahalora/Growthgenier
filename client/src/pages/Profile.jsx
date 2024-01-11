import GrowthFrame from "../components/GrowthFrame";
import Footer from "../components/Footer";
import { backgroundChange } from "../utilities/backgroundChange";

export default function Profile() {
  backgroundChange();

  return (
    <>
      <GrowthFrame />
      <Footer />
    </>
  );
}
