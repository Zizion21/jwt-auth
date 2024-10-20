import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Otp } from "./otp.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number;
    @Column({ nullable: true })
    full_name: string;
    @Column()
    mobile: string;
    @Column({ default: false })
    mobile_verified: boolean;
    @CreateDateColumn()
    created_at: Date;
    @Column({ nullable: true })
    otpId: number;
    @OneToOne(() => Otp, otp => otp.user)
    @JoinColumn({ name: "otpId" })
    otp: Otp;
}
