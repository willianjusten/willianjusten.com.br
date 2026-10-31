CREATE TABLE "game_reactions" (
	"game_slug" text NOT NULL,
	"browser_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "game_reactions_game_slug_browser_id_pk" PRIMARY KEY("game_slug","browser_id")
);
