import { useParams } from "react-router-dom";

export const Params = () => {
  const { id } = useParams<{ id: string }>();

  return <>Id:{id}</>;
};
