import { render, screen, fireEvent } from '@testing-library/react';
import ProjectTable from './ProjectTable';
import { BrowserRouter } from 'react-router-dom';

// Mock CSS module to prevent style issues
jest.mock(
  '@v7-product-interview-task/styles/ProjectTable.module.css',
  () => ({})
);

// Mock CommandCenterModal with a simple button
jest.mock('./CommandCenterModal/CommandCenterModal', () => (props: any) => (
  <button onClick={props.onPropertyAdded} data-testid="ADD_PROPERTY_BTN">
    Add Property
  </button>
));

// Mock useParams from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({ workspaceId: 'WS1', projectId: 'PROJ1' })),
}));

// Mock useProjectContext hook
const mockLoadData = jest.fn();
jest.mock('@/contexts/Project/useProjectContext', () => ({
  useProjectContext: jest.fn(() => ({
    project: {
      id: 'PROJECT_ID',
      name: 'PROJECT_NAME',
      properties: [{ id: 'PROP1', name: 'PROP1', slug: 'PROP1', type: 'file' }],
    },
    entities: [
      {
        id: 'ENTITY1',
        fields: {
          PROP1: {
            property_type: 'text',
            tool_value: { value: 'ENTITY_VALUE1' },
          },
        },
      },
      {
        id: 'ENTITY2',
        fields: {
          PROP1: {
            property_type: 'text',
            tool_value: { value: 'ENTITY_VALUE2' },
          },
        },
      },
    ],
    workspaceId: 'WS1',
    projectId: 'PROJ1',
    callAddProperty: jest.fn(),
    propertyData: {},
    updatePropertyData: jest.fn(),
    loadData: mockLoadData,
  })),
}));

const renderProjectTable = () =>
  render(
    <BrowserRouter>
      <ProjectTable />
    </BrowserRouter>
  );

describe('ProjectTable', () => {
  beforeEach(() => {
    mockLoadData.mockClear();
  });

  it('renders project table with correct headers and rows', () => {
    renderProjectTable();

    // Header columns (excluding first empty one) for properties
    expect(screen.getAllByRole('columnheader')).toHaveLength(1);

    // Rows: 1 header row + 2 data rows
    expect(screen.getAllByRole('row')).toHaveLength(3);
  });

  it('calls loadData when Add Property button is clicked', () => {
    renderProjectTable();

    fireEvent.click(screen.getByTestId('ADD_PROPERTY_BTN'));

    expect(mockLoadData).toHaveBeenCalled();
  });

  it('scrolls the table container to the right on entities update', () => {
    const { container, rerender } = renderProjectTable();

    const tableContainer = container.querySelector('section')!;

    defineTableContainerProp('scrollWidth', 500);
    defineTableContainerProp('scrollLeft', 0);

    // Trigger re-render for simulating entity change
    rerender(
      <BrowserRouter>
        <ProjectTable />
      </BrowserRouter>
    );

    expect(tableContainer.scrollLeft).toBe(500);

    function defineTableContainerProp(propName: string, value: number) {
      Object.defineProperty(tableContainer, propName, {
        value,
        writable: true,
      });
    }
  });
});
