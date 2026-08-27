import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class ExperienceModel {
  @Field(() => Int)
  id: number;

  @Field()
  company: string;

  @Field()
  position: string;

  @Field()
  periodStart: Date;

  @Field(() => Date, { nullable: true })
  periodEnd: Date | null;

  @Field(() => [String])
  achievements: string[];
}
