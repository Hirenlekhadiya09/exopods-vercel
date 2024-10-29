import Header from "./_components/Header";
import Hero from "./_components/Hero";
import ExoWorking from "./_components/ExoWorking";
import Features from "./_components/Features";
import Frameworks from "./_components/Frameworks";
import Pricing from "./_components/Pricing";
import Connect from "./_components/Connect";
import Footer from "./_components/Footer";
import { useState } from "react";

function SpaceEffect() {
  return (
    <div className="w-[500px] sm:w-[1400px] mt-[50px]">
      <img
        src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/spaceBg.png"
        alt="space background"
        className="w-full"
      />
    </div>
  );
}

function SpaceEffectMobile() {
  return (
    <div className="flex sm:hidden w-[500px] mt-[50px]">
      <img
        src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/spaceBg.png"
        alt="space background"
        className="w-full"
      />
    </div>
  );
}

function HomeIndex() {
  const [showMenu, setShowMenu] = useState(false);

  window.addEventListener("scroll", () => {
    if (showMenu) {
      setShowMenu(!showMenu);
    }
  });

  return (
    <div className="bg-[#000]">
      <div className="z-[0] absolute top-0 right-0">
        <img
          src="https://privateregistry.s3.us-west-1.amazonaws.com/exopodsv2/heroBgTop.png"
          alt="exopods image"
        />
      </div>
      <div className="z-[20] absolute w-[80%] sm:w-[50%] top-[-17%] right-0 overflow-hidden">
        <div className="w-[500px] sm:w-[1400px] h-[1000px] mt-[50px]"></div>
        <SpaceEffect />
        <SpaceEffect />
        <SpaceEffect />
        <SpaceEffectMobile />
        <SpaceEffectMobile />
        <SpaceEffectMobile />
        <SpaceEffectMobile />
        <SpaceEffectMobile />
        <SpaceEffectMobile />
      </div>
      <header>
        <Header showMenu={showMenu} setShowMenu={setShowMenu} />
      </header>
      <main>
        <section className="z-[50] relative">
          <Hero />
        </section>
        <section>
          <ExoWorking />
        </section>
        <section>
          <Features />
        </section>
        <section>
          <Frameworks />
        </section>
        <section>
          <Pricing />
        </section>
        <section>
          <Connect />
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default HomeIndex;
