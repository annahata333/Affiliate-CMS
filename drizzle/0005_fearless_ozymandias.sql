CREATE TABLE `gift_tools` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `gift_tools_slug_unique` ON `gift_tools` (`slug`);
--> statement-breakpoint
CREATE TABLE `gift_tool_attributes` (
	`gift_tool_id` integer NOT NULL,
	`attribute_id` integer NOT NULL,
	PRIMARY KEY(`gift_tool_id`, `attribute_id`),
	FOREIGN KEY (`gift_tool_id`) REFERENCES `gift_tools`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`attribute_id`) REFERENCES `attributes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `products` ADD `gift_tool_ids` text DEFAULT '[]' NOT NULL;