import { join } from "path";

export const getTemplatePath = (template: string): string => {
  return join(__dirname, "../../email/templates", `${template}.mjml`);
};
