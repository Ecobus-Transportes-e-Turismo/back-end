import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect, UsersColletion } from "../../../config/database";
import { SingInType } from "../../../types";
import { Users } from "../../../types";

const handleSingIn = async ( req: NextApiRequest, res: NextApiResponse ): Promise<void> => {
  await dbConnect();
  const { email, password }: SingInType = req.body;

  switch (req.method) {
    case "POST":
      try {
        if (email == null || password == null) {
          res.status(401).json({ error: `Verifique os campos!` });
        }
        const user = await UsersColletion.findOne<Users>({ email: email, password: password});
        
        user
          ? res.status(200).json({
                user,
                token: sign(String(user._id), String(process.env.SECRET_TOKEN)),
            })
          : res.status(401).json({
                isAuthenticated: false,
                error: `E-mail ou password invalidos...`,
            });
      } catch (error) {
        res.status(406).json({error: `Erro na requisição, error: ${error}`});
      }
    break;
    
    default:
      res.status(401).json({ error: `unauthorized` });
  }
};
export default handleSingIn;