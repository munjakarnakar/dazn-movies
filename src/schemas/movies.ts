import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Date } from 'mongoose';
// import { ObjectID, ObjectIdColumn } from 'typeorm';

export type MoviesDocument = Movies & Document;
@Schema({ collection: 'movies' })

export class Movies {

    @Prop()
    name: string;

    @Prop()
    genre: string;

    @Prop()
    rating: number;

    @Prop(
        {
            default: false
        }
    )
    is_deleted: boolean;

    @Prop()
    streamingLink: string;

    @Prop({
        type: Date,
        default: new Date()
    })
    created_date_time: Date;

    @Prop({
        type: Date
    })
    updated_date_time: Date;

    @Prop()
    created_by: string;

    @Prop()
    updated_by: string;
}

export const MoviesSchema = SchemaFactory.createForClass(Movies);
