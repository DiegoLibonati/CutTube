import { Clip } from "@src/entities/vite-env";

export type FormClip = Pick<Clip, "filename" | "end" | "start" | "url">;
