import AuthForm from "./AuthForm";

type AuthFormProps = {
  mode: "login" | "signup";
};

export default function AuthPage({ mode = "login" }: AuthFormProps) {
  return (
    <div className="flex flex-col gap-6">
      <AuthForm mode={mode} />
    </div>
  );
}
