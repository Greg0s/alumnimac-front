import React, { useContext } from "react";
// Context
import { AuthContext } from "@/context/";
// Style
import "@/styles/accountInfos.scss";
// Components
import { SignOut } from "./";

export function AccountInfos() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <div className="account-infos">
        {currentUser && (
          <>
            <h1>Mon compte</h1>
            <div>
              <h4>Nom</h4>
              <p>
                {currentUser.first_name} {currentUser.last_name}
              </p>
            </div>
            <div>
              <h4>Promo</h4>
              <p>IMAC {currentUser.graduation_year}</p>
            </div>
            <div>
              <h4>Email</h4>
              <p>{currentUser.email}</p>
            </div>
          </>
        )}
        <SignOut />
      </div>
    </>
  );
}
