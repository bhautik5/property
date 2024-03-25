import connectDB from "@/config/dbConfig";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// GET /api/bookmarks
export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User is required", { status: 401 });
    }

    const { userId } = sessionUser;
    let user = await User.findById(userId);

    // GET user bookmarks
    const properties = await Property.find({ _id: { $in: user.bookmarks } });
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();
    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User is required", { status: 401 });
    }

    const { userId } = sessionUser;

    // Find user in database
    // let user = await User.find({ _id: userId });
    // user = user[0];
    let user = await User.findById(userId);

    // Check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);
    let message;

    if (isBookmarked) {
      // if bookmarked the remove it
      user.bookmarks.pull(propertyId);
      message = "Bookmarks removed successfully";
      isBookmarked = false;
    } else {
      // If not added then add it
      user.bookmarks.push(propertyId);
      message = "Bookmarks added successfully";
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
