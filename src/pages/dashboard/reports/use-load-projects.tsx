import { useCallback, useEffect, useState } from 'react';
import type { ProjectInterface } from '@repositories';
import { useErrorCatcher } from '@core';
import { useProjectsRepository } from '@repositories';
import type { OptionInterface } from '@components';
import { ALL_ITEMS_VALUE } from './config';

const useLoadProjects = () => {
  const { setError } = useErrorCatcher();
  const repository = useProjectsRepository();
  const [projectOptions, setProjectOptions] = useState<OptionInterface[]>([]);

  const loadProjects = useCallback(async () => {
    try {
      const projects: ProjectInterface[] = await repository.get();
      if (projects && Array.isArray(projects)) {
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

  return projectOptions;
};

export { useLoadProjects };
