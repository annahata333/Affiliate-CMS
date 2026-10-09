PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE IF NOT EXISTS "d1_migrations"(
		id         INTEGER PRIMARY KEY AUTOINCREMENT,
		name       TEXT UNIQUE,
		applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
INSERT INTO "d1_migrations" ("id","name","applied_at") VALUES(1,'0000_abandoned_hardball.sql','2026-08-21 10:52:39');
INSERT INTO "d1_migrations" ("id","name","applied_at") VALUES(2,'0001_premium_toad_men.sql','2026-08-26 12:55:51');
CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`image` text,
	`affiliate_network` text,
	`affiliate_url` text NOT NULL,
	`created_at` integer NOT NULL
);
INSERT INTO "products" ("id","title","description","image","affiliate_network","affiliate_url","created_at") VALUES(1,'Relaxing Spa Gift','A calming collection of spa essentials for a relaxing self-care experience.','https://nice-gift-ideas.com/wp-content/uploads/2026/04/Forest-Spa-Gift-Set.jpg','amazon','',1787315820646);
INSERT INTO "products" ("id","title","description","image","affiliate_network","affiliate_url","created_at") VALUES(2,'Natural Spa Gift Basket','A thoughtful spa-inspired gift with natural products for a soothing at-home ritual.','https://nice-gift-ideas.com/wp-content/uploads/2025/04/sugar-free-natural-sweets.jpg','amazon','',1787315820646);
INSERT INTO "products" ("id","title","description","image","affiliate_network","affiliate_url","created_at") VALUES(3,'Pampering Self-Care Set','A simple collection of pampering essentials designed to create a relaxing spa experience at home.','https://nice-gift-ideas.com/wp-content/uploads/2026/04/self-care-gift-basket.jpg','amazon','',1787315820646);
INSERT INTO "products" ("id","title","description","image","affiliate_network","affiliate_url","created_at") VALUES(4,'Exercising Gift Idea','If you’re looking for an easy way to start exercising at home, this Pilates Starter Kit is designed with beginners in mind.','https://nice-gift-ideas.com/wp-content/uploads/2026/06/Fat-Burn-Exercise-Kit-edited.jpg','amazon','https://amzn.to/3SybbEl',1787694437076);
CREATE TABLE `sessions` (
	`id` integer PRIMARY KEY NOT NULL,
	`token` text NOT NULL,
	`expires_at` integer NOT NULL
);
INSERT INTO "sessions" ("id","token","expires_at") VALUES(1,'07d97d23-a8b8-4073-b224-11a54b805681',1788424865447);
INSERT INTO "sessions" ("id","token","expires_at") VALUES(2,'7590e5f7-b477-4d8d-a54b-db045c2a6af9',1788460317522);
DELETE FROM sqlite_sequence;
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('d1_migrations',2);
CREATE UNIQUE INDEX `sessions_token_unique` ON `sessions` (`token`);