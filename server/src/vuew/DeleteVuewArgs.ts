import { ArgsType, Field } from "@nestjs/graphql";
import { VuewWhereUniqueInput } from "./VuewWhereUniqueInput";

@ArgsType()
class DeleteVuewArgs {
  @Field(() => VuewWhereUniqueInput, { nullable: false })
  where!: VuewWhereUniqueInput;
}

export { DeleteVuewArgs };
