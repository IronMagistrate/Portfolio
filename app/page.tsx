import { ViewTransition } from "react";
import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";
import { Hero } from "@/components/home/hero";
import { WorkSection } from "@/components/home/work-section";
import { PinnedSteps } from "@/components/motion/PinnedSteps";
import { novoArchitecture } from "@/content/site";

export default function Home() {
  return (
    // Page-level transition wrapper: must live in the page, not the layout, because
    // layouts persist across navigations and would never fire enter/exit.
    <ViewTransition enter="page-fade" exit="page-fade" default="none">
      <div>
        <Hero />
        <WorkSection />
        <PinnedSteps
          id="architecture"
          eyebrow="Under the hood · Novo"
          heading="How one platform is put together"
          intro="Novo runs on three apps and one API. Scroll through its four layers."
          steps={novoArchitecture}
        />
        <AboutSection />
        <ContactSection />
      </div>
    </ViewTransition>
  );
}
