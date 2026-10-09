PRAGMA foreign_keys=OFF;
--> statement-breakpoint

DELETE FROM `product_attributes`;
--> statement-breakpoint

DROP TABLE `attribute_values`;
--> statement-breakpoint

DROP TABLE `attributes`;
--> statement-breakpoint

DROP TABLE `attribute_groups`;
--> statement-breakpoint

CREATE TABLE `attributes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint

CREATE UNIQUE INDEX `attributes_slug_unique`
ON `attributes` (`slug`);
--> statement-breakpoint

CREATE TABLE `attribute_values` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`attribute_id` integer NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`attribute_id`)
		REFERENCES `attributes`(`id`)
		ON UPDATE no action
		ON DELETE cascade
);
--> statement-breakpoint

CREATE UNIQUE INDEX `attribute_values_attribute_slug_unique`
ON `attribute_values` (`attribute_id`, `slug`);
--> statement-breakpoint

PRAGMA foreign_keys=ON;