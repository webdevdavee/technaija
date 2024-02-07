import Image from "next/image";

const page = () => {
  return (
    <section className="relative mt-16 px-20 py-12">
      <h1 className="text-center text-3xl font-medium py-6 capitalize">
        about us
      </h1>
      <div className="grid grid-cols-2 gap-10 mt-12">
        <span className="about-us-text">
          <p>
            <b>Our Story</b> <br /> Technaija was born from a shared vision
            among a group of tech enthusiasts who saw an opportunity to bridge
            the gap between functionality and fashion in the world of phone
            accessories. Fueled by a desire to create products that resonate
            with the vibrant spirit of Nigeria's tech-savvy community, we
            embarked on a journey to redefine the way people perceive phone
            cases.
          </p>
          <p>
            <b>Craftsmanship and Quality</b> <br />
            Craftsmanship and quality are non-negotiable aspects of the
            Technaija brand. Every phone case is meticulously crafted using the
            finest materials and undergoes rigorous quality control processes to
            ensure superior performance and longevity. We understand that your
            phone is more than just a device, it's an extension of your
            identity, and we strive to provide cases that not only protect but
            also enhance your mobile experience.
          </p>
          <p>
            <b>Global Reach, Local Roots</b> <br /> While Technaija is proud to
            call Nigeria home, our reach extends far beyond its borders. We're
            passionate about sharing the creativity and ingenuity of Nigerian
            design with the world, and we're committed to making our products
            accessible to customers around the globe. But no matter how far our
            reach extends, we'll always stay true to our Nigerian roots, drawing
            inspiration from the rich tapestry of culture, tradition, and
            innovation that defines our homeland. Join us on our journey to
            redefine the boundaries of phone protection and style. Embrace the
            future with Technaija,
            <em>
              where innovation, sustainability, and community converge to create
              a brighter tomorrow for all.
            </em>
          </p>
        </span>
        <Image
          src="/banner (1).jpg"
          width={1050}
          height={1050}
          alt="about-us"
        />
      </div>
    </section>
  );
};

export default page;
