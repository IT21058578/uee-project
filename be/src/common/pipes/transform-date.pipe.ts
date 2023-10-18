import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { isDateString } from 'class-validator';

@Injectable()
export class TransformDatePipe implements PipeTransform {
  private readonly logger = new Logger(TransformDatePipe.name);

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (!isDateString(value)) throw Error();
      return new Date(value);
    } catch (error) {
      const message = `Validation Failed ('${value}' is not a valid date for ${metadata.type} '${metadata.data}')`;
      this.logger.warn('Rejecting request due to: ' + message);
      throw new BadRequestException(message);
    }
  }
}
