# Error Handling - Quick Reference

## Setup
```tsx
// next.config.ts
const nextConfig: NextConfig = {
  experimental: { authInterrupts: true },
};
```

## Files Created
- `src/app/error.tsx` - Route error boundary
- `src/app/global-error.tsx` - Global error boundary  
- `src/app/not-found.tsx` - 404 page
- `src/app/forbidden.tsx` - 403 page (authInterrupts)
- `src/app/unauthorized.tsx` - 401 page (authInterrupts)
- `src/components/ui/error-boundary.tsx` - Reusable error boundary

## Quick Usage

### Authentication Errors
```tsx
import { forbidden, unauthorized } from "next/navigation";

if (!user) unauthorized();
if (!user.isAdmin) forbidden();
```

### Error Types
```tsx
import { AuthError, ForbiddenError, ValidationError } from "@/utils/error";

throw new AuthError("Please sign in", "AUTH_001");
throw new ForbiddenError("Access denied", "PERM_001");
throw new ValidationError("Invalid email", "email", "VALID_001");
```

### Error Boundary
```tsx
<ErrorBoundary context="user-profile">
  <UserProfile />
</ErrorBoundary>
```

### API Errors
```tsx
import { createUnauthorizedResponse } from "@/utils/error";

if (error instanceof AuthError) {
  return createUnauthorizedResponse();
}
```

### Async Error Handling
```tsx
import { withErrorHandler } from "@/utils/error";

const result = await withErrorHandler(
  () => fetchData(id),
  "fetchData"
);
```

## Migration
**Before:** `redirect("/unauthorized")`  
**After:** `unauthorized()`

## Key Benefits
- ✅ Next.js 15+ authInterrupts
- ✅ Automatic error recovery
- ✅ Type-safe error handling
- ✅ Development error details
- ✅ Production-safe messages 