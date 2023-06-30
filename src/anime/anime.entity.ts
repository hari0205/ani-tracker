import { ObjectType, Field, ID, Int } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Watchlist } from "../watchlist/watchlist.entity";






@Entity()
@ObjectType()
export class Anime {

    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    romanjiName: string;

    @Column()
    @Field()
    description: string;

    @Column()
    @Field()
    airingFrom: string;

    @Column()
    @Field()
    isAiring: boolean;

    @Column()
    @Field(() => Int)
    totalEpisodes: number;

    @Column(() => Boolean)
    @Field()
    isSequel: boolean;

    @OneToMany(() => Watchlist, (watchlist) => watchlist.anime)
    @Field(() => [Watchlist])
    watchlist: Promise<Watchlist[]>;

}