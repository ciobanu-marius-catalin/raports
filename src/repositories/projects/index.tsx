import type { CrudRepositoryInterface } from '../common';
import { useCrud } from '../common';

export interface ProjectInterface {
  projectId: string;
  userIds: string[];
  rule: string;
  gatewaysIds: string[];
  structure: string;
  industry: string;
  website: string;
  description: string;
  image: string;
  name: string;
}

export type ProjectRepositoryInterface =
  CrudRepositoryInterface<ProjectInterface>;

function useProjectsRepository(): ProjectRepositoryInterface {
  const routes: ProjectRepositoryInterface =
    useCrud<ProjectInterface>('/projects');
  return routes;
}

export { useProjectsRepository };
