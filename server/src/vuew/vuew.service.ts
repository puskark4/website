import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneVuewArgs,
  FindManyVuewArgs,
  VuewCreateArgs,
  VuewUpdateArgs,
  VuewDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class VuewService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyVuewArgs>(args: Subset<T, FindManyVuewArgs>) {
    return this.prisma.vuew.findMany(args);
  }
  findOne<T extends FindOneVuewArgs>(args: Subset<T, FindOneVuewArgs>) {
    return this.prisma.vuew.findOne(args);
  }
  create<T extends VuewCreateArgs>(args: Subset<T, VuewCreateArgs>) {
    return this.prisma.vuew.create<T>(args);
  }
  update<T extends VuewUpdateArgs>(args: Subset<T, VuewUpdateArgs>) {
    return this.prisma.vuew.update<T>(args);
  }
  delete<T extends VuewDeleteArgs>(args: Subset<T, VuewDeleteArgs>) {
    return this.prisma.vuew.delete(args);
  }
}
