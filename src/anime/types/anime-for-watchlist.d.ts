import { User } from "src/user/user.entity";
import { Anime } from "../anime.entity";

export interface CreateAnimeWithList {
    id: number;
    status: string;
    UserStats: Partial<User>;
    animeStats: Partial<Anime>;
}