import React from "react";
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
