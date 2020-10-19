import React, { useState } from "react";
import PropTypes from "prop-types";
import ResourceTableRow from "./Row";
import CreateNewResourceRow from "./CreateNewResourceRow";

const Table = (props) => {
  const [resourceEditing, setResourceEditing] = useState();
  const [editedResource, setEditedResource] = useState();
  const [resourceCreating, setResourceCreating] = useState();
  const [createdResource, setCreatedResource] = useState();

  return (
    <div className="container">
      <button
        className="add"
        onClick={() => {
          setResourceCreating(true);
        }}
      >
        <img
          src="https://img.icons8.com/officel/64/000000/plus-math.png"
          alt="create new resource"
        />
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            {props.attributes.map((attr) => {
              return <th key={attr}>{attr}</th>;
            })}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.resources.length > 0 ? (
            props.resources.map((resource) => (
              <ResourceTableRow
                resource={resource}
                key={resource.id}
                resourceEditing={resourceEditing}
                editedResource={editedResource}
                setEditedResource={setEditedResource}
                setResourceEditing={setResourceEditing}
                onUpdate={props.onUpdate}
                onDelete={props.onDelete}
                getResourceLink={props.getResourceLink}
                attributes={props.attributes}
                extraActions={props.extraActions}
              />
            ))
          ) : (
            <tr>
              <td>No Resources</td>
            </tr>
          )}
          {resourceCreating ? (
            <CreateNewResourceRow
              setCreatedResource={setCreatedResource}
              setResourceCreating={setResourceCreating}
              createdResource={createdResource}
              onCreate={props.onCreate}
              attributes={props.attributes}
            />
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

Table.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  getResourceLink: PropTypes.func,
  extraActions: PropTypes.arrayOf(PropTypes.string),
  attributes: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
};
