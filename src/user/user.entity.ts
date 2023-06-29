import { PrimaryGeneratedColumn, Column, Entity, Unique, BeforeInsert, OneToMany, CreateDateColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { Anime } from "../anime/anime.entity";
import { watchlist } from "../watchlist/watchlist.entity";



@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ select: false })
    createdAt: Date;


    @OneToMany(() => watchlist, 'watchlist')
    animesWatching: watchlist[];


    @BeforeInsert()
    async hashPassword() {
        const hashedPass = await bcrypt.hash(this.password, 10);
        this.password = hashedPass;
    }


}