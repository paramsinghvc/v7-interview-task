import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { ProjectContext } from './useProjectContext';
import {
  getEntities,
  getProject,
  addProperty,
  PropertyData,
  Project,
  Entity,
  Property,
} from '@v7-product-interview-task/api';

const getApiKey = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) throw new Error('VITE_API_KEY env variable is not set');
  return apiKey;
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [project, setProject] = useState<Project | null>(null);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [propertyData, setPropertyData] = useState<PropertyData>({
    type: 'text',
    name: '',
    description: '',
  });

  const { workspaceId, projectId } = useParams() as {
    workspaceId: string;
    projectId: string;
  };

  const loadData = useCallback(async () => {
    const apiKey = getApiKey();

    try {
      const [projectData, entityData] = await Promise.all([
        getProject({ apiKey, projectId, workspaceId }),
        getEntities({ apiKey, projectId, workspaceId }),
      ]);

      setProject(projectData);
      setEntities(entityData);
    } catch (err) {
      console.error('Failed to load project or entities:', err);
      setProject(null);
      setEntities([]);
    }
  }, [projectId, workspaceId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const callAddProperty = async (body: PropertyData) => {
    const apiKey = getApiKey();
    try {
      const response = await addProperty({
        apiKey,
        projectId,
        workspaceId,
        body,
      });
      return response;
    } catch (e) {
      console.error('Failed to add property:', e);
    }
  };

  const updatePropertyData = (data: Partial<PropertyData>) => {
    setPropertyData((prev) => ({ ...prev, ...data }));
  };

  const value = {
    project,
    entities,
    workspaceId,
    projectId,
    propertyData,
    updatePropertyData,
    callAddProperty,
    loadData,
  };

  console.log(value);

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
