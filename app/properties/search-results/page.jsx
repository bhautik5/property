"use client";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import PropertyCard from "@/components/PropertyCard";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertySearchForm from "@/components/PropertySearchForm";

const SearchResultPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const SearchParams = useSearchParams();
  const location = SearchParams.get("location");
  const propertyType = SearchParams.get("propertyType");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.log(error);
        toast("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, propertyType]);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <Link
              href="/properties"
              className="flex items-center text-blue-500 mb-3 hover:underline"
            >
              <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back to products
            </Link>
            {properties.length === 0 ? (
              <p className="text-center text-xl font-bold">
                No search result found.
              </p>
            ) : (
              <>
                <h2 className="text-2xl mb-4">Search result(s)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SearchResultPage;
