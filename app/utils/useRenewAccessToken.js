import { useEffect } from "react";
import { getMe, refreshToken } from "./api";

const useRenewAccessToken = (authState, setAuthState, setCurrentUser) => {
  useEffect(() => {
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
  }, [authState, setAuthState]);
};

export default useRenewAccessToken;
