import { ArgsType, Field } from "@nestjs/graphql";
import { VuewWhereInput } from "./VuewWhereInput";

@ArgsType()
class FindManyVuewArgs {
  @Field(() => VuewWhereInput, { nullable: true })
  where?: VuewWhereInput;
}

export { FindManyVuewArgs };
