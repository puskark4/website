import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Vuew } from "../api/vuew/Vuew";
import { VuewCreateInput } from "../api/vuew/VuewCreateInput";

const INITIAL_VALUES = {} as VuewCreateInput;

export const CreateVuew = (): React.ReactElement => {
  useBreadcrumbs("/vuews/new", "Create Vuew");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Vuew,
    AxiosError,
    VuewCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/vuews", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/vuews"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: VuewCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Vuew"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        ></Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
