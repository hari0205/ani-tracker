import { ObjectType, Field, ID, Int, Float } from "@nestjs/graphql";
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

    @Column({ type: "float", default: 0.0 })
    @Field(() => Float)
    rating: number;

    @Column({ type: "int", default: 0 })
    @Field(() => Int)
    ratedBy: number;

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