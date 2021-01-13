import { ArgsType, Field } from "@nestjs/graphql";
import { VuewWhereUniqueInput } from "./VuewWhereUniqueInput";

@ArgsType()
class FindOneVuewArgs {
  @Field(() => VuewWhereUniqueInput, { nullable: false })
  where!: VuewWhereUniqueInput;
}

export { FindOneVuewArgs };
