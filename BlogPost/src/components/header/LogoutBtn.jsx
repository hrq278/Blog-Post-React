import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";  // ✅ Correct Redux import

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            await authService.logout();  // ✅ Wait for logout to complete
            dispatch(logout());  // ✅ Update Redux state after successful logout
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <button
            className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
