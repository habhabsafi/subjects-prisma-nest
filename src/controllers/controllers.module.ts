import { Module } from "@nestjs/common"
import { SubjectControllerModule } from "./subject/subject.module"

@Module({
    imports: [SubjectControllerModule],
})
export class ControllersModule { }
