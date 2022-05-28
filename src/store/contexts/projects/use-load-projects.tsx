import { useCallback, useEffect, useState } from 'react';
import type { ProjectInterface } from '@repositories';
import { useDeepMemo, useErrorCatcher } from '@core';
import { useProjectsRepository } from '@repositories';
import type { OptionInterface } from '@components';
import { ALL_ITEMS_VALUE } from '@core';
import type { ProjectContextInterface } from './index';

const useLoadProjects = () => {
  const { setError } = useErrorCatcher();
  const repository = useProjectsRepository();
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [projectOptions, setProjectOptions] = useState<OptionInterface[]>([]);

  const loadProjects = useCallback(async () => {
    try {
      const projects: ProjectInterface[] = await repository.get();
      if (projects && Array.isArray(projects)) {
        setProjects(projects);

        const options = projects.map((item) => {
          return {
            value: item.projectId,
            label: item.name,
          };
        });

        options.unshift({
          label: 'All projects',
          value: ALL_ITEMS_VALUE,
        });

        setProjectOptions(options);
      }
    } catch (e) {
      setError(e);
    }
  }, [repository]);

  useEffect(() => {
    loadProjects();
  }, []);

  const labelsByValues = useDeepMemo(() => {
    const labelsByValues = {};
    projectOptions.forEach((item) => {
      // @ts-ignore
      labelsByValues[item.value] = item.label;
    });
    return labelsByValues;
  }, [projectOptions]);

  const data: ProjectContextInterface = useDeepMemo(() => {
    return {
      items: projects,
      options: projectOptions,
      labelsByValues,
    };
  }, [projects, projectOptions, labelsByValues]);

  return data;
};

export { useLoadProjects };
