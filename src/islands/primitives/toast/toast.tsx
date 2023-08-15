"use client";

import { forwardRef } from "react";

import type { VariantProps } from "tailwind-variants";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { AlertTriangle, Check, X } from "lucide-react";
import { cnBase, tv } from "tailwind-variants";

const ToastProvider = ToastPrimitives.Provider;

const ToastStyles = {
  Root: tv({
    base: `
      group pointer-events-auto relative flex w-full items-center space-x-4 overflow-hidden rounded-md border border-border bg-background p-6 pr-8 shadow-lg transition-all
      before:absolute before:left-0 before:h-full before:w-2 before:content-['']
      data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
      data-[state=open]:animate-in data-[state=closed]:animate-out
      data-[swipe=end]:animate-out
      data-[state=closed]:fade-out-80 
      data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full
    `,
    variants: {
      status: {
        success: "before:block before:bg-green-400",
        error: "before:block before:bg-destructive",
        warning: "before:block before:bg-amber-400",
        default: "before:hidden"
      }
    },
    defaultVariants: {
      status: "default"
    }
  }),
  Status: tv({
    base: "rounded-full p-1 text-white",
    variants: {
      status: {
        success: "bg-green-400",
        error: "bg-destructive",
        warning: "bg-amber-400"
      }
    }
  }),
  Viewport: tv({
    base: "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
  }),
  Action: tv({
    base: "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive"
  }),
  Close: tv({
    base: "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600"
  })
};

const ToastViewport = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={ToastStyles.Viewport({ className })}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const Toast = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<(typeof ToastStyles)["Root"]>
>(({ className, status = "default", children, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={ToastStyles.Root({ className, status })}
      {...props}
    >
      {status !== "default" && (
        <div className={ToastStyles.Status({ status })}>
          {status === "success" && <Check />}
          {status === "error" && <X />}
          {status === "warning" && <AlertTriangle />}
        </div>
      )}
      {children}
    </ToastPrimitives.Root>
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={ToastStyles.Action({ className })}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={ToastStyles.Close({ className })}
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cnBase("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cnBase("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction
};
