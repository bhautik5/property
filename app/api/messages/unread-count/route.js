import connectDB from "@/config/dbConfig";
import Message from "@/models/Messages";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/messages/unread-count
export const GET = async (request) => {
  try {
    await connectDB();

    // Check user
    const session = await getSessionUser();

    if (!session || !session.user) {
      return new Response("User id is required", { status: 401 });
    }

    const { userId } = session;
    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return new Response(JSON.stringify(count), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
