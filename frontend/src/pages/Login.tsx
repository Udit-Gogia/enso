"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { MagneticDots } from "@/components/MagneticDots";
import EnsoTitle from "@/components/EnsoTitle";

const FieldTitle = ({ label, htmlFor }: { label: string; htmlFor: string }) => {
  return (
    <FieldLabel className="text-sm font-medium " htmlFor={htmlFor}>
      {label}
    </FieldLabel>
  );
};

const formSchema = z.object({
  username: z.email("Please enter a valid email address.").trim(),

  password: z.string().min(1, "Password is required."),
});

export function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
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

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <MagneticDots
        palette="Google"
        intensity={1}
        className="absolute inset-0 h-full w-full"
      />
      <Card className="w-full sm:max-w-md bg-white  absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-fit shadow-xl">
        <CardHeader className="flex flex-col gap-4">
          <EnsoTitle className="mx-auto text-3xl" />
          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <CardTitle className="text-xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldTitle label="Username" htmlFor="username" />

                    <Input
                      {...field}
                      id="username"
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                      autoComplete="off"
                      className="rounded-sm"
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
                  <Field data-invalid={fieldState.invalid}>
                    <FieldTitle label="Password" htmlFor="password" />

                    <Input
                      {...field}
                      id="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                      autoComplete="off"
                      type="password"
                      className="rounded-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <div className="my- h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
        <CardFooter className="my-8">
          <Field orientation="horizontal">
            <Button className="w-full" type="submit" form="form-rhf-demo">
              Login
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
