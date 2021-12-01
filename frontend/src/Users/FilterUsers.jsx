import React, { useCallback } from "react";

const filterBySkill = async () => {
  await fetch("http://127.0.0.1:5000/users?skill=1", {
    method: "GET",
  });
}


export default function FilterUsers({ refetch }) {
  const onClick = useCallback(() => {
    filterBySkill();
  }, [refetch]);
  return <button onClick={onClick}>Filter Users</button>;
}