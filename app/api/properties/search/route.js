import connectDB from "@/config/dbConfig";
import Property from "@/models/Property";

// GET /api/properties/search
export const GET = async (request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const porpertyType = searchParams.get("propertyType");

    const locationPattern = new RegExp(location, "i");
    // check location against database field names
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    // check propertytype if not equal to all
    if (porpertyType && porpertyType !== "All") {
      let propertyTypePattern = new RegExp(porpertyType, "i");
      query.type = propertyTypePattern;
    }

    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
