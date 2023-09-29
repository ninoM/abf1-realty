'use client';

import { createInsertSchema } from 'drizzle-zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../components/form';
import { listing } from '../../lib/db/schema';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/input';

const listingFormSchema = createInsertSchema(listing);

export default function ListingForm() {
  const form = useForm<z.infer<typeof listingFormSchema>>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      price: 0,
      address: '',
      saleType: '',
      propertyType: '',
      city: '',
      description: '',
      bedroomCount: 0,
      bathroomCount: 0,
      squareFootage: '',
      lotSize: '',
    },
  });
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input placeholder="1000000" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </Form>
  );

}
