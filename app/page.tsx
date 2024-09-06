
import AboutUs from "@/components/AboutUsSection/AboutUs";
import { FAQ } from "@/components/FAQ-Section/Faq";
import HeroSection from "@/components/HeroSection/HeroSection";
import ParallaxCardPage from "@/components/Parallax-Card/parallax-paga";
import Testimonials from "@/components/Testimonials/testimonials";
import PageWrapper from "@/components/layout/PgaeWrapper";
import React from "react";

const page = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center w-full mt-[1rem] pt-3">
        <HeroSection />
      </div>
      <div className="flex flex-col gap-1 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_0)] ">
        <div className="flex flex-col justify-center items-center w-full mt-[1rem] py-3 ">
          <AboutUs />
        </div>
        <div className="flex justify-center items-center w-full mt-[6rem] mb-[7rem]">
          <ParallaxCardPage />
        </div>
        <div className="flex justify-center items-center w-full mb-[7rem]">
          <FAQ />
        </div>
        <div className="flex justify-center items-center w-full mb-[7rem] px-5 lg:px-10">
          <Testimonials />
        </div>
      </div>
    </PageWrapper>
  );
};

export default page;

// <div class="relative h-full w-full bg-slate-950"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div></div>
