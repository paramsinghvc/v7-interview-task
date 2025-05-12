import {
  Entity,
  Project,
  Property,
  PropertyData,
} from '@v7-product-interview-task/api';
import { createContext, useContext } from 'react';

type ProjectContextType = {
  project: Project | null;
  entities: Entity[];
  workspaceId: string;
  projectId: string;
  callAddProperty: (body: PropertyData) => Promise<Property | undefined>;
  propertyData: PropertyData;
  updatePropertyData: (data: Partial<PropertyData>) => void;
  loadData: () => Promise<void>;
};

export const ProjectContext = createContext<ProjectContextType | null>(null);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
