import { Card, CardDescription, CardTitle } from '../components/card';
import Icon, { IconProps } from '../components/icon';
import { db } from '../lib/db';
import { listing } from '../lib/db/schema';

export const runtime = 'edge';

export default async function Index() {
  const listings = await db.select().from(listing).all();
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        ABF1 Realty
      </h1>
      <main>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Listings
        </h2>
        <div
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px,1fr))',
          }}
          className="p-4 grid gap-2"
        >
          {listings.map((listing) => (
            <Card key={listing.id} className="p-2 flex flex-col gap-y-4">
              <CardDescription className='flex flex-row items-center'>
              <Icon name="map-pin" size={12} />
                <span>{listing.address}</span>
              </CardDescription>
              <div>
                <RoomCount
                  count={listing.bedroomCount ?? 0}
                  icon="bed"
                  label="bedroom"
                />
                <RoomCount
                  count={listing.bathroomCount ?? 0}
                  icon="bath"
                  label="bathroom"
                />
              </div>
              <CardTitle className="text-4xl">
                {listing.price.toLocaleString('en', {
                  style: 'currency',
                  currency: 'PHP',
                })}
              </CardTitle>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

const RoomCount = ({
  count,
  icon,
  label,
}: {
  count: number;
  icon: IconProps['name'];
  label: string;
}) => (
  <div className="flex flex-row items-center gap-x-2">
    <Icon name={icon} className="self-start" />
    <span className="text-lg self-end">{`${count} ${label}s`}</span>
  </div>
);
