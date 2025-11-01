import  { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const DataFormForFindingProvider = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: '',
    city: '',
    purpose: '',
    serviceCategory: '',
    subCategory: ''
  });

  const [locationData, setLocationData] = useState(null); // debug: full API response
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch user's location
    if (!('geolocation' in navigator)) {
      setLocationData({ error: 'Geolocation not supported' });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          // Reverse geocode based on user's location (LocationIQ)
          const response = await fetch(
            `https://us1.locationiq.com/v1/reverse?key=pk.d9de3bfc02b6350e06a78881f0199e73&lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          setLocationData(data);
          // Derive a single city-like value for UI (reverse API doesn't return a cities array)
          const city =
            data?.address?.town ||
            data?.address?.state_district ||
            data?.address?.state ||
            data?.address?.country ||
            null;
          formData.city = city;
          console.log('Detected city:', city);
        } catch (e) {
          setLocationData({ error: String(e?.message || e) });
        }
      },
      (err) => {
        setLocationData({ error: err?.message || 'Geolocation failed' });
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  const serviceCategories = {
    'Home Services': ['Cleaning', 'Plumbing', 'Electrical'],
    'Education': ['Tutoring', 'Language', 'Test Prep'],
    'Health': ['Fitness', 'Nutrition', 'Therapy']
  };

  const handleNext = () => setCurrentStep(prev => prev + 1);
  const handleBack = () => setCurrentStep(prev => prev - 1);
  const handleNextHalf = () => setCurrentStep(prev => prev + 1);
  const handleBackHalf = () => setCurrentStep(prev => prev - 1);

  const renderStep = () => {
    switch(currentStep) {
      case 1: {/* Step 1: User Type Selection whether a client or a provider */}
        return (
          <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {t('JoinAsAClientOrProfessional')}
            </h2>
            <div className="flex justify-center gap-6">
              {['client', 'professional'].map(type => (
                <label key={type} className="card w-96 bg-base-100 shadow-xl cursor-pointer hover:scale-105 transition-transform ">
                  <div className="card-body">
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="userType"
                        className="radio"
                        checked={formData.userType === type}
                        onChange={() => {
                          setFormData({...formData, userType: type});
                          if (type === 'client') {
                            handleNext();
                          } else {
                            setCurrentStep(2);
                          }
                        }}
                      />
                      <div>
                        <h3 className="card-title">
                          {type === 'client' ? "I'm a client, need a service" : "I'm a professional, looking for work"}
                        </h3>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      // case 2: {/* Asking if he wants a provider from the region or from the whole country */}
      //   return (
      //     <div className="w-full max-w-4xl">
      //       <h2 className="text-2xl font-bold mb-6 text-center">
      //         Select the region where you need service
      //       </h2>
      //       <div className="flex flex-col gap-4">
      //         {['Northwide', 'Local Region'].map(region => (
      //           <label key={region} className="card bg-base-100 shadow-xl cursor-pointer hover:scale-105 transition-transform">
      //             <div className="card-body">
      //               <div className="flex items-center gap-4">
      //                 <input
      //                   type="radio"
      //                   name="region"
      //                   className="radio"
      //                   checked={formData.region === region}
      //                   onChange={() => {
      //                     setFormData({...formData, region});
      //                     if (region === 'Northwide') {
      //                       handleNext();
      //                     } else {
      //                       setCurrentStep(2.5);
      //                     }
      //                   }}
      //                 />
      //                 <h3 className="card-title">{region}</h3>
      //               </div>
      //             </div>
      //           </label>
      //         ))}
      //       </div>
      //     </div>
      //   );

      // case 2.5: {/* User city selecting */}
      //   return (
      //     <div className="w-full max-w-4xl">
      //       <h2 className="text-2xl font-bold mb-6 text-center">
      //         Select your city
      //       </h2>
      //       <div className="form-control">
      //         <div className="dropdown w-full">
      //           <input
      //             type="text"
      //             placeholder="Search cities..."
      //             className="input input-bordered w-full"
      //             value={searchTerm}
      //             onChange={(e) => setSearchTerm(e.target.value)}
      //           />
      //           <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full">
      //             {cities.filter(city => 
      //               city.toLowerCase().includes(searchTerm.toLowerCase())
      //             ).map(city => (
      //               <li key={city} onClick={() => {
      //                 setFormData({...formData, city});
      //                 handleNextHalf();
      //               }}>
      //                 <a>{city}</a>
      //               </li>
      //             ))}
      //           </ul>
      //         </div>
      //       </div>
      //     </div>
      //   );

      case 2: {/* Asking whether he wants to post a job or search a provider */}
        return (
          <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Choose Your Purpose
            </h2>
            <div className="flex justify-center gap-6">
              {['post', 'find'].map(purpose => (
                <div 
                  key={purpose}
                  className="card w-96 bg-base-100 shadow-xl cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => {
                    setFormData({...formData, purpose});
                    handleNext();
                  }}
                >
                  <div className="card-body">
                    <h3 className="card-title">
                      {purpose === 'post' ? 'Post a Job and Hire Top Professionals' : 'Find the Right Expert for Your Needs'}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:{/* Chosing the service he needs */}
        return (
          <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Choose the Service You Need
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search Services... "
                className="input input-bordered w-full mb-4 pr-10"
              />
              <MagnifyingGlassIcon 
              className="absolute right-3 top-[45%] -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none mb-4"
              />
            </div>
            <div className="tabs tabs-boxed mb-4">
              {Object.keys(serviceCategories).map(category => (
                <a 
                  key={category}
                  className={`tab ${formData.serviceCategory === category ? 'tab-active' : ''}`}
                  onClick={() => {
                    setFormData({...formData, serviceCategory: category});
                    
                  }}
                >
                  {category}
                </a>
              ))}
            </div>
            <div className="divider"></div>
            <div className="flex flex-wrap gap-2">
              {formData.serviceCategory && serviceCategories[formData.serviceCategory].map(sub => (
                <button
                  key={sub}
                  className="btn btn-outline btn-sm rounded-full"
                  onClick={() => {
                    setFormData({...formData, subCategory: sub});
                    if ( formData.purpose === 'find') {
                            handleNext();
                          } else {
                            setCurrentStep(5);
                          }
                  }}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        );

        case 4:{/* Best matches - still not developed the search index or anything related to this */}
          return (
          <div className="min-h-screen bg-base-100">
            <div className="flex flex-col md:flex-row gap-6 p-6">
              {/* Filters Sidebar */}
              <div className="w-full md:w-64 space-y-4">
                <div className="card bg-base-200 p-4">
                  <h3 className="font-bold mb-3">Professional Type</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="checkbox" />
                      <span>Top Rated</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="checkbox" />
                      <span>Standard</span>
                    </label>
                  </div>
                </div>
                <div className="card bg-base-200 p-4">
                  <h3 className="font-bold mb-3">Price Range</h3>
                  <input type="range" className="range" min="0" max="100" />
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <div className="flex justify-between mb-4">
                  <input type="text" placeholder="Search professionals..." className="input input-bordered w-full max-w-xs" />
                  <select className="select select-bordered">
                    <option>Sort by: Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Top Rated</option>
                  </select>
                </div>

                <div className="grid gap-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="card bg-base-200 shadow-xl">
                      <div className="card-body">
                        <div className="flex gap-4">
                          <div className="avatar">
                            <div className="w-16 h-16 rounded-full">
                              <img src={`https://i.pravatar.cc/150?img=${item}`} alt="Professional" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h2 className="card-title">Professional Name</h2>
                            <p className="text-sm opacity-70">Expertise • Location</p>
                            <p className="mt-2">Brief description of qualifications and experience...</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">$50/hr</div>
                            <button className="btn mt-2"
                              onClick={handleNext}
                            >View Profile</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          );

          case 5:{/* Profile */}
          return (
            <div className="min-h-screen bg-base-100 p-6">
              <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="card bg-base-200 shadow-xl mb-6">
                  <div className="card-body">
                    <div className="flex gap-6">
                      <div className="avatar">
                        <div className="w-24 h-24 rounded-full">
                          <img src="https://i.pravatar.cc/150" alt="Professional" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h1 className="text-3xl font-bold">John Smith</h1>
                        <p className="text-lg opacity-70">Math Tutor • New York, NY</p>
                        <div className="flex gap-4 mt-4">
                          <div className="badge badge-primary">Top Rated</div>
                          <div className="text-xl font-bold">$50/hr</div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button className="btn btn-primary">Contact</button>
                        <button className="btn btn-outline">Rate Professional</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    {/* About Section */}
                    <div className="card bg-base-200 shadow-xl">
                      <div className="card-body">
                        <h2 className="card-title">About</h2>
                        <p>Experienced math tutor specializing in high school and college-level mathematics. Using interactive teaching methods and digital tools to ensure student success.</p>
                        <div className="mt-4">
                          <h3 className="font-bold mb-2">Specialties</h3>
                          <div className="flex flex-wrap gap-2">
                            {['Algebra', 'Calculus', 'Geometry', 'Statistics'].map(skill => (
                              <span key={skill} className="badge badge-outline">✓ {skill}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Portfolio Section */}
                    <div className="card bg-base-200 shadow-xl">
                      <div className="card-body">
                        <h2 className="card-title">Portfolio</h2>
                        <div className="grid grid-cols-2 gap-4">
                          {[1, 2, 3, 4].map(item => (
                            <div key={item} className="aspect-video bg-base-300 rounded-lg"></div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="card bg-base-200 shadow-xl">
                      <div className="card-body">
                        <h2 className="card-title">Reviews</h2>
                        <div className="space-y-4">
                    {[1, 2, 3].map(review => (
                        <div key={review} className="flex items-start gap-4">
                          <div className="avatar">
                            <div className="w-10 h-10 rounded-full">
                              <img src={`https://i.pravatar.cc/150?img=${review}`} alt="Reviewer" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold">Client Name</h3>
                            <p className="opacity-70">Great tutor! Very patient and knowledgeable.</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          );
    }
  };

  return (
    <>
      <div className="flex justify-center p-6">
        {renderStep()}
        {currentStep > 1 && (
          <button className="btn btn-outline absolute bottom-4 left-4" onClick={handleBack}>
            Back
          </button>
        )}
      </div>
      
    </>
  );
};

export default DataFormForFindingProvider;