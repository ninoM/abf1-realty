CREATE TABLE `listings` (
	`id` text PRIMARY KEY NOT NULL,
	`price` text NOT NULL,
	`address` text NOT NULL,
	`saleType` text NOT NULL,
	`propertyType` text NOT NULL,
	`city` text NOT NULL,
	`description` text,
	`bedroomCount` integer DEFAULT 0,
	`bathroomCount` integer DEFAULT 0,
	`squareFootage` text,
	`lotSize` text
);
--> statement-breakpoint
CREATE INDEX `saleTypeIdx` ON `listings` (`saleType`);--> statement-breakpoint
CREATE INDEX `propertyTypeIdx` ON `listings` (`propertyType`);--> statement-breakpoint
CREATE INDEX `cityIdx` ON `listings` (`city`);--> statement-breakpoint
CREATE INDEX `bedroomCountIdx` ON `listings` (`bedroomCount`);--> statement-breakpoint
CREATE INDEX `bathroomCountIdx` ON `listings` (`bathroomCount`);--> statement-breakpoint
CREATE INDEX `saleTypeAndPropertyTypeIdx` ON `listings` (`saleType`,`propertyType`);--> statement-breakpoint
CREATE INDEX `cityAndSaleTypeIdx` ON `listings` (`city`,`saleType`);--> statement-breakpoint
CREATE INDEX `cityAndPropertyTypeIdx` ON `listings` (`city`,`propertyType`);--> statement-breakpoint
CREATE INDEX `bedroomCountAndBathroomCountIdx` ON `listings` (`bedroomCount`,`bathroomCount`);--> statement-breakpoint
CREATE INDEX `cityAndSaleTypeAndPropertyTypeIdx` ON `listings` (`city`,`saleType`,`propertyType`);