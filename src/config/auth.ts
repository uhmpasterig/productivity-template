export const authConfig = {
  loginUrl: "/login",
  signupUrl: "/signup",
  callbackUrl: "/api/auth/callback",
  redirectAfterSignout: "/signout",
  redirectAfterSignin: "/callback",
  onboardingUrl: "/onboarding",
  protectedRoutes: ["/dashboard", "/settings"],
};
