import { Clip } from "@src/entities/app";

export type FormClip = Pick<Clip, "filename" | "end" | "start" | "url">;
