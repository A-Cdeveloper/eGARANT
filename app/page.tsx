import { getUserFromCookies } from "@/actions/auth";

export default async function Home() {
  const user = await getUserFromCookies();

  console.log(user);

  return (
    <>
      <h2>Dobrodosli Aleksandar Cvetkovic</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet ab
        quaerat quos deleniti corporis libero repudiandae quo voluptatum
        corrupti voluptate, quod facere dolorum, odit nihil aliquid? Labore odit
        omnis aliquid.
      </p>{" "}
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet ab
        quaerat quos deleniti corporis libero repudiandae quo voluptatum
        corrupti voluptate, quod facere dolorum, odit nihil aliquid? Labore odit
        omnis aliquid.
      </p>{" "}
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet ab
        quaerat quos deleniti corporis libero repudiandae quo voluptatum
        corrupti voluptate, quod facere dolorum, odit nihil aliquid? Labore odit
        omnis aliquid.
      </p>
    </>
  );
}
