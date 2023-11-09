import { SignInButton } from '@clerk/nextjs';
import { Button } from '@web/components/button';

export default function SignUp() {
  return (
    <main>
      <h1>Sign Up</h1>
      <h2>Coming soon..</h2>
      <SignInButton>
        <Button variant="link">Sign In</Button>
      </SignInButton>
    </main>
  );
}
