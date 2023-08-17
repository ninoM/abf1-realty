import { InferModel } from 'drizzle-orm';
import { Card, CardDescription, CardTitle } from '../components/card';
import { listing } from '../lib/db/schema';
import Icon, { IconProps } from '../components/icon';

type ListingCardProps = {
  listing: InferModel<typeof listing>;
  showControls?: true;
};

export default function ListingCard({
  listing: listingDetails,
  showControls,
}: ListingCardProps) {
  return (
    <Card className="p-2 flex flex-col gap-y-4">
      <CardDescription className="flex flex-row items-center">
        <Icon name="map-pin" size={12} />
        <span>{listingDetails.address}</span>
      </CardDescription>
      <div>
        <RoomCount
          count={listingDetails.bedroomCount ?? 0}
          icon="bed"
          label="bedroom"
        />
        <RoomCount
          count={listingDetails.bathroomCount ?? 0}
          icon="bath"
          label="bathroom"
        />
      </div>
      <CardTitle className="text-4xl">
        {listingDetails.price.toLocaleString('en', {
          style: 'currency',
          currency: 'PHP',
        })}
      </CardTitle>
    </Card>
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
