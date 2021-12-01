import React, { useCallback } from "react";

const handleChange = async () => {
  await fetch("http://127.0.0.1:5000/users", {
    method: "PUT",
  });
}
//TODO finish PUT method

function onChange(e) {
console.log('Checkbox checked:', (e.target.checked));
}

export default function FilterUsers({ refetch }) {
  const onClick = useCallback(() => {
    handleChange();
  }, [refetch]);
  return <label><input type="checkbox" id="skillCheckbox" onChange={onChange}/> Javascript</label>;
}

//TODO connecting user id to checkbox