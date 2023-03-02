import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ name: "isDotInString", async: false })
export class IsDotInString implements ValidatorConstraintInterface {
  validate(
    value: string,
    args: ValidationArguments
  ): boolean | Promise<boolean> {
    console.log(args);
    return value.includes(".");
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must contain a period or dot (.) character.`;
  }
}

@ValidatorConstraint({ name: "hasSixDecimalMax", async: false })
export class HasSixDecimalMax implements ValidatorConstraintInterface {
  validate(value: string): boolean | Promise<boolean> {
    if (value.split(".")[1].length > 6) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must have 6 decimals max.`;
  }
}
