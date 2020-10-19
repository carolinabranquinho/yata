import React from "react";
import RowForm from "./RowForm";

const ResourceTableRow = ({
  resource,
  resourceEditing,
  editedResource,
  setEditedResource,
  setResourceEditing,
  onUpdate,
  onDelete,
  getResourceLink,
  attributes,
  extraActions,
}) => {
  return (
    <tr key={resource.id}>
      <td>{resource.id}</td>
      <RowForm
        resource={resource}
        resourceEditing={resourceEditing}
        editedResource={editedResource}
        onChange={setEditedResource}
        getResourceLink={getResourceLink}
        attributes={attributes}
        onSubmit={(editedResource) => {
          setResourceEditing();
          setEditedResource();
          onUpdate(editedResource);
        }}
      />
      <td className="actions">
        <button
          className="update"
          onClick={() => {
            setResourceEditing(resource.id);
            setEditedResource(resource);
          }}
        >
          <img
            src="https://img.icons8.com/cotton/64/000000/edit--v2.png"
            alt="edit resource"
          />
        </button>
        <button onClick={() => onDelete(resource.id)} className="delete">
          <img
            src="https://img.icons8.com/cute-clipart/64/000000/delete-forever.png"
            alt="delete resource"
          />
        </button>
        {(extraActions || []).map((action) => {
          return (
            <button
              onClick={() => action.onClick(resource)}
              key={action.description}
            >
              <img src={action.icon} alt={action.description} />
            </button>
          );
        })}
      </td>
    </tr>
  );
};

export default ResourceTableRow;
