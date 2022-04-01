import { useQuery } from "react-query";
import { useQueryParams } from "../../hooks/useQueryParams";
import { AuthApi } from "../../services/api";
import { Spinner } from "../utils/Spinner";
import { SystemMessage } from "../utils/SystemMessage";

export const VerifyEmail = (): JSX.Element => {
  const token = useQueryParams("token");
  const userId = useQueryParams("id");
  const query = useQuery(
    "verifyEmail",
    () => AuthApi.verifyEmail(parseInt(userId), token),
    {
      enabled: !!token && !!userId,
    },
  );

  if (query.isLoading) return <Spinner />;
  if (!query.isSuccess)
    return <SystemMessage content={"Email could not be verified"} />;

  return (
    <SystemMessage content={"Your email has been verified successfully"} />
  );
};
