import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { VuewService } from "./vuew.service";
import { VuewController } from "./vuew.controller";
import { VuewResolver } from "./vuew.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [VuewController],
  providers: [VuewService, VuewResolver],
  exports: [VuewService],
})
export class VuewModule {}
