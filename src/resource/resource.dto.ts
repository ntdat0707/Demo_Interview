import { ApiProperty } from '@nestjs/swagger';

export class ResourcePictureInput {
  @ApiProperty({ type: 'string', format: 'binary' })
  readonly image: string;
}
export class CreateResourceInput {
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

  @ApiProperty({ type: Boolean, required: false })
  readonly isEditSEO: boolean;

  @ApiProperty({ required: false })
  readonly titleSEO: string;

  @ApiProperty({ nullable: true })
  readonly descriptionSEO: boolean;

  @ApiProperty({ required: false })
  readonly link: string;

  @ApiProperty({ type: [String], required: false })
  readonly categoryIds?: string[];

  @ApiProperty({ required: false })
  readonly authorId: string;

  @ApiProperty({ type: [String], required: false })
  readonly labelIds?: string[];

  @ApiProperty({ required: false })
  readonly alt?: string;

  @ApiProperty({ required: false })
  readonly avatar?: string;

  @ApiProperty({ type: [String], required: false })
  readonly pictures?: string[];
}

export class UpdateResourceInput {
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

  @ApiProperty({ type: Boolean, required: false })
  readonly isEditSEO: boolean;

  @ApiProperty({ required: false })
  readonly titleSEO: string;

  @ApiProperty({ nullable: true })
  readonly descriptionSEO: boolean;

  @ApiProperty({ required: false })
  readonly link: string;

  @ApiProperty({ type: [String], required: false })
  readonly categoryIds?: string[];

  @ApiProperty({ required: false })
  readonly authorId: string;

  @ApiProperty({ type: [String], required: false })
  readonly labelIds?: string[];

  @ApiProperty({ required: false })
  readonly alt?: string;

  @ApiProperty({ required: false })
  readonly avatar?: string;

  @ApiProperty({ type: [String], required: false })
  readonly images?: string[];
}
