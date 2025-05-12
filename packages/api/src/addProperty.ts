import { API_BASE_URL } from './constants';
import type { Property } from './types';

export type PropertyData = {
  type:
    | 'text'
    | 'pdf'
    | 'single_select'
    | 'multi_select'
    | 'user_select'
    | 'collection'
    | 'file_collection'
    | 'reference'
    | 'number';
  name: string;
  description: string;
};

export const addProperty = async ({
  apiKey,
  projectId,
  workspaceId,
  body: { type, name, description },
}: {
  workspaceId: string;
  projectId: string;
  apiKey: string;
  body: PropertyData;
}) => {
  const res = await fetch(
    `${API_BASE_URL}/workspaces/${workspaceId}/projects/${projectId}/properties`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify({
        tool: 'manual',
        type,
        name,
        description,
        inputs: [],
      }),
    }
  );

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to add property: ${res.status}: ${error}`);
  }

  const response = await res.json();
  return response as Property;
};
