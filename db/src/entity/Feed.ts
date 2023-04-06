import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne, } from "typeorm"

@Entity()
export class FeedBox {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
    })
    name: string

    @OneToMany(() => FeedChanel, feedChanel => feedChanel.feedBox, { nullable: true })
    feedChanels: string[]
}

// ref to : https://validator.w3.org/feed/docs/rss2.html
@Entity()
export class FeedChanel {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
    })
    link: string

    // Relations

    @ManyToOne(() => FeedBox, feedBox => feedBox.feedChanels,)
    feedBox: FeedBox
}
