import {
  KaanbanBoardContainer,
  KanbanBoard,
} from "@/components/tasks/kanban/board";
import ProjectCard, { ProjectCardMemo } from "@/components/tasks/kanban/card";
import KanbanColumn from "@/components/tasks/kanban/column";
import KanbanItem from "@/components/tasks/kanban/kanban-item";
import { TASKS_QUERY, TASK_STAGES_QUERY } from "@/graphql/queries";
import { TaskStage } from "@/graphql/schema.types";
import { TasksQuery } from "@/graphql/types";
import { useList } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import React, { useMemo } from "react";

const List = () => {
  const { data: stages, isLoading: isLoadingStages } = useList<TaskStage>({
    resource: "taskStages",
    filters: [
      {
        field: "title",
        operator: "in",
        value: ["TODO", "IN PROGRESS", "IN REVIEW", "DONE"],
      },
    ],
    sorters: [
      {
        field: "createdAt",
        order: "asc",
      },
    ],
    meta: {
      gqlQuery: TASK_STAGES_QUERY,
    },
  });

  const { data: tasks, isLoading: isLoadingTasks } = useList<
    GetFieldsFromList<TasksQuery>
  >({
    resource: "tasks",
    meta: {
      gqlQuery: TASKS_QUERY,
    },
    sorters: [
      {
        field: "dueDate",
        order: "asc",
      },
    ],
    queryOptions: {
      enabled: !!stages,
    },
    pagination: {
      mode: "off",
    },
  });

  const taskStages = useMemo(() => {
    if (!tasks?.data || !stages?.data) {
      return {
        unasignedStage: [],
        stages: [],
      };
    }

    const unasignedStage = tasks.data.filter((task) => task.stageId === null);

    const grouped: TaskStage[] = stages.data.map((stage) => ({
      ...stage,
      tasks: tasks.data.filter((task) => task.stageId?.toString() === stage.id),
    }));

    return {
      unasignedStage,
      grouped,
    };
  }, [stages, tasks]);

  const handleAddCard = (args: { stageId: string }) => {};
  return (
    <>
      <KaanbanBoardContainer>
        <KanbanBoard>
          <KanbanColumn
            id="unasigned"
            title="unasigned"
            count={taskStages?.unasignedStage.length || 0}
            onAddClick={() => handleAddCard({ stageId: "unasigned" })}
          >
            {taskStages?.unasignedStage.map((task) => (
              <KanbanItem
                key={task?.id}
                id={task?.id}
                data={{ ...task, stageId: "unasigned" }}
              >
                <ProjectCardMemo
                  {...task}
                  dueDate={task.dueDate || undefined}
                ></ProjectCardMemo>
              </KanbanItem>
            ))}
          </KanbanColumn>
        </KanbanBoard>
      </KaanbanBoardContainer>
    </>
  );
};

export default List;
