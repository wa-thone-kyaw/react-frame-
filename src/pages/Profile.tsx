import CameraEnhanceOutlinedIcon from '@mui/icons-material/CameraEnhanceOutlined';

const Profile = () => {
  return (
    <>

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65 dark:bg-gray-500 bg-gray-800">
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <form action="#">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3 flex justify-center items-center">
            <div className="relative drop-shadow-2 w-24 h-24  md:w-36 md:h-36 rounded-full">
              <img className='h-full w-full rounded-full object-cover object-center' src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBIePbmKx1aWZNHFJkvrMOvxW1j56hK3MyHw&s'} alt="profile" />
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                <CameraEnhanceOutlinedIcon className='text-gray-3'/>
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="sr-only"
                />
              </label>
            </div>
          </div>
          <div className="mt-4">
              <div className="p-6.5">
            
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Select subject"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    readOnly
                  />
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Submit
                </button>
              </div>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
