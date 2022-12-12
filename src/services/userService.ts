import * as userRepository from '../repositories/userRepository'
import * as error from '../utils/errors'

export async function getUserById(id: number) {

    const user = await userRepository.findById(id);

    if (!user) throw error.notFound()
  
    return user;
}