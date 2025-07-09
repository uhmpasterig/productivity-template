# Authentication System Guide

## Overview

This boilerplate uses Supabase for passwordless authentication with magic links and OAuth providers. No password storage or management required.

## Authentication Flow

### Magic Link Flow
1. User enters email on `/auth/login`
2. Supabase sends magic link to email
3. User clicks link → redirects to `/auth/callback`
4. Session created, user redirected to dashboard

### OAuth Flow
1. User clicks OAuth provider button
2. Redirects to provider (Google, GitHub, etc.)
3. User authorizes → returns to `/auth/callback`
4. Session created, user redirected to dashboard

## Required Routes

### Auth Pages
- `/auth/login` - Email input + OAuth buttons
- `/auth/signup` - Same as login (passwordless)
- `/auth/callback` - Handles all auth returns
- `/auth/confirm` - Email confirmation landing
- `/auth/error` - Error handling page

### API Routes
- `/api/auth/callback` - Supabase callback handler

## Supabase Configuration

### 1. Project Setup
```bash
# Create new Supabase project
# Note your project URL and anon key
```

### 2. Authentication Settings
- **Site URL:** `http://localhost:3000`
- **Redirect URLs:** 
  - `http://localhost:3000/auth/callback`
  - `https://yourdomain.com/auth/callback`

### 3. Email Settings
- Enable email auth
- Disable email confirmations (optional for faster UX)
- Configure email templates

### 4. OAuth Providers
Enable desired providers:
- Google OAuth
- GitHub OAuth
- Discord OAuth
- etc.

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## File Structure

```
src/
├── lib/
│   ├── supabase/
│   │   ├── client.ts     # Client-side Supabase
│   │   ├── server.ts     # Server-side Supabase
│   │   └── middleware.ts # Auth middleware
├── app/
│   ├── auth/
│   │   ├── login/
│   │   ├── callback/
│   │   ├── confirm/
│   │   └── error/
│   └── api/
│       └── auth/
│           └── callback/
├── components/
│   └── auth/
│       ├── LoginForm.tsx
│       ├── AuthButton.tsx
│       └── UserMenu.tsx
└── middleware.ts
```

## Implementation Steps

### 1. Install Dependencies
```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 2. Create Supabase Clients
- Client-side: For components and client actions
- Server-side: For API routes and server components
- SSR support: For proper hydration

### 3. Set Up Middleware
- Protect dashboard routes
- Handle session refresh
- Redirect unauthenticated users

### 4. Build Auth Components
- Login form with email input
- OAuth provider buttons
- User menu with logout
- Loading states

### 5. Create Auth Pages
- Login/signup page
- Callback handler
- Error handling
- Confirmation page

## Session Management

### Client-Side
```typescript
// Get current user
const { data: { user } } = await supabase.auth.getUser()

// Sign out
await supabase.auth.signOut()
```

### Server-Side
```typescript
// Get user in server component
const { data: { user } } = await supabase.auth.getUser()

// Protect API routes
if (!user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

## Security Features

- **Automatic token refresh** - Supabase handles JWT refresh
- **Route protection** - Middleware blocks unauthorized access
- **CSRF protection** - Built into Supabase auth
- **Rate limiting** - Supabase provides built-in limits

## Testing Auth Flow

1. Start development server
2. Navigate to `/auth/login`
3. Enter email → check inbox for magic link
4. Click magic link → should redirect to dashboard
5. Test OAuth providers
6. Verify logout functionality

## Customization Options

### Email Templates
- Customize magic link emails in Supabase dashboard
- Add your branding and styling

### OAuth Providers
- Add/remove providers in Supabase settings
- Configure provider-specific settings

### Redirect Behavior
- Customize post-login redirects
- Handle different user roles/permissions

## Common Issues

### Magic Links Not Working
- Check spam folder
- Verify redirect URLs in Supabase
- Ensure site URL is correct

### OAuth Errors
- Verify provider credentials
- Check redirect URL configuration
- Ensure providers are enabled

### Session Issues
- Clear browser storage
- Check environment variables
- Verify Supabase client setup

## Production Deployment

1. Update Supabase redirect URLs
2. Configure production environment variables
3. Set up custom email domain (optional)
4. Configure rate limiting
5. Monitor auth metrics in Supabase dashboard