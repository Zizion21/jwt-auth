import { ApiProperty } from "@nestjs/swagger"
import { IsMobilePhone, IsString, Length } from "class-validator"

export class SendOtpDto {
    @ApiProperty()
    @IsMobilePhone("fa-IR", {}, { message: "Invalid phone number" })
    mobile: string
}

export class VerifyOtpDto {
    @ApiProperty()
    @IsMobilePhone("fa-IR", {}, { message: "Invalid phone number" })
    mobile: string

    @ApiProperty()
    @IsString()
    @Length(5, 5, { message: "Unacceptable otp length" })
    code: string
}