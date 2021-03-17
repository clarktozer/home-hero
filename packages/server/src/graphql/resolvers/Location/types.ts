import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Prediction {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    subtitle: string;
}
