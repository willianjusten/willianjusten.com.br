CREATE TABLE "nba_shot_stats" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"shots" integer DEFAULT 0 NOT NULL,
	"makes" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rate_limits" (
	"route_key" text NOT NULL,
	"ip_hash" text NOT NULL,
	"window_start" timestamp with time zone NOT NULL,
	"hits" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "rate_limits_route_key_ip_hash_window_start_pk" PRIMARY KEY("route_key","ip_hash","window_start")
);
