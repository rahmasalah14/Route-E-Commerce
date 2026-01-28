import { Brand } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

async function Brands() {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands",
    {
      next: { revalidate: 3600 }, // ISR
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch brands");
  }

  const { data: brands }: { data: Brand[] } = await res.json();

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">
        Shop by Brand
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="group"
          >
            <div className="border rounded-xl p-4 shadow-sm hover:shadow-lg transition flex items-center justify-center h-24">
              <Image
                src={brand.image}
                alt={brand.name}
                width={100}
                height={50}
                className="object-contain group-hover:scale-105 transition"
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Brands;
