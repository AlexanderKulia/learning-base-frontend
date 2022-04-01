import { useQuery } from "react-query";
import { useAuth } from "../../contexts/AuthContext";
import { AuthApi } from "../../services/api";
import { Spinner } from "../utils/Spinner";
import { SystemMessage } from "../utils/SystemMessage";

export const SendVerification = (): JSX.Element => {
  const { currentUser } = useAuth();
  const query = useQuery("sendVerification", () => AuthApi.sendVerification(), {
    enabled: !!currentUser && !currentUser.emailVerified,
  });

  if (currentUser && currentUser.emailVerified)
    return <SystemMessage content={"Your account is already verified"} />;
  if (query.isLoading) return <Spinner />;
  if (!query.isSuccess)
    return <SystemMessage content={"Could not send verification email"} />;

  return (
    <SystemMessage
      content={"New verification email has been successfully sent to you"}
    />
  );
};
