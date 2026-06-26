import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import { FieldGroup } from "@/components/ui/field";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { AuthField } from "@/features/auth/components/AuthField";
import PageTransition from "@/components/common/PageTransition";

const formSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type FormValues = z.infer<typeof formSchema>;

export function Login() {
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
    shouldFocusError: true,
  });

  function onSubmit(data: FormValues) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      style: {
        "--border-radius": "calc(var(--radius) + 4px)",
      } as React.CSSProperties,
    });
  }

  return (
    <PageTransition slideUp>
      <AuthCard
        title="Welcome back."
        subtitle="Sign in to continue on Enso."
        submitLabel="Sign in"
        submittingLabel="Signing in..."
        isSubmitting={form.formState.isSubmitting}
        formId="login-form"
        forgotPassword
        onForgotPassword={() => console.log("forgot password")}
        bottomText="Don't have an account?"
        bottomLinkText="Join Enso"
        onBottomLinkClick={() => navigate("/register")}
      >
        <form
          id="login-form"
          onSubmit={form.handleSubmit(onSubmit)}
          aria-disabled={form.formState.isSubmitting}
        >
          <FieldGroup>
            <AuthField
              name="email"
              control={form.control}
              label="Email"
              placeholder="Email address"
              type="email"
              autoComplete="email"
              disabled={form.formState.isSubmitting}
            />
            <AuthField
              name="password"
              control={form.control}
              label="Password"
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={form.formState.isSubmitting}
              isPassword
              hint={
                <div className="w-full flex justify-end mt-2">
                  <p className="text-xs text-ink-muted/80 underline underline-offset-4 hover:text-primary hover:cursor-pointer transition-all duration-300 ease-in-out">
                    Forgot password?
                  </p>
                </div>
              }
            />
          </FieldGroup>
        </form>
      </AuthCard>
    </PageTransition>
  );
}
