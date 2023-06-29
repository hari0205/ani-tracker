import { User } from "../user/user.entity";
import { Anime } from "../anime/anime.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"



@Entity()
export class watchlist {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;                     // TODO: change to enum type when migrating to postgresql


    @ManyToOne(() => User, (user) => user.animesWatching)
    user: User;

    @ManyToOne(() => Anime, (anime) => anime.watchlist)
    anime: Anime
}