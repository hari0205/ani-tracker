import { PrimaryGeneratedColumn, Column, Entity, Unique, BeforeInsert, OneToMany, CreateDateColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { Watchlist } from "../watchlist/watchlist.entity";
import { ObjectType, Field, ID } from "@nestjs/graphql";
import { GraphQLISODateTime } from "type-graphql";



@Entity()
@ObjectType()
export class User {

    @PrimaryGeneratedColumn("uuid")
    @Field(() => ID)
    id: string;

    @Column()
    @Field()
    name: string;

    @Column({ unique: true })
    @Field()
    email: string;

    @Column()
    @Field()
    password: string;

    @CreateDateColumn({ select: false })
    @Field(() => GraphQLISODateTime)
    createdAt: Date;


    @OneToMany(() => Watchlist, (watchlist) => (watchlist.user))
    @Field(() => [Watchlist])
    animesWatching: Promise<Watchlist[]>;


    @BeforeInsert()
    async hashPassword() {
        const hashedPass = await bcrypt.hash(this.password, 10);
        this.password = hashedPass;
    }


}