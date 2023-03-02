import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ name: "isDotInString", async: false })
export class IsDotInString implements ValidatorConstraintInterface {
  validate(value: string): boolean | Promise<boolean> {
    return value.includes(".");
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must contain a period or dot (.) character.`;
  }
}
