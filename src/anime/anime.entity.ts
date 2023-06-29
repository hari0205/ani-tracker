import { ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { watchlist } from "../watchlist/watchlist.entity";





@Entity()
export class Anime {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    romanjiName: string;

    @Column()
    description: string;

    @Column()
    airingFrom: string;

    @Column()
    isAiring: boolean;

    @Column()
    totalEpisodes: number;

    @Column()
    isSequel: boolean;

    @OneToMany(() => watchlist, (watchlist) => watchlist.anime)
    watchlist: watchlist[];

}