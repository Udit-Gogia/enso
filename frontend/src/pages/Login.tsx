import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { EyeIcon, EyeOffIcon, Loader2, MoveRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import EnsoTitle from "@/components/EnsoTitle";
import { InputGroup } from "@/components/ui/input-group";
import FieldTitle from "@/components/ui/FieldTitle";
import { AuthForm } from "@/components/ui/AuthForm";

const formSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },

    shouldFocusError: true,
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <AuthForm
      CardHeaderChildren={
        <>
          <EnsoTitle className="mx-auto text-2xl [&_img]:h-11 [&_img]:w-11" />
          <div className="flex flex-col gap-2">
            <CardTitle className="text-2xl font-bold tracking-tight leading-9">
              Welcome back.
            </CardTitle>
            <CardDescription className="text-sm text-ink-muted">
              Sign in to continue on Enso.
            </CardDescription>
          </div>
        </>
      }
    >
      <CardContent className="px-8">
        <form
          id="login-form"
          onSubmit={form.handleSubmit(onSubmit)}
          aria-disabled={isSubmitting}
        >
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldTitle label="Email" htmlFor="email" isRequired />

                  <Input
                    {...field}
                    id="email"
                    type="email"
                    required
                    aria-required
                    aria-invalid={fieldState.invalid}
                    placeholder="Email address"
                    autoComplete="email"
                    className="rounded-sm h-11 placeholder:text-muted-foreground/60"
                    disabled={isSubmitting}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex flex-col gap-2"
                >
                  <FieldTitle label="Password" htmlFor="password" isRequired />
                  <InputGroup className="border-none">
                    <Input
                      {...field}
                      id="password"
                      aria-invalid={fieldState.invalid}
                      disabled={isSubmitting}
                      aria-required
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      type={showPassword ? "text" : "password"}
                      className="rounded-sm h-11 placeholder:text-muted-foreground/60 "
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-all duration-300 ease-in-out disabled:cursor-s-resize"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeIcon className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError className="mt-2" errors={[fieldState.error]} />
                  )}

                  <div className="w-full flex justify-end mt-2">
                    <p className="text-xs text-ink-muted underline underline-offset-4 hover:text-primary hover:cursor-pointer transition-all duration-300 ease-in-out">
                      Forgot password?
                    </p>
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      {/* <div className="my- h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" /> */}
      <CardFooter className="my-4 flex flex-col gap-2 px-8">
        <Field orientation="horizontal">
          <Button
            disabled={isSubmitting}
            className="w-full text-white active:scale-[0.99]"
            type="submit"
            form="login-form"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
            {isSubmitting && <Loader2 className="animate-spin mr-2" />}
          </Button>
        </Field>
        <p className="text-center text-sm text-ink-muted">
          Don't have an account?{" "}
          <span className="group inline-flex items-center text-primary font-medium hover:underline underline-offset-2 hover:cursor-pointer transition-all duration-200 ease-in-out">
            Join Enso{" "}
            <MoveRight
              className="group-hover:translate-x-1 transition-all duration-200 ease-in-out"
              height={10}
            />
          </span>
        </p>
      </CardFooter>
    </AuthForm>
  );
}
