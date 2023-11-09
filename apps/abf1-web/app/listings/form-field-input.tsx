'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@web/components/form';
import { Input, InputProps } from '@web/components/input';
import { ListingFormKeys, useListingFormContext } from './listing-form';

type FormFieldInputProps = InputProps & {
  name: ListingFormKeys;
  label: React.ReactNode;
  formDescription?: React.ReactNode;
};

export default function FormFieldInput({
  name,
  label,
  formDescription,
  ...props
}: FormFieldInputProps) {
  const form = useListingFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className="w-full" // for two column layouts
        >
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} value={field.value ?? ''} {...props} />
          </FormControl>
          <FormDescription>{formDescription}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
