import { Module } from "@nestjs/common";
import { PrismaModule } from "../../database/prisma.module";
import { SubjectService } from "./subject.service";

@Module({
    imports: [PrismaModule],
    providers: [SubjectService],
    exports: [SubjectService]
})
export class SubjectModule { }