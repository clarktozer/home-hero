import { ClassType, Field, InputType, Int, ObjectType } from "type-graphql";

export function DataResponse<T>(TClass: ClassType<T>) {
    @ObjectType({ isAbstract: true })
    abstract class DataResponseClass {
        @Field(() => Int)
        total: number;

        @Field(() => [TClass])
        result: T[];
    }

    return DataResponseClass;
}

@InputType()
export class PagingationArgs {
    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    page: number;
}
