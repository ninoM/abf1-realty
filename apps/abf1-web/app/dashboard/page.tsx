import { SignOutButton, UserButton, UserProfile } from '@clerk/nextjs';
import { Button } from '../../components/button';
import Icon from '../../components/icon';
import { db } from '../../lib/db';
import { listing } from '../../lib/db/schema';
import ListingCard from '../../components/listing-card';
import { Separator } from '../../components/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../components/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../components/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/table';
import React from 'react';

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
        <Button
          className="md:hidden fixed right-4 bottom-4 h-12 w-12 rounded-full"
          size="icon"
        >
          <Icon name="plus" size={28} />
        </Button>
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
                  <SheetFooter className='flex flex-col gap-y-3'>
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
            {i % 2 === 0 && i < listings.length - 1 ? <Separator className='md:hidden' /> : null}
          </div>
        ))}
      </section>
    </>
  );
}
