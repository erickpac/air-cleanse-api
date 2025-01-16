import { TaskStatus } from "@prisma/client";

export interface Task {
  scheduleId: number;
  description: string;
  status: TaskStatus;
}
