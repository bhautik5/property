import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export const getSessionUser = async () => {
  try {
    const sessionData = await getServerSession(authOptions);
    if (!sessionData || !sessionData.user) {
      return null;
    }

    return {
      user: sessionData.user,
      userId: sessionData.user.id,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
