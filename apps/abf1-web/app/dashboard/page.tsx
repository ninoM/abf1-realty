import { SignOutButton, UserButton, UserProfile } from '@clerk/nextjs';
import { Button } from '../../components/button';

export default function Dashboard() {
  return (
    <div className='p-2'>
      <nav className='flex items-end justify-end'>
        <UserButton afterSignOutUrl='/' />
      </nav>
      <main>
        <h1>Admin Dashboard</h1>
      </main>
    </div>
  );
}
