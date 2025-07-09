import PageContainer from "@/components/PageContainer";
import AuthForm from "../AuthPage";

export default function SignupPage() {
  return (
    <PageContainer>
      <div className="w-full max-w-sm">
        <AuthForm mode="signup" />
      </div>
    </PageContainer>
  );
}
