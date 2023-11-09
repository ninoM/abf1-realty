'use client';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import React from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@web/components/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@web/components/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@web/components/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@web/components/select';
import { useToast } from '@web/components/use-toast';
import { listing } from '@web/lib/db/schema';
import { cn } from '@web/lib/utils';
import createListingAction from './create/createListingAction';
import FormFieldInput from './form-field-input';
import FormFieldTextarea from './form-field-textarea';
import Link from 'next/link';

type CreateListing = Omit<typeof listing.$inferInsert, 'id'>;

export default function ListingForm() {
  const form = useForm<CreateListing>();
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: CreateListing) => {
    if (loading) return;
    setLoading(true);
    const response = await createListingAction(data);

    if (response.status === 'error') {
      toast({
        title: 'Error',
        description: response.message,
        variant: 'destructive',
      });
    } else if (
      response.status === 'form-error' &&
      Object.keys(response.formErrors).length > 0
    ) {
      toast({
        title: 'Form error',
        description: 'Please check the form for errors.',
        variant: 'destructive',
      });
      Object.keys(response.formErrors).forEach((fieldName: any) => {
        form.setError(fieldName, {
          type: 'Validation error',
          // @ts-expect-error TODO: fix this
          message: response.formErrors[fieldName]?.[0],
        });
      });
    } else if (response.status === 'success') {
      toast({ title: 'Success', description: 'Listing added.' });
      form.reset();
    } else {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'destructive',
      });
    }
  };

  // TODO: use valueAsNumber for numeric inputs
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
                    required
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        {/* TODO: fix zero-width space as hack */}
                        {field.value ? <SelectValue /> : '​'}
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
                    required
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        {/* TODO: fix zero-width space as hack */}
                        {field.value ? <SelectValue /> : '​'}
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
            required
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
                        required // TODO: not working
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
          <FormFieldInput required name="address" label="Address" />
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
          <div className="mt-3 w-full flex justify-between">
            <Link replace href="/dashboard">
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </Link>
            <Button type="submit">Submit</Button>
          </div>
        </form>
        {/* <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre> */}
      </Form>
    </ListingFormContext.Provider>
  );
}

export type ListingFormKeys = keyof Omit<typeof listing.$inferInsert, 'id'>;

type ListingFormContextType = UseFormReturn<CreateListing>;

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
