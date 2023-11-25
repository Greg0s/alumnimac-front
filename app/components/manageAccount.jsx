import React, { useContext } from "react";

import { useRouter } from "next/navigation";

import SignOut from "./signOut";

export default function ManageAccount() {
  const router = useRouter();

  return (
    <div>
      <h1>Edit account</h1>
      <SignOut />
    </div>
  );
}
