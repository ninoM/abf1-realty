'use client';

import { createInsertSchema } from 'drizzle-zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/form';
import { listing } from '../../lib/db/schema';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/popover';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import {
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Command,
} from '../../components/command';
import { cn } from '../../lib/utils';
import { Textarea } from '../../components/textarea';
import { v4 as uuid } from 'uuid';

const listingFormSchema = createInsertSchema(listing, {
  price: z.coerce.number().positive(),
  bedroomCount: z.coerce.number().positive().optional(),
  bathroomCount: z.coerce.number().positive().optional(),
  squareFootage: z.coerce.number().positive().optional(),
  lotSize: z.coerce.number().positive().optional(),
});

export default function ListingForm() {
  const form = useForm<z.infer<typeof listingFormSchema>>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      id: uuid(),
      price: 0,
      address: '',
      saleType: '',
      propertyType: '',
      city: '',
      description: '',
    },
  });

  const handleSubmit = (data: z.infer<typeof listingFormSchema>) => {
    console.log('adding..', data);
  };

  return (
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
                <FormDescription>
                  {form.getFieldState('propertyType').error?.message}
                </FormDescription>
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
                <FormDescription>
                  {form.getFieldState('saleType').error?.message}
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="false"
                />
              </FormControl>
              <FormDescription>
                {form.getFieldState('price').error?.message}
              </FormDescription>
            </FormItem>
          )}
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
              <FormDescription>
                {form.getFieldState('city').error?.message}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                {form.getFieldState('address').error?.message}
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-x-2">
          <FormField
            control={form.control}
            name="bedroomCount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Bedroom</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ''}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="false"
                  />
                </FormControl>
                <FormDescription>
                  0 means studio unit.
                  {form.getFieldState('bedroomCount').error?.message}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bathroomCount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Bathroom</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ''}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="false"
                  />
                </FormControl>
                <FormDescription>
                  {form.getFieldState('bathroomCount').error?.message}
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-x-2">
          <FormField
            control={form.control}
            name="squareFootage"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Floor area (sqm)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ''}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="false"
                  />
                </FormControl>
                <FormDescription>
                  {form.getFieldState('squareFootage').error?.message}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lotSize"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Lot area (sqm)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ''}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="false"
                  />
                </FormControl>
                <FormDescription>
                  {form.getFieldState('lotSize').error?.message}
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value ?? ''} rows={3} />
              </FormControl>
              <FormDescription>
                {form.getFieldState('description').error?.message}
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="mt-3 w-full flex justify-end">
          <Button type="submit">Add</Button>
        </div>
      </form>
      {/* <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre> */}
    </Form>
  );
}

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
