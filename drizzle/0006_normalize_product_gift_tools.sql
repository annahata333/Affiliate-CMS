CREATE TABLE `product_gift_tools` (
	`product_id` integer NOT NULL,
	`gift_tool_id` integer NOT NULL,
	PRIMARY KEY(`product_id`, `gift_tool_id`),
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`gift_tool_id`) REFERENCES `gift_tools`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT OR IGNORE INTO `product_gift_tools` (`product_id`, `gift_tool_id`)
SELECT products.`id`, CAST(gift_tool.value AS INTEGER)
FROM `products`,
	json_each(
		CASE
			WHEN json_valid(products.`gift_tool_ids`) THEN
				CASE
					WHEN json_type(products.`gift_tool_ids`) = 'array'
						THEN products.`gift_tool_ids`
					ELSE '[]'
				END
			ELSE '[]'
		END
	) AS gift_tool
WHERE gift_tool.`type` = 'integer'
	AND EXISTS (
		SELECT 1
		FROM `gift_tools`
		WHERE gift_tools.`id` = CAST(gift_tool.value AS INTEGER)
	);
--> statement-breakpoint
ALTER TABLE `products` DROP COLUMN `gift_tool_ids`;