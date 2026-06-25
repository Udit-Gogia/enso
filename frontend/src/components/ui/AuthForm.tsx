import * as React from "react";
import { Card, CardHeader } from "@/components/ui/card";

import { MagneticDots } from "@/components/MagneticDots";

type AuthFormProps = {
  CardHeaderChildren: React.JSX.Element;
  children: React.ReactNode;
};

export function AuthForm({ children, CardHeaderChildren }: AuthFormProps) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <MagneticDots
        palette="Google"
        intensity={1}
        className="absolute inset-0 h-full w-full"
      />
      <Card className="w-full sm:max-w-lg bg-white  absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-fit shadow-xl rounded-2xl transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="flex flex-col gap-4 pt-4">
          {CardHeaderChildren}
        </CardHeader>
        {children}
      </Card>
    </div>
  );
}
