'use server';
import { revalidatePath } from 'next/cache';
import { db } from '@web/lib/db';
import { createInsertSchema } from 'drizzle-zod';
import { listing } from '@web/lib/db/schema';
import * as z from 'zod';
import { LibsqlError } from '@libsql/client';
import { v4 as uuid } from 'uuid';

type CreateListingAction =
  | {
      status: 'success' | 'error';
      message: string;
    }
  | {
      status: 'form-error';
      message: string;
      formErrors: z.inferFlattenedErrors<
        typeof listingFormSchema
      >['fieldErrors'];
    };

export default async function createListingAction(
  listingData: Omit<typeof listing.$inferInsert, 'id'>
): Promise<CreateListingAction> {
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
    if (error instanceof LibsqlError) {
      return {
        status: 'error',
        message: error.message,
      };
    }

    if (error instanceof z.ZodError) {
      return {
        status: 'form-error',
        message: 'Please check the form for errors.',
        formErrors: error.flatten().fieldErrors as z.inferFlattenedErrors<
          typeof listingFormSchema
        >['fieldErrors'],
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
