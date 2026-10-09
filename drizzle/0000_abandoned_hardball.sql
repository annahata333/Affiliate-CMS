CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`image` text,
	`affiliate_network` text,
	`affiliate_url` text NOT NULL,
	`created_at` integer NOT NULL
);
