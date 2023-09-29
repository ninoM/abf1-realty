import ListingCard from '../components/listing-card';
import { db } from '../lib/db';
import { listing } from '../lib/db/schema';

export const runtime = 'edge';

export default async function Index() {
  const listings = await db.select().from(listing).all();
  return (
    <>
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
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </main>
    </>
  );
}
