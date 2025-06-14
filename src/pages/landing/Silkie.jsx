import Image from 'next/image';
import React from 'react';

const Silkie = () => {

//     useGSAP(() => {
//     // Create the smooth scroller
//     smoother.current = ScrollSmoother.create({
//       smooth: 2,
//       effects: true,
//     });
  
//     // Animate box-c width on scroll
//     gsap.to('.box-c', {
//       width: '300px', // or any target width like '200%'
//       duration: 1,
//       scrollTrigger: {
//         trigger: '.box-c',
//         // pin: true,
//         start: 'top center',
//         end: '+=300',
//         scrub: true, // sync with scroll
//         markers: true,
//       },
//     });
  
//   }, { scope: main });
  return (
    <div
      className="w-full py-10 my-7 bg-cover bg-center bg-no-repeat rounded-lg"
      style={{ backgroundImage: "url('/hen.jpg')" }}
    >
      <h2 className="text-center text-3xl font-bold mb-6 text-white drop-shadow">
        Silkie Hen Breeds
      </h2>
      <div className="w-10/12 mx-auto">
        <p className='text-white text-justify '>
            Silkie hens are one of the most popular and distinctive chicken breeds, known for their soft, fluffy feathers that feel like silk or fur. With their gentle and friendly nature, they make excellent pets for families and children. Silkies are also prized for their unique appearance, including black skin, feathered feet, and a calm temperament. Whether you're a beginner or an experienced poultry keeper, Silkie hens are a charming and low-maintenance addition to any backyard flock.
        </p>
      </div>
    </div>
  );
};

export default Silkie;
