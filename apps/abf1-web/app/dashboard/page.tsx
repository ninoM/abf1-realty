import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@web/components/alert-dialog';
import { Button } from '@web/components/button';
import Icon from '@web/components/icon';
import ListingCard from '@web/components/listing-card';
import { Separator } from '@web/components/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@web/components/sheet';
import { db } from '@web/lib/db';
import { listing } from '@web/lib/db/schema';

export default async function Dashboard() {
  const listings = await db.select().from(listing).all();

  return (
    <>
      <section className="flex items-center gap-x-2">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Admin Dashboard
        </h1>
        <Button className="hidden md:inline-flex" size="sm">
          <span>Add listing</span>
          <Icon name="plus" size={16} />
        </Button>
        <Link href="/listings/create">
          <Button
            className="md:hidden fixed right-4 bottom-4 h-12 w-12 rounded-full"
            size="icon"
          >
            <Icon name="plus" size={28} />
          </Button>
        </Link>
      </section>
      <section
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px,1fr))',
        }}
        className="p-4 grid gap-5"
      >
        {listings.map((listing, i) => (
          <div key={listing.id} className="flex flex-col gap-y-2">
            <ListingCard listing={listing} />
            <div className="flex items-center justify-end gap-x-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="hidden md:inline-flex"
                    variant="destructive"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete listing?</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="md:hidden" variant="destructive">
                    Delete
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom">
                  <SheetHeader>
                    <SheetTitle>Delete listing?</SheetTitle>
                  </SheetHeader>
                  <SheetFooter className="flex flex-col gap-y-3">
                    <SheetClose asChild>
                      <Button variant="destructive">Continue</Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="secondary">Cancel</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <Button variant="secondary">Edit</Button>
            </div>
            {i < listings.length - 1 ? (
              <Separator className="md:hidden" />
            ) : null}
          </div>
        ))}
        <div className="mt-16 md:hidden" />
      </section>
    </>
  );
}
