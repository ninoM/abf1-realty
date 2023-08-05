import { db } from "../lib/db";
import { listing } from "../lib/db/schema";

export const runtime = 'edge'

export default async function Index() {
  const listings = await db.select().from(listing).all()
  return (
    <div>
      <h1>
        <span> Hello there, </span>
        Welcome abf1-web 🫨👋
      </h1>
      <pre>{JSON.stringify(listings, null, 2)}</pre>
    </div>
  );
}
