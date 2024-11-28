import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../../../redux/action/userAction";
import Swal from "sweetalert2";
import { logout } from "../../../Config/firebase";

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(doLogout());
        logout()
        navigate("/login");
      }
    });
  };

  React.useEffect(() => {
    handleLogout();
  }, []);

  return null;
};

export default LogoutButton;
