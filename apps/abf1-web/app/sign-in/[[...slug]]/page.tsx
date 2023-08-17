import { SignIn as CSignIn } from '@clerk/nextjs';
import { Button } from "../../../components/button";

export default function SignIn() {
  return (
    <main className='h-screen flex place-content-center place-items-center'>
      <CSignIn />
    </main>
  );
}
