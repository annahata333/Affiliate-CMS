DELETE FROM product_attributes;
--> statement-breakpoint

DELETE FROM attribute_values;
--> statement-breakpoint

DELETE FROM attributes;
--> statement-breakpoint

INSERT INTO attributes (name, slug, sort_order, created_at)
VALUES ('Lifestyle', 'lifestyle', 1, unixepoch());
--> statement-breakpoint

INSERT INTO attributes (name, slug, sort_order, created_at)
VALUES ('Interests', 'interests', 2, unixepoch());
--> statement-breakpoint

INSERT INTO attributes (name, slug, sort_order, created_at)
VALUES ('Relaxation', 'relaxation', 3, unixepoch());
--> statement-breakpoint

INSERT INTO attributes (name, slug, sort_order, created_at)
VALUES ('Gift Role', 'gift-role', 4, unixepoch());
--> statement-breakpoint


-- Lifestyle
INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Hands-On / Active', 'hands-on-active', 1, unixepoch()
FROM attributes WHERE slug = 'lifestyle';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Desk / Screen Heavy', 'desk-screen-heavy', 2, unixepoch()
FROM attributes WHERE slug = 'lifestyle';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Outdoorsy / Adventurous', 'outdoorsy-adventurous', 3, unixepoch()
FROM attributes WHERE slug = 'lifestyle';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Homebody / Cozy', 'homebody-cozy', 4, unixepoch()
FROM attributes WHERE slug = 'lifestyle';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Routine & Ritual Lover', 'routine-ritual-lover', 5, unixepoch()
FROM attributes WHERE slug = 'lifestyle';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Busy / Stressed', 'busy-stressed', 6, unixepoch()
FROM attributes WHERE slug = 'lifestyle';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'A Little Bit of Everything', 'a-little-bit-of-everything', 7, unixepoch()
FROM attributes WHERE slug = 'lifestyle';
--> statement-breakpoint


-- Interests
INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Fitness & Sports', 'fitness-sports', 1, unixepoch()
FROM attributes WHERE slug = 'interests';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Outdoors & Adventure', 'outdoors-adventure', 2, unixepoch()
FROM attributes WHERE slug = 'interests';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Making, Fixing & DIY', 'making-fixing-diy', 3, unixepoch()
FROM attributes WHERE slug = 'interests';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Gaming & Tech', 'gaming-tech', 4, unixepoch()
FROM attributes WHERE slug = 'interests';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Music & Entertainment', 'music-entertainment', 5, unixepoch()
FROM attributes WHERE slug = 'interests';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Reading & Learning', 'reading-learning', 6, unixepoch()
FROM attributes WHERE slug = 'interests';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Cooking & Food', 'cooking-food', 7, unixepoch()
FROM attributes WHERE slug = 'interests';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Creative Hobbies', 'creative-hobbies', 8, unixepoch()
FROM attributes WHERE slug = 'interests';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Cars & Motors', 'cars-motors', 9, unixepoch()
FROM attributes WHERE slug = 'interests';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Nature & Gardening', 'nature-gardening', 10, unixepoch()
FROM attributes WHERE slug = 'interests';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Collecting & Fandoms', 'collecting-fandoms', 11, unixepoch()
FROM attributes WHERE slug = 'interests';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Wellness & Self-Improvement', 'wellness-self-improvement', 12, unixepoch()
FROM attributes WHERE slug = 'interests';
--> statement-breakpoint


-- Relaxation
INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'A Spa-Like Treatment', 'spa-like-treatment', 1, unixepoch()
FROM attributes WHERE slug = 'relaxation';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Getting Active or Outdoors', 'active-or-outdoors', 2, unixepoch()
FROM attributes WHERE slug = 'relaxation';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'A Nice Meal & Favorite Drinks', 'nice-meal-favorite-drinks', 3, unixepoch()
FROM attributes WHERE slug = 'relaxation';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Making, Building or Fixing Something', 'making-building-fixing', 4, unixepoch()
FROM attributes WHERE slug = 'relaxation';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'A Cozy Night In', 'cozy-night-in', 5, unixepoch()
FROM attributes WHERE slug = 'relaxation';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Enjoying One of His Hobbies', 'enjoying-one-of-his-hobbies', 6, unixepoch()
FROM attributes WHERE slug = 'relaxation';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Doing Something Together', 'doing-something-together', 7, unixepoch()
FROM attributes WHERE slug = 'relaxation';
--> statement-breakpoint


-- Gift Role
INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Main Gift', 'main-gift', 1, unixepoch()
FROM attributes WHERE slug = 'gift-role';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Practical', 'practical', 2, unixepoch()
FROM attributes WHERE slug = 'gift-role';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Recovery', 'recovery', 3, unixepoch()
FROM attributes WHERE slug = 'gift-role';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Grooming', 'grooming', 4, unixepoch()
FROM attributes WHERE slug = 'gift-role';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Treat', 'treat', 5, unixepoch()
FROM attributes WHERE slug = 'gift-role';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Hobby', 'hobby', 6, unixepoch()
FROM attributes WHERE slug = 'gift-role';
--> statement-breakpoint

INSERT INTO attribute_values
  (attribute_id, name, slug, sort_order, created_at)
SELECT id, 'Comfort', 'comfort', 7, unixepoch()
FROM attributes WHERE slug = 'gift-role';