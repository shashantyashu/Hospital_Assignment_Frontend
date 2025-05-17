import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Image Section */}
      <div className="w-full">
        <img
          src={imageUrl}
          alt="whoweare"
          className="w-full h-auto rounded shadow-md object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="space-y-4 text-gray-700">
        <p className="text-blue-600 text-sm font-medium uppercase tracking-wide">Biography</p>
        <h3 className="text-3xl font-bold text-gray-900">Who We Are</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          blanditiis sequi aperiam. Debitis fugiat harum ex maxime illo
          consequatur mollitia voluptatem omnis nihil nesciunt beatae esse
          ipsam, sapiente totam aspernatur porro ducimus aperiam nisi. Ex
          magnam voluptatum consectetur reprehenderit fugiat recusandae aut
          similique illum natus velit, praesentium nostrum nesciunt. Deleniti,
          nesciunt laboriosam totam iusto!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          assumenda exercitationem accusamus sit repellendus quo optio dolorum
          corporis corrupti. Quas similique vel minima veniam tenetur
          obcaecati atque magni suscipit laboriosam! Veniam vitae minus nihil
          cupiditate natus provident. Ex illum quasi pariatur odit nisi
          voluptas illo qui ipsum mollitia. Libero, assumenda?
        </p>
        <p>Lorem ipsum dolor sit amet!</p>
      </div>
    </section>
  );
};

export default Biography;
