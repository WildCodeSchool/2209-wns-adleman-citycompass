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

@ValidatorConstraint({ name: "IsNotOnlySpaces", async: false })
export class IsNotOnlySpaces implements ValidatorConstraintInterface {
  validate(value: string): boolean | Promise<boolean> {
    return !(value.trim() === "");
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must not contain only space characters.`;
  }
}
