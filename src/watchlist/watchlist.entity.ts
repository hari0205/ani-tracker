import { User } from "../user/user.entity";
import { Anime } from "../anime/anime.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
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

    @Column({ type: "int", default: 1 })
    @Field(() => Int)
    rating: number;

    @Column({ type: "int", default: 0 })
    progress: number;

    @ManyToOne(() => User, (user) => user.animesWatching)
    @Field(() => User)
    user: Promise<User>;

    @ManyToOne(() => Anime, (anime) => anime.watchlist)
    @Field(() => Anime)
    anime: Promise<Anime>;
}