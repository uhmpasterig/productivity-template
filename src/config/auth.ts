export const authConfig = {
  loginUrl: "/login",
  signupUrl: "/signup",
  callbackUrl: "/auth/callback",
  redirectAfterSignout: "/",
  protectedRoutes: ["/dashboard", "/settings"],
};
