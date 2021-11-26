import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.services";

@Module({
    providers: [TasksService],
    exports: [TasksService]
})

export class TasksModule {

}