"use client";

import { useContext } from "react";
import Link from "next/link";
// Context
import { AuthContext } from "@/context/authContext";
// Style
import "@/styles/addButton.scss";

export function AddButton() {
  const { authState } = useContext(AuthContext);

  return (
    <>
      {authState && (
        <Link className="btn btn--primary add-btn" href="/experience/add">
          +
        </Link>
      )}
    </>
  );
}
