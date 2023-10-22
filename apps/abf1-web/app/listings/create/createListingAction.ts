'use server';
import { revalidatePath } from 'next/cache';
import { db } from '../../../lib/db';
import { createInsertSchema } from 'drizzle-zod';
import { listing } from '../../../lib/db/schema';
import * as z from 'zod';
import { LibsqlError } from '@libsql/client';
import { v4 as uuid } from 'uuid';

export type CreateListingStatus = 'success' | 'error';

export default async function createListingAction(
  listingData: Omit<typeof listing.$inferInsert, 'id'>
) {
  const listingDataWithId = { ...listingData, id: uuid() };
  try {
    listingFormSchema.parse(listingDataWithId);
    await db.insert(listing).values(listingDataWithId);

    revalidatePath('/dashboard');
    revalidatePath('/');
    return {
      status: 'success',
      message: 'Listing created successfully',
    };
  } catch (error) {
    console.log('>>> ', error);
    if (error instanceof LibsqlError) {
      console.log('>>> error.code', error.code);
      console.log('>>> error.name', error.name);
      return {
        status: 'error',
        message: error.message,
      };
    }

    return {
      status: 'error',
      message: 'Some unknown error happened!',
    };
  }
}

const listingFormSchema = createInsertSchema(listing, {
  price: z.coerce.number().positive(),
  bedroomCount: z
    .string()
    .transform((val) => Number(val) || undefined)
    .optional(),
  bathroomCount: z
    .string()
    .transform((val) => Number(val) || undefined)
    .optional(),
  squareFootage: z
    .string()
    .transform((val) => Number(val) || undefined)
    .optional(),
  lotSize: z
    .string()
    .transform((val) => Number(val) || undefined)
    .optional(),
});
