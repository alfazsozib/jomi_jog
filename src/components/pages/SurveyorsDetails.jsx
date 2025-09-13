import { FaStar } from "react-icons/fa";
import experienceIcon from "../../assets/icons/Experience.jpg";
import priceIcon from "../../assets/icons/Price.jpg";
import infoImage2 from "../../assets/images/Frame 74.png";
import infoImage1 from "../../assets/images/Frame 75.png";
import workersImages from "../../assets/images/image_big.png";

const SurveyorsDetails = () => {
  return (
    <div className="bg-[#F5F3ED]">
      {/* Surveyors details section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[100px] items-center px-6 sm:px-[8%] py-8 md:py-[3%]">
        {/* image section */}
        <div className="flex justify-center md:justify-start">
          <img
            src={workersImages}
            alt="Surveyor"
            className="w-full max-w-[400px] md:max-w-[500px]  rounded-lg"
          />
        </div>

        {/* Surveyors details section */}
        <div>
          {/* Stars */}
          <div className="flex items-center text-[#7ED957] text-2xl sm:text-3xl md:text-4xl">
            {Array(5)
              .fill()
              .map((_, i) => (
                <FaStar key={i} className="mr-1" />
              ))}
          </div>

          {/* name */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl my-4 md:my-[25px]">
            মোহাম্মদ জাহাঙ্গীর আলম
          </h1>

          {/* Location, Age, Price */}
          <div className="flex flex-wrap items-center gap-5 mb-5">
            {/* location */}
            <div className="flex items-center text-gray-600 text-sm sm:text-base gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="24"
                viewBox="0 0 20 24"
                fill="none"
              >
                <path
                  d="M17.004 18.2789C15.8553 17.8193 14.2975 17.4745 12.5653 17.2917C14.8064 14.2649 17.2875 10.4062 17.2875 7.88259C17.2875 3.64432 13.8432 0.195862 9.60958 0.195862C5.37546 0.195862 1.93116 3.64432 1.93116 7.88259C1.93116 9.43727 2.9079 11.7205 4.83387 14.6684C5.42428 15.5724 6.05415 16.463 6.66377 17.2907C4.92889 17.4729 3.36797 17.8177 2.21728 18.2773C0.384778 19.01 0 19.8502 0 20.4265C0 22.5607 4.9507 23.7125 9.60958 23.7125C14.2679 23.7125 19.2192 22.5607 19.2192 20.4265C19.2192 19.8507 18.8349 19.0105 17.004 18.2789ZM2.6654 7.88259C2.6654 4.04935 5.78049 0.930626 9.60958 0.930626C13.4381 0.930626 16.5537 4.04935 16.5537 7.88259C16.5537 9.30746 15.63 11.4442 13.8089 14.2332C12.3659 16.4438 10.6891 18.5567 9.60958 19.9047C7.45617 17.2112 2.6654 11.0885 2.6654 7.88259ZM9.32294 20.722C9.39252 20.8092 9.49793 20.8596 9.60958 20.8596C9.7207 20.8596 9.82611 20.8092 9.89569 20.722L10.0037 20.587C10.2389 20.2941 10.5079 19.9582 10.8008 19.5884C12.625 19.7442 13.3556 20.1903 13.4153 20.3429C13.3847 20.4151 13.1411 20.6415 12.356 20.8461C11.6114 21.0403 10.6357 21.1468 9.60958 21.1468C8.58298 21.1468 7.60728 21.0403 6.86265 20.8461C6.07751 20.6415 5.83398 20.4151 5.80386 20.3429C5.86306 20.1903 6.59471 19.7437 8.42045 19.5884C8.76369 20.0241 9.07058 20.4068 9.32294 20.722ZM16.0345 22.1396C14.3235 22.6802 12.0418 22.9777 9.60958 22.9777C7.17681 22.9777 4.89514 22.6802 3.18415 22.1396C1.64971 21.6551 0.733726 21.0149 0.733726 20.4265C0.733726 19.4903 3.1395 18.3308 7.17784 17.9792C7.42138 18.3027 7.65921 18.6127 7.88716 18.9066C6.7832 19.0448 5.06806 19.4098 5.06806 20.3429C5.06806 21.5575 7.92247 21.8815 9.60958 21.8815C11.2962 21.8815 14.1506 21.5575 14.1506 20.3429C14.1506 19.4109 12.4396 19.0453 11.3361 18.9072C11.5657 18.6127 11.8045 18.3027 12.0491 17.9803C16.0823 18.3323 18.4849 19.4908 18.4849 20.4265C18.4849 21.0149 17.5689 21.6551 16.0345 22.1396ZM13.5186 7.87376C13.5186 5.71568 11.7651 3.96004 9.60958 3.96004C7.45358 3.96004 5.70001 5.71568 5.70001 7.87376C5.70001 10.0318 7.45358 11.7875 9.60958 11.7875C11.7651 11.7875 13.5186 10.0318 13.5186 7.87376ZM9.60958 11.0527C7.8586 11.0527 6.43425 9.62681 6.43425 7.87376C6.43425 6.12123 7.8586 4.69532 9.60958 4.69532C11.36 4.69532 12.7844 6.12123 12.7844 7.87376C12.7844 9.62681 11.36 11.0527 9.60958 11.0527Z"
                  fill="#7ED957"
                />
              </svg>
              <span>রেলগেট, রাজশাহী</span>
            </div>

            {/* age of experience */}
            <div className="flex items-center text-gray-600 text-sm sm:text-base gap-2">
              <img src={experienceIcon} alt="Experience" className="w-6 h-6" />
              <h1>৬+ বছর</h1>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2 text-sm sm:text-base text-gray-600">
            <div className="flex items-center">
              <img src={priceIcon} alt="Price" className="w-6 h-6" />
              <span className="ml-2">অর্ধেক বেলা - ২০০০ টাকা/-</span>
            </div>
            <div className="flex items-center">
              <img src={priceIcon} alt="Price" className="w-6 h-6" />
              <span className="ml-2">সম্পূর্ণ বেলা - ৪০০০ টাকা/-</span>
            </div>
          </div>

          {/* booking button */}
          <button className="bg-[#7ED957] text-white py-3 px-10 rounded-lg font-semibold text-base sm:text-lg mt-6">
            বুক দিন
          </button>
        </div>
      </div>

      {/* information of land surveyor */}
      <div className="flex flex-col md:flex-row justify-between gap-10 px-6 sm:px-[8%] pb-10">
        <div className="flex-1">
          <img src={infoImage1} alt="Tools" className="w-full max-w-[500px] rounded-md " />
          <ul className="list-disc list-inside leading-relaxed mt-6 text-base sm:text-lg space-y-2">
            <li>
              জিআইএস (Geographic Information System) মানচিত্র ও বিশ্লেষণের জন্য।
            </li>
            <li>জিপিএস (GPS) সঠিক পরিমাপের জন্য।</li>
            <li>ড্রোন জমির উপর থেকে জরিপ ও পরিদর্শনের জন্য।</li>
            <li>
              ভূমি ব্যবস্থাপনা সফটওয়্যার মালিকানা ও আইনি তথ্য সংরক্ষণের জন্য।
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <img src={infoImage2} alt="Problems" className="w-full max-w-[500px] rounded-md" />
          <ul className="list-disc list-inside leading-relaxed mt-6 text-base sm:text-lg space-y-2">
            <li>অবৈধ দখল ও জমির মালিকানা সংক্ৰান্ত বিরোধ</li>
            <li>সঠিক তথ্যের অভাব ও দুর্নীতি</li>
            <li>আধুনিক প্রযুক্তির পর্যাপ্ত ব্যবহার না থাকা</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SurveyorsDetails;
