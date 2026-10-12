PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE IF NOT EXISTS "d1_migrations"(
		id         INTEGER PRIMARY KEY AUTOINCREMENT,
		name       TEXT UNIQUE,
		applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
INSERT INTO "d1_migrations" ("id","name","applied_at") VALUES(1,'0000_abandoned_hardball.sql','2026-08-21 10:52:39');
INSERT INTO "d1_migrations" ("id","name","applied_at") VALUES(2,'0001_premium_toad_men.sql','2026-08-26 12:55:51');
INSERT INTO "d1_migrations" ("id","name","applied_at") VALUES(3,'0002_curvy_prodigy.sql','2026-08-31 13:04:28');
INSERT INTO "d1_migrations" ("id","name","applied_at") VALUES(4,'0003_material_leech.sql','2026-09-11 10:45:23');
INSERT INTO "d1_migrations" ("id","name","applied_at") VALUES(5,'0004_furry_prism.sql','2026-09-11 10:51:28');
INSERT INTO "d1_migrations" ("id","name","applied_at") VALUES(6,'0005_fearless_ozymandias.sql','2026-09-16 11:48:51');
CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`image` text,
	`affiliate_network` text,
	`affiliate_url` text NOT NULL,
	`created_at` integer NOT NULL
, `asin` text, `gift_tool_ids` text DEFAULT '[]' NOT NULL);
INSERT INTO "products" ("id","title","description","image","affiliate_network","affiliate_url","created_at","asin","gift_tool_ids") VALUES(1,'Test title','test description','https://nice-gift-ideas.com/wp-content/uploads/2026/09/escape-room-game.jpg','amazon','amazonurl',1789123551764,'testasin',X'01');
CREATE TABLE `sessions` (
	`id` integer PRIMARY KEY NOT NULL,
	`token` text NOT NULL,
	`expires_at` integer NOT NULL
);
INSERT INTO "sessions" ("id","token","expires_at") VALUES(1,'07d97d23-a8b8-4073-b224-11a54b805681',1788424865447);
INSERT INTO "sessions" ("id","token","expires_at") VALUES(2,'7590e5f7-b477-4d8d-a54b-db045c2a6af9',1788460317522);
INSERT INTO "sessions" ("id","token","expires_at") VALUES(3,'edd7e3ba-0878-4798-9e6c-f545c5eb91d4',1789302599644);
INSERT INTO "sessions" ("id","token","expires_at") VALUES(4,'87a1f36d-c502-47ee-9eac-68328e752abf',1790161334260);
INSERT INTO "sessions" ("id","token","expires_at") VALUES(5,'a04bc9d1-f960-4eb9-8c22-4e7375fdb654',1791189819750);
INSERT INTO "sessions" ("id","token","expires_at") VALUES(6,'c186f748-dac1-4b06-8d2d-5063b87a661f',1792051181661);
CREATE TABLE `product_attributes` (
	`product_id` integer NOT NULL,
	`attribute_value_id` integer NOT NULL,
	PRIMARY KEY(`product_id`, `attribute_value_id`),
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`attribute_value_id`) REFERENCES `attribute_values`(`id`) ON UPDATE no action ON DELETE cascade
);
INSERT INTO "product_attributes" ("product_id","attribute_value_id") VALUES(1,5);
INSERT INTO "product_attributes" ("product_id","attribute_value_id") VALUES(1,14);
INSERT INTO "product_attributes" ("product_id","attribute_value_id") VALUES(1,15);
INSERT INTO "product_attributes" ("product_id","attribute_value_id") VALUES(1,25);
INSERT INTO "product_attributes" ("product_id","attribute_value_id") VALUES(1,31);
INSERT INTO "product_attributes" ("product_id","attribute_value_id") VALUES(1,33);
CREATE TABLE `attributes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
INSERT INTO "attributes" ("id","name","slug","sort_order","created_at") VALUES(1,'Lifestyle','lifestyle',1,1789125794);
INSERT INTO "attributes" ("id","name","slug","sort_order","created_at") VALUES(2,'Interests','interests',2,1789125794);
INSERT INTO "attributes" ("id","name","slug","sort_order","created_at") VALUES(3,'Relaxation','relaxation',3,1789125794);
INSERT INTO "attributes" ("id","name","slug","sort_order","created_at") VALUES(4,'Gift Role','gift-role',4,1789125794);
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
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(1,1,'Hands-On / Active','hands-on-active',1,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(2,1,'Desk / Screen Heavy','desk-screen-heavy',2,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(3,1,'Outdoorsy / Adventurous','outdoorsy-adventurous',3,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(4,1,'Homebody / Cozy','homebody-cozy',4,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(5,1,'Routine & Ritual Lover','routine-ritual-lover',5,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(6,1,'Busy / Stressed','busy-stressed',6,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(7,1,'A Little Bit of Everything','a-little-bit-of-everything',7,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(8,2,'Fitness & Sports','fitness-sports',1,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(9,2,'Outdoors & Adventure','outdoors-adventure',2,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(10,2,'Making, Fixing & DIY','making-fixing-diy',3,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(11,2,'Gaming & Tech','gaming-tech',4,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(12,2,'Music & Entertainment','music-entertainment',5,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(13,2,'Reading & Learning','reading-learning',6,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(14,2,'Cooking & Food','cooking-food',7,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(15,2,'Creative Hobbies','creative-hobbies',8,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(16,2,'Cars & Motors','cars-motors',9,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(17,2,'Nature & Gardening','nature-gardening',10,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(18,2,'Collecting & Fandoms','collecting-fandoms',11,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(19,2,'Wellness & Self-Improvement','wellness-self-improvement',12,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(20,3,'A Spa-Like Treatment','spa-like-treatment',1,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(21,3,'Getting Active or Outdoors','active-or-outdoors',2,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(22,3,'A Nice Meal & Favorite Drinks','nice-meal-favorite-drinks',3,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(23,3,'Making, Building or Fixing Something','making-building-fixing',4,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(24,3,'A Cozy Night In','cozy-night-in',5,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(25,3,'Enjoying One of His Hobbies','enjoying-one-of-his-hobbies',6,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(26,3,'Doing Something Together','doing-something-together',7,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(27,4,'Main Gift','main-gift',1,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(28,4,'Practical','practical',2,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(29,4,'Recovery','recovery',3,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(30,4,'Grooming','grooming',4,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(31,4,'Treat','treat',5,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(32,4,'Hobby','hobby',6,1789125794);
INSERT INTO "attribute_values" ("id","attribute_id","name","slug","sort_order","created_at") VALUES(33,4,'Comfort','comfort',7,1789125794);
CREATE TABLE `gift_tools` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
INSERT INTO "gift_tools" ("id","name","slug") VALUES(1,'Self Care Gift Basket for boyfriend','self-care-boyfriend');
CREATE TABLE `gift_tool_attributes` (
	`gift_tool_id` integer NOT NULL,
	`attribute_id` integer NOT NULL,
	PRIMARY KEY(`gift_tool_id`, `attribute_id`),
	FOREIGN KEY (`gift_tool_id`) REFERENCES `gift_tools`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`attribute_id`) REFERENCES `attributes`(`id`) ON UPDATE no action ON DELETE cascade
);
INSERT INTO "gift_tool_attributes" ("gift_tool_id","attribute_id") VALUES(1,1);
INSERT INTO "gift_tool_attributes" ("gift_tool_id","attribute_id") VALUES(1,2);
INSERT INTO "gift_tool_attributes" ("gift_tool_id","attribute_id") VALUES(1,3);
INSERT INTO "gift_tool_attributes" ("gift_tool_id","attribute_id") VALUES(1,4);
DELETE FROM sqlite_sequence;
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('d1_migrations',6);
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('attributes',4);
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('attribute_values',33);
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('gift_tools',1);
CREATE UNIQUE INDEX `sessions_token_unique` ON `sessions` (`token`);
CREATE UNIQUE INDEX `attributes_slug_unique`
ON `attributes` (`slug`);
CREATE UNIQUE INDEX `attribute_values_attribute_slug_unique`
ON `attribute_values` (`attribute_id`, `slug`);
CREATE UNIQUE INDEX `gift_tools_slug_unique` ON `gift_tools` (`slug`);