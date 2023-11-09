import { SignIn as CSignIn } from '@clerk/nextjs';

export default function SignIn() {
  return (
    <main className='h-screen flex place-content-center place-items-center'>
      <CSignIn />
    </main>
  );
}
