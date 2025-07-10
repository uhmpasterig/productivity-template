# Error Handling Guide

Comprehensive error handling system using Next.js App Router best practices.

## Overview

- **Error boundaries** for catching React errors
- **AuthInterrupts** for authentication errors (`forbidden()`, `unauthorized()`)
- **Structured error types** with TypeScript
- **Automatic error recovery** with retry functionality

## Setup

authInterrupts in `next.config.ts` must be enabled:
```tsx
const nextConfig: NextConfig = {
  experimental: { authInterrupts: true },
};
```

## Error Boundaries

### Automatic Error Boundaries
- `src/app/error.tsx` - Catches route errors, shows retry button
- `src/app/global-error.tsx` - Catches critical errors in root layout
- `src/app/not-found.tsx` - 404 page

### Manual Error Boundaries
```tsx
import { ErrorBoundary } from "@/components/ui/error-boundary";

<ErrorBoundary context="user-profile">
  <UserProfile />
</ErrorBoundary>
```

## Authentication Errors

### Special Files
- `src/app/forbidden.tsx` - 403 errors (triggered by `forbidden()`)
- `src/app/unauthorized.tsx` - 401 errors (triggered by `unauthorized()`)

### Usage
```tsx
import { forbidden, unauthorized } from "next/navigation";

export default async function ProtectedPage() {
  const user = await getUser();
  
  if (!user) unauthorized();
  if (!user.isAdmin) forbidden();
  
  return <AdminPanel />;
}
```

## Error Types

```tsx
import { AppError, AuthError, ForbiddenError, ValidationError } from "@/utils/error";

// Basic app error
throw new AppError("Something failed", "APP_001");

// Authentication error
throw new AuthError("Please sign in", "AUTH_001");

// Permission error
throw new ForbiddenError("Access denied", "PERM_001");

// Validation error
throw new ValidationError("Invalid email", "email", "VALID_001");
```

## API Error Responses

```tsx
import { createUnauthorizedResponse, createForbiddenResponse } from "@/utils/error";

export async function GET() {
  try {
    const data = await fetchData();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof AuthError) {
      return createUnauthorizedResponse();
    }
    return createErrorResponse(error);
  }
}
```

## Error Handling Patterns

### Async Operations
```tsx
import { withErrorHandler } from "@/utils/error";

const result = await withErrorHandler(
  () => fetchUserData(userId),
  "fetchUserData"
);
```

### Client Components
```tsx
import { useErrorHandler } from "@/components/ui/error-boundary";

function MyComponent() {
  const { handleError } = useErrorHandler();
  
  const handleSubmit = async () => {
    try {
      await submitData();
    } catch (error) {
      handleError(error as Error);
    }
  };
}
```

## Best Practices

1. **Use Next.js functions** - `unauthorized()`, `forbidden()` instead of redirects
2. **Specific error types** - `AuthError` instead of generic `Error`
3. **Add context** - `logError(error, "context")` for debugging
4. **Handle early** - Catch errors close to their source
5. **Safe messages** - Hide internal details in production

## Development vs Production

**Development:** Shows detailed error messages and stack traces
**Production:** Shows user-friendly messages, logs details for monitoring

## Migration

### Before
```tsx
redirect("/unauthorized");
redirect("/forbidden");
```

### After
```tsx
import { forbidden, unauthorized } from "next/navigation";

unauthorized(); // Triggers unauthorized.tsx
forbidden();    // Triggers forbidden.tsx
```

That's it! The system handles the rest automatically. 