import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class ProfileLinkModel {
  @Field(() => Int)
  id: number;

  @Field()
  label: string;

  @Field()
  url: string;
}
