import { AuthenticateContextType } from "@/providers/AuthenticateProvider";
import { createContext } from "use-context-selector";

export const AuthenticateContext = createContext<AuthenticateContextType>({} as AuthenticateContextType);

