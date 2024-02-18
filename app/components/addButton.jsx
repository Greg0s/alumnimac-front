"use client";

import { useContext } from "react";
import { AuthContext } from "../utils/authContext";

import "../styles/addButton.scss";

import Link from "next/link";

const AddButton = () => {
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
};

export default AddButton;
