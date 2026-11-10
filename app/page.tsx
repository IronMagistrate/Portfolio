import { projects } from "@/content/site";
import { ContactSection } from "@/components/home/contact-section";
import { Hero } from "@/components/home/hero";
import { ProfileSection } from "@/components/home/profile-section";
import { ProjectCard } from "@/components/home/project-card";
import { Section } from "@/components/home/section";
import { SkillsSection } from "@/components/home/skills-section";

export default function Home() {
  return (
    <>
      <Hero />
      <Section
        id="work"
        index="01"
        title="Selected work"
        tag={`${String(projects.length).padStart(2, "0")} projects`}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </Section>
      <ProfileSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
