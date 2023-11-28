import { LibsqlError } from '@libsql/client';
import { db } from '@web/lib/db';
import { listing } from '@web/lib/db/schema';
import { createInsertSchema } from 'drizzle-zod';
import { revalidatePath } from 'next/cache';
import { v4 as uuid } from 'uuid';
import * as z from 'zod';
import ListingForm from '../listing-form';

export default function CreateListing() {
  const generatedListingId = uuid();

  const createListing = async (
    listingData: Omit<typeof listing.$inferInsert, 'id'>,
  ): Promise<CreateListingResponse> => {
    'use server';

    const listingDataWithId = { ...listingData, id: generatedListingId };

    try {
      listingFormSchema.parse(listingDataWithId);
      await db.insert(listing).values(listingDataWithId);

      revalidatePath('/dashboard');
      revalidatePath('/');
      return {
        status: 'success',
        message: 'Listing created successfully',
        listingId: listingDataWithId.id,
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
  };

  return (
    <div className="p-4">
      <ListingForm
        defaultValues={{ id: generatedListingId }}
        onSubmit={createListing}
      />
    </div>
  );
}

export type CreateListingResponse =
  | {
      status: 'success';
      message: string;
      listingId: string;
    }
  | {
      status: 'error';
      message: string;
    }
  | {
      status: 'form-error';
      message: string;
      formErrors: z.inferFlattenedErrors<
        typeof listingFormSchema
      >['fieldErrors'];
    };

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
