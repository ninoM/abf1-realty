'use client';

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '../../components/form';
import { Textarea, TextareaProps } from '../../components/textarea';
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
          <FormDescription>
            {formDescription}
            {form.getFieldState(name).error?.message}
          </FormDescription>
        </FormItem>
      )}
    />
  );
}
