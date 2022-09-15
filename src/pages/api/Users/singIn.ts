import type { NextApiRequest, NextApiResponse } from "next";
import type { SingInType, Users } from '../../../types'
import { dbConnect, UsersColletion } from "../../../config/database";
import { sign } from "jsonwebtoken";

type ResponseTypeError = {
    message?:string,
}
type ResponseType = {
    user:Users,
    token:string
}

const handleSingIn = async ( req: NextApiRequest, res: NextApiResponse<ResponseTypeError | ResponseType> ): Promise<void> => {
  await dbConnect();
  const { email, password }: SingInType = req.body;

  switch (req.method) {
    case "POST":
      try {
        if (email == null || password == null) {
          res.status(401).json({ message: `Verifique os campos!` });
        } else {
            const user = await UsersColletion.findOne<Users>({ email: email, password: password});
            user
            ? res.status(200).json({
                user,
                token: sign(String(user._id), String(process.env.SECRET_TOKEN)),
            })
            : res.status(401).json({
                message: `E-mail ou password invalidos...`,
            });
        }
      } catch (error) {
        res.status(500).json({message: `Erro na requisição, error: ${error}`});
      }
    break;
    
    default:
      res.status(401).json({ message: `unauthorized` });
  }
};
export default handleSingIn;