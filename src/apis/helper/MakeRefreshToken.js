import apiAuth from "../auth";

export default function MakeRefreshToken(err, dispatch) {
  if (err.toString().includes("Token invalid!")) {
    const object = {
      refreshToken: localStorage.getItem("refreshToken")
    }
    apiAuth.refreshToken(dispatch, object);
  }
}