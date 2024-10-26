import { ValidationError } from "class-validator";

const getErrors = (errors: ValidationError[]) => {
  const constraints: string[] = [];

  for (const error of errors) {
    if (error.constraints) {
      const constraintValues = Object.values(error.constraints);
      constraints.push(...constraintValues);
    }

    if (error.children?.length) {
      const childConstraints = getErrors(error.children);
      constraints.push(...childConstraints);
    }
  }

  return constraints;
};

export function getAllConstraints(errors: ValidationError[]): string {
  const unifiedErrors = getErrors(errors);

  const error = Object.values(unifiedErrors)[0];

  return error;

  /*     const constraints: string[] = [];
    
        for (const error of errors) {
            if (error.constraints) {
                const constraintValues = Object.values(error.constraints);
                constraints.push(...constraintValues);
            }
    
            if (error.children) {
                const childConstraints = getAllConstraints(error.children);
                constraints.push(...childConstraints);
            }
        }
    
    
        if (Array.isArray(constraints)) return constraints[0];
    
        return constraints; */
}

export function getCustomValidationError(message: string) {
  return {
    statusCode: 422,
    message,
    error: "Unprocessable Entity",
  };
}
