const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all properties
const fetchProperties = async ({ showFeatured = false } = {}) => {
  try {
    // Handle case when apiDomian is null
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties${
        showFeatured ? "/featured" : ""
      }`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch Data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Fetch single property
const fetchProperty = async (id) => {
  try {
    // Handle case when apiDomian is null
    if (!apiDomain) return null;

    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) throw new Error("Failed to fetch property");
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { fetchProperties, fetchProperty };
