import { ContentOrientationType } from 'src/content/content.types';
import { Content } from 'src/content/entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

const tableName = 'content_attachments';

@Entity({
  name: tableName,
})
export class ContentAttachment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  source: string;

  @Column({ type: 'enum', enum: ContentOrientationType, nullable: true })
  orientation?: ContentOrientationType;

  @Column({ type: 'int', nullable: true })
  width?: number;

  @Column({ type: 'int', nullable: true })
  height?: number;

  @Column({ type: 'uuid' })
  contentId: string;

  @ManyToOne(() => Content, (content) => content.attachments)
  @JoinColumn({
    name: 'contentId',
    referencedColumnName: 'id',
  })
  content: Content;
}
