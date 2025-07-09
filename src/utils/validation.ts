/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

// Represents the state of a form action, including errors and success messages
export type FormActionState = {
  error?: string;
  success?: string;
  fields?: Record<string, any>;
  [key: string]: any;
};

// A generic type for a function that handles validated form data
type FormHandler<S extends z.ZodType<any, any>, R> = (
  data: z.infer<S>,
  formData: FormData
) => Promise<R>;

// Utility to wrap a form handler with zod validation
export function withValidation<S extends z.ZodType<any, any>, R>(
  schema: S,
  handler: FormHandler<S, R>
) {
  return async (prevState: FormActionState, formData: FormData): Promise<R> => {
    const parsed = schema.safeParse(Object.fromEntries(formData));
    if (!parsed.success) {
      return {
        error: parsed.error.errors[0].message,
        success: undefined,
      } as R;
    }
    return handler(parsed.data, formData);
  };
}
