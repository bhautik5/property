import connectDB from "@/config/dbConfig";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

// GET api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const singleProperty = await Property.findById(params.id);
    if (!singleProperty) {
      return new Response("Property not found", { status: 404 });
    }
    return new Response(JSON.stringify(singleProperty), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// DELETE api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();
    const propertyId = params.id;
    const sessionUser = await getSessionUser();

    // check the user id is present
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User id is required", { status: 401 });
    }
    const { userId } = sessionUser;
    const singleProperty = await Property.findById(propertyId);

    if (!singleProperty) {
      return new Response("Property not found", { status: 404 });
    }

    // check ownership
    if (singleProperty.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await singleProperty.deleteOne();

    return new Response("Property deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// PUT api/properties/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionData = await getSessionUser();
    if (!sessionData || !sessionData.userId) {
      return new Response("User ID is required", { status: 401 });
    }
    const { id } = params;
    const userId = sessionData.userId;

    const formData = await request.formData();
    // Access all values from amenities
    const amenities = formData.getAll("amenities");

    // Get property to update
    const existingProperty = await Property.findById(id);
    if (!existingProperty) {
      return new Response("Property not found", { status: 404 });
    }

    // Check the ownership
    if (existingProperty.owner.toString() !== userId) {
      return new Response("Unauthorised", { status: 401 });
    }

    // Make propertyData for database
    const propertyData = {
      name: formData.get("name"),
      type: formData.get("type"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return new Response(JSON.stringify({ updatedProperty }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to add property", { status: 500 });
  }
};
