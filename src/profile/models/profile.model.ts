import { Field, ObjectType, Int } from '@nestjs/graphql';
import { ProfileLinkModel } from './profile-link.model';
import { SkillModel } from './skill.model';
import { ExperienceModel } from './experience.model';
import { ProjectModel } from './project.model';

@ObjectType()
export class ProfileModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [ProfileLinkModel])
  links: ProfileLinkModel[];

  @Field(() => [SkillModel])
  skills: SkillModel[];

  @Field(() => [ExperienceModel])
  experience: ExperienceModel[];

  @Field(() => [ProjectModel])
  projects: ProjectModel[];
}
