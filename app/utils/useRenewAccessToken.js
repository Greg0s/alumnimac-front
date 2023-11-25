import { useEffect } from "react";
import { refreshToken } from "./api";

const useRenewAccessToken = (authState, setAuthState) => {
  useEffect(() => {
    const renewAccessToken = async () => {
      try {
        const response = await refreshToken();

        setAuthState(response.jwt);
      } catch (error) {
        console.error(
          "Erreur lors du renouvellement du jeton d'accès :",
          error
        );
      }
    };

    renewAccessToken();
  }, [authState, setAuthState]);
};

export default useRenewAccessToken;
