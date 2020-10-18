import React from "react";
import { Link } from "react-router-dom";

const RowForm = ({
  resource,
  resourceEditing,
  editedResource,
  onChange,
  getResourceLink,
  attributes,
  onSubmit,
}) => {
  return attributes.map((attr) => {
    return (
      <td key={attr}>
        {resourceEditing === resource.id ? (
          <React.Fragment>
            <input
              name={attr}
              value={editedResource ? editedResource[attr] : ""}
              onChange={(event) => {
                const newValue = event.target.value;
                onChange({ ...resource, [attr]: newValue });
              }}
              autoFocus={attributes.indexOf(attr) === 0}
            />
            {attributes.indexOf(attr) === attributes.length - 1 ? (
              <button
                onClick={() => {
                  onSubmit(editedResource);
                }}
              >
                <img
                  src="https://img.icons8.com/fluent/48/000000/checkmark.png"
                  alt="save resource"
                />
              </button>
            ) : null}
          </React.Fragment>
        ) : getResourceLink ? (
          <Link to={getResourceLink(resource)} tasks={resource.tasks}>
            {resource[attr]}
          </Link>
        ) : (
          resource[attr]
        )}
      </td>
    );
  });
};

export default RowForm;
