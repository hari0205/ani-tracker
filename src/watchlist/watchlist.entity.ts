import { User } from "../user/user.entity";
import { Anime } from "../anime/anime.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Field, Int, ObjectType } from "@nestjs/graphql";



@Entity()
@ObjectType()
export class Watchlist {

    @PrimaryGeneratedColumn()
    @Field(() => Int)
    id: number;

    @Column()
    @Field()
    status: string;                     // TODO: change to enum type when migrating to postgresql


    @ManyToOne(() => User, (user) => user.animesWatching)
    @Field(() => User)
    user: Promise<User>;

    @ManyToOne(() => Anime, (anime) => anime.watchlist)
    @Field(() => Anime)
    anime: Promise<Anime>;
}