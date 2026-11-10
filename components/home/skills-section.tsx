import { skills } from "@/content/site";
import { Code, Database, Terminal, Wrench } from "../icons";
import { Tag } from "../ui";
import { Section } from "./section";

const groupIcons = [Code, Terminal, Database, Wrench];

export function SkillsSection() {
  return (
    <Section id="skills" index="03" title="Technical inventory" tag="Capability matrix">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {skills.map((group, i) => {
          const Icon = groupIcons[i % groupIcons.length];
          return (
            <div key={group.group} className="lift flex flex-col gap-4 border-2 border-line bg-surface p-6">
              <div className="flex items-center justify-between border-b-2 border-line pb-1">
                <h3 className="font-mono text-label-md font-bold uppercase">{group.group}</h3>
                <Icon className="size-4 text-accent-ink" />
              </div>
              <ul className="flex flex-wrap gap-1">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
