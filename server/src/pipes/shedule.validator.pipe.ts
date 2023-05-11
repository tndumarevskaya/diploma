import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'schedule', async: false })
export class ScheduleValidator implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const scheduleRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]\s-\s(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        const scheduleArr = value.split(','); // split schedule by comma

        for (const schedule of scheduleArr) {
            if (!scheduleRegex.test(schedule.trim())) {
                return false;
            }
        }

        return true;
        }

        defaultMessage(args: ValidationArguments) {
            return `The schedule format for ${args.property} is invalid. Please use the format "09:00 - 17:00".`;
        }
}