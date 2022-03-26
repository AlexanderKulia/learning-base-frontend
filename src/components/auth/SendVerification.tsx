import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { AuthApi } from "../../services/api";

export const SendVerification = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const sendVerification = async (): Promise<void> => {
      try {
        if (!currentUser || currentUser.emailVerified) return;
        await AuthApi.sendVerification();
        setIsLoading(false);
        setSuccess(true);
      } catch (error) {
        setIsLoading(false);
      }
    };

    sendVerification();
  }, [currentUser]);

  if (currentUser && currentUser.emailVerified)
    return <p>Your account is already verified</p>;
  if (isLoading) return <p>Loading</p>;
  if (!success) return <p>Could not send verification email</p>;

  return <div>New verification email has been successfully sent to you</div>;
};
