import { ApiProperty } from '@nestjs/swagger';

export class FocusedPictureInput {
  @ApiProperty({ type: 'string', format: 'binary' })
  readonly image: string;
}
class FocusedImage {
  @ApiProperty({ required: true })
  readonly id: string;

  @ApiProperty({ required: true })
  readonly image: string;
}

class AttachImage {
  @ApiProperty({ required: true })
  readonly image: string;
}

export class CreateFocusedInput {
  @ApiProperty({ required: true })
  readonly language: string;

  @ApiProperty({ required: true })
  readonly title: string;

  @ApiProperty({ enum: ['publish', 'unpublish'] })
  readonly status: string;

  @ApiProperty({ type: Boolean, required: false })
  readonly isPublish: boolean;

  @ApiProperty({ type: Date, required: false })
  readonly publishDate: string;

  @ApiProperty({ required: false })
  readonly description?: string;

  @ApiProperty({ required: false })
  readonly featureImage?: FocusedImage;

  @ApiProperty({ type: [AttachImage], required: false })
  readonly images?: AttachImage[];
}

export class UpdateFocusedInput {
  @ApiProperty({ required: false })
  readonly title: string;

  @ApiProperty({ enum: ['publish', 'unpublish'] })
  readonly status: string;

  @ApiProperty({ type: Boolean, required: false })
  readonly isPublish: boolean;

  @ApiProperty({ type: Date, required: false })
  readonly publishDate: string;

  @ApiProperty({ required: false })
  readonly description?: string;

  @ApiProperty({ required: false })
  readonly featureImage?: FocusedImage;

  @ApiProperty({ type: [AttachImage], required: false })
  readonly images?: AttachImage[];
}