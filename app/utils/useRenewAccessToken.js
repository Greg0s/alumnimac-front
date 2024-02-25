import { getMe, refreshToken } from "@/utils/";

export const useRenewAccessToken = (setAuthState, setCurrentUser) => {
  const renewAccessToken = async () => {
    try {
      const response = await refreshToken();

      setAuthState(response.jwt);

      if (setCurrentUser) setCurrentUser(await getMe());
    } catch (error) {
      console.error("Error during token renewal: ", error);
    }
  };

  renewAccessToken();
};
