'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { createInsertSchema } from 'drizzle-zod';
import React from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import * as z from 'zod';
import { Button } from '../../components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../../components/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../components/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/select';
import { listing } from '../../lib/db/schema';
import { cn } from '../../lib/utils';
import FormFieldInput from './form-field-input';
import FormFieldTextarea from './form-field-textarea';

export default function ListingForm() {
  const form = useForm<z.infer<typeof listingFormSchema>>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: { id: uuid() },
  });

  const handleSubmit = (data: z.infer<typeof listingFormSchema>) => {
    console.log('adding..', data);
  };

  return (
    <ListingFormContext.Provider value={form}>
      <Form {...form}>
        <form
          className="flex flex-col gap-y-2"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex flex-row w-full gap-x-2">
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Property type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="condominium">Condo</SelectItem>
                      <SelectItem value="houseAndLot">House & Lot</SelectItem>
                      <SelectItem value="lot">Lot</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="saleType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Rent or Sale</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="rent">For Rent</SelectItem>
                      <SelectItem value="sell">For Sale</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormFieldInput
            name="price"
            label="Price"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="false"
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>City</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'justify-between',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value
                          ? listOfCities.find(
                              (city) => city.value === field.value
                            )?.label
                          : 'Select City'}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search city..."
                        className="h-9"
                      />
                      <CommandEmpty>No city found.</CommandEmpty>
                      <CommandGroup>
                        {listOfCities.map((city) => (
                          <CommandItem
                            value={city.label}
                            key={city.value}
                            onSelect={() => {
                              form.setValue('city', city.value);
                            }}
                          >
                            {city.label}
                            <CheckIcon
                              className={cn(
                                'ml-auto h-4 w-4',
                                city.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormFieldInput name="address" label="Address" />
          <div className="flex flex-row gap-x-2">
            <FormFieldInput
              name="bedroomCount"
              label="Bedroom"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="false"
              formDescription="0 means studio unit."
            />
            <FormFieldInput
              name="bathroomCount"
              label="Bathroom"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="false"
            />
          </div>
          <div className="flex flex-row gap-x-2">
            <FormFieldInput
              name="squareFootage"
              label="Floor area (sqm)"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="false"
            />
            <FormFieldInput
              name="lotSize"
              label="Lot area (sqm)"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="false"
            />
          </div>
          <FormFieldTextarea name="description" label="Description" rows={3} />
          <div className="mt-3 w-full flex justify-end">
            <Button type="submit">Add</Button>
          </div>
        </form>
        {/* <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre> */}
      </Form>
    </ListingFormContext.Provider>
  );
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

export type ListingFormKeys = keyof typeof listingFormSchema['shape'];

type ListingFormContextType = UseFormReturn<z.infer<typeof listingFormSchema>>;

const ListingFormContext = React.createContext<ListingFormContextType | null>(
  null
);

export const useListingFormContext = () => {
  const context = React.useContext(ListingFormContext);
  if (!context) {
    throw new Error(
      'useListingFormContext must be used within a ListingFormContextProvider'
    );
  }
  return context;
};

const listOfCities = [
  { label: 'Baguio', value: 'baguio' },
  { label: 'Batangas City', value: 'batangas-city' },
  { label: 'Cabanatuan', value: 'cabanatuan' },
  { label: 'Calamba', value: 'calamba' },
  { label: 'Cavite City', value: 'cavite-city' },
  { label: 'Dagupan', value: 'dagupan' },
  { label: 'Laoag', value: 'laoag' },
  { label: 'Lipa', value: 'lipa' },
  { label: 'Lucena', value: 'lucena' },
  { label: 'Mabalacat', value: 'mabalacat' },
  { label: 'Makati', value: 'makati' },
  { label: 'Malolos', value: 'malolos' },
  { label: 'Mandaluyong', value: 'mandaluyong' },
  { label: 'Manila', value: 'manila' },
  { label: 'Meycauayan', value: 'meycauayan' },
  { label: 'Naga', value: 'naga' },
  { label: 'Olongapo', value: 'olongapo' },
  { label: 'Pasay', value: 'pasay' },
  { label: 'Pasig', value: 'pasig' },
  { label: 'Puerto Princesa', value: 'puerto-princesa' },
  { label: 'San Fernando', value: 'san-fernando' },
  { label: 'San Jose del Monte', value: 'san-jose-del-monte' },
  { label: 'San Juan', value: 'san-juan' },
  { label: 'Santa Rosa', value: 'santa-rosa' },
  { label: 'Santiago', value: 'santiago' },
  { label: 'Tagaytay', value: 'tagaytay' },
  { label: 'Tarlac City', value: 'tarlac-city' },
  { label: 'Taytay', value: 'taytay' },
  { label: 'Tuguegarao', value: 'tuguegarao' },
  { label: 'Valenzuela', value: 'valenzuela' },
];