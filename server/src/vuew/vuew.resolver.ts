import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { VuewService } from "./vuew.service";
import { DeleteVuewArgs } from "./DeleteVuewArgs";
import { FindManyVuewArgs } from "./FindManyVuewArgs";
import { FindOneVuewArgs } from "./FindOneVuewArgs";
import { Vuew } from "./Vuew";

@graphql.Resolver(() => Vuew)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class VuewResolver {
  constructor(
    private readonly service: VuewService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Vuew])
  @nestAccessControl.UseRoles({
    resource: "Vuew",
    action: "read",
    possession: "any",
  })
  async vuews(
    @graphql.Args() args: FindManyVuewArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Vuew[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Vuew",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Vuew, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Vuew",
    action: "read",
    possession: "own",
  })
  async vuew(
    @graphql.Args() args: FindOneVuewArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Vuew | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Vuew",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Vuew)
  @nestAccessControl.UseRoles({
    resource: "Vuew",
    action: "delete",
    possession: "any",
  })
  async deleteVuew(@graphql.Args() args: DeleteVuewArgs): Promise<Vuew | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
