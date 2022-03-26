import { useEffect, useState } from "react";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useQuery } from "../../hooks/useQuery";
import { AuthApi } from "../../services/api";

export const VerifyEmail = (): JSX.Element => {
  const token = useQuery("token");
  const userId = useQuery("id");
  const { handleSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  useEffect(() => {
    const verifyEmail = async (): Promise<void> => {
      try {
        await AuthApi.verifyEmail(parseInt(userId), token);
        setIsLoading(false);
        setIsVerified(true);
      } catch (error) {
        setIsLoading(false);
        return;
      }
    };

    verifyEmail();
  }, [userId, token, handleSnackbar]);

  if (isLoading) return <p>Loading</p>;
  if (!isVerified) return <p>Email could not be verified</p>;

  return <p>Your email has been verified successfully</p>;
};
