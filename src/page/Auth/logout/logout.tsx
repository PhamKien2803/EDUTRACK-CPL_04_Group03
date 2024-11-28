import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../../../redux/action/userAction";
import Swal from "sweetalert2";
import { logout } from "../../../Config/firebase";

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state: { account: { account: { Role: number } } }) => state.account.account);


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
      if (!result.isConfirmed) {
        if (account.Role === 0) {
          navigate("/dashboardPage");
        } else if (account.Role === 1) {
          navigate("/lecturer/homePage");
        } else if (account.Role === 2) {
          navigate("/staff/dashboardStaff");
        }
      }
    });
  };

  React.useEffect(() => {
    handleLogout();
  }, []);

  return null;
};

export default LogoutButton;
