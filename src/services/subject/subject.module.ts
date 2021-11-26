import { Module } from "@nestjs/common";
import { PrismaModule } from "../../database/prisma.module";
import { LoggerModule } from "../logger/logger.module";
import { SubjectService } from "./subject.service";

@Module({
    imports: [PrismaModule, LoggerModule],
    providers: [SubjectService],
    exports: [SubjectService]
})
export class SubjectModule { }