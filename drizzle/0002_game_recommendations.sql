CREATE TYPE "public"."recommendation_status" AS ENUM('pending', 'approved', 'hidden');--> statement-breakpoint
CREATE TABLE "game_recommendation_votes" (
	"recommendation_id" integer NOT NULL,
	"browser_id" text NOT NULL,
	"name" text,
	"because_slug" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "game_recommendation_votes_recommendation_id_browser_id_pk" PRIMARY KEY("recommendation_id","browser_id")
);
--> statement-breakpoint
CREATE TABLE "game_recommendations" (
	"id" serial PRIMARY KEY NOT NULL,
	"igdb_id" integer NOT NULL,
	"title" text NOT NULL,
	"year" integer,
	"platform" text NOT NULL,
	"cover_image_id" text,
	"status" "recommendation_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "game_recommendations_igdb_id_unique" UNIQUE("igdb_id")
);
--> statement-breakpoint
ALTER TABLE "game_recommendation_votes" ADD CONSTRAINT "game_recommendation_votes_recommendation_id_game_recommendations_id_fk" FOREIGN KEY ("recommendation_id") REFERENCES "public"."game_recommendations"("id") ON DELETE cascade ON UPDATE no action;