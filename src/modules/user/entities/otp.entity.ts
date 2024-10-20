import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Otp {
    @PrimaryGeneratedColumn("increment")
    id: number;
    @Column()
    code: string;
    @Column()
    expires_in: Date;
    @Column()
    userId: number;
    @OneToOne(() => User, (user) => user.otp, { onDelete: "CASCADE" })
    user: User;
}
