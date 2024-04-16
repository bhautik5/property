'use client';
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [providers, setProviders] = useState(null);
    useEffect(() => {
        const getAuthProviders = async () => {
          const allProviders = await getProviders();
          setProviders(allProviders);
        };
        getAuthProviders();        
      }, []);
  return (
    session?router.push('/'):
    <section className="bg-blue-50">
      <div className="container max-w-sm m-auto py-24">
        <div className="flex justify-center items-center bg-white px-6 py-8 shadow-md rounded-md border m-6 md:m-0">
        {providers?.google?.id && (
          <button
            className="flex items-center justify-center text-white bg-gray-700 hover:bg-gray-900 rounded-md px-3 py-2"
            value="Signin"
            onClick={() => signIn(providers.google.id)}
          >
            <FaGoogle className="text-white mr-2" />
            <span>Sign in with Google</span>
          </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default LoginPage