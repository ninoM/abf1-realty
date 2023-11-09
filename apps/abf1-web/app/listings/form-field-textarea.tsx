'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@web/components/form';
import { Textarea, TextareaProps } from '@web/components/textarea';
import { ListingFormKeys, useListingFormContext } from './listing-form';

type FormFieldTextareaProps = TextareaProps & {
  name: ListingFormKeys;
  label: React.ReactNode;
  formDescription?: React.ReactNode;
};
export default function FormFieldTextarea({
  name,
  label,
  formDescription,
  ...props
}: FormFieldTextareaProps) {
  const form = useListingFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} value={field.value ?? ''} {...props} />
          </FormControl>
          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
