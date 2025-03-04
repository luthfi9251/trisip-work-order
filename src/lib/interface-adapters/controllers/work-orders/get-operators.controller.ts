import { GetOperatorUseCase } from "@/lib/application/use-cases/work-orders/get-operator.use-case";
import { UserRepository } from "@/lib/infrastructure/repositories/user.repository";

const userRepository = new UserRepository();

const getOperatorsUseCase = new GetOperatorUseCase(userRepository);

export const getOperatorsController = async () => {
    return await getOperatorsUseCase.execute();
};
