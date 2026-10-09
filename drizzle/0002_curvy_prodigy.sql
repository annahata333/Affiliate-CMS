CREATE TABLE `attribute_groups` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `attribute_groups_name_unique` ON `attribute_groups` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `attribute_groups_slug_unique` ON `attribute_groups` (`slug`);--> statement-breakpoint
CREATE TABLE `attribute_values` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`attribute_id` integer NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`attribute_id`) REFERENCES `attributes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `attribute_values_attribute_slug_unique` ON `attribute_values` (`attribute_id`,`slug`);--> statement-breakpoint
CREATE TABLE `attributes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`attribute_group_id` integer NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`attribute_group_id`) REFERENCES `attribute_groups`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `attributes_slug_unique` ON `attributes` (`slug`);--> statement-breakpoint
CREATE TABLE `product_attributes` (
	`product_id` integer NOT NULL,
	`attribute_value_id` integer NOT NULL,
	PRIMARY KEY(`product_id`, `attribute_value_id`),
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`attribute_value_id`) REFERENCES `attribute_values`(`id`) ON UPDATE no action ON DELETE cascade
);
