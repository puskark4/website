import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Vuew } from "../api/vuew/Vuew";

type Props = { id: string };

export const VuewTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Vuew,
    AxiosError,
    [string, string]
  >(["get-/api/vuews", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/vuews"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/vuews"}/${id}`} className="entity-id">
      {data?.id && data?.id.length ? data.id : data?.id}
    </Link>
  );
};
