import Infobox from "./Infobox";

const infoboxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <Infobox
            title="For Renters"
            backgroundColor="bg-gray-100"
            textColor="bg-grey-800"
            buttonInfo={{
              text: "Browse Properties",
              backgroundColor: "bg-black",
              link: "/properties",
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </Infobox>

          <Infobox
            title="For Property Owners"
            backgroundColor="bg-blue-100"
            textColor="bg-grey-800"
            buttonInfo={{
              text: "Add Property",
              backgroundColor: "bg-blue-500",
              link: "/properties/add",
            }}
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </Infobox>
        </div>
      </div>
    </section>
  );
};

export default infoboxes;
