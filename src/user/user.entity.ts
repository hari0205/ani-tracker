import { PrimaryGeneratedColumn, Column, Entity, Unique, BeforeInsert, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
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
    @Field({ nullable: false })
    email: string;

    @Column()
    @Field()
    password: string;

    @Column({ default: "user" })
    @Field()
    role: string;

    @CreateDateColumn({ select: false })
    @Field(() => GraphQLISODateTime)
    createdAt: Date;

    @UpdateDateColumn({ select: false })
    @Field(() => GraphQLISODateTime)
    updatedAt: Date;

    @OneToMany(() => Watchlist, (watchlist) => (watchlist.user))
    @Field(() => [Watchlist])
    animesWatching: Promise<Watchlist[]>;


    @BeforeInsert()
    async hashPassword() {
        const hashedPass = await bcrypt.hash(this.password, 10);
        this.password = hashedPass;
    }


}