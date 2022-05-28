import React, { useContext } from 'react';
import { ProjectInterface } from '@repositories';
import { OptionInterface } from '@components';
import { useLoadProjects } from './use-load-projects';

export interface ProjectContextInterface {
  items: ProjectInterface[];
  options: OptionInterface[];
}

const defaultContextValue: ProjectContextInterface = {
  items: [],
  options: [],
};

const ProjectContext = React.createContext(defaultContextValue);

const ProjectsContextProvider = ({ children }) => {
  const contextValue: ProjectContextInterface = useLoadProjects();
  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
};

const useProjectsContext = () => {
  return useContext(ProjectContext);
};

export { useProjectsContext, ProjectsContextProvider };
