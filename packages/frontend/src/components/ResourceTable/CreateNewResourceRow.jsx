import React from "react";
import PropTypes from "prop-types";
import RowForm from "./RowForm";

export default function CreateNewResourceRow({
  setCreatedResource,
  setResourceCreating,
  createdResource,
  onCreate,
  attributes,
}) {
  return (
    <tr>
      <td></td>
      <RowForm
        resource={{}}
        editedResource={createdResource}
        onChange={setCreatedResource}
        onUpdate={onCreate}
        attributes={attributes}
        onSubmit={(createdResource) => {
          setResourceCreating();
          setCreatedResource();
          onCreate(createdResource);
        }}
      />
      <td></td>
    </tr>
  );
}

CreateNewResourceRow.propTypes = {
  setCreatedResource: PropTypes.func,
  setResourceCreating: PropTypes.func,
  createdResource: PropTypes.shape({ id: PropTypes.string }),
  onCreate: PropTypes.func,
  attributes: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
};
